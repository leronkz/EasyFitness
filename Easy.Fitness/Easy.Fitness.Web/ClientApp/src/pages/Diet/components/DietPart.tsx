import { Box, IconButton } from "@mui/material";
import { FoodDto } from "../../../api/easyFitnessApi";
import { useState } from 'react';
import styles from './modules/dietPart.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface DietPartProps {
  title: string;
  items: FoodDto[];
}

export default function DietPart({ title, items }: DietPartProps) {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const expandIconStyle = `${styles.dietPartIcon} ${isExpanded ? styles.dietPartIconExpanded : ''}`;

  return (
    <Box className={styles.dietPartTable}>
      <Box className={styles.dietPartTableHeader}>
        <p>{title}</p>
        <IconButton
          size="medium"
          onClick={() => setIsExpanded(!isExpanded)}
          className={expandIconStyle}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>
    </Box>
  )
}