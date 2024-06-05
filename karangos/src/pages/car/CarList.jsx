import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import myfetch from '../../lib/myfetch'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import AddBoxIcon from '@mui/icons-material/AddBox'
//import Waiting from '../../ui/Waiting'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'

export default function CarList() {

  const columns = [
    { 
      field: 'id', 
      headerName: 'id', 
      width: 70,
      type: "number"
    },
    {
      field: 'brand',
      headerName: 'Marca/Modelo',
      width: 200,
      valueGetter: (value, row) => value + ' / ' + row.model
    },
    {
      field: 'color',
      headerName: 'cor',
      width: 150,
    },
    {
      field: 'year_manufacture',
      headerName: 'ano de fabricação',
      width: 200,
    },
    {
      field: 'imported',
      headerName: 'importado',
      width: 200,
      valueGetter: value => value == 1 ? "Sim" : ""
    },
    {
      field: 'plates',
      headerName: 'placas',
      width: 200
    },
    {
      field: 'selling_price',
      headerName: 'preço de venda',
      width: 200,
      valueGetter: value => parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
    cars: []
  })
  const {
    cars
  } = state

  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()

 
  React.useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    showWaiting()
    try {
      const result = await myfetch.get('/cars?by=brand')

      setState({ ...state, cars: result })
    }
    catch(error) {
      console.error(error)
      notify('ERRO: ' + error.message, 'error')
    }
    finally {
      showWaiting(false)
    }
  }

  async function handleDeleteButtonClick(deleteId) {
    if(await askForConfirmation('Deseja realmente excluir este item?', 'Confirmar operação')) {
      showWaiting()
      try {
        await myfetch.delete(`/cars/${deleteId}`)

        fetchData()

        notify('Item excluído com sucesso.')
      }
      catch(error) {
        console.error(error)
        notify('ERRO: ' + error.message, 'error')
      }
      finally {
        showWaiting(false)
      }
    }
  }

  return(
    <>
      <Waiting />

      <Notification />

      <ConfirmDialog />

      <Typography variant="h1" gutterBottom>
        Listagem de carros
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          mb: 2  
        }}
      >
        <Link to="./new">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<AddBoxIcon />}
          >
            Novo carro
          </Button>
        </Link>
      </Box>

      <Paper elevation={10}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={cars}
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