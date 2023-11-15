import { React } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import './stepChoix.css';

export function StepChoix({ candidats, changeState, changeVote }) {
  const formSchema = Yup.object().shape({
    Vote: Yup.string().required('Le vote est requis'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });
  console.log(errors);
  function onSubmit(dataForm) {
    changeVote(dataForm.Vote);
    changeState(1);
  }

  if (candidats.length === 0) {
    return <div className="multiStep" />;
  }

  return (
    <div className="StepChoix">
      <p>Pour qui voulez vous voter ?</p>
      <form className="formChoix" onSubmit={handleSubmit(onSubmit)}>
        <select className="button-31" {...register('Vote', { required: true })}>
          {candidats.map((candidat) => (
            <option key={candidat.idCandidat} value={candidat.idCandidat}>
              {candidat.prenomC} {candidat.nomC}
            </option>
          ))}
        </select>
        <button className="button-31" type="submit">
          Voter
        </button>
      </form>
    </div>
  );
}

export default StepChoix;
