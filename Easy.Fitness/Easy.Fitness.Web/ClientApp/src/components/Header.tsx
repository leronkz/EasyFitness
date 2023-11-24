import { Toolbar, Typography, IconButton, Avatar, Button, Menu, MenuItem, Divider } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import styles from '../modules/header.module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserInfoDto, getUserInfo, getUserPicture, logoutUser } from "../api/easyFitnessApi";
import { useState, useEffect } from 'react';
import DefaultProfilePicture from '../img/assets/account/default.svg';
import { useCancellationToken } from "../hooks/useCancellationToken";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate} from "react-router";
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



export default function Header({ title }: HeaderInterface) {

  const [photoUrl, setPhotoUrl] = useState<any>(DefaultProfilePicture);
  const [user, setUser] = useState<UserInfoDto | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const cancellation = useCancellationToken();

  const getUserProfilePictureAction = async (cancelToken: any) => {
    return getUserPicture(
      cancelToken
    )
      .then((img) => {
        const byteChars = atob(img.fileBytes);
        const byteNums = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteNums[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNums);
        const blob = new Blob([byteArray], { type: 'image/jpg' });

        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoUrl(e.target!.result);
        }
        reader.readAsDataURL(blob);
      })
      .catch((e: Error) => {

      });
  };

  const getUserInfoAction = async (cancelToken: any) => {
    return getUserInfo(
      cancelToken
    )
      .then((userInfo) => {
        setUser(userInfo);
      })
      .catch((e: Error) => {

      });
  };

  const onLogoutClick = () => {
    logoutUser();
    navigate("/");
  };

  useEffect(() => {
    cancellation((cancelToken) => {
      getUserProfilePictureAction(cancelToken);
      getUserInfoAction(cancelToken);
    })
  }, []);

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
        <Button className={styles.avatarBox} onClick={(e: any) => { e.stopPropagation(); handleClickMenu(e); }}>
          <Avatar alt="user" src={photoUrl} />
          <Typography sx={{ fontFamily: 'Lexend', color: "black", ml: "1ch" }}>{user?.firstName && user.lastName ? (user?.firstName + " " + user?.lastName) : ("")}</Typography>
          <IconButton
            size="small"
            color="primary"
            onMouseDown={(event: any) => { event.stopPropagation(); }}
            onClick={handleClickMenu}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem className={styles.headerMenuItem} onClick={() => navigate('/account')}>
              <PersonIcon /> Profil
            </MenuItem>
            <Divider />
            <MenuItem className={styles.headerMenuItem} onClick={() => navigate('/settings')}>
              <SettingsIcon /> Ustawienia
            </MenuItem>
            <Divider />
            <MenuItem className={styles.headerMenuItem} onClick={onLogoutClick}>
              <LogoutIcon /> Wyloguj sie
            </MenuItem>
          </Menu>
      </Toolbar>
    </AppBar>
  )
}