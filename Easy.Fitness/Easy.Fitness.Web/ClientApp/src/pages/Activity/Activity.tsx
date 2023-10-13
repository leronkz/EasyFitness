import { Box, Container, CssBaseline, Divider, IconButton, Toolbar } from '@mui/material';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import styles from '../../modules/activity.module.css';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { StyledTooltip } from '../../components/StyledTooltip';
import { useState } from 'react';
import ActivityComponent from './components/ActivityComponent';

export default function Activity() {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  
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
          <Box className={styles.activityPanel}>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
              <Box sx={{ display: 'flex' }}>
                <FitnessCenterIcon color="error" sx={{ mr: '1ch' }} />
                <p>Tabela aktywności</p>
              </Box>
              <Box sx={{ display: 'flex', alignItems: "center" }}>
                <StyledTooltip title={"Dodaj nową aktywność"}>
                  <IconButton
                    size="medium"
                  >
                    <AddIcon color="success" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyszukaj aktywność"}>
                  <IconButton
                    size="medium"
                  >
                    <SearchIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl wcześniejsze aktywności"}>
                  <IconButton
                    size="medium"
                  >
                    <ChevronLeftIcon color="primary" />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip title={"Wyświetl kolejne aktywności"}>
                  <IconButton
                    size="medium"
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
              <ActivityComponent id={'a'} date={"09.10.2023"} type={"Gym"} name={"Siłownia"} duration={"2h 35min"} calories={756} />
              <Divider />
              <ActivityComponent id={'a'} date={"08.12.2023"} type={"Swimming"} name={"Pływanie"} duration={"1h 30min"} calories={550} />
              <Divider />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );

}