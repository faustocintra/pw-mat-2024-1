import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import foto from '../assets/selfie-2023-12.jpg'

export default function About() {
  /*
    2. Nesse componente, declare uma variável de estado e, usando um lazy
      initializer, inicialize-a com o valor lido de uma entrada no 
      localStorage chamada likes.
  */
  const [likes, setLikes] = React.useState(
    // Lazy initializer
    () => window.localStorage.getItem('likes') ?? 0
  )

  /* 
    10. Ao se recarregar a página, o último número de likes exibido 
        no botão deverá ser mostrado.
  */
  React.useEffect(() => {
    window.localStorage.setItem('likes', likes)
  }, [likes])

  return (
    <>
      {/*
        4. Dentro do componente, insira título usando um componente Typography 
           com o texto "Sobre o autor" ou "Sobre a autora", conforme o caso.
      */}
      <Typography variant="h1" gutterBottom>
        Sobre o autor
      </Typography>

      {/*
        5. Abaixo do título, coloque um componente do tipo Card
           (https://mui.com/material-ui/react-card) e vá ao exemplo 
           chamado "Media".
      */}
      <Card sx={{ maxWidth: 345 }}>
        {/*
          6. Faça o upload de uma foto sua e, usando os recursos do React, coloque
             sua foto no lugar da imagem que veio no exemplo do cartão. Ajuste a prop
             de altura da imagem, se necesário.
        */}
        <CardMedia
          sx={{ height: 345 }}
          image={foto}
          title="selfie"
        />
        <CardContent>
          {/* 7. Coloque seu nome no título do cartão. */}
          <Typography gutterBottom variant="h5" component="div">
            Fausto Gonçalves Cintra
          </Typography>
          
          {/* 8. No corpo do cartão, escreva um pequeno texto sobre você */}
          <Typography variant="body2" color="text.secondary">
            Professor universitário há 11 anos, casado, pai de duas filhas. Nas horas vagas, gosta de assistir a séries e filmes e jogar xadrez.
          </Typography>
        </CardContent>

        {/* 9. Na seção CardActions, deixe apenas um dos botões, com o aspecto visual
               conforme a imagem abaixo, incluindo o ícone no início. Ao clicar nesse
               botão, o valor da variável de estado deve ser incrementado. O número 
               que aparece entre parênteses é o valor da variável de estado, que deve
               aumentar a cada clique dado. */}
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
