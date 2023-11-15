import axios from 'axios';
import { useEffect, useState, React } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MultiStepVote } from '../stepsForm/multiStep';
import './voter.css';
import { ENDPOINT } from '../config';

export function Voter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [vote, setVote] = useState(true);
  const idListe = useLocation().pathname.split('/').pop();
  const [candidats, setCandidats] = useState([]);

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/checkAuthentication`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.auth) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line

  useEffect(() => {
    axios
      .get(`${ENDPOINT}${location.pathname}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCandidats(res.data.candidats);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        `${ENDPOINT}/checkVote`,
        { idListeElec: idListe },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.vote.length > 0) {
          setVote(true);
        } else {
          setVote(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (candidats.length === 0) {
    return (
      <div className="loading">
        <h1>Chargement...</h1>
      </div>
    );
  }

  return (
    <div className="voter">
      {vote ? (
        <div className="dejaVoterBig">
          <div className="dejaVoter">
            <h1>Vous avez déjà voté</h1>
            <p>Regardez vos mails pour voir votre vote</p>
          </div>
        </div>
      ) : (
        <MultiStepVote candidats={candidats} />
      )}
    </div>
  );
}

export default Voter;
