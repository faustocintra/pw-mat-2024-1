import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Prova2() {

  const [likes, setLikes] = React.useState(
    () => parseInt(window.localStorage.getItem('likes'))
  )
  React.useEffect(() => {
    window.localStorage.setItem('likes', likes)
  }, [likes])

  const incrementarLikes = () => {
    const newLikes = likes + 1
    setLikes(newLikes)
    console.log("incrementou like")
    console.log(likes)
  }

  return(
    <>
      <Typography variant="h1" gutterBottom>
        Sobre o Autor
      </Typography>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 350 }}
        image="/src/assets/rafael.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Rafael Henrique Cesar
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rafael grauduando em Analise e Desenvolvimento de Sistemas
        </Typography>
      </CardContent>
      <CardActions>
        <Button
         variant="contained"
         color="secondary"
         size="large"
         startIcon={<FavoriteIcon />}
         onClick={incrementarLikes}
        > Curtir</Button>
      </CardActions>
    </Card>

    </>
  )
}