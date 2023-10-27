import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "../../components/Navbar";
import styles from '../../modules/diet.module.css';
import Header from "../../components/Header";

export default function Diet() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={'diet'} />
      <Box
        component="main"
        className={styles.mainPanel}
        sx={{
          backgroundColor: (theme: any) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Header title={"Twoja dieta"} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

        </Container>
      </Box>
    </Box>
  )
}