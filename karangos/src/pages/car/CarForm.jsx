import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR }  from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'
import { useNavigate, useParams } from 'react-router-dom'
import myfetch from '../../lib/myfetch'
import Car from '../../models/car'
import { ZodError } from 'zod'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material'

export default function CarForm() {
  
  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: null,
    imported: '',
    plates: '',
    selling_price: ''
  }
  // const maxYear_manufacture = new Date()   // Data de hoje
  // maxYear_manufacture.setFullYear(maxYear_manufacture.getFullYear())

  // const minYear_manufacture = new Date(1951)
  // minYear_manufacture.setFullYear(minYear_manufacture.getFullYear())

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
    { value: 'amarelo', label: 'amarelo' },
    { value: 'azul', label: 'azul' },
    { value: 'branco', label: 'branco' },
    { value: 'cinza', label: 'cinza' },
    { value: 'prata', label: 'prata' },
    { value: 'preto', label: 'preto' },
    { value: 'verde ', label: 'verde' }, 
    { value: 'vermelho', label: 'vermelho' },
  ]
  
  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()
  const navigate = useNavigate()

  const platesMaskFormatChars = {
    '9': '[0-9]',
    'A': '[A-Z]',
    '$': '[0-9A-J]'  
  }


  const params = useParams()

  function handleFieldChange(e) {
    // Tira uma cópia do objeto que representa o carro
    const carCopy = { ...car }
    // Atualiza o campo modificado em carrCopy
    carCopy[e.target.name] = e.target.value
    // Atualiza a variável de estado, substituindo o objeto customer
    // pela cópia atualizada
    setState({ ...state, car: carCopy, formModified: true })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()    // Evita o recarregamento da página
    // Exibir a tela de espera
    showWaiting(true)
    try {
      // Invoca a validação dos dados de entrada da biblioteca Zod
      // por meio do model Customer
      Car.parse(car)

      // Envia os dados para o back-end para criar um novo cliente
      // no banco de dados
      // Se houver parâmetro na rota, significa que estamos editando.
      // Portanto, precisamos enviar os dados ao back-end com o verbo PUT
      if(params.id) await myfetch.put(`/cars/${params.id}`, car)
      
      // Senão, os dados serão enviados com o método POST para a criação de
      // um novo cliente
      else await myfetch.post('/cars', car)

      // Deu certo, vamos exibir a mensagem de feedback que, quando fechada,
      // vai nos mandar de volta para a listagem de clientes
      notify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })
      })
    }
    catch(error) {
      console.error(error)
      if(error instanceof ZodError) {
        // Formamos um objeto contendo os erros do Zod e
        // os colocamos na variável de estado inputErrors
        const errorMessages = {}
        for(let e of error.issues) errorMessages[e.path[0]] = e.message
        setState({ ...state, inputErrors: errorMessages })
        notify('Há campos com valores inválidos no formulário', 'error')
      }
      else {
        console.error(error)
        // Deu errado, exibimos o erro e permanecemos na página do formulário
        notify(error.message, 'error')
      }
    }
    finally {
      showWaiting(false)
    }
  }
  
  // useEffect() que é executado uma vez no carregamento da página.
  // Verifica se a rota tem parâmetros e, caso tenha, significa que estamos
  // vindo do botão de edição. Nesse caso, chama a função loadData() para
  // buscar os dados do cliente a ser editado no back-end
  React.useEffect(() => {
    if(params.id) loadData()
  }, [])

  async function loadData() {
    showWaiting(true)
    try {
      const result = await myfetch.get(`/cars/${params.id}`)
      
      // Converte o formato de data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      result.year_manufacture = parseISO(result.year_manufacture)

      setState({...state, car: result})
    }
    catch(error) {
      console.error(error)
      notify(error.message, 'error')
    }
    finally {
      showWaiting(false)
    }
  }

  async function handleBackButtonClick() {
    if(formModified && 
      ! await askForConfirmation('Há informações não salvas. Deseja realmente sair?')) {
      return  // Sai sem fazer nada
    }
    // Navega para a página anterior
    navigate('..', { relative: 'path', replace: true })
  }

  return(
    <>

      <ConfirmDialog />
      <Notification />
      <Waiting />

      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar carros ${params.id}` : 'Cadastrar novo carro' }
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
            inputProps={{ maxLength: 25 }}
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
            inputProps={{ maxLength: 25 }}
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
            inputProps={{ maxLength: 12 }}
          >
            {
              colors.map(c => 
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              )
            }
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Ano de fabricação"
              value={car.year_manufacture}
              onChange={value => handleFieldChange({
                target: { 
                  name: 'year_manufacture', 
                  value: value.getFullYear()}
              })}
              views={['year']}
              slotProps={{
                textField: {
                  variant: 'filled',
                  fullWidth: true,
                  error: inputErrors?.year_manufacture,
                  helperText: inputErrors?.year_manufacture
                }
                
              }}
              minDate={new Date(1951, 0,1)}
              maxDate={new Date()}
            />
          </LocalizationProvider>

          <InputMask
            mask="AAA-9$99"
            formatChars={platesMaskFormatChars}
            maskChar=" "
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
            type='number'
            required
            fullWidth
            value={car.selling_price}
            onChange={handleFieldChange} 
            error={inputErrors?.selling_price}
            helperText={inputErrors?.selling_price} 
            inputProps={{min:1000,
                         max:5000000
            }}          
          />

          <FormControlLabel
            control={
              <Checkbox
                name="imported"
                checked={car.imported}
                onChange={(event) => handleFieldChange({
                  target: {
                    name: 'imported',
                    value: event.target.checked,
                  },
                })}
                color="primary"
              />
            }
            label="Importado?"
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

          {/* <Box sx={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column', width: '100%' }}>
            {JSON.stringify(customer)}
            <hr />
            {JSON.stringify(inputErrors)}
          </Box> */}
        
        </form>
      </Box>

    </>
  )
}