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

export default function CustomerForm() {
  
  const formDefaults = {
    name: '',
    ident_document: '',
    birth_date: '',
    street_name: '',
    house_number: '',
    additional_info: '',
    district: '',
    city: '',
    uf: '',
    phone: '',
    email: ''
  }
  
  const [state, setState] = React.useState({
    customer: { ...formDefaults },
    formModified: false
  })
  const {
    customer,
    formModified
  } = state

  const states = [
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PR', label: 'Paraná' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'SP', label: 'São Paulo' },
  ]

  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()
  const navigate = useNavigate()

  const phoneMaskFormatChars = {
    '9': '[0-9]',
    '%': '[\s0-9]'  // \s significa espaço em branco
  }

  const params = useParams()

  function handleFieldChange(e) {
    // Tira uma cópia do objeto que representa o cliente
    const customerCopy = { ...customer }
    // Atualiza o campo modificado em customerCopy
    customerCopy[e.target.name] = e.target.value
    // Atualiza a variável de estado, substituindo o objeto customer
    // pela cópia atualizada
    setState({ ...state, customer: customerCopy, formModified: true })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()    // Evita o recarregamento da página
    // Exibir a tela de espera
    showWaiting(true)
    try {
      // Envia os dados para o back-end para criar um novo cliente
      // no banco de dados
      
      // Se houver parâmetro na rota, significa que estamos editando.
      // Portanto, precisamos enviar os dados ao back-end com o verbo PUT
      if(params.id) await myfetch.put(`/customers/${params.id}`, customer)
      
      // Senão, os dados serão enviados com o método POST para a criação de
      // um novo cliente
      else await myfetch.post('/customers', customer)

      // Deu certo, vamos exibir a mensagem de feedback que, quando fechada,
      // vai nos mandar de volta para a listagem de clientes
      notify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })
      })
    }
    catch(error) {
      console.error(error)
      // Deu errado, exibimos o erro e permanecemos na página do formulário
      notify(error.message, 'error')
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
      const result = await myfetch.get(`/customers/${params.id}`)
      
      // Converte o formato de data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      result.birth_date = parseISO(result.birth_date)

      setState({...state, customer: result})
    }
    catch(error) {
      console.error(error)
      notify(error.message, 'error')
    }
    finally {
      showWaiting(false)
    }
  }


  return(
    <>

      <ConfirmDialog />
      <Notification />
      <Waiting />

      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar cliente ${params.id}` : 'Cadastrar novo cliente' }
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          <TextField 
            name="name"
            label="Nome completo"
            variant="filled"
            required
            fullWidth
            autoFocus
            value={customer.name}
            onChange={handleFieldChange}  
          />

          <InputMask
            mask="999.999.999-99"
            value={customer.ident_document}
            onChange={handleFieldChange}
          >
            {
              () => 
                <TextField 
                  name="ident_document"
                  label="CPF"
                  variant="filled"
                  required
                  fullWidth                   
                />
            }
          </InputMask>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker 
              label="Data de nascimento"
              value={customer.birth_date}
              onChange={ value => handleFieldChange({ 
                target: { name: 'birth_date', value }}
              )}
              slotProps={{
                textField: {
                  variant: 'filled',
                  fullWidth: true
                }
              }}
            />
          </LocalizationProvider>

          <TextField 
            name="street_name"
            label="Logradouro"
            variant="filled"
            required
            fullWidth
            placeholder="Ex.: Rua Principal"
            value={customer.street_name}
            onChange={handleFieldChange}  
          />

          <TextField 
            name="house_number"
            label="Nº"
            variant="filled"
            required
            fullWidth
            value={customer.house_number}
            onChange={handleFieldChange}  
          />

          <TextField 
            name="additional_info"
            label="Complemento"
            variant="filled"
            fullWidth
            placeholder="Apto., bloco, casa, etc."
            value={customer.additional_info}
            onChange={handleFieldChange}  
          />

          <TextField 
            name="district"
            label="Bairro"
            variant="filled"
            required
            fullWidth
            value={customer.district}
            onChange={handleFieldChange}  
          />

          <TextField 
            name="city"
            label="Município"
            variant="filled"
            required
            fullWidth
            value={customer.city}
            onChange={handleFieldChange}  
          />

          <TextField 
            name="state"
            label="UF"
            variant="filled"
            required
            fullWidth
            value={customer.uf}
            onChange={handleFieldChange}
            select
          >
            {
              states.map(s => 
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              )
            }
          </TextField>

          <InputMask
            mask="(99) %9999-9999"
            formatChars={phoneMaskFormatChars}
            maskChar=" "
            value={customer.phone}
            onChange={handleFieldChange}
          >
            {
              () => 
                <TextField 
                  name="phone"
                  label="Telefone/celular"
                  variant="filled"
                  required
                  fullWidth                   
                />
            }
          </InputMask>

          <TextField 
            name="email"
            label="E-mail"
            variant="filled"
            type="email"
            required
            fullWidth
            value={customer.email}
            onChange={handleFieldChange}  
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
            >
              Voltar
            </Button>
          </Box>

          <Box sx={{ fontFamily: 'monospace', display: 'flex', width: '100%' }}>
            {JSON.stringify(customer)}
          </Box>
        
        </form>
      </Box>

    </>
  )
}