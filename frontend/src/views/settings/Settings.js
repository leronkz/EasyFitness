import React from "react";
import Header from "../../public/components/Header";
import Navbar from "../../public/components/Navbar";
import styles from '../../public/modules/settings.module.css';
import passwordIcon from '../../public/img/assets/settings/password.svg';
import emailIcon from '../../public/img/assets/settings/email.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import DeleteConfirmation from "../../public/components/DeleteConfirmation";

function Settings(){

    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleMouseDownPassword = (event) =>{
        event.preventDefault();
    }
    return(
        <div className={styles.container}>
            <header><Header title={"Settings"}/></header>
            <div className={styles.mainPanel}>
                <Navbar/>
                <div className={styles.settingsPanel}>
                    <DeleteConfirmation open={openDelete} onClose={()=>{setOpenDelete(!openDelete)}} handleDelete={() => {}}/>
                    <div className={styles.changePanel}>
                        <div className={styles.changePasswordPanel}>
                            <div className={styles.changePasswordHeader}>
                                <img alt="password-icon" src={passwordIcon} id={styles.settingsIcon}/>
                                <p className={styles.settingsText}>Change password</p>
                            </div>
                            <Divider/>
                            <form className={styles.passwordForm}>
                                <OutlinedInput
                                    id={styles.passwordInput}
                                    sx={{border:"1px solid #000", borderRadius:"30px", mb:"2ch"}}
                                    type={showCurrentPassword ? 'text':'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={()=>setShowCurrentPassword(!showCurrentPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showCurrentPassword ?  <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="current password"
                                />
                                <OutlinedInput
                                    id={styles.passwordInput}
                                    sx={{border:"1px solid #000", borderRadius:"30px", mb:"2ch"}}
                                    type={showNewPassword ? 'text':'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={()=>setShowNewPassword(!showNewPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showNewPassword ?  <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="new password"
                                />
                                <OutlinedInput
                                    id={styles.passwordInput}
                                    sx={{border:"1px solid #000", borderRadius:"30px", mb:"2ch"}}
                                    type={showConfirmPassword ? 'text':'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ?  <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="confirm password"
                                />
                                <button id={styles.saveBtn} type="submit">Change password</button>
                            </form>
                        </div>
                        <div className={styles.changeEmailPanel}>
                            <div className={styles.changePasswordHeader}>
                                <img alt="email-icon" src={emailIcon} id={styles.settingsIcon}/>
                                <p className={styles.settingsText}>Change email</p>
                            </div>
                            <Divider/>
                            <form className={styles.emailForm}>
                                <input id={styles.emailInput} type="text" placeholder="current email"/>
                                <input id={styles.emailInput} type="text" placeholder="new email"/>
                                <input id={styles.emailInput} type="text" placeholder="confirm email"/>
                                <button id={styles.saveBtn}>Change email</button>
                            </form>
                        </div>
                    </div>
                    <button id={styles.deleteBtn} onClick={()=>{setOpenDelete(true)}}>Delete account</button>
                </div>
            </div>
        </div>
    )
}

export default Settings;