import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

export default function Loading() {
  return (
    <Box sx ={{
      display: 'flex', flexDirection: 'column', fontFamily: 'Lexend',
      justifyContent: 'center', position: 'absolute', alignItems: 'center',
      m: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
    }}>
      <CircularProgress />
      <p>EasyFitness</p>
    </Box>
  )
}