import { Error, ScheduleDto, updateSchedule } from "../../../api/easyFitnessApi";
import { useState } from "react";
import CustomizedSnackbar, { SnackbarInterface } from "../../../components/CustomizedSnackbar";
import { useCancellationToken } from "../../../hooks/useCancellationToken";
import { Backdrop, Box, Button, Divider, Fade, Grid, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import { isCancel } from "../../../api/axiosSource";
import styles from './modules/updatePlannedActivity.module.css';
import { StyledTooltip } from "../../../components/StyledTooltip";
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import CustomizedProgress from "../../../components/CustomizedProgress";

interface UpdatePlannedActivityProps {
  open: boolean;
  onClose: () => void;
  schedule: ScheduleDto
}

export default function UpdatePlannedActivity({ open, onClose, schedule }: UpdatePlannedActivityProps) {

  const [type, setType] = useState<string>(schedule.type);
  const [newSchedule, setNewSchedule] = useState<ScheduleDto>(schedule);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [isSubmittingSchedule, setIsSubmittingSchedule] = useState<boolean>(false);

  const cancellation = useCancellationToken();

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
    handleScheduleTypeChange(e.target.value as string);
  };

  const handleDateChange = (e: any) => {
    setNewSchedule(prev => ({
      ...prev,
      date: e.target.value
    }));
  };

  const handleScheduleTypeChange = (type: string) => {
    setNewSchedule(prev => ({
      ...prev,
      type: type
    }));
  };

  const handleNoteChange = (e: any) => {
    setNewSchedule(prev => ({
      ...prev,
      note: e.target.value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const updateScheduleAction = async (cancelToken: any) => {
    setIsSubmittingSchedule(true);
    return updateSchedule(
      schedule.id!,
      newSchedule,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Your schedule has been updated successfully"
        });
        setTimeout(() => {
          setSnackbar(prev => ({
            ...prev,
            open: false
          }));
          onClose();
        }, 2000);
        setIsSubmittingSchedule(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsSubmittingSchedule(false);
      });
  };

  const onUpdateScheduleClick = async () => {
    cancellation((cancelToken) => {
      updateScheduleAction(cancelToken);
    });
  };

  if (!open) {
    return null;
  }
  return (
    <Box>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box className={styles.updateScheduleContainer}>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p id={styles.updateScheduleHeaderText}>Zaaktualizuj zaplanowaną aktywność</p>
              <StyledTooltip title={"Zamknij okno"}>
                <IconButton
                  size="medium"
                  onClick={onClose}
                >
                  <CloseIcon color="error" />
                </IconButton>
              </StyledTooltip>
            </Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <Box className={styles.updateScheduleForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarMonthIcon />
                      <span style={{ fontFamily: 'Lexend' }}>Data</span>
                    </Box>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type='date'
                    onChange={handleDateChange}
                    className={styles.updateScheduleInput}
                    value={newSchedule.date}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>
                    <span style={{ fontFamily: 'Lexend' }}>Typ</span>
                  </InputLabel>
                  <Select
                    fullWidth
                    value={type}
                    required
                    onChange={handleTypeChange}
                    style={{
                      fontFamily: 'Lexend'
                    }}
                  >
                    <MenuItem className={styles.selectOptions} value={'Gym'}>Siłownia</MenuItem>
                    <MenuItem className={styles.selectOptions} value={'Swimming'}>Pływanie</MenuItem>
                    <MenuItem className={styles.selectOptions} value={'Running'}>Bieganie</MenuItem>
                    <MenuItem className={styles.selectOptions} value={'Cycling'}>Jazda na rowerze</MenuItem>
                    <MenuItem className={styles.selectOptions} value={'Trekking'}>Trekking</MenuItem>
                    <MenuItem className={styles.selectOptions} value={'Walking'}>Spacer</MenuItem>
                    <MenuItem className={styles.selectOptions} value={'Football'}>Piłka nożna</MenuItem>
                    <MenuItem className={styles.selectOptions} value={'Volleyball'}>Siatkówka</MenuItem>
                    <MenuItem className={styles.selectOptions} value={'Other'}>Styl dowolny</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EditIcon />
                      <span style={{ fontFamily: 'Lexend' }}>Notatka</span>
                    </Box>
                  </InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    placeholder='Nowa zaplanowana aktywność'
                    multiline
                    onChange={handleNoteChange}
                    value={newSchedule.note}
                    className={styles.updateScheduleInput}
                  />
                </Grid>
              </Grid>
              {!isSubmittingSchedule ? (
                <Button id={styles.saveButton} onClick={onUpdateScheduleClick}>Zapisz</Button>
              ) : (
                <CustomizedProgress position='flex-end' />
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}