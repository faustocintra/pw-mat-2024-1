import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

export default function useNotification() {

  const [state, setState] = React.useState({
    open: false,
    message : '',
    severity: 'success',
    timeout: 4000,
    onClose: null
  })
  const {
    open,
    message,
    severity,
    timeout,
    onClose
  } = state

  function notify(message, severity = 'success', timeout = 4000, onClose = null) {
    setState({
      ...state,
      open: true,
      message,
      severity,
      timeout,
      onClose
    })
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  function Notification() {

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      setState({...state, open: false})
      
      if(typeof onClose === 'function') onClose(event, reason)
    }

    return (
      <Snackbar open={open} autoHideDuration={timeout} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          { message }
        </Alert>
      </Snackbar>
    )
  }

  return { notify, Notification }

}