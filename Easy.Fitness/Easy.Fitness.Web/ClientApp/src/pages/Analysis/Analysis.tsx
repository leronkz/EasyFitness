import { Box, Container, CssBaseline, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material';
import styles from '../../modules/analysis.module.css';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useState } from 'react';
import ScaleIcon from '@mui/icons-material/Scale';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AnalysisGraphWorkspace from './components/AnalysisGraphWorkspace';

export default function Analysis() {

  const [graphType, setGraphType] = useState<string>('');
  const handleChangeGraphType = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setGraphType(newType);
  };

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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box className={styles.analysisPanel}>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex' }}>
                <QueryStatsIcon color="error" sx={{ mr: '1ch' }} />
                <p>Wykres twoich postępów</p>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '1ch' }}>Opcje: </span>
                <ToggleButtonGroup
                  color="primary"
                  value={graphType}
                  exclusive
                  onChange={handleChangeGraphType}
                >
                  <ToggleButton id={styles.analysisGraphButton} value="weight">
                    <ScaleIcon color="primary" />
                    Waga
                  </ToggleButton>
                  <ToggleButton id={styles.analysisGraphButton} value="calories">
                    <LocalDiningIcon color="primary" />
                    Dieta
                  </ToggleButton>
                  <ToggleButton id={styles.analysisGraphButton} value="training">
                    <SportsGymnasticsIcon color="primary" />
                    Trening
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box className={styles.analysisGraphTable}>
              <AnalysisGraphWorkspace type={graphType} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}