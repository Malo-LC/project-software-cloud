import { React } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export function Progression({ step }) {
  return (
    <div className="Progression">
      <div className="Progress">
        <Box display="flex" justifyContent="center" alignItems="center">
          <LinearProgress
            sx={{ width: 400 }}
            variant="determinate"
            value={((step * 1) / 3) * 100}
          />
        </Box>
      </div>
    </div>
  );
}

export default Progression;
