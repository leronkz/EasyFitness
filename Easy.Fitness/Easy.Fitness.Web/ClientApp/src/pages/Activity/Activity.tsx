import { Box, Container, CssBaseline, Divider, IconButton, NativeSelect, Toolbar } from '@mui/material';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import styles from '../../modules/activity.module.css';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { StyledTooltip } from '../../components/StyledTooltip';
import React, { useEffect, useState } from 'react';
import ActivityComponent from './components/ActivityComponent';
import NewActivity from './components/NewActivity';
import { ActivityDto, Error, PageDto, getActivityPage } from '../../api/easyFitnessApi';
import { isCancel } from '../../api/axiosSource';
import CustomizedSnackbar, { SnackbarInterface } from '../../components/CustomizedSnackbar';
import { useCancellationToken } from '../../hooks/useCancellationToken';
import CustomizedProgress from '../../components/CustomizedProgress';
import DateSearch from '../../components/DateSearch';

const COUNT: number = 7;

export default function Activity() {

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [openNewActivity, setOpenNewActivity] = useState<boolean>(false);
  const [activities, setActivities] = useState<PageDto<ActivityDto> | null>(null);
  const [page, setPage] = useState<number>(1);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchType, setSearchType] = useState<string>('All');
  const [searchDate, setSearchDate] = useState<string | null>(null);

  const cancellation = useCancellationToken();

  const onNextPageClick = () => {
    setPage(page + 1);
  };

  const onPreviousPageClick = () => {
    setPage(page - 1);
  };

  const handleSortClick = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(
        sortDirection === 'asc'
          ? 'desc' : 'asc'
      );
    }
    else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortArrow = (column: string) => {
    if (column === sortColumn) {
      if (sortDirection === 'asc') {
        return <span>&#8593;</span>
      }
      else {
        return <span>&#8595;</span>
      }
    }
    return null;
  };

  const handleSearchTypeChange = (e: any) => {
    setSearchType(e.target.value as string);
  }

  const getActivitiesAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getActivityPage(
      COUNT,
      (sortDirection === 'asc' ? false : true),
      page,
      sortColumn,
      searchType,
      searchDate!,
      cancelToken
    )
      .then((items) => {
        setActivities(items);
        setIsLoading(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsLoading(false);
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
      getActivitiesAction(cancelToken);
    });
  }, [sortColumn, sortDirection, page, searchType, searchDate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={'activity'} />
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
        <Header title={"Twoja aktywność"} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
          <NewActivity open={openNewActivity} onClose={() => setOpenNewActivity(false)} />
          <Box className={styles.activityPanel}>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
              <Box sx={{ display: 'flex' }}>
                <FitnessCenterIcon color="error" sx={{ mr: '1ch' }} />
                <p>Tabela aktywności</p>
              </Box>
              <Box sx={{ display: 'flex', alignItems: "center" }}>
                <NativeSelect
                  value={searchType}
                  sx={{
                    fontFamily: 'Lexend'
                  }}
                  onChange={handleSearchTypeChange}
                >
                  <option id={styles.selectOptions} value={"All"}>Wszystkie aktywności</option>
                  <option id={styles.selectOptions} value={"Gym"}>Siłownia</option>
                  <option id={styles.selectOptions} value={"Swimming"}>Pływanie</option>
                  <option id={styles.selectOptions} value={"Running"}>Bieganie</option>
                  <option id={styles.selectOptions} value={"Cycling"}>Jazda na rowerze</option>
                  <option id={styles.selectOptions} value={"Trekking"}>Trekking</option>
                  <option id={styles.selectOptions} value={"Walking"}>Spacer</option>
                  <option id={styles.selectOptions} value={"Football"}>Piłka nożna</option>
                  <option id={styles.selectOptions} value={"Volleyball"}>Siatkówka</option>
                  <option id={styles.selectOptions} value={"Other"}>Styl dowolny</option>
                </NativeSelect>
                <DateSearch searchDate={searchDate} setSearchDate={setSearchDate} />
                <StyledTooltip title={"Dodaj nową aktywność"}>
                  <IconButton
                    size="medium"
                    onClick={() => setOpenNewActivity(true)}
                  >
                    <AddIcon color="success" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl wcześniejsze aktywności"}>
                  <IconButton
                    size="medium"
                    onClick={onPreviousPageClick}
                    disabled={!activities?.hasPreviousPage ? true : false}
                  >
                    <ChevronLeftIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl kolejne aktywności"}>
                  <IconButton
                    size="medium"
                    onClick={onNextPageClick}
                    disabled={!activities?.hasNextPage ? true : false}
                  >
                    <ChevronRightIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
              </Box>
            </Box>
            <Box className={styles.activityTable}>
              <Box className={styles.activityTableColumns}>
                <p className={styles.activityTableColumnsText} onClick={() => handleSortClick("date")} style={{ textDecoration: sortColumn === 'date' ? "underline" : "none" }}>Data {renderSortArrow('date')}</p>
                <p className={styles.activityTableColumnsText}>Typ</p>
                <p className={styles.activityTableColumnsText}>Nazwa</p>
                <p className={styles.activityTableColumnsText} onClick={() => handleSortClick("duration")} style={{ textDecoration: sortColumn === 'duration' ? "underline" : "none" }}>Czas {renderSortArrow('duration')}</p>
                <p className={styles.activityTableColumnsText} onClick={() => handleSortClick("calories")} style={{ textDecoration: sortColumn === 'calories' ? "underline" : "none" }}>Kalorie {renderSortArrow('calories')}</p>
                <p className={styles.activityTableColumnsText}>Akcja</p>
              </Box>
              <Divider />
              {isLoading ? (
                <CustomizedProgress position={'center'} />
              ) : (
                activities?.items.map((activity) => {
                  return (
                    <React.Fragment key={activity.id}>
                      <ActivityComponent key={activity.id} id={activity.id!} date={activity.date} type={activity.type} name={activity.name} duration={activity.duration} calories={activity.calories} />
                      <Divider />
                    </React.Fragment>
                  )
                })
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );

}