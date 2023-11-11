import { Box, Container, CssBaseline, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material';
import styles from '../../modules/analysis.module.css';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useState } from 'react';
import ScaleIcon from '@mui/icons-material/Scale';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import RangeDatePicker from '../../components/RangeDatePicker';

export interface DateRangeInterface {
  startDate?: string;
  endDate?: string;
}

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 15, 16, 17, 34, 100, 0],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [-5, 10, 23, 54, 12, 100, 0],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Analysis() {

  const [graphType, setGraphType] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRangeInterface>({ startDate: undefined, endDate: undefined });

  const handleChangeGraphType = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setGraphType(newType);
  };

  const handleStartDateChange = (e: any) => {
    setDateRange(prev => ({
      ...prev,
      startDate: e.target.value
    }));
  };

  const handleEndDateChange = (e: any) => {
    setDateRange(prev => ({
      ...prev,
      endDate: e.target.value
    }));
  };

  const resetDateRange = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined
    });
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
              <Line options={options} data={data} />
            </Box>
            <Box className={styles.analysisGraphOptions}>
              <RangeDatePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                setStartDate={handleStartDateChange}
                setEndDate={handleEndDateChange}
                resetDataRange={resetDateRange}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}