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

  // const states = [
  //   { value: 'DF', label: 'Distrito Federal' },
  //   { value: 'ES', label: 'Espírito Santo' },
  //   { value: 'GO', label: 'Goiás' },
  //   { value: 'MS', label: 'Mato Grosso do Sul' },
  //   { value: 'MG', label: 'Minas Gerais' },
  //   { value: 'PR', label: 'Paraná' },
  //   { value: 'RJ', label: 'Rio de Janeiro' },
  //   { value: 'SP', label: 'São Paulo' },
  // ]

  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()
  const navigate = useNavigate()

  // const phoneMaskFormatChars = {
  //   '9': '[0-9]',
  //   '%': '[\s0-9]'  // \s significa espaço em branco
  // }

  const params = useParams()

  function handleFieldChange(e) {
    // Tira uma cópia do objeto que representa o cliente
    const carsCopy = { ...cars }
    // Atualiza o campo modificado em customerCopy
    carsCopy[e.target.name] = e.target.value
    // Atualiza a variável de estado, substituindo o objeto customer
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

      // Envia os dados para o back-end para criar um novo cliente
      // no banco de dados
      // Se houver parâmetro na rota, significa que estamos editando.
      // Portanto, precisamos enviar os dados ao back-end com o verbo PUT
      if(params.id) await myfetch.put(`/cars/${params.id}`, cars)
      
      // Senão, os dados serão enviados com o método POST para a criação de
      // um novo cliente
      else await myfetch.post('/cars', cars)

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
            autoFocus
            value={cars.model}
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
            autoFocus
            value={cars.color}
            onChange={handleFieldChange} 
            error={inputErrors?.color}
            helperText={inputErrors?.color} 
          />

          <TextField 
            name="year_manufacture"
            label="ano de fabricação"
            variant="filled"
            required
            fullWidth
            placeholder="ano de fabricação"
            value={cars.year_manufacture}
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
            value={cars.imported}
            onChange={handleFieldChange}
            error={inputErrors?.imported}
            helperText={inputErrors?.imported}  
          />

          <TextField 
            name="plates"
            label="placa"
            variant="filled"
            fullWidth
            value={cars.plates}
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
            value={cars.selling_price}
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