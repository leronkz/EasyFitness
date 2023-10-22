import { Box, IconButton } from '@mui/material';
import styles from '../modules/plannedActivity.module.css';
import { StyledTooltip } from '../../../components/StyledTooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface PlannedActivityInterface {
  id: string;
  date: string;
  type: any;
  note: string;
}

export default function PlannedActivity({id, date, type, note}: PlannedActivityInterface) {
  
  return (
    <Box className={styles.plannedContainer}>
      <Box className={styles.plannedWrapper}>
        <p className={styles.plannedText}>{date}</p>
        <p className={styles.plannedText}>{type}</p>
        <p className={styles.plannedText}>{note}</p>
        <Box className={styles.plannedActions}>
          <StyledTooltip title={"Edytuj"}>
            <IconButton
              size="small"
            >
              <EditIcon color="primary" />
            </IconButton>
          </StyledTooltip>
          <StyledTooltip title={"Usuń"}>
            <IconButton
              size="small"
            >
              <DeleteIcon color="error" />
            </IconButton>
          </StyledTooltip>
        </Box>
      </Box>
    </Box>
  )
}