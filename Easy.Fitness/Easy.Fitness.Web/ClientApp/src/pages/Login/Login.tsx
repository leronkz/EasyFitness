import { MouseEvent, useState, useEffect } from 'react';
import styles from '../../public/modules/login.module.css';
import { Box, OutlinedInput, InputAdornment, IconButton, Divider, Button } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom';
import { OAuthButton } from '../../public/components/StyledComponents';
import googleIcon from '../../public/img/assets/login/google.svg';
import appleIcon from '../../public/img/assets/login/apple.svg';
import facebookIcon from '../../public/img/assets/login/facebook.svg';
import { Error, LoginDto, loginUser } from '../../api/easyFitnessApi';
import { useCancellationToken } from '../../hooks/useCancellationToken';
import { isCancel } from '../../api/axiosSource';
import CustomizedSnackbar, { SnackbarInterface } from '../../public/components/CustomizedSnackbar';

export default function Login() {

  const [userCredentials, setUserCredentials] = useState<LoginDto>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });

  const cancellation = useCancellationToken();
  const navigate = useNavigate();

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  };

  const handleChangeEmail = (e: any) => {
    setUserCredentials(prev => ({
      ...prev,
      email: e.target.value
    }));
  };

  const handlePasswordChange = (e: any) => {
    setUserCredentials(prev => ({
      ...prev,
      password: e.target.value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  }

  const loginUserAction = async (cancelToken: any) => {
    return loginUser(
      userCredentials,
      cancelToken
    )
      .then((accessToken) => {
        localStorage.setItem("token", accessToken.accessToken);
        setTimeout(() => {
          navigate("/dashboard")
        }, 1000);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
      });
  };

  const onLoginClick = async () => {
    cancellation((cancelToken) => {
      loginUserAction(cancelToken);
    });
  };

  useEffect(() => {
    if (localStorage.getItem('token') !== undefined &&
      localStorage.getItem('token') !== null) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <Box className={styles.container}>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
      <Box className={styles.loginForm}>
        <Box className={styles.loginHeader}>
          <p className={styles.headerTextMain}>Login</p>
          <p className={styles.headerText}>Enter your details to get to sign in to your account</p>
        </Box>
        <Box className={styles.loginPanel}>
          <OutlinedInput
            className={styles.emailInput}
            placeholder="email"
            onChange={handleChangeEmail}
          />
          <OutlinedInput
            className={styles.passwordInput}
            type={showPassword ? 'text' : 'password'}
            onChange={handlePasswordChange}
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
          <Button id={styles.signInButton} onClick={onLoginClick}>Sign in</Button>
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