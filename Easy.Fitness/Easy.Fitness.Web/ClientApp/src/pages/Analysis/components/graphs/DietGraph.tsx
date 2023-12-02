import { Dayjs } from "dayjs";
import { DateRangeInterface } from "../AnalysisGraphWorkspace";
import { GraphDataInterface } from "../GraphComponent";
import { useState, useEffect } from 'react';
import CustomizedSnackbar, { SnackbarInterface } from "../../../../components/CustomizedSnackbar";
import { CaloriesMonthDto, Error, getCaloriesByMonth, getCaloriesByRange } from "../../../../api/easyFitnessApi";
import { useCancellationToken } from "../../../../hooks/useCancellationToken";
import { isCancel } from "../../../../api/axiosSource";
import { Box } from "@mui/material";
import CustomizedProgress from "../../../../components/CustomizedProgress";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DietGraphProps {
  option: string;
  dateRange?: DateRangeInterface;
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
      text: 'Kalorie'
    },
  },
};

export var data: GraphDataInterface = { labels: [], datasets: [] };

export default function DietGraph({ option, dateRange, month }: DietGraphProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [dietMonth, setDietMonth] = useState<CaloriesMonthDto[]>([]);
  const [dietRange, setDietRange] = useState<CaloriesMonthDto[]>([]);

  const cancellation = useCancellationToken();

  const getCaloriesByMonthAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getCaloriesByMonth(
      (month!.month() + 1).toString(),
      month!.year().toString(),
      cancelToken
    )
      .then((items) => {
        setDietMonth(items);
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

  const getCaloriesByRangeAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getCaloriesByRange(
      dateRange?.startDate!,
      dateRange?.endDate!,
      cancelToken
    )
      .then((items) => {
        setDietRange(items);
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
      if (option === 'month') {
        await getCaloriesByMonthAction(cancelToken);
      }
      else {
        await getCaloriesByRangeAction(cancelToken);
      }
    });
  };

  const setGraph = () => {
    if (option === 'month') {
      data = {
        labels: dietMonth.map((item) => item.day),
        datasets: [
          {
            label: 'Kalorie',
            data: dietMonth.map((item) => parseFloat(item.calories.toFixed(2))),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)'
          }
        ]
      };
    }
    else {
      data = {
        labels: dietRange.map((item) => item.day),
        datasets: [
          {
            label: 'Kalorie',
            data: dietRange.map((item) => parseFloat(item.calories.toFixed(2))),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)'
          }
        ]
      };
    }
  };

  useEffect(() => {
    getGraphData();
  }, [dateRange, month, option]);

  useEffect(() => {
    if (dietMonth.length !== 0) {
      setGraph();
    }
    if (dietRange.length !== 0) {
      setGraph();
    }
  }, [dietMonth, dietRange]);

  return (
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
      {isLoading ? (
        <CustomizedProgress position="center" />
      ) : (
        <>
          {option === 'month' && dietMonth.length !== 0 && <Line data={data} options={options} />}
          {option === 'range' && (dietRange.length !== 0 ? (<Line data={data} options={options} />) : (<p style={{textAlign: 'center'}}>Brak danych do wyswietlenia</p>))}
        </>
      )}
    </Box>
  )
}