import { useState, useEffect } from 'react';
import styles from './modules/analysisGraph.module.css';
import { Box, Button, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import RangeDatePicker from './pickers/RangeDatePicker';
import YearPicker from './pickers/YearPicker';
import { Dayjs } from 'dayjs';
import MonthPicker from './pickers/MonthPicker';
import GraphComponent from './GraphComponent';

interface AnalysisGraphWorkspaceProps {
  type: string;
}

export interface DateRangeInterface {
  startDate?: string;
  endDate?: string;
}

export default function AnalysisGraphWorkspace({ type }: AnalysisGraphWorkspaceProps) {

  const [option, setOption] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRangeInterface>({ startDate: undefined, endDate: undefined });
  const [year, setYear] = useState<Dayjs | null>(null);
  const [month, setMonth] = useState<Dayjs | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGraphGenerated, setIsGraphGenerated] = useState<boolean>(false);

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
    setIsGenerating(false);
  };

  const resetYear = () => {
    setYear(null);
    setIsGenerating(false);
  };

  const resetMonth = () => {
    setMonth(null);
    setIsGenerating(false);
  };

  const handleChangeGraphOption = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string
  ) => {
    setOption(newOption);
    setIsGraphGenerated(false);
  };

  const generateGraph = () => {
    setIsGraphGenerated(true);
    setIsGenerating(true);
  }

  useEffect(() => {
    setOption('');
    resetDateRange();
    resetMonth();
    resetYear();
  }, [type])

  if (type === null || type === undefined || type === '') {
    return null;
  }

  return (
    <Box className={styles.analysisWorkspaceContainer}>
      <Box className={styles.analysisWorkspaceGraph}>
        {isGenerating && isGraphGenerated && (
          <GraphComponent type={type} option={option} dateRange={dateRange} year={year} month={month} />
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
          {type === 'activity' && (
            <ToggleButton id={styles.analysisWorkspaceButton} value="year" onClick={resetYear}>
              <TodayIcon color="secondary" />
              <span>Widok roczny</span>
            </ToggleButton>
          )}
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
        {option !== '' && option !== null && (
          <Button id={styles.analysisGenerateButton} onClick={generateGraph}>Generuj wykres</Button>
        )}
      </Box>
    </Box>
  )
}