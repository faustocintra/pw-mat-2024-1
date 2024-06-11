import React from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function prova2() {
  const [state, setState] = React.useState({
    likes: []
  })
  const {
    likes: likes
  } = state

  useEffect(() => {
    localStorage.setState('likes', likes)
  }, [likes])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="C:\Users\USER\OneDrive\Área de Trabalho\ProgWeb2\pw-mat-2024-1\karangos\src\assets\foto_peril.jpg" 
        title="Sobre o autor"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Autor
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Olá, eu sou Cainã, um jovem de 20 anos com paixão pelo aprendizado.
          Estou aqui para explorar e melhorar minhas habilidades, e estou ansioso
          para aprender e crescer com vocês.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{likes} likes</Button>
      </CardActions>
    </Card>
  )
}

export default prova2();