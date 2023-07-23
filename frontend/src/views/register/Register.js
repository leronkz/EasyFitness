import React from "react";
import styles from '../../public/modules/register.module.css';
import googleIcon from '../../public/img/assets/login/google.svg';
import appleIcon from '../../public/img/assets/login/apple.svg';
import facebookIcon from '../../public/img/assets/login/facebook.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton, InputAdornment, OutlinedInput, Button } from "@mui/material";
import { Link } from 'react-router-dom';

function Register(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
    const handleMouseDownPassword = (event) =>{
        event.preventDefault();
    }
    return(
        <div className={styles.container}>
            <div className={styles.registerForm}>
                <div className={styles.registerHeader}>
                    <p className={styles.headerTextMain}>Create an account</p>
                    <p className={styles.headerText}>Enter your details to get to sign up to the app</p>
                </div>
                <div className={styles.registerPanel}>
                    <input id={styles.emailInput} type="text" placeholder="email"/>
                    <OutlinedInput
                        sx={{border:"1px solid #000", borderRadius:"30px", mb:"2ch", witdh:"100%", fontFamily: "Lexend"}}
                        type={showPassword ? 'text':'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={()=>setShowPassword(!showPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {showPassword ?  <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder="password"
                    />
                    <OutlinedInput
                        sx={{border:"1px solid #000", borderRadius:"30px", mb:"2ch", witdh:"100%", fontFamily: "Lexend"}}
                        type={showRepeatPassword ? 'text':'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={()=>setShowRepeatPassword(!showRepeatPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {showRepeatPassword ?  <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder="repeat password"
                    />
                    <button id={styles.signUpBtn}>Sign up</button>
                </div>
                <div className={styles.registerFooter}>
                    <Divider sx={{width:"100%"}}><p className={styles.dividerText}>or Sign up with</p></Divider>
                    <div className={styles.externalRegisterPanel}>
                        <Button sx={{display:"flex", justifyContent:"space-between", width: "30%", fontFamily:"Lexend", border:"1px solid black", borderRadius:"15px", color:"black", fontSize:"12px", fontWeight:"400"}}variant="outlined" startIcon={<img alt="google-icon" src={googleIcon}/>} >Google</Button>
                        <Button sx={{display:"flex", justifyContent:"space-between", width: "30%", fontFamily:"Lexend", border:"1px solid black", borderRadius:"15px", color:"black", fontSize:"12px", fontWeight:"400"}} variant="outlined" startIcon={<img alt="apple-icon" src={appleIcon}/>} >Apple ID</Button>
                        <Button sx={{display:"flex", justifyContent:"space-between", width: "30%", fontFamily:"Lexend", border:"1px solid black", borderRadius:"15px", color:"black", fontSize:"12px", fontWeight:"400"}} variant="outlined" startIcon={<img alt="facebook-icon" src={facebookIcon}/>} >Facebook</Button>
                    </div>
                    <div className={styles.registerFooterText}>
                        <Link to="/" className={styles.link}>
                            <p className={styles.registerFooterText1}>Already have an account? <b>Sign in now</b></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;