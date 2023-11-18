import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import styles from '../modules/yearPicker.module.css';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface YearPickerInterface {
  year: Dayjs | null;
  setYear: (param: Dayjs) => void;
}

export default function YearPicker({ year, setYear }: YearPickerInterface) {

  return (
    <Box className={styles.yearPickerContainer}>
      <span>Wybierz rok:</span>
      <Box className={styles.yearPickerInputWrapper}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year']}
            value={year}
            onChange={(newYear) => setYear(newYear!)}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  )
}