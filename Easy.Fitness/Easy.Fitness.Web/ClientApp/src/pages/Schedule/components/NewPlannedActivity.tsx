import { Backdrop, Box, Button, Divider, Fade, Grid, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import { StyledTooltip } from "../../../components/StyledTooltip";
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../modules/newPlannedActivity.module.css';
import { useState } from 'react';
import CustomizedProgress from "../../../components/CustomizedProgress";
 
interface NewPlannedActivityProps {
  open: boolean;
  onClose: () => void;
}

export default function NewPlannedActivity({ open, onClose }: NewPlannedActivityProps) {
  
  const [type, setType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };
  
  return (
    <Box>
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
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <EditIcon />
                      <span style={{fontFamily: 'Lexend'}}>Notatka</span>
                    </Box>
                  </InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    placeholder='Nowa zaplanowana aktywność'
                    multiline
                    className={styles.newPlannedActivityInput}
                  />
                </Grid>
              </Grid>
              {!isSubmitting ? (
                <Button id={styles.saveButton}>Zapisz</Button>
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