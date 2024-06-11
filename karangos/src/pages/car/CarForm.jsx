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
import { ZodError } from 'zod'
import Cars from '../../models/cars'
import MenuItem from '@mui/material/MenuItem'
import InputMask from 'react-input-mask'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import {yellow } from '@mui/material/colors';


export default function CarForm() {
  
  const formDefaults = {
    brand: '',
    color: '',
    year_manufacture: '',
    imported: '',
    plates: '',
    selling_price: '',
  }

  const [state, setState] = React.useState({
    cars: { ...formDefaults },
    formModified: false,
    inputErrors: {}
  })
  const {
    cars,
    formModified,
    inputErrors
  } = state

  const colors = [
    { value: 'amarelo', label: 'amarelo' },
    { value: 'azul', label: 'azul' },
    { value: 'branco', label: 'branco' },
    { value: 'cinza', label: 'cinza' },
    { value: 'laranja', label: 'laranja' },
    { value: 'prata', label: 'prata' },
    { value: 'preto', label: 'preto' },
    { value: 'verde', label: 'verde' },
    { value: 'vermelho', label: 'vermelho' },
  ]

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: currentYear - 1950 + 1}, (_, i) => 
  currentYear - i).map(year => ({ value: year, label: year}));

  const plateMaskFormatChars = {
    '9': '[0-9]',
    '$': '[a-j]',
    'A': '[a-z]',  
  }
  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()
  const navigate = useNavigate()

  const params = useParams()

  function handleFieldChange(e) {
    // Tira uma cópia do objeto que representa o carro
    const carsCopy = { ...cars }

    //valida se o elemento é um checkbox
    if (e.target.type === 'checkbox') {

      //se o campo do checkbox estiver marcado será atribuido o valor de 1,
      //se não estiver será atribuido o valor de 0
      carsCopy[e.target.name] = e.target.checked ? 1 : 0

    } else {
      carsCopy[e.target.name] = e.target.value
    }

    // Atualiza a variável de estado, substituindo o objeto car
    // pela cópia atualizada
    setState({ ...state, cars: carsCopy, formModified: true })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()    // Evita o recarregamento da página
    // Exibir a tela de espera
    showWaiting(true)
    try {
      // Invoca a validação dos dados de entrada da biblioteca Zod
      // por meio do model Customer
      Cars.parse(cars)

      // Envia os dados para o back-end para criar um novo carro
      // no banco de dados
      // Se houver parâmetro na rota, significa que estamos editando.
      // Portanto, precisamos enviar os dados ao back-end com o verbo PUT
      if(params.id) await myfetch.put(`/cars/${params.id}`, cars)
      
      // Senão, os dados serão enviados com o método POST para a criação de
      // um novo carro
      else await myfetch.post('/cars', cars)

      // Deu certo, vamos exibir a mensagem de feedback que, quando fechada,
      // vai nos mandar de volta para a listagem de carros
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
  // buscar os dados do carro a ser editado no back-end
  React.useEffect(() => {
    if(params.id) loadData()
  }, [])

  async function loadData() {
    showWaiting(true)
    try {
      const result = await myfetch.get(`/cars/${params.id}`)
      
      // Converte o formato de data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      setState({...state, cars: result})
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
            value={cars.brand}
            onChange={handleFieldChange} 
            error={inputErrors?.brand}
            helperText={inputErrors?.brand} 
          />

            <TextField 
            name="model"
            label="modelo"
            variant="filled"
            required
            fullWidth
            value={cars.model}
            onChange={handleFieldChange} 
            error={inputErrors?.model}
            helperText={inputErrors?.model} 
          />

            <TextField 
            name="color"
            label="cores"
            variant="filled"
            required
            fullWidth
            value={cars.color}
            onChange={handleFieldChange}
            select
            error={inputErrors?.color}
            helperText={inputErrors?.color} 
          >
            {
              colors.map(s => 
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              )
            }
          </TextField>

          <TextField 
            name="year_manufacture"
            label="ano de fabricação"
            variant="filled"
            required
            fullWidth
            value={cars.year_manufacture}
            onChange={handleFieldChange}
            select
            error={inputErrors?.year_manufacture}
            helperText={inputErrors?.year_manufacture} 
          >
            {
              years.map(s => 
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              )
            }
          </TextField>

          <FormControl component="imported">
          <FormLabel component="imported">Importado</FormLabel>
          <RadioGroup
            aria-label="imported"
            defaultValue="0"
            name="imported"
            value={cars.imported}
            onChange={handleFieldChange}
          >
          <FormControlLabel
            control={
              <Checkbox
                checked={cars.imported}
                onChange={handleFieldChange}
                name="imported"
                size="medium"
                sx={{
                  color: yellow[600],
                  '&.Mui-checked': {
                    color: yellow[600],
                  },
                }}
              />
            }
            label="Imported"
          />  
          </RadioGroup>
        </FormControl>

          <InputMask
            mask="AAA-9$99"
            formatChars={plateMaskFormatChars}
            maskChar=" "
            value={cars.plates}
            onChange={handleFieldChange}
          >
            {
              () => 
                <TextField 
                  name="plates"
                  label="placa"
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
            value={cars.selling_price}
            onChange={handleFieldChange} 
            error={inputErrors?.selling_price}
            helperText={inputErrors?.selling_price}  
            type='Number'
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