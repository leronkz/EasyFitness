import { Box, IconButton } from '@mui/material';
import styles from './modules/activityComponent.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StyledTooltip } from '../../../components/StyledTooltip';
import { ActivityDto, deleteActivity } from '../../../api/easyFitnessApi';
import { useState } from 'react';
import CustomizedSnackbar, { SnackbarInterface } from '../../../components/CustomizedSnackbar';
import { Error } from '../../../api/easyFitnessApi';
import { useCancellationToken } from '../../../hooks/useCancellationToken';
import Deletion from '../../../components/Deletion';
import UpdateActivity from './UpdateActivity';
interface ActivityInterface {
  id: string;
  date: string;
  type: any;
  name: string;
  duration: string;
  calories: number;
}

export default function ActivityComponent({ id, date, type, name, duration, calories }: ActivityInterface) {

  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [openDeletion, setOpenDeletion] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const activity: ActivityDto = {id: id, date: date, type: type, name: name, duration: duration, calories: calories};
  const [isDeletingActivity, setIsDeletingActivity] = useState<boolean>(false);
  const cancellation = useCancellationToken();

  const deleteActivityAction = async (cancelToken: any) => {
    setIsDeletingActivity(true);
    return deleteActivity(
      id,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Activity has been deleted successfully"
        });
        setIsDeletingActivity(false);
        setOpenDeletion(false);
      })
      .catch((e: Error) => {
        setSnackbar({
          open: true,
          type: "error",
          message: e.response.data
        });
        setIsDeletingActivity(false);
      });
  };

  const onDeleteActivityClick = async () => {
    cancellation((cancelToken) => {
      deleteActivityAction(cancelToken);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box className={styles.activityContainer}>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
      <Deletion open={openDeletion} onClose={() => setOpenDeletion(false)} handleDelete={onDeleteActivityClick} isDeleting={isDeletingActivity} />
      <UpdateActivity open={openUpdate} onClose={() => setOpenUpdate(false)} activity={activity} />
      <Box className={styles.activityWrapper}>
        <p className={styles.activityText}>{date}</p>
        <p className={styles.activityText}>{type}</p>
        <p className={styles.activityText}>{name}</p>
        <p className={styles.activityText}>{duration}</p>
        <p className={styles.activityText}>{calories}</p>
        <Box className={styles.activityActions}>
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