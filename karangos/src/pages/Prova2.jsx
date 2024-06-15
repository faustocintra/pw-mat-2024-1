import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Prova2() {
    //variavel de estado
  const [likes, setLikes] = React.useState(
    // Lazy initializer
    () => window.localStorage.getItem('likes') ?? 0
  )

  //atualizando likes
  React.useEffect(() => {
    window.localStorage.setItem('likes', likes)
  }, [likes])

  return (
    <>

      <Typography variant="h1" gutterBottom>
        Sobre o autor
      </Typography>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 300 }}
          image= "https://avatars.githubusercontent.com/u/127059191?v=4"
          title="Sobre o autor"
        />
        <CardContent>

          <Typography gutterBottom variant="h5" component="div">
            Cainã Vieira de Souza
          </Typography>

 
          <Typography variant="body2" color="text.secondary">
          Olá, eu sou Cainã, um jovem de 20 anos com paixão pelo aprendizado.
          Estou aqui para explorar e melhorar minhas habilidades, e estou ansioso
          para aprender e crescer com vocês.
          </Typography>
        </CardContent>


        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FavoriteIcon />}
            onClick={() => setLikes(Number(likes) + 1)} //aumenta os likes
          >
            Like ({likes}) {/* mostra os likes */}
          </Button>
        </CardActions>
      </Card>
    </>
  )
}