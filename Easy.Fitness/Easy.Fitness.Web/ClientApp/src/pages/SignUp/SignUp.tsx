import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from 'react-router-dom';
import React, { MouseEvent } from "react";
import styles from '../../public/modules/signup.module.css';
import googleIcon from '../../public/img/assets/login/google.svg';
import appleIcon from '../../public/img/assets/login/apple.svg';
import facebookIcon from '../../public/img/assets/login/facebook.svg';
import { OAuthButton } from "../../public/components/StyledComponents";

export default function SignUp() {

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState<boolean>(false);

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.registerForm}>
        <Box className={styles.registerHeader}>
          <p className={styles.headerTextMain}>Create an account</p>
          <p className={styles.headerText}>Enter your details to get to sign up to the app</p>
        </Box>
        <Box className={styles.registerPanel}>
          <OutlinedInput
            className={styles.emailInput}
            placeholder="email"
          />
          <OutlinedInput
            className={styles.passwordInput}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="password"
          />
          <OutlinedInput
            className={styles.passwordInput}
            type={showRepeatPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="repeat password"
          />
          <Button id={styles.signUpButton}>Sign up</Button>
        </Box>
        <Box className={styles.registerFooter}>
          <Divider sx={{ width: "100%" }}><p className={styles.dividerText}>or Sign up with</p></Divider>
          <Box className={styles.externalRegisterPanel}>
            <OAuthButton variant="outlined" startIcon={<img alt="google-icon" src={googleIcon} />} >Google</OAuthButton>
            <OAuthButton variant="outlined" startIcon={<img alt="apple-icon" src={appleIcon} />} >Apple ID</OAuthButton>
            <OAuthButton variant="outlined" startIcon={<img alt="facebook-icon" src={facebookIcon} />} >Facebook</OAuthButton>
          </Box>
          <Box className={styles.registerFooterText}>
            <Link to="/" className={styles.link}>
              <p>Already have an account? <b>Sign in now</b></p>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );

}