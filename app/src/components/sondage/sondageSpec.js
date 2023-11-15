import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ENDPOINT } from '../config';

export function SondageSpec() {
  const [sondage, setSondage] = useState([]);
  const [voteSondage, setVoteSondage] = useState(1);
  const [vote, setVote] = useState([]);
  const [selectedButton, setSelectedButton] = useState([
    { active: 'non' },
    { active: 'non' },
    { active: 'non' },
    { active: 'non' },
  ]);
  const [resultatSondage, setResultatSondage] = useState([
    { prct: 0 },
    { prct: 0 },
    { prct: 0 },
    { prct: 0 },
  ]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/getSondage/${id}`)
      .then((res) => {
        setSondage(res.data.sondage[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function calcResultats(resultat) {
    const compteResultats = [0, 0, 0, 0];
    for (let i = 0; i < resultat.length; i += 1) {
      if (resultat[i].choix === 1) {
        compteResultats[0] += 1;
      }
      if (resultat[i].choix === 2) {
        compteResultats[1] += 1;
      }
      if (resultat[i].choix === 3) {
        compteResultats[2] += 1;
      }
      if (resultat[i].choix === 4) {
        compteResultats[3] += 1;
      }
    }
    setResultatSondage([
      { prct: (compteResultats[0] / resultat.length) * 100 },
      { prct: (compteResultats[1] / resultat.length) * 100 },
      { prct: (compteResultats[2] / resultat.length) * 100 },
      { prct: (compteResultats[3] / resultat.length) * 100 },
    ]);
  }
  useEffect(() => {
    axios
      .get(`${ENDPOINT}/checkVoteSondage/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setVote(res.data.vote);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [voteSondage]);

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/getResultatsondage/${id}`)
      .then((res) => {
        calcResultats(res.data.res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [voteSondage]);

  function soumettreVote() {
    axios
      .post(
        `${ENDPOINT}/voteSondage/${id}`,
        {
          vote: voteSondage,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setVoteSondage(0);
        setSelectedButton([
          { active: 'non' },
          { active: 'non' },
          { active: 'non' },
          { active: 'non' },
        ]);
        alert('Votre vote a bien été pris en compte');
      });
  }
  function bouttonClick(e) {
    setVoteSondage(e);
    if (e === 1) {
      setSelectedButton([
        { active: 'oui' },
        { active: 'non' },
        { active: 'non' },
        { active: 'non' },
      ]);
    }
    if (e === 2) {
      setSelectedButton([
        { active: 'non' },
        { active: 'oui' },
        { active: 'non' },
        { active: 'non' },
      ]);
    }
    if (e === 3) {
      setSelectedButton([
        { active: 'non' },
        { active: 'non' },
        { active: 'oui' },
        { active: 'non' },
      ]);
    }
    if (e === 4) {
      setSelectedButton([
        { active: 'non' },
        { active: 'non' },
        { active: 'non' },
        { active: 'oui' },
      ]);
    }
  }
  if (sondage.length === 0) {
    return <h1>Loading</h1>;
  }
  function choixReponse() {
    const choixStr = vote[0].choix * 1;
    if (choixStr === 1) {
      return sondage.option1;
    }
    if (choixStr === 2) {
      return sondage.option2;
    }
    if (choixStr === 3) {
      return sondage.option3;
    }
    if (choixStr === 4) {
      return sondage.option4;
    }
    return 'Aucun choix';
  }
  return (
    <div className="sondageBig">
      <div className="sondageSpec">
        <h1>{sondage.titre}</h1>
        <p className="descSondage">{sondage.descr}</p>
        {vote.length !== 0 ? (
          <>
            <p>Vous avez deja voté pour l'option {vote[0].choix} :</p>
            <p>{choixReponse()}</p>
            <h2>Résultats : </h2>
            <div className="spaceMilieu">
              <div className="resultatSondageItem">
                <p>{sondage.option1}</p>
                <p>{resultatSondage[0].prct}%</p>
              </div>
              <div className="resultatSondageItem">
                <p>{sondage.option2}</p>
                <p>{resultatSondage[1].prct}%</p>
              </div>
              <div className="resultatSondageItem">
                <p>{sondage.option3}</p>
                <p>{resultatSondage[2].prct}%</p>
              </div>
              <div className="resultatSondageItem">
                <p>{sondage.option4}</p>
                <p>{resultatSondage[3].prct}%</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bouttonSondage">
            <div className="spaceMilieu">
              <button
                type="button"
                onClick={() => bouttonClick(1)}
                className={`${selectedButton[0].active} button-31user`}
              >
                {sondage.option1}
              </button>
              <button
                type="button"
                onClick={() => bouttonClick(2)}
                className={`${selectedButton[1].active} button-31user`}
              >
                {sondage.option2}
              </button>
              {sondage.option3 !== 'undefined' && (
                <button
                  type="button"
                  onClick={() => bouttonClick(3)}
                  className={`${selectedButton[2].active} button-31user`}
                >
                  {sondage.option3}
                </button>
              )}
              {sondage.option4 !== 'undefined' && (
                <button
                  onClick={() => bouttonClick(4)}
                  type="button"
                  className={`${selectedButton[3].active} button-31user`}
                >
                  {sondage.option4}
                </button>
              )}
            </div>
            <button
              type="button"
              className="button-31user mt"
              onClick={soumettreVote}
            >
              Soumettre
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
