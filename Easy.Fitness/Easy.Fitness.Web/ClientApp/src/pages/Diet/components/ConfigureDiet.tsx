import { Backdrop, Box, Button, Divider, Fade, Grid, IconButton, InputLabel, Modal, OutlinedInput, Typography } from '@mui/material';
import { DayDietDto, Error, setDietProperties } from '../../../api/easyFitnessApi';
import CustomizedSnackbar, { SnackbarInterface } from '../../../components/CustomizedSnackbar';
import styles from './modules/configureDiet.module.css';
import { useState, useEffect } from 'react';
import { StyledTooltip } from '../../../components/StyledTooltip';
import CloseIcon from '@mui/icons-material/Close';
import CustomizedProgress from '../../../components/CustomizedProgress';
import { isCancel } from '../../../api/axiosSource';
import { useCancellationToken } from '../../../hooks/useCancellationToken';

interface ConfigureDietProps {
  open: boolean;
  onClose: () => void;
  dietConfiguration: DayDietDto;
  date: string;
}

export default function ConfigureDiet({ open, onClose, dietConfiguration, date }: ConfigureDietProps) {

  const [newConfiguration, setNewConfiguration] = useState<DayDietDto>(dietConfiguration);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [isSubmittinConfiguration, setIsSubmittingConfiguration] = useState<boolean>(false);

  const cancellation = useCancellationToken();

  const handleCaloriesChange = (e: any) => {
    setNewConfiguration(prev => ({
      ...prev,
      calories: e.target.value
    }));
  };

  const handleFatChange = (e: any) => {
    setNewConfiguration(prev => ({
      ...prev,
      fat: e.target.value
    }));
  };

  const handleProteinChange = (e: any) => {
    setNewConfiguration(prev => ({
      ...prev,
      protein: e.target.value
    }));
  };

  const handleCarbsChange = (e: any) => {
    setNewConfiguration(prev => ({
      ...prev,
      carbs: e.target.value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const setDietConfigurationAction = async (cancelToken: any) => {
    setIsSubmittingConfiguration(true);
    return setDietProperties(
      newConfiguration,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Parameters has been set successfully"
        });
        setIsSubmittingConfiguration(false);
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
        setIsSubmittingConfiguration(false);
      });
  };

  const onSaveDietConfigurationClick = async () => {
    cancellation((cancelToken) => {
      setDietConfigurationAction(cancelToken);
    });
  };

  useEffect(() => {
    setNewConfiguration(dietConfiguration);
    setNewConfiguration(prev => ({
      ...prev,
      date: date
    }));
  }, [dietConfiguration]);

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
          <Box className={styles.configureDietContainer}>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p id={styles.configureDietHeaderText}>Ustaw parametry diety dla {date}</p>
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
            <Box className={styles.configureDietForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <InputLabel>
                    <span style={{ fontFamily: 'Lexend' }}>Kalorie</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type='number'
                    fullWidth
                    className={styles.configureDietInput}
                    value={newConfiguration.calories}
                    onChange={handleCaloriesChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel>
                    <span style={{ fontFamily: 'Lexend' }}>Tłuszcz</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type='number'
                    fullWidth
                    className={styles.configureDietInput}
                    value={newConfiguration.fat}
                    onChange={handleFatChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel>
                    <span style={{ fontFamily: 'Lexend' }}>Węglowodany</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type='number'
                    fullWidth
                    className={styles.configureDietInput}
                    value={newConfiguration.carbs}
                    onChange={handleCarbsChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel>
                    <span style={{ fontFamily: 'Lexend' }}>Białko</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type='number'
                    fullWidth
                    className={styles.configureDietInput}
                    value={newConfiguration.protein}
                    onChange={handleProteinChange}
                  />
                </Grid>
              </Grid>
              {!isSubmittinConfiguration ? (
                <Button id={styles.saveButton} onClick={onSaveDietConfigurationClick}>Zapisz</Button>
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