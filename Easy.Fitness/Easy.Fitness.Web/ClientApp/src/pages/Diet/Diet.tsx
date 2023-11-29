import { Box, Container, CssBaseline, Divider, IconButton, Toolbar } from "@mui/material";
import Navbar from "../../components/Navbar";
import styles from '../../modules/diet.module.css';
import Header from "../../components/Header";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { StyledTooltip } from "../../components/StyledTooltip";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState, useEffect } from 'react';
import DateSearch from "../../components/DateSearch";
import DietPart from "./components/DietPart";
import ConfigureDiet from "./components/ConfigureDiet";
import { DayDietDto, DietDto, DietSummaryDto, Error, getDietByDate, getDietProperties, getDietSummary } from "../../api/easyFitnessApi";
import { isCancel } from "../../api/axiosSource";
import CustomizedSnackbar, { SnackbarInterface } from "../../components/CustomizedSnackbar";
import { useCancellationToken } from "../../hooks/useCancellationToken";
import CustomizedProgress from "../../components/CustomizedProgress";

export default function Diet() {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  let formattedDate = `${selectedDate.getDate()}.${selectedDate.getMonth() + 1}.${selectedDate.getFullYear()}`;
  const [searchDate, setSearchDate] = useState<string | null>(null);
  const [openConfigure, setOpenConfigure] = useState<boolean>(false);
  const [dateDietConfiguration, setDateDietConfiguration] = useState<DayDietDto>({ date: formattedDate, calories: 0, fat: 0, carbs: 0, protein: 0 });
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [diet, setDiet] = useState<DietDto | null>(null);
  const [isLoadingDiet, setIsLoadingDiet] = useState<boolean>(false);
  const [dietSummary, setDietSummary] = useState<DietSummaryDto>({currentCalories: 0, currentCarbs: 0, currentFat: 0, currentProtein: 0, maxCalories: 0, maxCarbs: 0, maxFat: 0, maxProtein: 0});

  const cancellation = useCancellationToken();

  const handlePrevDay = () => {
    setSearchDate(null);
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    setSearchDate(null);
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const getDietConfigurationAction = async (cancelToken: any) => {
    return getDietProperties(
      formattedDate,
      cancelToken
    )
      .then((dietConfig) => {
        setDateDietConfiguration(dietConfig);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
      });
  };

  const getDietByDateAction = async (cancelToken: any) => {
    setIsLoadingDiet(true);
    return getDietByDate(
      formattedDate,
      cancelToken
    )
      .then((result) => {
        setDiet(result);
        setIsLoadingDiet(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsLoadingDiet(false);
      });
  };

  const getDietSummaryAction = async (cancelToken: any) => {
    return getDietSummary(
      formattedDate,
      cancelToken
    )
      .then((result) => {
        setDietSummary(result);
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

  const resetDietConfiguration = () => {
    setDateDietConfiguration({
      date: formattedDate,
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0
    });
  };

  useEffect(() => {
    resetDietConfiguration();
    if(searchDate !== null) {
      formattedDate = `${searchDate.split('-')[2]}.${searchDate.split('-')[1]}.${searchDate.split('-')[0]}`;
    }
    else {
      formattedDate = `${selectedDate.getDate()}.${selectedDate.getMonth() + 1}.${selectedDate.getFullYear()}`;
    }
    cancellation((cancelToken) => {
      getDietConfigurationAction(cancelToken);
      getDietByDateAction(cancelToken);
      getDietSummaryAction(cancelToken);
    });
  }, [formattedDate, searchDate]);

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
          <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
          <ConfigureDiet open={openConfigure} onClose={() => setOpenConfigure(false)} dietConfiguration={dateDietConfiguration!} date={formattedDate} />
          <Box className={styles.dietPanel}>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex' }}>
                <RestaurantIcon color="error" sx={{ mr: '1ch' }} />
                <p>Twój dzień jedzenia</p>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DateSearch searchDate={searchDate} setSearchDate={setSearchDate} />
                <StyledTooltip title={"Skonfiguruj"}>
                  <IconButton
                    size="medium"
                    onClick={() => setOpenConfigure(true)}
                  >
                    <ManageAccountsIcon color="secondary" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl poprzedni dzień"}>
                  <IconButton
                    size="medium"
                    onClick={handlePrevDay}
                  >
                    <ChevronLeftIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl następny dzień"}>
                  <IconButton
                    size="medium"
                    onClick={handleNextDay}
                  >
                    <ChevronRightIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
              </Box>
            </Box>
            <Box className={styles.dietTable}>
              <Box className={styles.dietTableHeader}>
                <p>Obecnie przeglądany dzień: {searchDate !== null ? `${searchDate.split('-')[2]}.${searchDate.split('-')[1]}.${searchDate.split('-')[0]}` : formattedDate}</p>
              </Box>
              <Divider />
              <Box className={styles.dietTableBodyContainer}>
                {isLoadingDiet && diet === null ? (
                  <CustomizedProgress position="center" />
                ) : (
                  <>
                    <DietPart title={"Śniadanie"} date={formattedDate} items={diet?.foods?.filter((food) => food.type === 'Breakfast') || []} />
                    <DietPart title={"II śniadanie"} date={formattedDate} items={diet?.foods?.filter((food) => food.type === 'Breakfast2') || []} />
                    <DietPart title={"Obiad"} date={formattedDate} items={diet?.foods?.filter((food) => food.type === 'Dinner') || []} />
                    <DietPart title={"Podwieczorek"} date={formattedDate} items={diet?.foods?.filter((food) => food.type === 'Tea') || []} />
                    <DietPart title={"Kolacja"} date={formattedDate} items={diet?.foods?.filter((food) => food.type === 'Supper') || []} />
                  </>
                )}
              </Box>
            </Box>
            <Box className={styles.dietPropertiesInfoContainer}>
              <p className={styles.dietPropertiesInfoText}>Kalorie: {parseFloat(dietSummary.currentCalories.toFixed(2))}/{dietSummary.maxCalories} kcal</p>
              <p className={styles.dietPropertiesInfoText}>Tłuszcz: {parseFloat(dietSummary.currentFat.toFixed(2))}/{dietSummary.maxFat} g</p>
              <p className={styles.dietPropertiesInfoText}>Węgl.: {parseFloat(dietSummary.currentCarbs.toFixed(2))}/{dietSummary.maxCarbs} g</p>
              <p className={styles.dietPropertiesInfoText}>Białko: {parseFloat(dietSummary.currentProtein.toFixed(2))}/{dietSummary.maxProtein} g</p>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}