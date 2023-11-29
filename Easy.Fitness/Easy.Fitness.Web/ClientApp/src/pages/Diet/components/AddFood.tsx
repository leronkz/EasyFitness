import { useState, useEffect } from 'react';
import styles from './modules/addFood.module.css';
import { Autocomplete, Backdrop, Box, Button, Divider, Fade, Grid, IconButton, InputLabel, Modal, OutlinedInput, TextField, Typography } from '@mui/material';
import { StyledTooltip } from '../../../components/StyledTooltip';
import CloseIcon from '@mui/icons-material/Close';
import { AddFoodDto, Error, addNewFood, getAutocompleteFoodNames } from '../../../api/easyFitnessApi';
import CustomizedProgress from '../../../components/CustomizedProgress';
import { useCancellationToken } from '../../../hooks/useCancellationToken';
import CustomizedSnackbar, { SnackbarInterface } from '../../../components/CustomizedSnackbar';
import { isCancel } from '../../../api/axiosSource';

interface AddFoodProps {
  open: boolean;
  onClose: () => void;
  date: string;
  type: string;
}

export default function AddFood({ open, onClose, date, type }: AddFoodProps) {

  const [autocompleteNameValue, setAutocompleteNameValue] = useState<string | null>(null);
  const [inputNameValue, setInputNameValue] = useState<string>('');
  const [newFood, setNewFood] = useState<AddFoodDto>({ date: date, name: '', weight: 0, type: '' });
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [isSubmittingFood, setIsSubmittingFood] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });

  const cancellation = useCancellationToken();

  const handleTypeChange = () => {
    if (type === 'Śniadanie') {
      setNewFood(prev => ({
        ...prev,
        type: 'Breakfast'
      }));
    }
    if (type === 'II śniadanie') {
      setNewFood(prev => ({
        ...prev,
        type: 'Breakfast2'
      }));
    }
    if (type === 'Obiad') {
      setNewFood(prev => ({
        ...prev,
        type: 'Dinner'
      }));
    }
    if (type === 'Podwieczorek') {
      setNewFood(prev => ({
        ...prev,
        type: 'Tea'
      }));
    }
    if (type === 'Kolacja') {
      setNewFood(prev => ({
        ...prev,
        type: 'Supper'
      }));
    }
  };

  const handleNameChange = (newName: string) => {
    if (newName === null) {
      setNewFood(prev => ({
        ...prev,
        name: ''
      }));
    }
    else {
      setNewFood(prev => ({
        ...prev,
        name: newName
      }));
    }
  };

  const handleWeightChange = (e: any) => {
    setNewFood(prev => ({
      ...prev,
      weight: e.target.value as number
    }));
  };

  const getAutocompleteFoodNamesAction = async () => {
    return getAutocompleteFoodNames(
      inputNameValue
    )
      .then((nameHints) => {
        setAutocompleteOptions(nameHints);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
      });
  };

  const addNewFoodAction = async (cancelToken: any) => {
    setIsSubmittingFood(true);
    return addNewFood(
      newFood,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: 'success',
          message: 'Food has been saved successfully'
        });
        setIsSubmittingFood(false);
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
        setIsSubmittingFood(false);
      });
  };

  const onSaveNewFoodClick = async () => {
    cancellation((cancelToken) => {
      addNewFoodAction(cancelToken);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  useEffect(() => {
    setAutocompleteOptions([]);
    setInputNameValue('');
    setAutocompleteNameValue(null);
    handleTypeChange()
    setIsSubmittingFood(false);
  }, [open]);

  useEffect(() => {
    if (inputNameValue !== null && inputNameValue !== '') {
      getAutocompleteFoodNamesAction();
    }
  }, [inputNameValue]);

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
          <Box className={styles.addFoodContainer}>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p id={styles.addFoodHeaderText}>Dodaj nowy posiłek</p>
              <StyledTooltip title={"Zamknij okno"}>
                <IconButton
                  size="medium"
                  onClick={onClose}
                >
                  <CloseIcon color="error" />
                </IconButton>
              </StyledTooltip>
            </Typography>
            <Divider />
            <Box className={styles.addFoodForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <InputLabel>
                    <span style={{ fontFamily: 'Lexend' }}>Nazwa posiłku</span>
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={autocompleteOptions}
                    value={autocompleteNameValue}
                    onChange={(e: any, newValue: string | null) => {
                      setAutocompleteNameValue(newValue);
                      handleNameChange(newValue!)
                    }}
                    sx={{ fontFamily: 'Lexend' }}
                    inputValue={inputNameValue}
                    onInputChange={(e, newInputValue) => {
                      setInputNameValue(newInputValue)
                    }}
                    renderInput={(params) => <TextField {...params} inputProps={{ ...params.inputProps, style: { fontFamily: 'Lexend' } }} />}
                  />
                </Grid>
                {autocompleteNameValue !== null ? (
                  <Grid item xs={12} sm={12}>
                    <InputLabel>
                      <span style={{ fontFamily: 'Lexend' }}>Waga</span>
                    </InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <OutlinedInput
                        required
                        placeholder='100'
                        className={styles.addFoodInput}
                        type='number'
                        fullWidth
                        onChange={handleWeightChange}
                      />
                      <span style={{ fontFamily: 'Lexend', marginLeft: '1ch' }}>g</span>
                    </Box>
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
              {!isSubmittingFood ? (
                <Button id={styles.saveButton} onClick={onSaveNewFoodClick} disabled={autocompleteNameValue === null}>Zapisz</Button>
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