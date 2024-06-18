import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import foto from '../assets/selfie-2023.png.jpeg'
import {Box } from '@mui/material'

export default function Autor() {
    const [likes, setLikes] = React.useState(
      () => window.localStorage.getItem('likes') ?? 0
    );


  // Função para incrementar os likes
  React.useEffect(() => {
    window.localStorage.setItem('likes',likes)
  },[likes]);

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h1" gutterBottom>
          Sobre o autor
        </Typography>
      </Box>
      <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
        <CardMedia
          sx={{
            height: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          image={foto}
          title="selfie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cleverson
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sou aluno da fatec Franca e estou cursando o quarto ano de Análise e desenvolvimento de sistemas, sou casado e tenho 41 anos.
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<FavoriteIcon />}
            onClick={() => setLikes(Number(likes) + 1)}
          >
            Curtir ({likes})
          </Button>
        </CardActions>
      </Card>
    </>
  );
}