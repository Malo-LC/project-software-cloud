import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './userInfo.css';
import { ENDPOINT } from '../config';

export function UserInfo() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [genre, setGenre] = useState('');

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
      .get(`${ENDPOINT}/getUser`, {
        withCredentials: true,
      })
      .then((res) => {
        setEmail(res.data.email);
        setNom(res.data.nom);
        setPrenom(res.data.prenom);
        setTel(res.data.tel);
        setGenre(res.data.genre);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logout = () => {
    axios.post(`${ENDPOINT}/logout`, {}, { withCredentials: true });

    navigate('/login');
  };
  if (email === '' || nom === '' || prenom === '') {
    return (
      <div className="App">
        <p>Chargement...</p>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="InfoBig">
        <div className="Info">
          <h1 className="connected">Vous êtes connecté à votre compte</h1>
          <p>
            Bonjour {genre} {prenom} {nom}{' '}
          </p>
          <p>Email : {email}</p>
          <p>Numéro de téléphone : {tel}</p>
          <button
            type="button"
            className="button-31user width10"
            onClick={logout}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
