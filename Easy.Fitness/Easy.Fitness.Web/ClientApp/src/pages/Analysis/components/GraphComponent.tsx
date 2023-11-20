import { DateRangeInterface } from "./AnalysisGraphWorkspace";
import { Dayjs } from 'dayjs';
import { Box } from '@mui/material';
import styles from './modules/graphComponent.module.css';
import ActivityGraph from "./graphs/ActivityGraph";
import WeightGraph from "./graphs/WeightGraph";

interface GraphProps {
  type: string;
  option: string;
  dateRange?: DateRangeInterface;
  year: Dayjs | null;
  month: Dayjs | null;
}

export interface GraphDataInterface {
  labels: string[];
  datasets: DatasetsInterface[];
}

export interface DatasetsInterface {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

export default function GraphComponent({ type, option, dateRange, year, month }: GraphProps) {

  return (
    <Box className={styles.graphContainer}>
      {type === 'activity' && (
        <ActivityGraph option={option} dateRange={dateRange} year={year} month={month} />
      )}
      {type === 'weight' && (
        <WeightGraph option={option} dateRange={dateRange} month={month} />
      )}
    </Box>
  )
}