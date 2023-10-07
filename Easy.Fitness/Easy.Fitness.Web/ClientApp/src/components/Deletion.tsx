import { Box, Divider } from '@mui/material';
import styles from '../modules/deletion.module.css';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomizedProgress from './CustomizedProgress';

interface DeletionProps {
  open: boolean;
  onClose: () => void;
  handleDelete: () => void;
  isDeleting: boolean;
}

export default function Deletion({ open, onClose, handleDelete, isDeleting }: DeletionProps) {

  if (!open)
    return null;
  return (
    <Box>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box className={styles.confirmation_modal}>
            <Typography>
              <p className={styles.text}>Potwierdź usunięcie</p>
            </Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <Typography sx={{ mt: 2, mb: 2 }}>
              <p className={styles.secondary_text}>Czy jesteś pewny, że chcesz dokonać tej operacji?</p>
            </Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mt: "1em" }}>
              {!isDeleting ? (
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} sx={{ fontFamily: 'Lexend' }}>
                  Usuń
                </Button>) : (
                <CustomizedProgress position='flex-start'/>
              )}
              <Button variant="outlined" sx={{ color: "black", ml: 5, fontFamily: 'Lexend' }} onClick={onClose}>
                Anuluj
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}