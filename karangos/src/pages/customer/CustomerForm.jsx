import React from 'react'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ptLocale from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'

export default function CustomerForm() {
  const [state, setState] = React.useState({
    customer: {}
  })
  const {
    customer
  } = state

  const params = useParams()

  function handleFieldChange() {}

  return(
    <>
      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar cliente ${params.id}` : 'Cadastrar novo cliente' }
      </Typography>

      <Box className="form-fields">
        <form>

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
        
        </form>
      </Box>

    </>
  )
}