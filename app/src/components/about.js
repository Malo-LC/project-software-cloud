import { React } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import bk from '../icons/bk.jpeg';
import malo from '../icons/malo.JPG';
import './About.css';

export function About() {
  return (
    <div className="AboutBig">
      <h1>Équipe</h1>
      <div className="About">
        <Box>
          <CardMedia
            component="img"
            image={malo}
            sx={{
              height: 300,
              width: 350,
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Malo Le Corvec
            </Typography>
            <Typography variant="body2" color="text.secondary">
              malo.le.corvec@efrei.net
            </Typography>
          </CardContent>
        </Box>
        <Box>
          <CardMedia
            component="img"
            image={bk}
            sx={{
              height: 300,
              width: 350,
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Baptiste Keunebroek
            </Typography>
            <Typography variant="body2" color="text.secondary">
              baptiste.keunebroek@efrei.net
            </Typography>
          </CardContent>
        </Box>
      </div>
    </div>
  );
}
