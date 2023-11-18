import { useState, useEffect } from 'react';
import styles from './modules/analysisGraph.module.css';
import { Box, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import RangeDatePicker from './pickers/RangeDatePicker';
import YearPicker from './pickers/YearPicker';
import { Dayjs } from 'dayjs';
import MonthPicker from './pickers/MonthPicker';

interface AnalysisGraphWorkspaceProps {
  type: string;
}

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


export default function AnalysisGraphWorkspace({ type }: AnalysisGraphWorkspaceProps) {
  const [option, setOption] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRangeInterface>({ startDate: undefined, endDate: undefined });
  const [year, setYear] = useState<Dayjs | null>(null);
  const [month, setMonth] = useState<Dayjs | null>(null);

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

  const resetYear = () => {
    setYear(null);
  };
  
  const resetMonth = () => {
    setMonth(null);
  };

  const handleChangeGraphOption = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string
  ) => {
    setOption(newOption);
  };

  if (type === null || type === undefined) {
    return null;
  }
  return (
    <Box className={styles.analysisWorkspaceContainer}>
      <Box className={styles.analysisWorkspaceGraph}>
        {option && (
          <Line data={data} options={options} />
        )}
      </Box>
      <Divider orientation='vertical' flexItem />
      <Box className={styles.analysisWorkspaceOptions}>
        <span style={{ textAlign: 'center', alignSelf: 'flex-start' }}>Wybierz rodzaj wykresu: </span>
        <ToggleButtonGroup
          color="secondary"
          value={option}
          exclusive
          onChange={handleChangeGraphOption}
          orientation='vertical'
          sx={{ display: 'flex' }}
        >
          <ToggleButton id={styles.analysisWorkspaceButton} value="year" onClick={resetYear}>
            <TodayIcon color="secondary" />
            <span>Widok roczny</span>
          </ToggleButton>
          <ToggleButton id={styles.analysisWorkspaceButton} value="month" onClick={resetMonth}>
            <CalendarMonthIcon color="secondary" />
            <span>Widok miesięczny</span>
          </ToggleButton>
          <ToggleButton id={styles.analysisWorkspaceButton} value="range" onClick={resetDateRange}>
            <DateRangeIcon color="secondary" />
            <span>Wybrany zakres</span>
          </ToggleButton>
        </ToggleButtonGroup>
        {option === 'range' && (
          <RangeDatePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            setStartDate={handleStartDateChange}
            setEndDate={handleEndDateChange}
          />
        )}
        {option === 'year' && (
          <YearPicker
            year={year}
            setYear={setYear}
          />
        )}
        {option === 'month' && (
          <MonthPicker
            month={month}
            setMonth={setMonth}
          />
        )}
      </Box>
    </Box>
  )
}