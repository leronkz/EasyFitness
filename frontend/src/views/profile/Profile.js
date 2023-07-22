import React from "react";
import styles from '../../public/modules/profile.module.css';
import Header from "../../public/components/Header";
import Navbar from "../../public/components/Navbar";
import defaultProfilePicture from '../../public/img/assets/profile/profile.svg';
import personalDataIcon from '../../public/img/assets/profile/personal.svg';
import parametersDataIcon from '../../public/img/assets/profile/parameters.svg';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, IconButton, Tooltip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
function Profile(){

    const [photoUrl, setPhotoUrl] = React.useState(defaultProfilePicture);
    const [image, setImage] = React.useState(null);
    const [isChanging, setIsChanging] = React.useState(false);

    const inputRef = React.useRef(null);
    const onButtonClick = () =>{
        inputRef.current.click();
    }

    const previewPhoto = (event) => {
        const choseFile = event.target.files[0];
        setImage(choseFile);
        if(choseFile){
            const reader = new FileReader();
            reader.addEventListener('load',function(){
                setPhotoUrl(reader.result);
                setIsChanging(true);
            })
            reader.readAsDataURL(choseFile);
        }
    }  
    return(

        <div className={styles.container}>
            <header><Header title={"Profile"}/></header>
            <div className={styles.mainPanel}>
                <Navbar/>
                <div className={styles.profilePanel}>
                    <div className={styles.profilePictureContainer}>
                        <div className={styles.profilePictureWrapper}>
                            <Tooltip title="Delete profile picture">
                                <IconButton color="error" sx={{alignSelf:"flex-start", visibility:(isChanging || photoUrl !== defaultProfilePicture ? "visible": "hidden")}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                            <div id={styles.profilePicture} style={{backgroundImage:`url(${photoUrl})`}}/>
                            <Tooltip title="Change profile picture">
                            <IconButton color="success" sx={{alignSelf:"flex-start", visibility:(isChanging ? "visible" : "hidden")}}>
                                <CheckIcon/>
                            </IconButton>
                            </Tooltip>
                        </div>
                        <p className={styles.profilePictureText} onClick={onButtonClick}>Choose photo</p>
                        <input ref={inputRef}hidden accept="image/*" type="file" multiple={false} onChange={previewPhoto} name="picture"/>
                    </div>
                    <div className={styles.personalDataContainer}>
                        <div className={styles.personalDataHeader}>
                            <img alt="personal-icon" src={personalDataIcon} id={styles.profileIcons}/>
                            <p className={styles.personalDataHeaderText}>Personal</p>
                            <Tooltip title="Edit your personal info">
                                <IconButton 
                                    size="medium"
                                >
                                    <EditIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Divider/>
                        <div className={styles.personalDataBody}>
                            <p className={styles.personalDataText}>Mateusz Owsiak</p>
                            <p className={styles.personalDataText} style={{color:"#6F6F6F"}}>m.owsiak12@gmail.com</p>
                            <p className={styles.personalDataText}>31.07.2001</p>
                        </div>
                    </div>
                    <div className={styles.parametersDataContainer}>
                        <div className={styles.personalDataHeader}>
                            <img alt="parameters-icon" src={parametersDataIcon} id={styles.profileIcons}/>
                            <p className={styles.personalDataHeaderText}>Parameters</p>
                            <Tooltip title="Edit your parameters">
                                <IconButton 
                                    size="medium"
                                >
                                    <EditIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Divider/>
                        <div className={styles.personalDataBody}>
                            <p className={styles.personalDataText}>173 cm</p>
                            <p className={styles.personalDataText} style={{color:"#6F6F6F"}}>77 kg</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Profile;