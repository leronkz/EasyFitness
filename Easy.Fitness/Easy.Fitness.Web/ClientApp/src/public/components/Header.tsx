import {Toolbar, Typography, Menu, IconButton, Avatar, Button } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import styles from '../modules/header.module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TestAvatar from '../img/assets/header/test_photo.jpg';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface HeaderInterface {
  title: string
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`
}));



function Header({ title }: HeaderInterface) {
  return (
    <AppBar position="absolute" open={true} sx={{ background: "white" }}>
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
          id={styles.headerText}
        >
          {title}
        </Typography>
        <Button className={styles.avatarBox} onClick={(e: any) => {e.stopPropagation();}}>
          <Avatar alt="user" src={TestAvatar}>
            
          </Avatar>
          <Typography sx={{ fontFamily: 'Lexend', color: "black", ml: "1ch" }}>Mateusz Owsiak</Typography>
          <IconButton
            size="small"
            color="primary"
            onMouseDown={(event: any) => { event.stopPropagation(); }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header;