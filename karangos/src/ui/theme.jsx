import { createTheme } from '@mui/material/styles'
import { yellow, pink } from '@mui/material/colors'
import { ptBR } from '@mui/x-data-grid/locales'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: pink[500]
    }
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold'
    }
  }
}, ptBR)

export default theme