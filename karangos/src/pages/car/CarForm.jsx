import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'
import { useNavigate, useParams } from 'react-router-dom'
import myfetch from '../../lib/myfetch'
import Car from '../../models/car'
import { ZodError } from 'zod'

export default function CarForm() {
  
  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: '',
    imported: '',
    plates: '',
    selling_price: ''
  }

  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false,
    inputErrors: {}
  })

  const {
    car,
    formModified,
    inputErrors
  } = state

  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()
  const navigate = useNavigate()

  const params = useParams()

  function handleFieldChange(e) {
    const carCopy = { ...car }
    carCopy[e.target.name] = e.target.value
    setState({ ...state, car: carCopy, formModified: true })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    showWaiting(true)

    try {
      Car.parse(car)

      if(params.id) await myfetch.put(`/cars/${params.id}`, car)
      
      else await myfetch.post('/cars', car)

      notify('Carro salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })
      })
    } catch(error) {
      console.error(error)
      if (error instanceof ZodError) {
        const errorMessages = {}
        for(let e of error.issues) errorMessages[e.path[0]] = e.message
        setState({ ...state, inputErrors: errorMessages })
        notify('Há campos com valores inválidos no formulário', 'error')
      }
      else {
        console.error(error)
        notify(error.message, 'error')
      }
    } finally {
      showWaiting(false)
    }
  }
  
  React.useEffect(() => {
    if (params.id) loadData()
  }, [])

  async function loadData() {
    showWaiting(true)
    try {
      const result = await myfetch.get(`/cars/${params.id}`)
      
      // result.year_manufacture = parseISO(result.year_manufacture)

      setState({...state, car: result})
    } catch(error) {
      console.error(error)
      notify(error.message, 'error')
    } finally {
      showWaiting(false)
    }
  }

  async function handleBackButtonClick() {
    if (formModified && 
      ! await askForConfirmation('Há informações não salvas. Deseja realmente sair?')) {
      return
    }
    navigate('..', { relative: 'path', replace: true })
  }

  return (
    <>
      <ConfirmDialog />
      <Notification />
      <Waiting />

      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar carro ${params.id}` : 'Cadastrar novo carro' }
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          <TextField 
            name="brand"
            label="Marca"
            variant="filled"
            required
            fullWidth
            autoFocus
            value={car.brand}
            onChange={handleFieldChange} 
            error={inputErrors?.brand}
            helperText={inputErrors?.brand} 
          />

          <TextField 
            name="model"
            label="Modelo"
            variant="filled"
            required
            fullWidth
            value={car.model}
            onChange={handleFieldChange} 
            error={inputErrors?.model}
            helperText={inputErrors?.model} 
          />

          <TextField 
            name="color"
            label="Cor"
            variant="filled"
            required
            fullWidth
            value={car.color}
            onChange={handleFieldChange}
            error={inputErrors?.color}
            helperText={inputErrors?.color}  
          />

          <TextField 
            name="year_manufacture"
            label="Ano de fabricação"
            variant="filled"
            required
            fullWidth
            value={car.year_manufacture}
            onChange={handleFieldChange}
            error={inputErrors?.year_manufacture}
            helperText={inputErrors?.year_manufacture}  
          />

          <TextField 
            name="imported"
            label="Importado"
            variant="filled"
            required
            fullWidth
            value={car.imported}
            onChange={handleFieldChange}
            error={inputErrors?.imported}
            helperText={inputErrors?.imported}  
          />

          <TextField 
            name="plates"
            label="Placa"
            variant="filled"
            fullWidth
            value={car.plates}
            onChange={handleFieldChange}
            error={inputErrors?.plates}
            helperText={inputErrors?.plates} 
          />

          <TextField 
            name="selling_price"
            label="Preço de venda"
            variant="filled"
            required
            fullWidth
            value={car.selling_price}
            onChange={handleFieldChange} 
            error={inputErrors?.selling_price}
            helperText={inputErrors?.selling_price}  
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Salvar
            </Button>

            <Button
              variant="outlined"
              onClick={handleBackButtonClick}
            >
              Voltar
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}
