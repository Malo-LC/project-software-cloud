require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./passportConfig");
const MySQLStore = require("express-mysql-session")(session);
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const Utilisateur = require("./models/Utilisateurs");
const Candidat = require("./models/Candidats");
const VoteListe = require("./models/VoteListe");
const VoteSondage = require("./models/VoteSondage");
const Sondage = require("./models/Sondage");
const ListeElectorale = require("./models/ListeElectorale");
let options = {
  host: "mysql-service",
  user: "root",
  port: 3306,
  password: "password",
  database: "safevote",
};

const sessionStore = new MySQLStore(options);

// Initialisation de passport et de la session
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));
initializePassport(passport);

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

app.post("/register", async (req, res) => {
  const users = await Utilisateur.findAll();
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === req.body.email) {
      return res.send("Email");
    }
    if (users[i].tel === req.body.tel) {
      return res.send("Tel");
    }
    if (getAge(req.body.dateDeNaissance) < 18) {
      return res.send("Age");
    }
  }
  const { email, password, nom, prenom, dateDeNaissance, tel, genre } = req.body;
  const HashedPassword = bcrypt.hashSync(password, 10);
  await Utilisateur.create({
    email: email,
    password: HashedPassword,
    nom: nom,
    prenom: prenom,
    dateDeNaissance: dateDeNaissance,
    genre: genre,
    tel: tel,
  });
  return res.status(204);
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", {}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur serveur");
      return;
    }
    if (!user) {
      return res.json({
        message: false,
      });
    } else {
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Erreur serveur");
        } else {
          res.send(true);
          return next();
        }
      });
    }
  })(req, res, next);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("logout");
  });
});

app.get("/checkAuthentication", (req, res) => {
  const authenticated = req.isAuthenticated();
  if (authenticated) {
    res.status(200).json({
      auth: true,
    });
  } else {
    res.status(200).json({
      auth: false,
    });
  }
});

app.get("/getUser", async (req, res) => {
  const user = await Utilisateur.findOne({
    where: {
      email: req.user.email,
    },
  });
  return res.status(200).json({
    email: user.email,
    nom: user.nom,
    prenom: user.prenom,
    tel: user.tel,
    genre: user.genre,
  });
});

app.get("/candidats/:id", async (req, res) => {
  const candidats = await Candidat.findAll({
    where: {
      idListeElec: req.params.id,
    },
  });
  return res.status(200).json({ candidats });
});

app.get("/candidats", async (req, res) => {
  try {
    const candidats = await Candidat.findAll();
    return res.status(200).json({ candidats });
  } catch (error) {
    console.log(error);
  }
});

app.post("/checkVote", async (req, res) => {
  const voteListe = await VoteListe.findAll({
    where: {
      userId: req.user.id,
      id: req.body.idListeElec,
    },
  });
  return res.status(200).json({ vote: voteListe });
});

app.get("/checkVoteSondage/:id", async (req, res) => {
  const voteSondage = await VoteSondage.findAll({
    where: {
      userId: req.user.id,
      idSondage: req.params.id,
    },
  });
  return res.status(200).json({ vote: voteSondage });
});

app.post("/vote", async (req, res) => {
  const vote = await VoteListe.create({
    userId: req.user.id,
    idCandidat: req.body.idCandidat,
    idListe: req.body.idListeElec,
  });
  return res.status(200).json({ vote });
});

app.post("/creerSondage", async (req, res) => {
  const { titre, description, option1, option2, option3, option4 } = req.body;
  const id = req.user.id;

  const sondage = await Sondage.create({
    userId: id,
    titre: titre,
    descr: description,
    option1: option1,
    option2: option2,
    option3: option3,
    option4: option4,
  });
  return res.status(200).json({ sondage });
});

app.get("/getSondages", async (req, res) => {
  const sondages = await Sondage.findAll();
  return res.status(200).json({ sondages });
});

app.get("/getSondage/:id", async (req, res) => {
  const sondage = await Sondage.findOne({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({ sondage });
});

app.post("/voteSondage/:id", async (req, res) => {
  const vote = await VoteSondage.create({
    userId: req.user.id,
    idSondage: req.params.id,
    choix: req.body.vote,
  });
  return res.status(200).json({ vote });
});

app.get("/listes", async (req, res) => {
  const listes = await ListeElectorale.findAll();
  return res.status(200).json({ listes });
});

app.get("/listes/:id", async (req, res) => {
  const liste = await ListeElectorale.findOne({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({ liste });
});

app.get("/getResultatsondage/:id", async (req, res) => {
  const vote = await VoteSondage.findAll({
    where: {
      idSondage: req.params.id,
    },
  });
  return res.status(200).json({ res: vote });
});

app.post("/adminliste", (req, res) => {
  const { pass } = req.body;
  if (pass === "admin") {
    res.status(200).json({
      res: true,
    });
  } else {
    res.status(200).json({
      res: false,
    });
  }
});

app.post("/creerListe", async (req, res) => {
  const { titre } = req.body;
  const query = `INSERT INTO listeElectorale (nomListe) VALUES ('${titre}')`;
  const liste = await ListeElectorale.create({
    nomListe: titre,
  });
  return res.status(200).json({ liste });
});

app.post("/creerCandidat", async (req, res) => {
  const { nom, prenom, idListeElec, photo, parti } = req.body;
  const query = `INSERT INTO candidats (nomC, prenomC, idListeElec,photo,partiPolitique) VALUES ('${nom}', '${prenom}', '${idListeElec}','${photo}','${parti}')`;
  const candidat = await Candidat.create({
    nomC: nom,
    prenomC: prenom,
    idListeElec: idListeElec,
    photo: photo,
    partiPolitique: parti,
  });
  return res.status(200).json({ candidat });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
