import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import myfetch from '../../lib/myfetch'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Waiting from '../../ui/Waiting'

export default function CustomerList() {

  const columns = [
    { 
      field: 'id', 
      headerName: 'Cód.', 
      width: 70,
      type: "number"
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 250
    },
    {
      field: 'ident_document',
      headerName: 'CPF',
      width: 150
    },
    {
      field: 'city',
      headerName: 'Município/UF',
      width: 200,
      valueGetter: (value, row) => value + '/' + row.uf
    },
    {
      field: 'phone',
      headerName: 'Tel./Celular',
      width: 160
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 200
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
    customers: [],
    showWaiting: false
  })
  const {
    customers,
    showWaiting
  } = state

  /*
    useEffect() com vetor de dependências vazio, para ser executado
    uma única vez durante o carregamento inicial do componente e
    disparar uma requisição ao back-end solicitando os dados a serem
    exibidos
  */
  React.useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    // Exibe a tela de espera
    setState({ ...state, showWaiting: true })
    try {
      const result = await myfetch.get('/customers?by=name')
      
      // Coloca o resultado no vetor customers e desliga a tela de espera
      setState({ ...state, customers: result, showWaiting: false })
    }
    catch(error) {
      console.log(error)

      // Desliga a tela de espera
      setState({ ...state, showWaiting: false })
    }
  }

  async function handleDeleteButtonClick(deleteId) {
    if(confirm('Deseja realmente excluir este item?')) {
      try {
        // Efetua uma chamada ao back-end para tentar excluir o item
        await myfetch.delete(`/customers/${deleteId}`)

        // Recarrega os dados da grid
        fetchData()

        alert('Item excluído com sucesso.')
      }
      catch(error) {
        alert(error.message)
      }
    }
  }

  return(
    <>
      <Waiting show={showWaiting} />

      <Typography variant="h1" gutterBottom>
        Listagem de clientes
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          mb: 2     // Margem inferior
        }}
      >
        <Link to="./new">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<AddBoxIcon />}
          >
            Novo cliente
          </Button>
        </Link>
      </Box>

      <Paper elevation={10}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={customers}
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