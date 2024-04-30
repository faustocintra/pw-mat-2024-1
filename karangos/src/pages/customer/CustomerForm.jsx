import React from 'react'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR }  from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

export default function CustomerForm() {
  const [state, setState] = React.useState({
    customer: {},
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
  }

  return(
    <>
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