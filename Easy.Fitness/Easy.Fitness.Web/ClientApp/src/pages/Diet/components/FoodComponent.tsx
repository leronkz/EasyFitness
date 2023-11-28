import { Error, FoodDto, deleteFood } from "../../../api/easyFitnessApi";
import { useState } from 'react';
import CustomizedSnackbar, { SnackbarInterface } from "../../../components/CustomizedSnackbar";
import { useCancellationToken } from "../../../hooks/useCancellationToken";
import { Box, IconButton } from "@mui/material";
import styles from './modules/foodComponent.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StyledTooltip } from "../../../components/StyledTooltip";
import { isCancel } from "../../../api/axiosSource";
import Deletion from "../../../components/Deletion";

interface FoodProps {
  id: string;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  weight: number;
  type: string;
  date: string;
}

export default function FoodComponent({ id, name, calories, fat, carbs, protein, weight, type, date }: FoodProps) {

  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [openDeletion, setOpenDeletion] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const food: FoodDto = { id: id, name: name, calories: calories, carbs: carbs, fat: fat, protein: protein, weight: weight, type: type }
  const [isDeletingFood, setIsDeletingFood] = useState<boolean>(false);

  const cancellation = useCancellationToken();

  const deleteFoodAction = async (cancelToken: any) => {
    setIsDeletingFood(true);
    return deleteFood(
      id,
      date,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: 'Food has been deleted successfully'
        });
        setIsDeletingFood(false);
        setOpenDeletion(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          })
        }
        setIsDeletingFood(false);
      });
  };

  const onDeleteFoodClick = async () => {
    cancellation((cancelToken) => {
      deleteFoodAction(cancelToken);
    });
  };

  const handleCloseSnackar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box className={styles.foodContainer}>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackar} />
      <Deletion open={openDeletion} onClose={() => setOpenDeletion(false)} handleDelete={onDeleteFoodClick} isDeleting={isDeletingFood} />
      <Box className={styles.foodWrapper}>
        <p className={styles.foodText}>{name}</p>
        <p className={styles.foodText}>{parseFloat(calories.toFixed(2))}</p>
        <p className={styles.foodText}>{parseFloat(fat.toFixed(2))}</p>
        <p className={styles.foodText}>{parseFloat(carbs.toFixed(2))}</p>
        <p className={styles.foodText}>{parseFloat(protein.toFixed(2))}</p>
        <p className={styles.foodText}>{parseFloat(weight.toFixed(2))}</p>
        <Box className={styles.foodActions}>
          <StyledTooltip title={"Edytuj"}>
            <IconButton
              size="small"
              onClick={() => setOpenUpdate(true)}
            >
              <EditIcon color="primary" />
            </IconButton>
          </StyledTooltip>
          <StyledTooltip title={"Usuń"}>
            <IconButton
              size="small"
              onClick={() => setOpenDeletion(true)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </StyledTooltip>
        </Box>
      </Box>
    </Box>
  )
}