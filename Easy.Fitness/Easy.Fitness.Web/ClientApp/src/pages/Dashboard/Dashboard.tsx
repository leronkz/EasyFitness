import { Box, CssBaseline, Toolbar, Container, Grid, Typography, Divider } from '@mui/material';
import styles from '../../modules/dashboard.module.css'
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import nextIcon from '../../img/assets/dashboard/go_next.svg';
import gymIcon from '../../img/assets/activity/gym.svg';
import energyIcon from '../../img/assets/diet/energy.svg'
import { DashboardSummaryDto, Error, getDashboardSummary, logoutUser } from '../../api/easyFitnessApi';
import { useState, useEffect } from 'react';
import CustomizedSnackbar, { SnackbarInterface } from '../../components/CustomizedSnackbar';
import { isCancel } from '../../api/axiosSource';
import { useCancellationToken } from '../../hooks/useCancellationToken';

export default function Dashboard() {

  const [summary, setSummary] = useState<DashboardSummaryDto>({ scheduleDate: '-', scheduleType: '-', activityDate: '-', activityType: '-', dietSummary: { maxCalories: 0, maxCarbs: 0, maxFat: 0, maxProtein: 0, currentCalories: 0, currentCarbs: 0, currentFat: 0, currentProtein: 0 } });
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({open: false, type: undefined, message: ''});

  const date = new Date();
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  const cancellation = useCancellationToken();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    logoutUser();
    navigate("/");
  };

  const getSummaryAction = async (cancelToken: any) => {
    return getDashboardSummary(
      formattedDate,
      cancelToken
    )
      .then((result) => {
        setSummary(result);
      })
      .catch((e: Error) => {
        if(!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  useEffect(() => {
    cancellation((cancelToken) => {
      getSummaryAction(cancelToken);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={"dashboard"} />
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
        <Header title={"Główny panel"} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
          <Grid container spacing={3} className={styles.tilesMenu}>
            <Grid item xs={12} md={8} lg={4}>
              <Link to="/activity" id={styles.link}>
                <Box className={styles.tile} sx={{ background: "#F2F9DE" }}>
                  <Box className={styles.tileHeader}>
                    <Typography id={styles.tileTextHeader}>Aktywność fizyczna</Typography>
                    <img id={styles.nextIcon} alt="Go" src={nextIcon} />
                  </Box>
                  <Divider sx={{ mt: "1ch", borderBottomWidth: 2 }} />
                  <Box className={styles.tileBody}>
                    <Typography id={styles.tileText}>Twoja ostatnia aktywność</Typography>
                    <Box className={styles.tileActivity}>
                      <Box className={styles.activity}>
                        <img id={styles.activityIcon} alt="activity" src={gymIcon} />
                      </Box>
                      <Typography id={styles.tileText}>{summary.activityType}</Typography>
                      <Typography id={styles.tileText}>{summary.activityDate}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Link to="/schedule" id={styles.link}>
                <Box className={styles.tile} sx={{ background: "white" }}>
                  <Box className={styles.tileHeader}>
                    <Typography id={styles.tileTextHeader}>Plan</Typography>
                    <img id={styles.nextIcon} alt="Go" src={nextIcon} />
                  </Box>
                  <Divider sx={{ mt: "1ch", borderBottomWidth: 2 }} />
                  <Box className={styles.tileBody}>
                    <Typography id={styles.tileText}>Następna zaplanowana aktywność:</Typography>
                    <Box className={styles.tileActivity}>
                      <Box className={styles.activity} sx={{ background: "#F2F9DE !important" }}>
                        <img id={styles.activityIcon} alt="activity" src={gymIcon} />
                      </Box>
                      <Typography id={styles.tileText}>{summary.scheduleType}</Typography>
                      <Typography id={styles.tileText}>{summary.scheduleDate}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Link to="/diet" id={styles.link}>
                <Box className={styles.tile} sx={{ background: "#DFFDFF" }}>
                  <Box className={styles.tileHeader}>
                    <Typography id={styles.tileTextHeader}>Dieta</Typography>
                    <img id={styles.nextIcon} alt="Go" src={nextIcon} />
                  </Box>
                  <Divider sx={{ mt: "1ch", borderBottomWidth: 2 }} />
                  <Box className={styles.tileBody}>
                    <Box className={styles.tileActivity} sx={{ gridTemplateColumns: "repeat(2, 1fr) !important" }}>
                      <Box className={styles.activity} sx={{ background: "rgba(255, 251, 217, 1) !important" }}>
                        <img id={styles.activityIcon} alt="activity" src={energyIcon} />
                      </Box>
                      <Typography id={styles.tileText}> {parseFloat(summary.dietSummary.currentCalories.toFixed(2))}/{summary.dietSummary.maxCalories} kcal</Typography>
                    </Box>
                    <Box className={styles.tileDietMacros}>
                      <Box className={styles.dietMacro}>
                        <Typography id={styles.tileText}>Węglowodany</Typography>
                        <Typography id={styles.tileText}>{parseFloat(summary.dietSummary.currentCarbs.toFixed(2))}/{summary.dietSummary.maxCarbs} g</Typography>
                      </Box>
                      <Box className={styles.dietMacro}>
                        <Typography id={styles.tileText}>Białko</Typography>
                        <Typography id={styles.tileText}>{parseFloat(summary.dietSummary.currentProtein.toFixed(2))}/{summary.dietSummary.maxProtein} g</Typography>
                      </Box>
                      <Box className={styles.dietMacro}>
                        <Typography id={styles.tileText}>Tłuszcz</Typography>
                        <Typography id={styles.tileText}>{parseFloat(summary.dietSummary.currentFat.toFixed(2))}/{summary.dietSummary.maxFat} g</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Link to="/account" id={styles.link}>
                <Box className={styles.tile} sx={{ background: "rgba(90, 128, 226, 0.50)", height: 'fit-content !important' }}>
                  <Box className={styles.tileHeader}>
                    <Typography id={styles.tileTextHeader}>Twój profil</Typography>
                    <img id={styles.nextIcon} alt="Go" src={nextIcon} />
                  </Box>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Link to="/settings" id={styles.link}>
                <Box className={styles.tile} sx={{ background: "rgba(203, 216, 249, 0.50)", height: 'fit-content !important' }}>
                  <Box className={styles.tileHeader}>
                    <Typography id={styles.tileTextHeader}>Ustawienia</Typography>
                    <img id={styles.nextIcon} alt="Go" src={nextIcon} />
                  </Box>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Link to="/" id={styles.link} onClick={onLogoutClick}>
                <Box className={styles.tile} sx={{ background: "rgba(203, 249, 240, 0.50)", height: 'fit-content !important' }}>
                  <Box className={styles.tileHeader}>
                    <Typography id={styles.tileTextHeader}>Wyloguj się</Typography>
                    <img id={styles.nextIcon} alt="Go" src={nextIcon} />
                  </Box>
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}