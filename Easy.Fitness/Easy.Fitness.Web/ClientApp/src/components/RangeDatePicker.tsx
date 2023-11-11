import { useState } from 'react';
import styles from '../modules/rangeDatePicker.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, TextField } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { StyledTooltip } from './StyledTooltip';

interface RangeDatePickerInterface {
  startDate?: string;
  endDate?: string;
  setStartDate: (param: any) => void;
  setEndDate: (param: any) => void;
  resetDataRange: () => void;
}

export default function RangeDatePicker({ startDate, endDate, setStartDate, setEndDate, resetDataRange }: RangeDatePickerInterface) {

  const [isDateRange, setIsDateRange] = useState<boolean>(false);

  const resetDatePicker = () => {
    resetDataRange();
    setIsDateRange(false);
  };

  return (
    <Box className={styles.rangeDatePickerContainer}>
      {isDateRange ? (
        <Box className={styles.rangeDatePickerInputWrapper}>
          <span>Od:</span>
          <TextField
            id={styles.rangeDatePickerInput}
            variant='standard'
            value={startDate}
            onChange={setStartDate}
            type='date'
          />
          <span>do:</span>
          <TextField
            id={styles.rangeDatePickerInput}
            variant='standard'
            value={endDate}
            onChange={setEndDate}
            type='date'
          />
          <StyledTooltip title={'Zakończ'}>
            <IconButton
              size="medium"
              onClick={resetDatePicker}
            >
              <CloseIcon color="error" />
            </IconButton>
          </StyledTooltip>
        </Box>
      ) : (
        <Button
          id={styles.rangeDatePickerBtn}
          variant='outlined'
          startIcon={<CalendarMonthIcon color="secondary" />}
          onClick={() => setIsDateRange(true)}
        >
          Zakres czasu
        </Button>
      )}
    </Box>
  )
}