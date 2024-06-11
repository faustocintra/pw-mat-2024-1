import React from 'react'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'

export default function Componente() {

    const [likes, setLikes] = React.useState(() => {

        const savedLikes = localStorage.getItem('likes')
        return savedLikes !== null ? parseInt(savedLikes, 10) : 0
    })

    const handleLike = () => {
        setLikes((prevLikes) => {
            const newLikes = prevLikes + 1
            localStorage.setItem('likes', newLikes)
            return newLikes
        })
    }

  return(
    <>
      <div>
        <p>Likes: {likes}</p>
        <button onClick={handleLike}>Like</button>
      </div>  

      <Typography variant="h1" gutterBottom>
        Sobre o autor
      </Typography> 

      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/imagens/foto.jpeg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lucas Ribeiro
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Meu nome é Lucas Ribeiro, atualmente sou estudante de Análise e Desenvolvimento de Sistemas 
          na Fatec Franca, estou cursando o quarto semestre e tenho 20 anos de idade.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLike}></Button>
      </CardActions>
    </Card>
    </>
  )
}

