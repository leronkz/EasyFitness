import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CustomizedProgress(){
    return(
        <Box sx={{ display: 'flex', alignSelf: 'flex-end', mt: '1ch'}}>
            <CircularProgress color={'info'} size={30} />
        </Box>
    );
}