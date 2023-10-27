import { Box, IconButton } from '@mui/material';
import styles from './modules/plannedActivity.module.css';
import { StyledTooltip } from '../../../components/StyledTooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import CustomizedSnackbar, { SnackbarInterface } from '../../../components/CustomizedSnackbar';
import { Error, ScheduleDto, deleteSchedule } from '../../../api/easyFitnessApi';
import { useCancellationToken } from '../../../hooks/useCancellationToken';
import Deletion from '../../../components/Deletion';
import { isCancel } from '../../../api/axiosSource';
import UpdatePlannedActivity from './UpdatePlannedActivity';

interface PlannedActivityInterface {
  id: string;
  date: string;
  type: any;
  note: string;
}

export default function PlannedActivity({id, date, type, note}: PlannedActivityInterface) {
  
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({open: false, type: undefined, message: ''});
  const [openDeletion, setOpenDeletion] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const schedule: ScheduleDto = {id: id, date: date, type: type, note: note};
  const [isDeletingSchedule, setIsDeletingSchedule] = useState<boolean>(false); 
  const cancellation = useCancellationToken();

  const deleteScheduleAction = async (cancelToken: any) => {
    setIsDeletingSchedule(true);
    return deleteSchedule(
      id,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Schedule has been deleted successfully"
        });
        setIsDeletingSchedule(false);
        setOpenDeletion(false);
      })
      .catch((e: Error) => {
        if(!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsDeletingSchedule(false);
      });
  };

  const onDeleteScheduleClick = async () => {
    cancellation((cancelToken) => {
      deleteScheduleAction(cancelToken);
    })
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box className={styles.plannedContainer}>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
      <Deletion open={openDeletion} onClose={() => setOpenDeletion(false)} handleDelete={onDeleteScheduleClick} isDeleting={isDeletingSchedule} />
      <UpdatePlannedActivity open={openUpdate} onClose={() => setOpenUpdate(false)} schedule={schedule} />
      <Box className={styles.plannedWrapper}>
        <p className={styles.plannedText}>{date}</p>
        <p className={styles.plannedText}>{type}</p>
        <p className={styles.plannedText}>{note}</p>
        <Box className={styles.plannedActions}>
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