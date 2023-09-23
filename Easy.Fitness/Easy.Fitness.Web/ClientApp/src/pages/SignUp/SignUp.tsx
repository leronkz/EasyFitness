import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from 'react-router-dom';
import { MouseEvent, useState } from "react";
import styles from '../../public/modules/signup.module.css';
import googleIcon from '../../public/img/assets/login/google.svg';
import appleIcon from '../../public/img/assets/login/apple.svg';
import facebookIcon from '../../public/img/assets/login/facebook.svg';
import { OAuthButton } from "../../public/components/StyledComponents";
import { Error, LoginDto, RegisterDto, registerUser } from "../../api/easyFitnessApi";
import validator from "validator";
import { isCancel } from "../../api/axiosSource";
import { useCancellationToken } from "../../hooks/useCancellationToken";
import CustomizedSnackbar, { SnackbarInterface } from "../../public/components/CustomizedSnackbar";
import { useNavigate } from "react-router-dom";

interface ValidFormInterface {
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isRepeatPasswordValid: boolean;
}

const minPasswordLength = 8;

function isPassword(password: string) {
  let upperCase = /[A-Z]/g;
  let lowerCase = /[a-z]/g;
  let number = /\d/g;
  if (password.match(upperCase) && password.match(lowerCase) && password.match(number) && password.length >= minPasswordLength
    && password !== null && password !== undefined && password !== '') {
    return true;
  }
  return false;
}

function isNullOrEmptyOrUndefinied(value: string) {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  return false;
}

export default function SignUp() {

  const [signUpForm, setSignUpForm] = useState<RegisterDto>({ email: '', password: '', repeatPassword: '' });
  const [isFormValid, setIsFormValid] = useState<ValidFormInterface>({ isEmailValid: true, isPasswordValid: true, isRepeatPasswordValid: true });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);

  const cancellation = useCancellationToken();
  const navigate = useNavigate();

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  }

  const handleChangeEmail = (e: any) => {
    setSignUpForm(prev => ({
      ...prev,
      email: e.target.value
    }));
  };

  const handleChangePassword = (e: any) => {
    setSignUpForm(prev => ({
      ...prev,
      password: e.target.value
    }));
  };

  const handleChangeRepeatPassword = (e: any) => {
    setSignUpForm(prev => ({
      ...prev,
      repeatPassword: e.target.value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  }

  const validateForm = (formData: RegisterDto) => {
    let isValid = true;
    setIsFormValid({
      isEmailValid: true,
      isPasswordValid: true,
      isRepeatPasswordValid: true
    });
    setIsInvalidPassword(false);
    if (isNullOrEmptyOrUndefinied(formData.email!) || !validator.isEmail(formData.email!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isEmailValid: false
      }));
    }
    if (!isPassword(formData.password!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isPasswordValid: false
      }));
      setIsInvalidPassword(true);
      // setSnackbar({
      //   open: true,
      //   type: "error",
      //   message: "The password must be 8 or more characters long and contain one uppercase letter, one lowercase letter and a number"
      // });
    }
    if (!isPassword(formData.repeatPassword!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isRepeatPasswordValid: false
      }));
    }
    if (formData.password !== formData.repeatPassword) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isPasswordValid: false,
        isRepeatPasswordValid: false
      }));
    }
    return isValid;
  };

  const registerUserAction = async (cancelToken: any) => {
    const loginDto: LoginDto = {
      email: signUpForm.email,
      password: signUpForm.password
    };
    return registerUser(
      loginDto,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Your account has been successfully created, you will be redirected to login page in second"
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
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

  const onRegisterClick = async () => {
    if (validateForm(signUpForm)) {
      cancellation((cancelToken) => {
        registerUserAction(cancelToken);
      });
    }
    else {
      setSnackbar({
        open: true,
        type: "error",
        message: "Complete all required fields correctly"
      });
    }
  };

  return (
    <Box className={styles.container}>
      <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
      <Box className={styles.registerForm}>
        <Box className={styles.registerHeader}>
          <p className={styles.headerTextMain}>Create an account</p>
          <p className={styles.headerText}>Enter your details to get to sign up to the app</p>
        </Box>
        <Box className={styles.registerPanel}>
          <OutlinedInput
            className={styles.emailInput}
            placeholder="email"
            onChange={handleChangeEmail}
            error={!isFormValid.isEmailValid}
          />
          <OutlinedInput
            className={styles.passwordInput}
            type={showPassword ? 'text' : 'password'}
            onChange={handleChangePassword}
            error={!isFormValid.isPasswordValid}
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
          {isInvalidPassword && (
            <span id={styles.passwordHelperText}>The password must be 8 or more characters long and contain one uppercase letter, one lowercase letter and a number</span>
          )}
          <OutlinedInput
            className={styles.passwordInput}
            type={showRepeatPassword ? 'text' : 'password'}
            onChange={handleChangeRepeatPassword}
            error={!isFormValid.isRepeatPasswordValid}
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
          <Button id={styles.signUpButton} onClick={onRegisterClick}>Sign up</Button>
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