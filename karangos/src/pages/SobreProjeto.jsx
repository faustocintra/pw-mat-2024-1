import React from 'react'
import Typography from '@mui/material/Typography'
//import myfetch from '../lib/myfetch' está dando erro
import Paper from '@mui/material/Paper'
import useNotification from '../ui/useNotification'
import useWaiting from '../ui/useWaiting'


export default function SobreProjeto() {
    //declarando variavel info
    const [state, setState] = React.useState({
        info: []
    })
    const {
        info: info
    } = state
    info

    const { notify, Notification } = useNotification()
    const { showWaiting, Waiting } = useWaiting()


    React.useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        // Exibe a tela de espera
        showWaiting()
        try {
            const response = await fetch('https://api.faustocintra.com.br/about/1')
            const result = await response.json()
      
            // Coloca o resultado no estado
            setState({ ...state, info: result.info })
        } catch (error) {
            // Em caso de erro, exibe uma notificação
            console.error(error)
            notify('ERRO: ' + error.message, 'error')
        } finally {
            // Oculta a tela de espera
            showWaiting(false)
        }
    }

    return (
        <div>

            <Waiting />

            <Notification />

            {/* mostrando o titulo pedido*/}
            <Typography variant="h1" gutterBottom>
                Sobre o projeto Karangos
            </Typography>

            {/* mostrando valor de info */}
            <Paper >
                <Typography>{info}</Typography>
            </Paper>
        </div>
    )
}