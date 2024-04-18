import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'
import TopBar from './ui/TopBar'
import theme from './ui/theme'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import FooterBar from './ui/FooterBar'
import AppRoutes from './routes/AppRoutes'
import Box from '@mui/material/Box'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          
          <TopBar />
          
          <Box sx={{ 
              m: '24px 24px 72px 24px'
            }}>
            <AppRoutes />
          </Box>
          
          <FooterBar />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
