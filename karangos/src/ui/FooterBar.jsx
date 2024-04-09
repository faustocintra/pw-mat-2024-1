import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function FooterBar() {
  return (
    <Toolbar
      variant="dense"
      component="footer"
    >
      <Typography
        variant="caption"
      >
        Desenvolvido com café por <a href="mailto:professor@faustocintra.com.br">Prof. Fausto Cintra</a>
      </Typography>
    </Toolbar>
  )
}
