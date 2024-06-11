import Typography  from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AutorPhoto from '../assets/minhafoto.jpg'
import HeartIcon from '@mui/icons-material/Favorite';

const AutorInfo = () => {
  // LazyInitializer para 'likes'
  const LikesInitializer = () => {
    // lê o valor de 'likes' do localStorage
    const LikesLocal = localStorage.getItem('likes');
    // Converte o valor para um número ou usa 0 como valor padrão
    return LikesLocal !== null ? parseInt(LikesLocal, 10) : 0;
  };

  // Declarando 'likes' como uma variável de estado
  const [likes, setLikes] = useState(LikesInitializer);

  // useEffect que atualiza o valor armazenado no localStorage sempre que 'likes' for atualizado
  useEffect(() => {
    localStorage.setItem('likes', likes);
  }, [likes]);

  // Função para complementar o número de likes
  const complementLikes = () => {
    setLikes((previousLikes) => previousLikes + 1);
  };

  return (
    <div>
      <Typography> Sobre a Autora </Typography>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 350 }}
        image={AutorPhoto}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Eliane Cristina da Silva Oliveira
        </Typography>
        <Typography variant="body2" color="text.secondary"> Meu nome é Eliane, tenho 21 anos e estou no meu último semestre de Análise e Desenvolvimento de Sistemas na FATEC Franca - Dr. Thomaz Novelino
        </Typography>
      </CardContent>
      <CardActions>
        <Button startIcon={<HeartIcon />} size="small" onClick={complementLikes} 
        sx={{
          backgroundColor: 'secondary.light'
        }}
        >Like {likes}</Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default AutorInfo;
