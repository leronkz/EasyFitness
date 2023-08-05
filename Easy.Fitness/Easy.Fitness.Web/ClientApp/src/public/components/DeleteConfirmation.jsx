import { Box, Divider } from '@mui/material';
import React from 'react';
import styles from  '../modules/confirmation.module.css'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteConfirmation({open, onClose, handleDelete}){

    if(!open){
        return null;
    }
    return(
        <div>
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
                        <p className={styles.text}>Confirm delete</p>
                    </Typography>
                    <Divider sx={{borderBottomWidth:2}}/>
                    <Typography sx={{ mt: 2, mb:2 }}>
                        <p className={styles.secondary_text}>Are you sure? You won't be able to revert this!</p>
                    </Typography>
                    <Divider sx={{borderBottomWidth:2}}/>
                    <Box sx={{display:"flex", justifyContent:"flex-end", width:"100%", mt:"1em"}}>
                        <Button variant="contained" color="error" startIcon={<DeleteIcon/>} onClick={handleDelete} sx={{fontFamily:"Lexend", textTransform:"none", ":hover":{"background": "white", "color": "black"}}}>
                            Delete
                        </Button>
                        <Button variant="outlined" sx={{color:"black", ml:2, fontFamily:"Lexend", textTransform:"none"}} onClick={onClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Fade>
            </Modal>
        </div>
    );
}

export default DeleteConfirmation;