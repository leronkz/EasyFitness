import { useState, useEffect } from 'react';
import styles from './modules/updateFood.module.css';
import { Autocomplete, Backdrop, Box, Button, Divider, Fade, Grid, IconButton, InputLabel, Modal, OutlinedInput, TextField, Typography } from '@mui/material';
import { StyledTooltip } from '../../../components/StyledTooltip';
import CloseIcon from '@mui/icons-material/Close';
import { Error, FoodDto, updateFood, getAutocompleteFoodNames, UpdateFoodDto } from '../../../api/easyFitnessApi';
import CustomizedProgress from '../../../components/CustomizedProgress';
import { useCancellationToken } from '../../../hooks/useCancellationToken';
import CustomizedSnackbar, { SnackbarInterface } from '../../../components/CustomizedSnackbar';
import { isCancel } from '../../../api/axiosSource';

interface UpdateFoodProps {
  open: boolean;
  onClose: () => void;
  date: string;
  food: FoodDto
}

export default function UpdateFood({ open, onClose, date, food }: UpdateFoodProps) {

  const [autocompleteNameValue, setAutocompleteNameValue] = useState<string | null>(food.name);
  const [inputNameValue, setInputNameValue] = useState<string>(food.name);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [isSubmittingFood, setIsSubmittingFood] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [foodToUpdate, setFoodToUpdate] = useState<UpdateFoodDto>({name: food.name, weight: food.weight, type: food.type, date: date});

  const cancellation = useCancellationToken();

  const handleNameChange = (newName: string) => {
    if (newName === null) {
      setFoodToUpdate(prev => ({
        ...prev,
        name: ''
      }));
    }
    else {
      setFoodToUpdate(prev => ({
        ...prev,
        name: newName
      }));
    }
  };

  const handleWeightChange = (e: any) => {
    setFoodToUpdate(prev => ({
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

  const updateFoodAction = async (cancelToken: any) => {
    setIsSubmittingFood(true);
    return updateFood(
      food.id,
      foodToUpdate,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: 'success',
          message: 'Food has been updated successfully'
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

  const onSaveFoodClick = async () => {
    cancellation((cancelToken) => {
      updateFoodAction(cancelToken);
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
          <Box className={styles.updateFoodContainer}>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p id={styles.updateFoodHeaderText}>Zaaktualizuj posiłek</p>
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
            <Box className={styles.updateFoodForm}>
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
                    renderInput={(params) => <TextField {...params} />}
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
                        className={styles.updateFoodInput}
                        type='number'
                        fullWidth
                        value={foodToUpdate.weight}
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
                <Button id={styles.saveButton} onClick={onSaveFoodClick} disabled={autocompleteNameValue === null}>Zapisz</Button>
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