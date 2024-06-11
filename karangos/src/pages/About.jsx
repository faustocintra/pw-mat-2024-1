import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import autor from '../assets/autor.png'

export default function About() {
    const [likes, setLikes] = React.useState(
        () => window.localStorage.getItem('likes') ?? 0
    )

    React.useEffect(() => {
        window.localStorage.setItem('likes', likes)
        console.count('Atualizou')
    }, [likes])

    return (
        <>
            <Typography variant="h1" gutterBottom>
                Sobre o autor
            </Typography>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 256 }}
                    image={autor}
                    title="autor"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Eduardo Yoshida Rufino Batista
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cursando Análise e Desenvolvimento de Sistemas na Faculdade de Tecnologia de Franca, atualmente no
                    4º Semestre.
                </Typography>
                </CardContent>
                <CardActions>
                <Button 
                    variant="contained"
                    color="secondary"
                    onClick={() => setLikes( Number(likes) + 1 )}
                >
                    <FavoriteIcon fontSize="small" />  CURTIR ( {likes} )
                </Button>
                </CardActions>
            </Card>
        </>
    )
}