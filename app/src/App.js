import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { React } from 'react';
import { Register } from './components/compte/register';
import { Login } from './components/compte/login';
import { UserInfo } from './components/compte/userInfo';
import sample from './misc/videoBack.mp4';
import { Candidats } from './components/vote/candidats';
import { About } from './components/about';
import { CGU } from './components/cgu';
import { Sondage } from './components/sondage/sondage';
import { CreerSondage } from './components/sondage/creerSondage';
import { SondageSpec } from './components/sondage/sondageSpec';
import logo from './icons/logo.png';
import { Navbar2 } from './components/navbar2';
import { Listes } from './components/vote/listes';
import { AdminListe } from './components/vote/adminListe';
import { CreerListeCandidat } from './components/vote/creerListeCandidat';

import './App.css';

function Home() {
  return (
    <div className="Home">
      <video className="videoTag" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
      <div className="Presentation">
        <h1 className="PresentationTitre">SafeVote</h1>
        <p className="presentationAcceuil">Rapide</p>
        <p className="presentationAcceuil mt">Sécurisé</p>
        <p className="presentationAcceuil mt">Accessible</p>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="NavBar">
      <div className="logos">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="navigation">
        <div className="separator" />
        <div className="connexion">
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
// eslint-disable-next-line
function Footer() {
  return (
    <div className="footer">
      <Link to="/about">
        <button type="button" className="button-31propos">
          À propos de nous
        </button>
      </Link>
      <Link to="/cgu">
        <button type="button" className="button-31propos">
          Conditions Générales
        </button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <NavigationBar />
          <Navbar2 />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/candidats/:id" element={<Candidats />} />
            <Route path="/about" element={<About />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/sondage" element={<Sondage />} />
            <Route path="/sondage/creer" element={<CreerSondage />} />
            <Route path="/sondage/:id" element={<SondageSpec />} />
            <Route path="/listes" element={<Listes />} />
            <Route path="/adminliste" element={<AdminListe />} />
            <Route
              path="/adminliste/creerlistecandidat"
              element={<CreerListeCandidat />}
            />
          </Routes>
          <div className="push" />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
