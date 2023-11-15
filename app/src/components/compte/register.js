import axios from 'axios';
import { useState, useEffect, React } from 'react';
import './register.css';
import DatePicker from 'react-date-picker';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ENDPOINT } from '../config';

export function Register() {
  const [naissanceReg, setNaissanceReg] = useState(null);
  const [datesend, setDatesend] = useState(null);

  const formSchema = Yup.object().shape({
    mdp: Yup.string()
      .required('Un mot de passe est requis')
      .min(4, 'Le mot de passe fait au moins 4 caractères')
      .max(12, 'Le mot de passe ne doit pas faire plus de 12 caractères'),
    mdpVerif: Yup.string()
      .required('La confirmation du mot de passe est requis')
      .oneOf([Yup.ref('mdp')], 'Les mots de passes sont différents'),
    Prenom: Yup.string()
      .required('Un prenom est requis')
      .max(50, 'Le prenom ne doit pas faire plus de 50 caractères'),
    Nom: Yup.string()
      .required('Un nom est requis')
      .max(50, 'Le nom ne doit pas faire plus de 50 caractères'),
    Email: Yup.string()
      .required('Un email est requis')
      .email('Email invalide')
      .max(50, 'Le mail ne doit pas faire plus de 50 caractères'),
    Tel: Yup.string().required('Le téléphone est requis'),
    // .matches(/^\d{10}$/, 'Le numéro de téléphone doit contenir 10 chiffres'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });
  function registerr(data) {
    if (naissanceReg === null) {
      return;
    }
    if (!errors.length === 0) {
      return;
    }
    axios
      .post(`${ENDPOINT}/register`, {
        email: data.Email,
        nom: data.Nom,
        prenom: data.Prenom,
        dateDeNaissance: datesend,
        password: data.mdp,
        tel: data.Tel,
        genre: data.Genre,
      })
      .then((res) => {
        if (res.data === 'Email') {
          alert('Email déjà utilisé');
        }
        if (res.data === 'Tel') {
          alert('Numéro de téléphone déjà utilisé');
        }
        if (res.data === 'Age') {
          alert('Vous devez avoir plus de 18 ans');
          setNaissanceReg(null);
          setDatesend(null);
        }
        if (res.data === 'Inscription réussie') {
          alert('Inscription réussie');
          reset();
        }
      });
  }
  function onSubmit(dataForm) {
    registerr(dataForm);
  }
  console.log(errors);
  const navigate = useNavigate();

  useEffect(() => {
    if (naissanceReg != null) {
      setDatesend(
        `${naissanceReg.getDate()}-${
          naissanceReg.getMonth() * 1 + 1
        }-${naissanceReg.getFullYear()}`
      );
    }
  }, [naissanceReg]);

  return (
    <div className="regis">
      <div className="register">
        <h1 className="h1Register">Créer un compte</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="register">
          <div className="flexRowReg">
            <select
              className="button-31"
              {...register('Genre', { required: true })}
            >
              <option value="Mr">M</option>
              <option value="Mrs">Mme</option>
              <option value="Miss">Autre</option>
            </select>
            <div className="flexColumn">
              <input
                type="text"
                className="inputRegister"
                placeholder="Prenom"
                {...register('Prenom')}
              />
              {errors.Prenom && (
                <p className="errorRegister">{errors.Prenom.message}</p>
              )}
            </div>

            <div className="flexColumn">
              <input
                type="text"
                className="inputRegister"
                placeholder="Nom"
                {...register('Nom')}
              />
              {errors.Nom && (
                <p className="errorRegister">{errors.Nom.message}</p>
              )}
            </div>
          </div>

          <input
            type="text"
            className="inputRegister"
            placeholder="Email"
            {...register('Email')}
          />
          {errors.Email && (
            <p className="errorRegister">{errors.Email.message}</p>
          )}

          <input
            type="tel"
            className="inputRegister"
            placeholder="Téléphone"
            {...register('Tel')}
          />
          {errors.Tel && <p className="errorRegister">{errors.Tel.message}</p>}
          <p className="Datepicker">Date de naissance</p>
          <DatePicker
            onChange={setNaissanceReg}
            value={naissanceReg}
            format="dd-MM-y"
            clearIcon={null}
            calendarIcon={null}
            customStyles={{ dateInput: { borderWidth: 0 } }}
          />

          <input
            className="inputRegister"
            type="password"
            placeholder="Mot de passe"
            {...register('mdp')}
          />
          {errors.mdp && <p className="errorRegister">{errors.mdp.message}</p>}
          <input
            className="inputRegister"
            type="password"
            placeholder="Répétez le mot de passe"
            {...register('mdpVerif')}
          />
          {errors.mdpVerif && (
            <p className="errorRegister">{errors.mdpVerif.message}</p>
          )}

          <button className="button-31" type="submit">
            Inscription
          </button>
        </form>
        <p className="pRegister">Vous avez déjà un compte? Connectez vous !</p>
        <button
          type="button"
          className="button-31"
          onClick={() => navigate('/login')}
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}

export default Register;
