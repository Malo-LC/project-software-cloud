import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './adminListe.css';
import { ENDPOINT } from '../config';

export function AdminListe() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [checkAuthentication, setCheckAuthentication] = useState(false);
  function testPass() {
    axios
      .post(
        `${ENDPOINT}/adminliste`,
        { pass: password },
        { withCredentials: true }
      )
      .then((res) => {
        setCheckAuthentication(res.data.res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (checkAuthentication) {
      navigate('/adminliste/creerlistecandidat');
    }
  }, [checkAuthentication]);
  return (
    <div className="adminliste">
      <div className="admin">
        <h1>Admin</h1>

        {checkAuthentication ? (
          <h1>Authentification réussie</h1>
        ) : (
          <div className="mdp">
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe..."
            />
            <button type="button" className="button-31user" onClick={testPass}>
              Entrer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
