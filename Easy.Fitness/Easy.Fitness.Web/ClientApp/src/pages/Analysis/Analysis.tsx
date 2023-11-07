import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import styles from '../../modules/analysis.module.css';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export default function Analysis() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={'analysis'} />
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
        <Header title={"Twoje postępy"} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
          <Box className={styles.analysisPanel}>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
              <Box sx={{display: 'flex'}}>
                <QueryStatsIcon color="error" sx={{ mr: '1ch' }} />
                <p>Wykres twoich postępów</p>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center'}}>

              </Box>
            </Box>
            <Box className={styles.analysisGraphTable}>
                
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}