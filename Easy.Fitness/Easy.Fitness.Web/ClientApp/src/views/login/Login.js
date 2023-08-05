import React from "react";
import styles from '../../public/modules/login.module.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton, InputAdornment, OutlinedInput, Button } from "@mui/material";
import googleIcon from '../../public/img/assets/login/google.svg';
import appleIcon from '../../public/img/assets/login/apple.svg';
import facebookIcon from '../../public/img/assets/login/facebook.svg';
import { Link } from 'react-router-dom';
function Login(){

    const [showPassword, setShowPassword] = React.useState(false);
    const handleMouseDownPassword = (event) =>{
        event.preventDefault();
    }
    return(
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <div className={styles.loginHeader}>
                    <p className={styles.headerTextMain}>Login</p>
                    <p className={styles.headerText}>Enter your details to get to sign in to your account</p>
                </div>
                <div className={styles.loginPanel}>
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
                    <Button sx={{textTransform:"none", fontFamily:"Lexend", color: "white", background: "#41D4F5", 
                                fontSize:"16px", borderRadius: "15px", justifySelf:"end", ":hover":{background:"white", color: "black", border:"1px solid #41D4F5"}}}>
                        Sign in
                    </Button>
                </div>
                <div className={styles.loginFooter}>
                    <Divider sx={{width:"100%"}}><p className={styles.dividerText}>or Sign in with</p></Divider>
                    <div className={styles.externalLoginPanel}>
                        <Button sx={{display:"flex", justifyContent:"space-between", width: "30%", fontFamily:"Lexend", border:"1px solid black", borderRadius:"15px", color:"black", fontSize:"12px", fontWeight:"400"}}variant="outlined" startIcon={<img alt="google-icon" src={googleIcon}/>} >Google</Button>
                        <Button sx={{display:"flex", justifyContent:"space-between", width: "30%", fontFamily:"Lexend", border:"1px solid black", borderRadius:"15px", color:"black", fontSize:"12px", fontWeight:"400"}} variant="outlined" startIcon={<img alt="apple-icon" src={appleIcon}/>} >Apple ID</Button>
                        <Button sx={{display:"flex", justifyContent:"space-between", width: "30%", fontFamily:"Lexend", border:"1px solid black", borderRadius:"15px", color:"black", fontSize:"12px", fontWeight:"400"}} variant="outlined" startIcon={<img alt="facebook-icon" src={facebookIcon}/>} >Facebook</Button>
                    </div>
                    <div className={styles.loginFooterText}>
                        <Link to="/signup" className={styles.link}>
                            <p className={styles.loginFooterText1}>Don't have an account? <b>Sign up now</b></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;