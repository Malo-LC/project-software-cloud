import { React } from 'react';

export function StepConfirmation({ changeState, vote }) {
  return (
    <div className="StepConfirmation">
      <p>Vous avez voté pour : </p>
      <p className="mr10">
        {vote.prenomC} {vote.nomC}
      </p>
      <button
        type="button"
        className="button-31"
        onClick={() => changeState(0)}
      >
        Changer de vote
      </button>
      <button
        type="button"
        className="button-31"
        onClick={() => changeState(2)}
      >
        Confirmer
      </button>
    </div>
  );
}

export default StepConfirmation;
