import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function useConfirmDialog() {
  
  const [state, setState] = React.useState({
    open: false,
    title: '',
    question: '',
    fnOnConfirm: () => {},
    fnOnCancel: () => {}
  })
  const {
    open,
    title,
    question,
    fnOnConfirm,
    fnOnCancel
  } = state

  async function askForConfirmation(question, title = 'Confirmar') {
    return new Promise(resolve => {
      setState({
        ...state,
        open: true,
        title,
        question,
        fnOnConfirm: () => {
          setState({...state, open: false})
          resolve(true)
        },
        fnOnCancel: () => {
          setState({...state, open: false})
          resolve(false)
        }
      })
    })
  }

  function ConfirmDialog() {
    return (
      <div>
        <Dialog
          open={open}
          onClose={fnOnCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {question}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={fnOnConfirm} color="secondary" variant="outlined">OK</Button>
            <Button onClick={fnOnCancel} color="secondary" autoFocus>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  return { askForConfirmation, ConfirmDialog }

}