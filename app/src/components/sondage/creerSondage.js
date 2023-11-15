import { React, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { ENDPOINT } from '../config';

export function CreerSondage() {
  const [boolOpt3, setBoolOpt3] = useState(false);
  const [boolOpt4, setBoolOpt4] = useState(false);
  const formSchema = Yup.object().shape({
    titre: Yup.string()
      .required('Un titre est requis')
      .min(1, 'Le titre fait au moins 1 caractère')
      .max(60, 'Le titre fait ne doit pas faire plus de 60 caractères')
      .matches(
        /^[A-Za-z0-9\s]+$/,
        'Le titre ne peuvent contenir que des lettres, des espaces ou des chiffres !'
      ),
    description: Yup.string()
      .required('Une description est requise')
      .min(1, 'La description fait au moins 1 caractère')
      .max(500, 'La description ne doit pas faire plus de 500 caractères')
      .matches(
        /^[A-Za-z0-9,.\s]+$/,
        'La descritpion ne peut contenir que des lettres, des espaces ou des chiffres !'
      ),
    option1: Yup.string()
      .required('La première option est requise')
      .min(1, 'La première option fait au moins 1 caractère')
      .max(60, 'La première option ne doit pas faire plus de 100 caractères')
      .matches(
        /^[A-Za-z0-9\s]+$/,
        'Les options ne peuvent contenir que  des lettres, des espaces ou des chiffres !'
      ),
    option2: Yup.string()
      .required('La seconde option est requise')
      .min(1, 'La seconde option fait au moins 1 caractère')
      .max(60, 'La seconde option ne doit pas faire plus de 100 caractères')
      .matches(
        /^[A-Za-z0-9\s]+$/,
        'Les options ne peuvent contenir que  des lettres, des espaces ou des chiffres !'
      ),
    option3: Yup.string()
      .max(60, 'La troisième option ne doit pas faire plus de 100 caractères')
      .matches(
        /^[A-Za-z0-9\s]+$/,
        'Les options ne peuvent contenir que  des lettres, des espaces ou des chiffres !'
      ),
    option4: Yup.string()
      .max(60, 'La troisième option ne doit pas faire plus de 100 caractères')
      .matches(
        /^[A-Za-z0-9\s]+$/,
        'Les options ne peuvent contenir que  des lettres, des espaces ou des chiffres !'
      ),
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

  function creerSo(data) {
    if (!errors.length === 0) {
      return;
    }
    axios
      .post(
        `${ENDPOINT}/creerSondage`,
        {
          titre: data.titre,
          description: data.description,
          option1: data.option1,
          option2: data.option2,
          option3: data.option3,
          option4: data.option4,
        },
        { withCredentials: true }
      )
      .then(() => {
        alert('Sondage créé');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(reset());
  }
  function onSubmit(dataForm) {
    creerSo(dataForm);
  }
  return (
    <div className="sondageBig">
      <div className="sondage">
        <h1>Creer un sondage</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="register padd">
          <div className="flexRow">
            <div className="flexColumn">
              <input
                type="text"
                className="inputRegister"
                placeholder="Titre du sondage"
                {...register('titre')}
              />
              {errors.titre && (
                <p className="errorRegister">{errors.titre.message}</p>
              )}
            </div>

            <div className="flexColumn">
              <input
                type="text"
                className="inputRegister"
                placeholder="Description du sondage"
                {...register('description')}
              />
              {errors.description && (
                <p className="errorRegister">{errors.description.message}</p>
              )}
            </div>
          </div>
          <input
            type="text"
            className="inputRegister"
            placeholder="Option 1"
            {...register('option1')}
          />
          {errors.option1 && (
            <p className="errorRegister">{errors.option1.message}</p>
          )}
          <input
            type="text"
            className="inputRegister"
            placeholder="Option 2"
            {...register('option2')}
          />
          {errors.option2 && (
            <p className="errorRegister">{errors.option2.message}</p>
          )}
          {boolOpt3 ? null : (
            <button
              className="button-31"
              type="submit"
              onClick={() => setBoolOpt3(true)}
            >
              +
            </button>
          )}

          {boolOpt3 && (
            <>
              <div className="flexRow">
                <input
                  type="text"
                  className="inputRegister"
                  placeholder="Option 3"
                  {...register('option3')}
                />
                <button
                  type="button"
                  className="button-31"
                  onClick={() => setBoolOpt3(false)}
                >
                  -
                </button>
              </div>
              <div>
                {errors.option3 && (
                  <p className="errorRegister">{errors.option3.message}</p>
                )}
              </div>
            </>
          )}
          {boolOpt4 || !boolOpt3 ? null : (
            <button
              className="button-31"
              type="submit"
              onClick={() => setBoolOpt4(true)}
            >
              +
            </button>
          )}

          {boolOpt4 && (
            <>
              <div className="flexRow">
                <input
                  type="text"
                  className="inputRegister"
                  placeholder="Option 4"
                  {...register('option4')}
                />
                <button
                  type="button"
                  className="button-31"
                  onClick={() => setBoolOpt4(false)}
                >
                  -
                </button>
              </div>
              <div>
                {errors.option4 && (
                  <p className="errorRegister">{errors.option4.message}</p>
                )}
              </div>
            </>
          )}

          <button className="button-31" type="submit">
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
}
