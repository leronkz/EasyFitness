import { DateRangeInterface } from "../AnalysisGraphWorkspace";
import { Dayjs } from 'dayjs';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import CustomizedSnackbar, { SnackbarInterface } from '../../../../components/CustomizedSnackbar';
import { useCancellationToken } from '../../../../hooks/useCancellationToken';
import { isCancel } from "../../../../api/axiosSource";
import { Box } from '@mui/material';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import CustomizedProgress from "../../../../components/CustomizedProgress";
import { GraphDataInterface } from "../GraphComponent";
import { Error, WeightMonthDto, getWeightByMonth, getWeightByRange } from "../../../../api/easyFitnessApi";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityGraphProps {
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
      text: 'Waga'
    },
  },
};

export var data: GraphDataInterface = { labels: [], datasets: [] };

export default function WeightGraph({ option, dateRange, month }: ActivityGraphProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [weightMonth, setWeightMonth] = useState<WeightMonthDto[]>([]);
  const [weightRange, setWeightRange] = useState<WeightMonthDto[]>([]);

  const cancellation = useCancellationToken()

  const getWeightByMonthAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getWeightByMonth(
      (month!.month() + 1).toString(),
      month!.year().toString(),
      cancelToken
    )
      .then((items) => {
        setWeightMonth(items);
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

  const getWeightByRangeAction = async (cancelToken: any) => {
    setIsLoading(true);
    return getWeightByRange(
      dateRange?.startDate!,
      dateRange?.endDate!,
      cancelToken
    )
      .then((items) => {
        setWeightRange(items);
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
      })
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
        await getWeightByMonthAction(cancelToken);
      }
      else {
        await getWeightByRangeAction(cancelToken);
      }
    });
  };

  const setGraph = () => {
    if (option === 'month') {
      data = {
        labels: weightMonth.map((item) => item.day),
        datasets: [
          {
            label: 'Waga',
            data: weightMonth.map((item) => item.weight),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)'
          }
        ]
      };
    }
    else {
      data = {
        labels: weightRange.map((item) => item.day),
        datasets: [
          {
            label: 'Waga',
            data: weightRange.map((item) => item.weight),
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
    if (weightMonth.length !== 0) {
      setGraph();
    }
    if (weightRange.length !== 0) {
      setGraph();
    }
  }, [weightRange, weightMonth]);

  return (
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
      {isLoading ? (
        <CustomizedProgress position="center" />
      ) : (
        <>
          {option === 'month' && weightMonth.length !== 0 && <Line data={data} options={options} />}
          {option === 'range' && weightRange.length !== 0 && <Line data={data} options={options} />}
        </>
      )}
    </Box>
  )
}