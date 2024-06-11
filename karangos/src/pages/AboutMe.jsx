import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import myfetch from '../lib/myfetch'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
//import Waiting from '../../ui/Waiting'
import useConfirmDialog from '../ui/useConfirmDialog'
import useNotification from '../ui/useNotification'
import useWaiting from '../ui/useWaiting'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AboutMe() {

  const [likes, setlikes] = React.useState(0)


  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()

  /*
    useEffect() com vetor de dependências vazio, para ser executado
    uma única vez durante o carregamento inicial do componente e
    disparar uma requisição ao back-end solicitando os dados a serem
    exibidos
  */
  React.useEffect(() => {
    const clicks = localStorage.getItem('botao')
    setlikes(clicks)
  }, [])


  function handleClick(){
    const atualizalikes = likes + 1
    localStorage.setItem('botao' ,atualizalikes)
    setlikes(atualizalikes)
  }
  
  
  return(
    <>
      <Typography variant="h1" gutterBottom>
       Sobre o autor
      </Typography>

      <Card sx={{ maxWidth: 345 }}>
    <CardMedia
        sx={{ height: 300 }}
        image="src/statics/cards/selfie.jpeg"
        title="green iguana"
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Murilo Henrique
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Sou estudante da fatec franca desde o ano de 2022, faço 21 anos este mes, moro com meus pais e tenho um
        irmão mais velho que já esta casado.
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="medium"
        color="secondary"
        startIcon={<FavoriteIcon />}
        onChange={handleClick}>Like{likes}</Button>
    </CardActions>
    </Card>
    </>
    )
}