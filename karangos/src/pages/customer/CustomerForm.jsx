import React from 'react'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'

export default function CustomerForm() {
  const params = useParams()
  return(
    <>
      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar cliente ${params.id}` : 'Cadastrar novo cliente' }
      </Typography>
    </>
  )
}