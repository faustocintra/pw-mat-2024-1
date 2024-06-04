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
import { MenuItem } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputMask from 'react-input-mask'

export default function CarForm() {
  
  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: '',
    imported: '',
    plates: '',
    selling_price: '',
  }

  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false,
    inputErrors: {}
  })

  const [years, setYears] = React.useState([])

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
    const { name, value, checked, type } = e.target;
    const carCopy = { ...car };

    if (name === 'plates') {
      carCopy[name] = value.toUpperCase();
    } else if (name === 'imported' && type === 'checkbox') {
      carCopy[name] = checked ? '1' : '0';
    } else {
      carCopy[name] = value;
    }
  
    setState({ ...state, car: carCopy, formModified: true });
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
        console.log(error.issues)
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

  // lista de todas as cores em ordem alfabética para adicionar no input de cores
  const colors = [
    { value: 'Amarelo' },
    { value: 'Azul' },
    { value: 'Cinza' },
    { value: 'Preto' },
    { value: 'Vermelho' },
  ]

  // adicionado todos os anos desde o ano atual até 1951
  React.useEffect(() => {
    const currentYear = new Date().getFullYear()
    const difference = currentYear - 1951
    const allYears = []

    for (let i = difference; i >= 0; i--) {
      allYears.push(currentYear - i)
    }

    allYears.reverse().forEach((year, index, arr) => {
      arr[index] = String(year)
    })

    setYears(allYears)
  }, [])

  const plateMaskFormat = {
    'A': '[a-zA-Z]',
    '9': '[0-9]',
    '%': '[0-9a-jA-J]'
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
            select
            onChange={handleFieldChange}
            error={inputErrors?.color}
            helperText={inputErrors?.color}  
          >
            {
              colors.map(c => 
                <MenuItem key={c.value} value={c.value}>
                  {c.value}
                </MenuItem>
              )
            }
          </TextField>
          
          {
            years.length > 0 && (
              <TextField 
                name="year_manufacture"
                label="Ano de fabricação"
                variant="filled"
                required
                fullWidth
                select
                value={car.year_manufacture}
                onChange={handleFieldChange}
                error={inputErrors?.year_manufacture}
                helperText={inputErrors?.year_manufacture}  
              >
                {
                  years.map(year => 
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  )
                }
              </TextField>
            )
          }

          <FormControlLabel
            control={
              <Checkbox
                name="imported"
                checked={Number(car.imported) === 1} // Convertendo para número antes de comparar
                onChange={(e) => {
                  handleFieldChange({ target: { name: 'imported', value: e.target.checked ? '1' : '0' } });
                }}
                color="primary"
              />
            }
            label="Importado"
            sx={{ mb: 4 }}
          />

          <InputMask
            mask="AAA-9%99"
            formatChars={plateMaskFormat}
            maskChar=""
            value={car.plates}
            onChange={handleFieldChange}
          >
            {
              () => 
                <TextField 
                  name="plates"
                  label="Placa"
                  variant="filled"
                  required
                  fullWidth 
                  error={inputErrors?.plates}
                  helperText={inputErrors?.plates}                   
                />
            }
          </InputMask>

          <TextField 
            name="selling_price"
            label="Preço de venda"
            variant="filled"
            type="number"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            required
            fullWidth
            value={car.selling_price}
            onChange={handleFieldChange}
            error={inputErrors?.selling_price}
            helperText={inputErrors?.selling_price}
            sx={{ "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: 'none' } }} // tirar o botão de aumentar e diminuir valor do input
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