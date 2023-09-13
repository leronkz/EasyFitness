import styles from '../../public/modules/account.module.css';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import Navbar from '../../public/components/Navbar';
import Header from '../../public/components/Header';

export default function Account() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={"account"} />
      <Box
        component="main"
        className={styles.mainPanel}
        sx={{
          backgroundColor: (theme: any) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.pallete.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden'
        }}
        >
          <Header title={"Twój profil"} />
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>

          </Container>
        </Box>
    </Box >
  );
}