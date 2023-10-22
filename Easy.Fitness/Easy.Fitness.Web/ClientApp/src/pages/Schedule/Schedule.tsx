import { Box, Container, CssBaseline, Divider, IconButton, Toolbar } from "@mui/material";
import Navbar from "../../components/Navbar";
import styles from "../../modules/schedule.module.css";
import Header from "../../components/Header";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { StyledTooltip } from "../../components/StyledTooltip";
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

const COUNT: number = 7;

export default function Schedule() {

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [page, setPage] = useState<number>(1);
  const [plannedActivites, setPlannedActivities] = useState<any>(null);

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
  }

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
          <Box className={styles.schedulePanel}>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex' }}>
                <CalendarMonthIcon color="error" sx={{ mr: '1ch' }} />
                <p>Tabela zaplanowanych aktywności</p>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledTooltip title={"Dodaj"}>
                  <IconButton
                    size="medium"
                  >
                    <AddIcon color="success" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl poprzednie"}>
                  <IconButton
                    size="medium"
                  >
                    <ChevronLeftIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl następne"}>
                  <IconButton
                    size="medium"
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
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}