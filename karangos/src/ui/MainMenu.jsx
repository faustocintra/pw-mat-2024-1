import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton 
        edge="start" 
        color="inherit" 
        aria-label="menu" 
        sx={{ mr: 2 }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/" divider>
          Página inicial
        </MenuItem>
        
        <MenuItem onClick={handleClose} component={Link} to="/cars">
          Listagem de veículos
        </MenuItem>

        <MenuItem onClick={handleClose} component={Link} to="/cars/new" divider>
          Cadastro de veículos
        </MenuItem>

        <MenuItem onClick={handleClose} component={Link} to="/customers">
          Listagem de clientes
        </MenuItem>

        <MenuItem onClick={handleClose} component={Link} to="/customers/new" divider>
          Cadastro de clientes
        </MenuItem>

        {/* 12. Crie uma entrada de menu que carregue a rota recém-criada */}
        <MenuItem onClick={handleClose} component={Link} to="/about">
          Sobre o autor
        </MenuItem>
        
      </Menu>
    </div>
  );
}


