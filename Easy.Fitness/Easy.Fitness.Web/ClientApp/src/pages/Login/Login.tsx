import React, { MouseEvent } from 'react';
import styles from '../../public/modules/login.module.css';
import { Box, OutlinedInput, InputAdornment, IconButton, Divider, Button } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { OAuthButton } from '../../public/components/StyledComponents';
import googleIcon from '../../public/img/assets/login/google.svg';
import appleIcon from '../../public/img/assets/login/apple.svg';
import facebookIcon from '../../public/img/assets/login/facebook.svg';

export default function Login() {

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.loginForm}>
        <Box className={styles.loginHeader}>
          <p className={styles.headerTextMain}>Login</p>
          <p className={styles.headerText}>Enter your details to get to sign in to your account</p>
        </Box>
        <Box className={styles.loginPanel}>
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
          <Button id={styles.signInButton}>Sign in</Button>
        </Box>
        <Box className={styles.loginFooter}>
          <Divider sx={{ width: "100%" }}>
            <p className={styles.dividerText}>or Sign in with</p>
          </Divider>
          <Box className={styles.externalLoginPanel}>
            <OAuthButton variant="outlined" startIcon={<img alt="google-icon" src={googleIcon} />} >Google</OAuthButton>
            <OAuthButton variant="outlined" startIcon={<img alt="apple-icon" src={appleIcon} />} >Apple ID</OAuthButton>
            <OAuthButton variant="outlined" startIcon={<img alt="facebook-icon" src={facebookIcon} />} >Facebook</OAuthButton>
          </Box>
          <Box className={styles.loginFooterText}>
            <Link to="/register" className={styles.link}>
              <p>Don't have an account? <b>Sign up now</b></p>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}