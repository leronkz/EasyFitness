import { Backdrop, Box, Button, Divider, Fade, Grid, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import { StyledTooltip } from "../../../components/StyledTooltip";
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import styles from './modules/newPlannedActivity.module.css';
import { useState } from 'react';
import CustomizedProgress from "../../../components/CustomizedProgress";
import { Error, ScheduleDto, addNewSchedule } from "../../../api/easyFitnessApi";
import CustomizedSnackbar, { SnackbarInterface } from "../../../components/CustomizedSnackbar";
import { useCancellationToken } from "../../../hooks/useCancellationToken";
import { isCancel } from "../../../api/axiosSource";

interface NewPlannedActivityProps {
  open: boolean;
  onClose: () => void;
}

export default function NewPlannedActivity({ open, onClose }: NewPlannedActivityProps) {

  const [type, setType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [newSchedule, setNewSchedule] = useState<ScheduleDto>({ date: '', type: '', note: '' });
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });

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

  const addNewScheduleAction = async (cancelToken: any) => {
    setIsSubmitting(true);
    return addNewSchedule(
      newSchedule,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "New schedule has been saved successfully"
        });
        setIsSubmitting(false);
        setTimeout(() => {
          setSnackbar(prev => ({
            ...prev,
            open: false
          }));
          onClose();
        }, 2000);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsSubmitting(false);
      });
  };

  const onSaveNewScheduleClick = async () => {
    cancellation((cancelToken) => {
      addNewScheduleAction(cancelToken);
    });
  };

  if(!open) {
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
          <Box className={styles.newPlannedActivityContainer}>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p id={styles.newPlannedActivityHeaderText}>Zaplanuj nową aktywność</p>
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
            <Box className={styles.newPlannedActivityForm}>
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
                    className={styles.newPlannedActivityInput}
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
                    className={styles.newPlannedActivityInput}
                  />
                </Grid>
              </Grid>
              {!isSubmitting ? (
                <Button id={styles.saveButton} onClick={onSaveNewScheduleClick}>Zapisz</Button>
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