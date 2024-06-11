import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function Prova({ likes = 0 }) {
    const [state, setState] = React.useState(() => {
        const quantiadeLikes = window.localStorage.getItem('likes')
        return quantiadeLikes != null ? quantiadeLikes : likes
    })
    React.useEffect(() => {
        const {likes} = state
        window.localStorage.setItem('likes', likes)
    }, [likes])

    function handleSubmit() {
        setState(state + 1)
    }

    return (
        <div>
            <Typography fontSize={30}>
                Sobre o Autor
            </Typography>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 350 }}
                    image="/public/fotoPerfil.jpg"
                    title="Cássio Cintra"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Cássio Cintra
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Discente no curso de Análise e Desenvolvimento de Sistemas na Fatec Franca.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSubmit} 
                        style={{color:'darkred', background: 'lightcoral'}}>
                        <FavoriteIcon/>Curtir({likes})
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}