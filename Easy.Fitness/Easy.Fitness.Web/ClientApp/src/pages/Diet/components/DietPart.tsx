import { Box, IconButton } from "@mui/material";
import { FoodDto } from "../../../api/easyFitnessApi";
import { useState } from 'react';
import styles from './modules/dietPart.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { StyledTooltip } from "../../../components/StyledTooltip";

interface DietPartProps {
  title: string;
  items: FoodDto[];
}

export default function DietPart({ title, items }: DietPartProps) {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const expandIconStyle = `${styles.dietPartIcon} ${isExpanded ? styles.dietPartIconExpanded : ''}`;

  return (
    <Box className={styles.dietPartTable}>
      <Box className={styles.dietPartTableHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <p>{title}</p>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledTooltip title={"Dodaj nową pozycje"}>
            <IconButton
              size="medium"
              onClick={(e: any) => e.stopPropagation()}
            >
              <AddIcon color="success" />
            </IconButton>
          </StyledTooltip>
          <IconButton
            size="medium"
            onClick={() => setIsExpanded(!isExpanded)}
            className={expandIconStyle}
          >
            <ExpandMoreIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}