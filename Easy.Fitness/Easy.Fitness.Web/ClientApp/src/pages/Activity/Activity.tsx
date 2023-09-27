import { Box, CssBaseline, Toolbar } from '@mui/material';
import Navbar from '../../public/components/Navbar';
import Header from '../../public/components/Header';
import styles from '../../public/modules/activity.module.css';

export default function Activity() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={'activity'} />
      <Box
        component="main"
        className={styles.mainPanel}
        sx={{
          backgroundColor: (theme: any) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Header title={"Twoja aktywność"} />
        <Toolbar />
      </Box>
    </Box>
  );

}