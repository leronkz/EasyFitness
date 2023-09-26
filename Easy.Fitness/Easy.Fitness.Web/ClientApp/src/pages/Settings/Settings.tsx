import { Box, Container, CssBaseline, OutlinedInput, Button, Toolbar, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import Navbar from '../../public/components/Navbar';
import Header from '../../public/components/Header';
import styles from '../../public/modules/settings.module.css';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import KeyIcon from '@mui/icons-material/Key';
import TranslateIcon from '@mui/icons-material/Translate';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useState, useEffect } from 'react';
import { ChangePasswordDto, Error, UserInfoDto, changePassword, getUserInfo, updateUser } from '../../api/easyFitnessApi';
import { isCancel } from '../../api/axiosSource';
import { useCancellationToken } from '../../hooks/useCancellationToken';
import { isValidPhoneNumber } from 'libphonenumber-js';
import CustomizedSnackbar, { SnackbarInterface } from '../../public/components/CustomizedSnackbar';
import CustomizedProgress from '../../public/components/CustomizedProgress';

interface ValidFormInterface {
  isFirstNameValid: boolean;
  isLastNameValid: boolean;
  isPhoneNumberValid: boolean;
  isBirthdateValid: boolean;
  isCurrentPasswordValid: boolean;
  isNewPasswordValid: boolean;
}

const minPasswordLength = 8;

function isNullOrEmptyOrUndefinied(value: string) {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  return false;
};

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

