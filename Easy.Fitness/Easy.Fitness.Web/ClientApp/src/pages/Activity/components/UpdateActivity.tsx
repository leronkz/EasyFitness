import { Backdrop, Box, Button, Divider, Fade, Grid, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material';
import styles from './modules/updateActivity.module.css';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DurationPicker from 'react-duration-picker';
import { ActivityDto, DurationInterface, Error, updateActivity } from '../../../api/easyFitnessApi';
import { StyledTooltip } from '../../../components/StyledTooltip';
import CloseIcon from '@mui/icons-material/Close';
import CustomizedSnackbar, { SnackbarInterface } from '../../../components/CustomizedSnackbar';
import { isCancel } from '../../../api/axiosSource';
import { useCancellationToken } from '../../../hooks/useCancellationToken';
import CustomizedProgress from '../../../components/CustomizedProgress';

interface UpdateActivityProps {
  open: boolean;
  onClose: () => void;
  activity: ActivityDto;
}

export default function UpdateActivity({ open, onClose, activity }: UpdateActivityProps) {

  const [type, setType] = useState<string>(activity.type);
  const [duration, setDuration] = useState<DurationInterface>({ hours: 0, minutes: 0, seconds: 0 });
  const [newActivity, setNewActivity] = useState<ActivityDto>(activity);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [isSubmittingActivity, setIsSubmittingActivity] = useState<boolean>(false);

  const cancellation = useCancellationToken();

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
    handleActivityTypeChange(e.target.value as string);
  };

  const handleDurationChange = (durationInput: any) => {
    setDuration(durationInput);
    let durationToString = duration.hours + ":" + duration.minutes + ":" + duration.seconds;
    setNewActivity(prev => ({
      ...prev,
      duration: durationToString
    }));
  };

  const handleDateChange = (e: any) => {
    setNewActivity(prev => ({
      ...prev,
      date: e.target.value
    }));
  };

  const handleActivityTypeChange = (type: string) => {
    setNewActivity(prev => ({
      ...prev,
      type: type
    }));
  };

  const handleNameChange = (e: any) => {
    setNewActivity(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleCaloriesChange = (e: any) => {
    setNewActivity(prev => ({
      ...prev,
      calories: e.target.value as number
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const updateActivityAction = async (cancelToken: any) => {
    setIsSubmittingActivity(true);
    return updateActivity(
      activity.id!,
      newActivity,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Your activity has been updated successfully"
        });
        setTimeout(() => {
          setSnackbar(prev => ({
            ...prev,
            open: false
          }));
          onClose();
        }, 2000);
        setIsSubmittingActivity(false);
      })
      .catch((e: Error) => {
        if(!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsSubmittingActivity(false);
      })
  };

    const onUpdateActivityClick = async () => {
      cancellation((cancelToken) => {
        updateActivityAction(cancelToken);
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
          <Box className={styles.updateActivityContainer}>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p id={styles.updateActivityHeaderText}>Dodaj nową aktywność</p>
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
            <Box className={styles.updateActivityForm}>
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
                    className={styles.updateActivityInput}
                    onChange={handleDateChange}
                    value={newActivity.date}
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
                    <span style={{ fontFamily: 'Lexend' }}>Nazwa</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    placeholder='Nowa aktywność'
                    className={styles.updateActivityInput}
                    onChange={handleNameChange}
                    value={newActivity.name}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalFireDepartmentIcon color="error" />
                      <span style={{ fontFamily: 'Lexend' }}>Kalorie</span>
                    </Box>
                  </InputLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: "100%" }}>
                    <OutlinedInput
                      required
                      placeholder='500'
                      className={styles.updateActivityInput}
                      type='number'
                      fullWidth
                      onChange={handleCaloriesChange}
                      value={newActivity.calories}
                    />
                    <span style={{ fontFamily: 'Lexend', marginLeft: '1ch' }}>kcal</span>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon />
                      <span style={{ fontFamily: 'Lexend' }}>Czas trwania</span>
                    </Box>
                  </InputLabel>
                  <DurationPicker
                    onChange={handleDurationChange}
                    initialDuration={{ hours: 1, minutes: 30, seconds: 0 }}
                    maxHours={9}
                  />
                </Grid>
              </Grid>
              {!isSubmittingActivity ? (
                <Button id={styles.saveButton} onClick={onUpdateActivityClick}>Zapisz</Button>
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