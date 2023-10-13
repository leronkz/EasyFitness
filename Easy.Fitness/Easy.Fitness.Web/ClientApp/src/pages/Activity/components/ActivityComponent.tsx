import { Box, IconButton } from '@mui/material';
import styles from './modules/activityComponent.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StyledTooltip } from '../../../components/StyledTooltip';

interface ActivityInterface {
  id: string;
  date: string;
  type: any;
  name: string;
  duration: string;
  calories: number;
}

export default function ActivityComponent({id, date, type, name, duration, calories}: ActivityInterface) {
  return(
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
  )
}