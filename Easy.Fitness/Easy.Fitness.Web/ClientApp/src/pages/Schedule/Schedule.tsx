import { Box, Container, CssBaseline, Divider, IconButton, NativeSelect, Toolbar } from "@mui/material";
import Navbar from "../../components/Navbar";
import styles from "../../modules/schedule.module.css";
import Header from "../../components/Header";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { StyledTooltip } from "../../components/StyledTooltip";
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useState, useEffect } from 'react';
import NewPlannedActivity from "./components/NewPlannedActivity";
import { Error, PageDto, ScheduleDto, getSchedulePage } from "../../api/easyFitnessApi";
import { isCancel } from "../../api/axiosSource";
import CustomizedSnackbar, { SnackbarInterface } from "../../components/CustomizedSnackbar";
import { useCancellationToken } from "../../hooks/useCancellationToken";
import CustomizedProgress from "../../components/CustomizedProgress";
import PlannedActivity from "./components/PlannedActivity";
import DateSearch from "../../components/DateSearch";

const COUNT: number = 7;

export default function Schedule() {

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [page, setPage] = useState<number>(1);
  const [plannedActivites, setPlannedActivities] = useState<PageDto<ScheduleDto> | null>(null);
  const [openNewPlannedActivity, setOpenNewPlannedActivity] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
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
  };

  const getScheduleAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getSchedulePage(
      COUNT,
      (sortDirection === 'asc' ? false : true),
      page,
      sortColumn,
      searchType,
      searchDate!,
      cancelToken
    )
      .then((items) => {
        setPlannedActivities(items);
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
      getScheduleAction(cancelToken);
    });
  }, [sortColumn, sortDirection, page, searchType, searchDate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={'schedule'} />
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
        <Header title={"Twój plan"} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
          <NewPlannedActivity open={openNewPlannedActivity} onClose={() => setOpenNewPlannedActivity(false)} />
          <Box className={styles.schedulePanel}>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex' }}>
                <CalendarMonthIcon color="error" sx={{ mr: '1ch' }} />
                <p>Tabela zaplanowanych aktywności</p>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                <StyledTooltip title={"Dodaj"}>
                  <IconButton
                    size="medium"
                    onClick={() => setOpenNewPlannedActivity(true)}
                  >
                    <AddIcon color="success" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl poprzednie"}>
                  <IconButton
                    size="medium"
                    onClick={onPreviousPageClick}
                    disabled={!plannedActivites?.hasPreviousPage ? true : false}
                  >
                    <ChevronLeftIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl następne"}>
                  <IconButton
                    size="medium"
                    onClick={onNextPageClick}
                    disabled={!plannedActivites?.hasNextPage ? true : false}
                  >
                    <ChevronRightIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
              </Box>
            </Box>
            <Box className={styles.scheduleTable}>
              <Box className={styles.scheduleTableColumns}>
                <p className={styles.scheduleTableColumnsText} onClick={() => handleSortClick("date")} style={{ textDecoration: sortColumn === 'date' ? "underline" : "none" }}>Data {renderSortArrow('date')}</p>
                <p className={styles.scheduleTableColumnsText}>Typ</p>
                <p className={styles.scheduleTableColumnsText}>Notatka</p>
                <p className={styles.scheduleTableColumnsText}>Akcja</p>
              </Box>
              <Divider />
              {isLoading ? (
                <CustomizedProgress position={'center'} />
              ) : (
                plannedActivites?.items.map((schedule) => {
                  return (
                    <React.Fragment key={schedule.id}>
                      <PlannedActivity key={schedule.id} id={schedule.id!} date={schedule.date} type={schedule.type} note={schedule.note} />
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
  )
}