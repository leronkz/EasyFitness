import { Box, Divider, IconButton } from "@mui/material";
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
  const columns = ['Nazwa', 'Kalorie', 'Tłuszcz', 'Węglowodany', 'Białko', 'Waga'];

  return (
    <Box className={styles.dietPartTable}>
      <Box className={styles.dietPartTableHeader} onClick={() => setIsExpanded(!isExpanded)} sx={{background: isExpanded ? "#FFEDFF !important" : "white"}}>
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
      {isExpanded && (
        <>
          <Divider />
          <Box className={styles.dietPartTableBody}>
            <Box className={styles.dietPartTableColumns}>
              {columns.map((column, index) => {
                return (<span style={{fontFamily: 'Lexend'}} key={index}>{column}</span>)
              })}
            </Box>
            <Divider sx={{mt: '1ch', mb: '0.5ch'}} />
            <Box className={styles.dietPartTableColumns}>
              
            </Box>
          </Box>
          <Divider />
        </>
      )}
    </Box>
  )
}