import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { ENDPOINT } from '../config';

export function Login() {
  const [usernameLog, setUsernameLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/checkAuthentication`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.auth) {
          navigate('/userInfo');
        }
      })
      .catch((error) => {
        console.log(error);
      }); // eslint-disable-next-line
  }, []);

  const login = () => {
    axios
      .post(
        `${ENDPOINT}/login`,
        {
          email: usernameLog,
          password: passwordLog,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.message === false) {
          alert('Email ou mot de passe incorrect');
        }
        setUsernameLog('');
        setPasswordLog('');

        if (res.data === true) {
          navigate('/userInfo');
        }
      });
  };

  return (
    <div className="App">
      <div className="log">
        <div className="logg">
          <h1 className="h1Login">Connexion</h1>
          <div className="login flexColumn">
            <input
              className="inputLogin"
              type="email"
              placeholder="Email"
              value={usernameLog}
              onChange={(e) => setUsernameLog(e.target.value)}
            />
            <input
              className="inputLogin"
              type="password"
              placeholder="Password"
              value={passwordLog}
              onChange={(e) => setPasswordLog(e.target.value)}
            />
            <button type="button" className="button-31" onClick={login}>
              Connexion
            </button>
          </div>
          <p className="pLogin">
            Vous n'avez pas encore créé de compte? faite en un maintenant !
          </p>
          <button
            type="button"
            className="button-31"
            onClick={() => navigate('/register')}
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
}
