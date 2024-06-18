import React from 'react'
import Typography from '@mui/material/Typography'
import myfetch from '../../lib/myfetch'
import Paper from '@mui/material/Paper'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'

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
            const result = await myfetch.get('https://api.faustocintra.com.br/about/1')

            // Coloca o resultado no info
            setState({ ...state, info: result })
        }
        catch (error) {
            console.error(error)
            notify('ERRO: ' + error.message, 'error') //mostra mensagem de erro
        }
        finally {
            // Oculta a tela de espera
            showWaiting(false)
        }
    }

    return (
        <>
            <Waiting />

            <Notification />

            {/* mostrando o titulo pedido*/}
            <Typography variant="h1" gutterBottom>
                Sobre o projeto Karangos
            </Typography>

            <Paper>
                {/* mostrando valor de info */}
                <Typography>{info}</Typography>
            </Paper>

        </>
    )
}