export default function Settings() {

  const [language, setLanguage] = useState<string>('pl');
  const [userInfo, setUserInfo] = useState<UserInfoDto>({ id: undefined, firstName: undefined, lastName: undefined, phoneNumber: undefined, birthDate: undefined });
  const [isFormValid, setIsFormValid] = useState<ValidFormInterface>({ isFirstNameValid: true, isLastNameValid: true, isPhoneNumberValid: true, isBirthdateValid: true, isCurrentPasswordValid: true, isNewPasswordValid: true });
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [isSubmittingUserInfo, setIsSubmittingUserInfo] = useState<boolean>(false);
  const [password, setPassword] = useState<ChangePasswordDto>({ currentPassword: '', newPassword: '' });
  const [isSubmittingPassword, setIsSubmittingPassword] = useState<boolean>(false);

  const cancellation = useCancellationToken();

  const validateUserInfoForm = (formData: UserInfoDto) => {
    let isValid = true;
    setIsFormValid({
      isFirstNameValid: true,
      isLastNameValid: true,
      isPhoneNumberValid: true,
      isBirthdateValid: true,
      isCurrentPasswordValid: true,
      isNewPasswordValid: true,
    });
    if (isNullOrEmptyOrUndefinied(formData.firstName!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isFirstNameValid: false
      }));
    }
    if (isNullOrEmptyOrUndefinied(formData.lastName!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isLastNameValid: false
      }));
    }
    if (isNullOrEmptyOrUndefinied(formData.phoneNumber!) || !isValidPhoneNumber(formData.phoneNumber!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isPhoneNumberValid: false
      }));
    }
    if (isNullOrEmptyOrUndefinied(formData.birthDate!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isBirthdateValid: false
      }));
    }
    return isValid;
  };

  const validatePasswordFrom = (formData: ChangePasswordDto) => {
    let isValid = true;
    setIsFormValid({
      isFirstNameValid: true,
      isLastNameValid: true,
      isPhoneNumberValid: true,
      isBirthdateValid: true,
      isCurrentPasswordValid: true,
      isNewPasswordValid: true,
    });
    if (isNullOrEmptyOrUndefinied(formData.currentPassword)) {
      setIsFormValid(prev => ({
        ...prev,
        isCurrentPasswordValid: false
      }));
      isValid = false;
    }

    if (!isPassword(formData.newPassword)) {
      setIsFormValid(prev => ({
        ...prev,
        isNewPasswordValid: false
      }));
      isValid = false;
    }
    return isValid;
  };

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  const handleChangeFirstName = (e: any) => {
    setUserInfo(prev => ({
      ...prev!,
      firstName: e.target.value
    }));
  };

  const handleChangeLastName = (e: any) => {
    setUserInfo(prev => ({
      ...prev!,
      lastName: e.target.value
    }));
  };

  const handleChangePhoneNumber = (e: any) => {
    setUserInfo(prev => ({
      ...prev!,
      phoneNumber: e.toString()
    }));
  };

  const handleChangeBirthdate = (e: any) => {
    setUserInfo(prev => ({
      ...prev!,
      birthDate: e.target.value
    }));
  };

  const handleChangeCurrentPassword = (e: any) => {
    setPassword(prev => ({
      ...prev!,
      currentPassword: e.target.value
    }));
  };

  const handleChangeNewPassword = (e: any) => {
    setPassword(prev => ({
      ...prev!,
      newPassword: e.target.value
    }));
  };

  const updateUserInfoAction = async (cancelToken: any) => {
    setIsSubmittingUserInfo(true);
    return updateUser(
      userInfo!,
      cancelToken
    )
      .then((user) => {
        setUserInfo(user);
        setSnackbar({
          open: true,
          type: "success",
          message: "Your data has been saved successfully"
        });
        setIsSubmittingUserInfo(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsSubmittingUserInfo(false);
      });
  };

  const changeUserPasswordAction = async (cancelToken: any) => {
    setIsSubmittingPassword(true);
    return changePassword(
      password,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Password has been sucessfully changed"
        });
        setIsSubmittingPassword(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsSubmittingPassword(false);
      });
  };

  const getUserInfoAction = async (cancelToken: any) => {
    return getUserInfo(
      cancelToken
    )
      .then((user) => {
        setUserInfo(user);
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

  const onUpdateUserInfoClick = async () => {
    if (validateUserInfoForm(userInfo!)) {
      cancellation((cancelToken) => {
        updateUserInfoAction(cancelToken);
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

  const onChangePasswordClick = async () => {
    if (validatePasswordFrom(password!)) {
      cancellation((cancelToken) => {
        changeUserPasswordAction(cancelToken);
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

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  useEffect(() => {
    cancellation((cancelToken) => {
      getUserInfoAction(cancelToken);
    })
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={"settings"} />
      <Box
        component="main"
        className={styles.mainPanel}
        sx={{
          backgroundColor: (theme: any) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.pallete.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Header title={"Ustawienia"} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
          <Box className={styles.settingsPanel}>
            <Box className={styles.profileEditPanel}>
              <Box sx={{ display: 'flex' }}>
                <ManageAccountsIcon color="error" sx={{ mr: '1ch' }} />
                <p>Edytuj profil</p>
              </Box>
              <Box className={styles.profileEditForm}>
                <p id={styles.profileEditFormText}>Imię</p>
                <OutlinedInput
                  className={styles.settingInput}
                  placeholder='Imie'
                  onChange={handleChangeFirstName}
                  value={userInfo?.firstName}
                  error={!isFormValid.isFirstNameValid}
                />
                <p id={styles.profileEditFormText}>Nazwisko</p>
                <OutlinedInput
                  className={styles.settingInput}
                  placeholder='Nazwisko'
                  onChange={handleChangeLastName}
                  value={userInfo?.lastName}
                  error={!isFormValid.isLastNameValid}
                />
                <p id={styles.profileEditFormText}>Numer telefonu</p>
                <MuiPhoneNumber
                  className={styles.settingInput}
                  onChange={handleChangePhoneNumber}
                  variant='outlined'
                  defaultCountry={'pl'}
                  name="phone"
                  value={userInfo?.phoneNumber}
                  error={!isFormValid.isPhoneNumberValid}
                />
                <p id={styles.profileEditFormText}>Data urodzenia</p>
                <OutlinedInput
                  className={styles.settingInput}
                  type='date'
                  onChange={handleChangeBirthdate}
                  value={userInfo?.birthDate}
                  error={!isFormValid.isBirthdateValid}
                />
                {!isSubmittingUserInfo ? (
                  <Button id={styles.saveButton} onClick={onUpdateUserInfoClick}>Zastosuj zmiany</Button>
                ) : (
                  <CustomizedProgress />
                )}
              </Box>
            </Box>
            <Box className={styles.credentialsEditPanel}>
              <Box className={styles.passwordEditPanel}>
                <Box sx={{ display: 'flex' }}>
                  <KeyIcon color="error" sx={{ mr: '1ch' }} />
                  <p>Zmień hasło</p>
                </Box>
                <Box className={styles.passwordEditForm}>
                  <p id={styles.passwordEditFormText}>Obecne hasło</p>
                  <OutlinedInput
                    className={styles.settingInput}
                    type='password'
                    placeholder='******'
                    onChange={handleChangeCurrentPassword}
                    error={!isFormValid.isCurrentPasswordValid}
                  />
                  <p id={styles.passwordEditFormText}>Nowe hasło</p>
                  <OutlinedInput
                    className={styles.settingInput}
                    type='password'
                    placeholder='******'
                    onChange={handleChangeNewPassword}
                    error={!isFormValid.isNewPasswordValid}
                  />
                  {!isFormValid.isNewPasswordValid && (
                    <span id={styles.passwordHelperText}>The password must be 8 or more characters long and contain one uppercase letter, one lowercase letter and a number</span>
                  )}
                  {!isSubmittingPassword ? (
                    <Button id={styles.saveButton} onClick={onChangePasswordClick}>Zastosuj zmiany</Button>
                  ) : (
                    <CustomizedProgress />
                  )}
                </Box>
              </Box>
              <Box className={styles.languageEditPanel}>
                <Box sx={{ display: 'flex' }}>
                  <TranslateIcon color="error" sx={{ mr: '1ch' }} />
                  <p>Zmień język aplikacji</p>
                </Box>
                <Box className={styles.languageEditForm}>
                  <p id={styles.languageEditFormText}>Obecnie wybrany język</p>
                  <FormControl className={styles.settingInput}>
                    <Select
                      value={language}
                      onChange={handleChangeLanguage}
                      displayEmpty
                      style={{
                        fontFamily: 'Lexend'
                      }}
                    >
                      <MenuItem sx={{ fontFamily: 'Lexend' }} value={'pl'}>Polski</MenuItem>
                      <MenuItem sx={{ fontFamily: 'Lexend' }} value={'en'}>English</MenuItem>
                      <MenuItem sx={{ fontFamily: 'Lexend' }} value={'de'}>Deutsch</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}