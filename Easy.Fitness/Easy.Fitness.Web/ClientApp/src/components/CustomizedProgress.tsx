import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface ProgressInterface {
    position: string;
}

export default function CustomizedProgress({ position }: ProgressInterface) {
    return (
        <Box sx={{ display: 'flex', alignSelf: position, mt: '1ch' }}>
            <CircularProgress color={'info'} size={30} />
        </Box>
    );
}