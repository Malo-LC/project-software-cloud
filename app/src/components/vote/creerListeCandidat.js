import { React, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './creerListeCandidat.css';
import { ENDPOINT } from '../config';

export function CreerListeCandidat() {
  const [photo, setPhoto] = useState('');
  const [listes, setListes] = useState([]);
  const [titre, setTitre] = useState('');
  const candidatSchema = Yup.object().shape({
    liste: Yup.string().required('Une liste est requise'),
    nom: Yup.string()
      .required('Un nom est requis')
      .min(1, 'Le nom fait au moins 1 caractère')
      .max(50, 'Le nom fait ne doit pas faire plus de 50 caractères'),
    prenom: Yup.string()
      .required('Un prenom est requis')
      .min(1, 'Le prenom fait au moins 1 caractère')
      .max(50, 'Le prenom fait ne doit pas faire plus de 50 caractères'),
    parti: Yup.string()
      .required('Un parti est requis')
      .min(1, 'Le parti fait au moins 1 caractère')
      .max(50, 'Le parti fait ne doit pas faire plus de 50 caractères'),
  });

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/listes`)
      .then((res) => {
        setListes(res.data.listes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(candidatSchema),
  });

  function creerListe() {
    console.log(titre);
    if (titre === '') {
      alert('Veuillez entrer un titre');
      return;
    }
    axios
      .post(`${ENDPOINT}/creerListe`, {
        titre: titre,
      })
      .then(() => {
        alert('Liste créée');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTitre('');
      });
  }
  function creerCandidat(data) {
    axios
      .post(`${ENDPOINT}/creerCandidat`, {
        idListeElec: data.liste,
        nom: data.nom,
        prenom: data.prenom,
        parti: data.parti,
        photo: photo,
      })
      .then(() => {
        alert('Candidat créée');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        reset();
        setPhoto('');
      });
  }

  function onSubmitCandidat(dataForm) {
    creerCandidat(dataForm);
  }
  if (listes.length === 0) {
    return <div>Chargment...</div>;
  }
  return (
    <div className="CreerListeCandidat">
      <div className="creer flexRowEven">
        <div className="creerListe">
          <h1>Créer une liste</h1>
          <form autoComplete="off" className="register p">
            <div className="flexColumn">
              <input
                type="text"
                className="inputRegister"
                placeholder="Titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
            </div>

            <button
              className="button-31"
              type="button"
              onClick={() => creerListe()}
            >
              Creer
            </button>
          </form>
        </div>
        <div className="creerCandidat">
          <h1>Ajouter un candidat</h1>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitCandidat)}
            className="register p"
          >
            <div className="flexColumn">
              <p className="pForm">Liste</p>
              <select className="inputRegister" {...register('liste')}>
                {listes.map((liste) => (
                  <option key={liste.idListe} value={liste.idListe}>
                    {liste.nomListe}
                  </option>
                ))}
              </select>
              {errors.liste && (
                <p className="errorRegister">{errors.liste.message}</p>
              )}

              <input
                type="text"
                className="inputRegister"
                placeholder="Nom"
                {...register('nom')}
              />
              {errors.nom && (
                <p className="errorRegister">{errors.nom.message}</p>
              )}

              <input
                type="text"
                className="inputRegister"
                placeholder="Prenom"
                {...register('prenom')}
              />
              {errors.prenom && (
                <p className="errorRegister">{errors.prenom.message}</p>
              )}

              <input
                type="text"
                className="inputRegister"
                placeholder="Parti politique"
                {...register('parti')}
              />
              {errors.parti && (
                <p className="errorRegister">{errors.parti.message}</p>
              )}

              <input
                type="text"
                className="inputRegister"
                placeholder="Lien de la photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              {photo && (
                <img src={photo} alt="" className="candidatPhotoPetit m" />
              )}
            </div>
            <button className="button-31" type="submit">
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
