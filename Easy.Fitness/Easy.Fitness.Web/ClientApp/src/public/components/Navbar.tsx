import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Toolbar, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/assets/navbar/logo-color.svg';
import styles from '../modules/navbar.module.css';
import { logoutUser } from '../../api/easyFitnessApi';

interface NavbarInterface {
  selected: string
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      border: "none",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box'
    },
  }),
);

export default function Navbar({ selected }: NavbarInterface) {

  const navigate = useNavigate();

  const onLogoutClick = () => {
    logoutUser();
    navigate("/");
  }

  return (
    <Drawer variant="permanent" open={true}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <img id={styles.logo} src={Logo} alt="Logo" />
      </Toolbar>
      <List component="nav" className={styles.list}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton id={selected === 'dashboard' ? styles.listItemButtonSelected : styles.listItemButton} >
            <ListItemIcon>
              <HomeIcon color={selected === 'dashboard' ? "error" : "primary"} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontFamily: 'Lexend' }}>Główny panel</ListItemText>
          </ListItemButton>
        </Link>
        <Link to="/activity" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton id={selected === 'activity' ? styles.listItemButton : styles.listItemButton}>
            <ListItemIcon>
              <FitnessCenterIcon color={selected === 'activity' ? "error" : "primary"} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontFamily: 'Lexend' }}>Twoja aktywność</ListItemText>
          </ListItemButton>
        </Link>
        <Link to="/schedule" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton id={selected === 'schedule' ? styles.listItemButton : styles.listItemButton}>
            <ListItemIcon>
              <CalendarMonthIcon color={selected === 'schedule' ? "error" : "primary"} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontFamily: 'Lexend' }}>Twój plan</ListItemText>
          </ListItemButton>
        </Link>
        <Link to="/diet" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton id={selected === 'diet' ? styles.listItemButton : styles.listItemButton}>
            <ListItemIcon>
              <RestaurantIcon color={selected === 'diet' ? "error" : "primary"} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontFamily: 'Lexend' }}>Twoja dieta</ListItemText>
          </ListItemButton>
        </Link>
        <ListItemButton id={styles.listItemButton} onClick={onLogoutClick}>
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontFamily: 'Lexend' }}>Wyloguj się</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );

}