import { DateRangeInterface } from "../AnalysisGraphWorkspace";
import { Dayjs } from 'dayjs';
import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import CustomizedSnackbar, { SnackbarInterface } from '../../../../components/CustomizedSnackbar';
import { useCancellationToken } from '../../../../hooks/useCancellationToken';
import { BurnedCaloriesMonthDto, BurnedCaloriesYearDto, Error, getBurnedCaloriesByDateRange, getBurnedCaloriesByMonth, getBurnedCaloriesByYear } from "../../../../api/easyFitnessApi";
import { isCancel } from "../../../../api/axiosSource";
import { Box } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import CustomizedProgress from "../../../../components/CustomizedProgress";
import { GraphDataInterface } from "../GraphComponent";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityGraphProps {
  option: string;
  dateRange?: DateRangeInterface;
  year: Dayjs | null;
  month: Dayjs | null;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Spalone kalorie'
    },
  },
};

export var data: GraphDataInterface = { labels: [], datasets: [] };

export default function ActivityGraph({ option, dateRange, year, month }: ActivityGraphProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [burnedCaloriesMonth, setBurnedCaloriesMonth] = useState<BurnedCaloriesMonthDto[]>([]);
  const [burnedCaloriesYear, setBurnedCaloriesYear] = useState<BurnedCaloriesYearDto[]>([]);
  const [burnedCaloriesRange, setBurnedCaloriesRange] = useState<BurnedCaloriesMonthDto[]>([]);

  const cancellation = useCancellationToken()


  const getBurnedCaloriesByMonthAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getBurnedCaloriesByMonth(
      (month!.month() + 1).toString(),
      month!.year().toString(),
      cancelToken
    )
      .then((items) => {
        setBurnedCaloriesMonth(items);
        setIsLoading(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsLoading(false);
      });
  };

  const getBurnedCaloriesByYearAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getBurnedCaloriesByYear(
      year!.year().toString(),
      cancelToken
    )
      .then((items) => {
        setBurnedCaloriesYear(items);
        setIsLoading(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsLoading(false);
      });
  };

  const getBurnedCaloriesByRangeAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getBurnedCaloriesByDateRange(
      dateRange?.startDate!,
      dateRange?.endDate!,
      cancelToken
    )
      .then((items) => {
        setBurnedCaloriesRange(items);
        setIsLoading(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsLoading(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const getGraphData = async () => {
    cancellation(async (cancelToken) => {
      if (option === 'year') {
        await getBurnedCaloriesByYearAction(cancelToken);
      }
      else if (option === 'month') {
        await getBurnedCaloriesByMonthAction(cancelToken);
      }
      else {
        await getBurnedCaloriesByRangeAction(cancelToken);
      }
    });
  };

  const setGraph = () => {
    if (option === 'month') {
      data = {
        labels: burnedCaloriesMonth.map((item) => item.day),
        datasets: [
          {
            label: 'Kalorie',
            data: burnedCaloriesMonth.map((item) => item.calories),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)'
          }
        ]
      };
    }
    else if (option === 'year') {
      data = {
        labels: burnedCaloriesYear.map((item) => item.month),
        datasets: [
          {
            label: 'Kalorie',
            data: burnedCaloriesYear.map((item) => item.calories),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)'
          }
        ]
      };
    }
    else {
      data = {
        labels: burnedCaloriesRange.map((item) => item.day),
        datasets: [
          {
            label: 'Kalorie',
            data: burnedCaloriesRange.map((item) => item.calories),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)'
          }
        ]
      };
    }
  };

  useEffect(() => {
    getGraphData();
  }, [dateRange, year, month, option]);

  useEffect(() => {
    if (burnedCaloriesMonth.length !== 0) {
      setGraph();
    }
    if (burnedCaloriesYear.length !== 0) {
      setGraph();
    }
    if (burnedCaloriesRange.length !== 0) {
      setGraph();
    }
  }, [burnedCaloriesMonth, burnedCaloriesYear, burnedCaloriesRange]);

  return (
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
      {isLoading ? (
        <CustomizedProgress position="center" />
      ) : (
        <>
          {option === 'year' && burnedCaloriesYear.length !== 0 && <Bar data={data} options={options} />}
          {option === 'month' && burnedCaloriesMonth.length !== 0 && <Line data={data} options={options} />}
          {option === 'range' && (burnedCaloriesRange.length !== 0 ? (<Line data={data} options={options} />) : (<p style={{ textAlign: 'center' }}>Brak danych do wyswietlenia</p>))}
        </>
      )}
    </Box>
  )
}