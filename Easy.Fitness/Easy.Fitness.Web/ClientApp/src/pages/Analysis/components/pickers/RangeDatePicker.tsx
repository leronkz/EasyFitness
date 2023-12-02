import styles from '../modules/rangeDatePicker.module.css';
import { Box, TextField } from '@mui/material';

interface RangeDatePickerInterface {
  startDate?: string;
  endDate?: string;
  setStartDate: (param: any) => void;
  setEndDate: (param: any) => void;
}

export default function RangeDatePicker({ startDate, endDate, setStartDate, setEndDate }: RangeDatePickerInterface) {

  return (
    <Box className={styles.rangeDatePickerContainer}>
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
      </Box>
    </Box>
  )
}