import React from "react";
import styles from '../../public/modules/profile.module.css';
import Header from "../../public/components/Header";
import Navbar from "../../public/components/Navbar";
import defaultProfilePicture from '../../public/img/assets/profile/profile.svg';
import personalDataIcon from '../../public/img/assets/profile/personal.svg';
import parametersDataIcon from '../../public/img/assets/profile/parameters.svg';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, IconButton, Tooltip, Button, Box } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableInput from './components/EditableInput';
function Profile(){

    const [photoUrl, setPhotoUrl] = React.useState(defaultProfilePicture);
    const [image, setImage] = React.useState(null);
    const [isChanging, setIsChanging] = React.useState(false);
    const [name, setName] = React.useState('Mateusz Owsiak');
    const [email, setEmail] = React.useState('m.owsiak12@gmail.com');
    const [birthdate, setBirthdate] = React.useState('2001-07-31');
    const [height, setHeight] = React.useState(173);
    const [weight, setWeight] = React.useState(77);
    const [isEditingPersonal, setIsEditingPersonal] = React.useState(false);
    const [isEditingParameters, setIsEditingParameters] = React.useState(false);

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
                                <IconButton color="error" sx={{position:"fixed", alignSelf:"flex-start", visibility:(isChanging || photoUrl !== defaultProfilePicture ? "visible": "hidden")}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                            <div id={styles.profilePicture} style={{backgroundImage:`url(${photoUrl})`}}/>
                        </div>
                        <p className={styles.profilePictureText} onClick={onButtonClick}>Choose photo</p>
                        <input ref={inputRef}hidden accept="image/*" type="file" multiple={false} onChange={previewPhoto} name="picture"/>
                    </div>
                    <div className={styles.personalDataContainer}>
                        <div className={styles.personalDataHeader}>
                            <img alt="personal-icon" src={personalDataIcon} id={styles.profileIcons}/>
                            <p className={styles.personalDataHeaderText}>Personal</p>
                            {isEditingPersonal ? (
                                <Tooltip title="Save changes">
                                    <IconButton
                                        size="medium"
                                        onClick={() => {setIsEditingPersonal(false); console.log(name, email, birthdate);}}
                                    >
                                        <CheckIcon color="success"/>
                                    </IconButton>
                                </Tooltip>
                            ):(
                                <Tooltip title="Edit your personal info">
                                    <IconButton 
                                        size="medium"
                                        onClick={()=>{setIsEditingPersonal(true)}}
                                    >
                                    <EditIcon color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                        <Divider/>
                        <div className={styles.personalDataBody}>
                            <EditableInput initialValue={name} setValue={setName} inputType={"text"} isEditing={isEditingPersonal}/>
                            <EditableInput initialValue={email} setValue={setEmail} inputType={"text"} isEditing={isEditingPersonal}/>
                            <EditableInput initialValue={birthdate} setValue={setBirthdate} inputType={"date"} isEditing={isEditingPersonal}/>
                        </div>
                    </div>
                    <div className={styles.parametersDataContainer}>
                        <div className={styles.personalDataHeader}>
                            <img alt="parameters-icon" src={parametersDataIcon} id={styles.profileIcons}/>
                            <p className={styles.personalDataHeaderText}>Parameters</p>
                            {isEditingParameters ? (
                                <Tooltip title="Save changes">
                                    <IconButton
                                        size="medium"
                                        onClick={() => {setIsEditingParameters(false)}}
                                    >
                                        <CheckIcon color="success"/>
                                    </IconButton>
                                </Tooltip>
                            ):(
                                <Tooltip title="Edit your personal info">
                                    <IconButton 
                                        size="medium"
                                        onClick={()=>{setIsEditingParameters(true)}}
                                    >
                                    <EditIcon color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                        <Divider/>
                        <div className={styles.personalDataBody}>
                            <Box sx={{display:"flex", alignItems:"center"}}>
                                <EditableInput initialValue={height} setValue={setHeight} inputType={"number"} isEditing={isEditingParameters}/>
                                <p className={styles.personalDataText}>cm</p>
                            </Box>
                            <Box sx={{display:"flex", alignItems:"center"}}>
                                <EditableInput initialValue={weight} setValue={setWeight} inputType={"number"} isEditing={isEditingParameters}/> 
                                <p className={styles.personalDataText}>kg</p>
                            </Box>
                        </div>
                        {(isChanging || isEditingParameters || isEditingPersonal) && (
                            <Button sx={{textTransform:"none", fontFamily:"Lexend", color: "white", background: "#41D4F5", 
                                        fontSize:"17px", borderRadius: "30px", justifySelf:"end", ":hover":{background:"#3FB9F5", color: "black"}}}>
                                Save changes
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Profile;