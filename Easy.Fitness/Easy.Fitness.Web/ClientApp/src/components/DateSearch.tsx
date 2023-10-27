import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, TextField } from '@mui/material';
import styles from '../modules/dateSearch.module.css';
import { StyledTooltip } from './StyledTooltip';
import { useState } from 'react';

interface DateSearchInterface {
  searchDate: string | null;
  setSearchDate: (param: string | null) => void;
}

export default function DateSearch({ searchDate, setSearchDate }: DateSearchInterface) {

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setSearchDate(e.target.value as string);
  };

  const handleResetSearchDate = () => {
    setSearchDate(null);
    setIsSearching(false);
  }

  return(
    <Box className={styles.dateSearchContainer}>
      {isSearching ? (
        <Box className={styles.dateSearchInputWrapper}>
          <TextField
            id={styles.dateSearchInput}
            variant="standard"
            value={searchDate}
            type="date"
            onChange={handleInputChange}
          />
          <StyledTooltip title={"Zakończ"}>
            <IconButton
              size="medium"
              onClick={handleResetSearchDate}
            >
              <CloseIcon color="error" />
            </IconButton>
          </StyledTooltip>
        </Box>
      ): (
        <StyledTooltip title={"Wyszukaj po dacie"}>
          <IconButton
            size="medium"
            onClick={() => setIsSearching(true)}
          >
            <SearchIcon color="primary" />
          </IconButton>
        </StyledTooltip>
      )}
    </Box>
  )

}