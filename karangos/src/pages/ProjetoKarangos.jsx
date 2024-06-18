import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import myfetch1 from '../lib/myfetch1'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
//import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
//import AddBoxIcon from '@mui/icons-material/AddBox'
import useConfirmDialog from '../ui/useConfirmDialog'
import useNotification from '../ui/useNotification'
import useWaiting from '../ui/useWaiting'

export default function ProjetoKarangos() {

    const columns = [
        
        {
          field: 'info',
          headerName: 'Informações',
          width: 180,
        },
        {
          field: '_edit',
          headerName: 'Editar',
          headerAlign: 'center',
          align: 'center',
          width: 90,
          sortable: false,
          renderCell: params => (
            <Link to={'./' + params.id}>
              <IconButton aria-label="Editar">
                <EditIcon />
              </IconButton>
            </Link>
          )
        },
        {
          field: '_delete',
          headerName: 'Excluir',
          headerAlign: 'center',
          align: 'center',
          width: 90,
          sortable: false,
          renderCell: params => (
            <IconButton aria-label="Excluir" onClick={() => handleDeleteButtonClick(params.id)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          )
        },
      ]
    
      const [state, setState] = React.useState({
        info: []
      })
      const {
        info
      } = state
    
      const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
      const { notify, Notification } = useNotification()
      const { showWaiting, Waiting } = useWaiting()
    
      React.useEffect(() => {
        fetchData()
      }, [])
    
      async function fetchData() {
        // Exibe a tela de espera
        showWaiting()
        try {
          const result = await myfetch1.get('/info?by=info')
          
          // Coloca o resultado no vetor cars
          setState({ ...state, info: result })
        }
        catch(error) {
          console.error(error)
          notify('ERRO: ' + error.message, 'error')
        }
        finally {
          // Oculta a tela de espera
          showWaiting(false)
        }
      }
    
      async function handleDeleteButtonClick(deleteId) {
        if(await askForConfirmation('Deseja realmente excluir este item?', 'Confirmar operação')) {
          showWaiting()   // Exibe a tela de espera
          try {
            // Efetua uma chamada ao back-end para tentar excluir o item
            await myfetch1.delete(`/info/${deleteId}`)
    
            // Recarrega os dados da grid
            fetchData()
    
            notify('Item excluído com sucesso.')
          }
          catch(error) {
            console.error(error)
            notify('ERRO: ' + error.message, 'error')
          }
          finally {
            showWaiting(false)  // Ocultar a tela de espera
          }
        }
      }

      return(
        <>
          <Waiting />
    
          <Notification />
    
          <ConfirmDialog />
    
          <Typography variant="h1" gutterBottom>
            Projeto Karangos
          </Typography>

          <Paper elevation={10}>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={info}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
              />
            </Box>
          </Paper>     
        </>
    )
}