import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'
import { useNavigate, useParams } from 'react-router-dom'
import myfetch from '../../lib/myfetch'
import Car from '../../models/car'
import { ZodError } from 'zod'
import { Checkbox, FormControlLabel, FormHelperText, FormControl } from '@mui/material'

export default function CarForm() {

  const formDefaults = {
    model: '',
    brand: '',
    color: '',
    year_manufacture: '',
    imported: false,
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

  const colors = [
    { value: 'Amarelo', label: 'Amarelo' },
    { value: 'Azul', label: 'Azul' },
    { value: 'Branco', label: 'Branco' },
    { value: 'Cinza', label: 'Cinza' },
    { value: 'Prata', label: 'Prata' },
    { value: 'Preto', label: 'Preto' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Vermelho', label: 'Vermelho' }
  ]

  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()
  const navigate = useNavigate()

  const plateMaskFormatChars = {
    'A': '[A-Z]',
    '9': '[0-9]',
    '$': '[0-9A-J]'  // \s significa espaço em branco
  }

  const params = useParams()

  function handleFieldChange(e) {
    const { name, value, type, checked } = e.target;
    const carCopy = { ...car }
    carCopy[name] = type === 'checkbox' ? checked : value
    setState({ ...state, car: carCopy, formModified: true })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()    // Evita o recarregamento da página
    showWaiting(true)
    try {
      Car.parse(car)
      if (params.id) await myfetch.put(`/cars/${params.id}`, car)
      else await myfetch.post('/cars', car)
      notify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })
      })
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        const errorMessages = {}
        for (let e of error.issues) errorMessages[e.path[0]] = e.message
        setState({ ...state, inputErrors: errorMessages })
        notify('Há campos com valores inválidos no formulário', 'error')
      } else {
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
      setState({ ...state, car: result })
    } catch (error) {
      console.error(error)
      notify(error.message, 'error')
    } finally {
      showWaiting(false)
    }
  }

  async function handleBackButtonClick() {
    if (formModified && !await askForConfirmation('Há informações não salvas. Deseja realmente sair?')) {
      return  // Sai sem fazer nada
    }
    navigate('..', { relative: 'path', replace: true })
  }

  // Generate a list of years from current year to 1951
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1951 + 1 }, (_, i) => currentYear - i)

  return (
    <>
      <ConfirmDialog />
      <Notification />
      <Waiting />

      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar carro ${params.id}` : 'Cadastrar novo carro'}
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          <TextField
            name="model"
            label="Modelo"
            variant="filled"
            required
            fullWidth
            autoFocus
            value={car.model}
            onChange={handleFieldChange}
            error={inputErrors?.model}
            helperText={inputErrors?.model}
          />

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
            name="color"
            label="Cor"
            variant="filled"
            required
            fullWidth
            value={car.color}
            onChange={handleFieldChange}
            select
            error={inputErrors?.color}
            helperText={inputErrors?.color}
          >
            {colors.map(s =>
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            )}
          </TextField>

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
            {years.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>

          <FormControl required error={inputErrors?.imported} component="fieldset" fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={car.imported}
                  onChange={handleFieldChange}
                  name="imported"
                />
              }
              label="Importado"
            />
            {inputErrors?.imported && (
              <FormHelperText>{inputErrors?.imported}</FormHelperText>
            )}
          </FormControl>

          <InputMask
            mask="AAA-9$99"
            formatChars={plateMaskFormatChars}
            maskChar=" "
            value={car.plates}
            onChange={handleFieldChange}
          >
            {() =>
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
            required
            fullWidth
            type="number"
            value={car.selling_price}
            onChange={handleFieldChange}
            error={inputErrors?.selling_price}
            helperText={inputErrors?.selling_price}
            inputProps={{ min: 0, step: "any" }}  // Garante que apenas valores positivos serão aceitos
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

          <Box sx={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column', width: '100%' }}>
            {JSON.stringify(car)}
            <hr />
            {JSON.stringify(inputErrors)}
          </Box>

        </form>
      </Box>
    </>
  )
}
