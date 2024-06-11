import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, CardMedia } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Sobre() {
  // inicialização de estados
  const [likes, setLikes] = React.useState(() => Number(localStorage.getItem("likes")) || 0)
  const [image, setImage] = React.useState('')

  // atualização do estado likes
  React.useEffect(() => {
    localStorage.setItem("likes", likes)
  }, [likes])

  React.useEffect(() => {
    // simulando a busca de imagem em uma API
    const fetchImage = async () => {
      const imageUrl = '/src/assets/foto.jpeg'
      setImage(imageUrl)
    };

    fetchImage()
  }, [])

  // função atribuida ao evento de click para acrescentar curtidas
  function HandleAddLikes() {
    setLikes(likes + 1);
  }

  return(
    <>
      <Typography variant="h1" gutterBottom>
        Sobre o autor
      </Typography>   

      <Card sx={{ maxWidth: 345 }}>
        { image && 
          <CardMedia
            sx={{ height: 250 }}
            image={image}
            title="my photo"
          />
        }

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Vinicius H. Santana
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tenho 21 anos de idade, sou estudante de programação e atualmente estou focado em aprender mais sobre Front End. Atualmente estou cursando ADS na Fatec e fazendo estágio na Compass.uol
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            onClick={HandleAddLikes}
            sx={{
              backgroundColor: 'red',
              color: 'white',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: 'darkred'
              }
            }}
          >
            <FavoriteIcon sx={{ paddingRight: '8px' }}/>
            Curtir ({likes})
          </Button>
        </CardActions>
      </Card>
    </>
  )
}