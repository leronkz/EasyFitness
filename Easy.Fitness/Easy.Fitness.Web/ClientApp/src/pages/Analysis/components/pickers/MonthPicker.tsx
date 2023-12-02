import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import styles from '../modules/monthPicker.module.css';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import "dayjs/locale/pl";

interface MonthPickerInterface {
  month: Dayjs | null;
  setMonth: (param: Dayjs) => void;
  setIsGenerating: (param: boolean) => void;
}

export default function MonthPicker({ month, setMonth, setIsGenerating }: MonthPickerInterface) {

  return (
    <Box className={styles.monthPickerContainer}>
      <span>Wybierz miesiąc:</span>
      <Box className={styles.monthPickerInputWrapper}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
          <DatePicker
            views={['month', 'year']}
            value={month}
            onChange={(newMonth) => {setIsGenerating(false); setMonth(newMonth!);}}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  )
}