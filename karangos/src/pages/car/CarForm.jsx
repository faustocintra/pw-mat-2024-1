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
import Checkbox from '@mui/material/Checkbox';
import InputMask from 'react-input-mask'

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
    { value: 'laranja', label: 'laranja' },
    { value: 'preto', label: 'preto' },
    { value: 'verde', label: 'verde' },
    { value: 'vermelho', label: 'vermelho' },
  ]

  const years = [
    { value: '2024', label: '2024' }, { value: '2023', label: '2023' }, { value: '2022', label: '2022' },
    { value: '2021', label: '2022' }, { value: '2020', label: '2020' }, { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },{ value: '2017', label: '2017' },{ value: '2016', label: '2016' },
    { value: '2015', label: '2015' },{ value: '2014', label: '2014' },{ value: '2013', label: '2013' },
    { value: '2012', label: '2012' },{ value: '2011', label: '2011' },{ value: '2010', label: '2010' },
    { value: '2009', label: '2009' },{ value: '2008', label: '2008' },{ value: '2007', label: '2007' },
    { value: '2006', label: '2006' },{ value: '2005', label: '2005' },{ value: '2004', label: '2004' },
    { value: '2003', label: '2003' },{ value: '2002', label: '2002' },{ value: '2001', label: '2001' },
    { value: '2000', label: '2000' },{ value: '1999', label: '1999' },{ value: '1998', label: '1998' },
    { value: '1997', label: '1997' },{ value: '1996', label: '1996' },{ value: '1995', label: '1995' },
    { value: '1994', label: '1994' },{ value: '1993', label: '1993' },{ value: '1992', label: '1992' },
    { value: '1991', label: '1991' },{ value: '1990', label: '1990' },{ value: '1989', label: '1989' },
    { value: '1988', label: '1988' },{ value: '1987', label: '1987' },{ value: '1986', label: '1986' },
    { value: '1985', label: '1985' },{ value: '1984', label: '1984' },{ value: '1983', label: '1983' },
    { value: '1982', label: '1982' },{ value: '1981', label: '1981' },{ value: '1980', label: '1980' },
    { value: '1979', label: '1979' },{ value: '1978', label: '1978' },{ value: '1977', label: '1977' },
    { value: '1976', label: '1976' },{ value: '1975', label: '1975' },{ value: '1974', label: '1974' },
    { value: '1973', label: '1973' },{ value: '1972', label: '1971' },{ value: '1970', label: '1970' },
    { value: '1969', label: '1969' },{ value: '1968', label: '1968' },{ value: '1967', label: '1967' },
    { value: '1966', label: '1966' },{ value: '1965', label: '1965' },{ value: '1964', label: '1964' },
    { value: '1963', label: '1963' },{ value: '1962', label: '1962' },{ value: '1961', label: '1961' },
    { value: '1960', label: '1960' },{ value: '1959', label: '1959' },{ value: '1958', label: '1958' },
    { value: '1957', label: '1957' },{ value: '1956', label: '1956' },{ value: '1955', label: '1955' },
    { value: '1954', label: '1954' },{ value: '1953', label: '1953' },{ value: '1952', label: '1952' },
    { value: '1951', label: '1951' },
  ]


  const plateMaskFormatChars = {
    '9': '[0-9]',
    '$': '[a-j]',
    'A': '[a-z]',  
  }


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
          >
           
          </TextField>

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