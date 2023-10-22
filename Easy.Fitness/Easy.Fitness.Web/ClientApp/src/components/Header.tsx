import { Toolbar, Typography, IconButton, Avatar, Button } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import styles from '../modules/header.module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserInfoDto, getUserInfo, getUserPicture } from "../api/easyFitnessApi";
import { useState, useEffect } from 'react';
import DefaultProfilePicture from '../img/assets/account/default.svg';
import { useCancellationToken } from "../hooks/useCancellationToken";

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
        <Button className={styles.avatarBox} onClick={(e: any) => { e.stopPropagation(); }}>
          <Avatar alt="user" src={photoUrl} />
          <Typography sx={{ fontFamily: 'Lexend', color: "black", ml: "1ch" }}>{user?.firstName && user.lastName ? (user?.firstName + " " + user?.lastName) : ("")}</Typography>
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