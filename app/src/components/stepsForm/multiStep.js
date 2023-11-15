import { useState, React } from 'react';
import { StepChoix } from './stepChoix';
import { StepConfirmation } from './stepConfirmation';
import { StepResultat } from './stepResultat';
import { StepVote } from './stepVote';
import { Progression } from './progression';
import './multiStep.css';

export function MultiStepVote({ candidats }) {
  const [stepActuel, setStepActuel] = useState(0);
  const [vote, setVote] = useState('');

  const changeState = (e) => {
    setStepActuel(e);
  };
  const changeVote = (e) => {
    for (let i = 0; i < candidats.length; i += 1) {
      if (candidats[i].idCandidat === e * 1) {
        setVote(candidats[i]);
        break;
      }
    }
  };

  const steps = [
    {
      name: 'Step 1',
      component: (
        <StepChoix
          candidats={candidats}
          changeState={changeState}
          changeVote={changeVote}
        />
      ),
    },
    {
      name: 'Step 2',
      component: <StepConfirmation changeState={changeState} vote={vote} />,
    },
    {
      name: 'Step 3',
      component: <StepVote changeState={changeState} vote={vote} />,
    },
    { name: 'Step 4', component: <StepResultat vote={vote} /> },
  ];
  if (candidats.length === 0) {
    return <div className="multiStep" />;
  }
  return (
    <div className="multiStepBig">
      <div className="multiStep">
        <h1>Voter</h1>
        <Progression className="progres" step={stepActuel} />
        <div className="multiStepSteps">{steps[stepActuel].component}</div>
      </div>
    </div>
  );
}
