import styles from '../../modules/account.module.css';
import { Box, Button, Container, CssBaseline, IconButton, OutlinedInput, Toolbar } from '@mui/material';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DefaultProfilePicture from '../../img/assets/account/default.svg';
import { useState, useRef, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTooltip } from '../../components/StyledTooltip';
import HeightIcon from '@mui/icons-material/Height';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useCancellationToken } from '../../hooks/useCancellationToken';
import { Error, UserInfoDto, UserParametersDto, changeUserPicture, deleteUserPicture, getUserAccountInfo, getUserParameters, getUserPicture, updateUserParameters } from '../../api/easyFitnessApi';
import { SnackbarInterface } from '../../components/CustomizedSnackbar';
import { isCancel } from '../../api/axiosSource';
import CustomizedProgress from '../../components/CustomizedProgress';
import CustomizedSnackbar from '../../components/CustomizedSnackbar';
import Deletion from '../../components/Deletion';

interface ValidFormInterface {
  isWeightValid: boolean;
  isHeightValid: boolean;
}

function isNullOrNegativeOrUndefinied(value: number) {
  if (value === null || value === undefined || value < 0) {
    return true;
  }
  return false;
};

export default function Account() {

  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(DefaultProfilePicture);
  const [image, setImage] = useState<any | null>(null);
  const [isPhotoChanging, setIsPhotoChanging] = useState<boolean>(false);
  const [userParameters, setUserParameters] = useState<UserParametersDto>({ weight: undefined, height: undefined });
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ open: false, type: undefined, message: '' });
  const [isSubmittingParameters, setIsSubmittingParameters] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<ValidFormInterface>({ isHeightValid: true, isWeightValid: true });
  const [isSubmittingPhoto, setIsSubmittingPhoto] = useState<boolean>(false);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState<boolean>(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<boolean>(false);
  const [userAccountInfo, setUserAccountInfo] = useState<UserInfoDto>({ firstName: undefined, lastName: undefined, birthDate: undefined });

  const cancellation = useCancellationToken();

  const changePhotoRef = useRef<any | null>(null);

  const handleChangeWeight = (e: any) => {
    setUserParameters(prev => ({
      ...prev!,
      weight: e.target.value
    }));
  };

  const handleChangeHeight = (e: any) => {
    setUserParameters(prev => ({
      ...prev!,
      height: e.target.value
    }));
  };

  const onPhotoClick = () => {
    changePhotoRef.current.click();
  };

  const validateParametersForm = (formData: UserParametersDto) => {
    let isValid = true;
    setIsFormValid({
      isHeightValid: true,
      isWeightValid: true
    });
    if (isNullOrNegativeOrUndefinied(formData.height!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isHeightValid: false
      }));
    }
    if (isNullOrNegativeOrUndefinied(formData.weight!)) {
      isValid = false;
      setIsFormValid(prev => ({
        ...prev,
        isWeightValid: false
      }));
    }
    return isValid;
  }

  const previewPhoto = (event: any) => {
    const choseFile: any = event.target.files[0];
    setImage(choseFile);
    if (choseFile) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        setPhotoUrl(reader.result);
        setIsPhotoChanging(true);
      });
      reader.readAsDataURL(choseFile);
    }
  };

  const updateUserParametersAction = async (cancelToken: any) => {
    setIsSubmittingParameters(true);
    return updateUserParameters(
      userParameters,
      cancelToken
    )
      .then((parameters) => {
        setUserParameters(parameters);
        setSnackbar({
          open: true,
          type: "success",
          message: "Your parameters has been saved successfully"
        });
        setIsSubmittingParameters(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsSubmittingParameters(false);
      });
  };

  const getUserParametersAction = async (cancelToken: any) => {
    return getUserParameters(
      cancelToken
    )
      .then((parameters) => {
        setUserParameters(parameters);
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

  const changeUserProfilePictureAction = async (cancelToken: any) => {
    setIsSubmittingPhoto(true);
    const formData = new FormData();
    formData.append('image', image);
    return changeUserPicture(
      formData,
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Your photo has been changed sucessfully"
        });
        setIsSubmittingPhoto(false);
        setIsPhotoChanging(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
        }
        setIsSubmittingPhoto(false);
      });
  };

  const getUserProfilePictureAction = async (cancelToken: any) => {
    return getUserPicture(
      cancelToken
    )
      .then((img) => {
        const byteChars = atob(img.fileBytes);
        const byteNums = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteNums[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNums);
        const blob = new Blob([byteArray], { type: 'image/jpg' });

        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoUrl(e.target!.result);
        }
        reader.readAsDataURL(blob);
      })
      .catch((e: Error) => {
      });
  };

  const deleteUserProfilePictureAction = async (cancelToken: any) => {
    setIsDeletingPhoto(true);
    return deleteUserPicture(
      cancelToken
    )
      .then(() => {
        setSnackbar({
          open: true,
          type: "success",
          message: "Your profile picture has been deleted successfully"
        });
        setImage(null);
        setPhotoUrl(DefaultProfilePicture);
        setIsDeletingPhoto(false);
        setOpenDeleteConfirmation(false);
      })
      .catch((e: Error) => {
        if (!isCancel(e)) {
          setSnackbar({
            open: true,
            type: "error",
            message: e.response.data
          });
          setIsDeletingPhoto(false);
        }
      });
  };

  const getUserAccountInfoAction = async (cancelToken: any) => {
    return getUserAccountInfo(
      cancelToken
    )
      .then((user) => {
        setUserAccountInfo(user);
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
  }

  const onUpdateUserParametersClick = async () => {
    if (validateParametersForm(userParameters)) {
      cancellation((cancelToken) => {
        updateUserParametersAction(cancelToken);
      });
    }
    else {
      setSnackbar({
        open: true,
        type: "error",
        message: "Fill all required fileds correctly"
      });
    }
  };

  const onChangeUserProfilePictureClick = async () => {
    cancellation((cancelToken) => {
      changeUserProfilePictureAction(cancelToken);
    });
  };

  const onDeleteUserProfilePictureClick = async () => {
    cancellation((cancelToken) => {
      deleteUserProfilePictureAction(cancelToken);
    })
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  useEffect(() => {
    cancellation((cancelToken) => {
      getUserParametersAction(cancelToken);
      getUserProfilePictureAction(cancelToken);
      getUserAccountInfoAction(cancelToken);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar selected={"account"} />
      <Box
        component="main"
        className={styles.mainPanel}
        sx={{
          backgroundColor: (theme: any) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Header title={"Twój profil"} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <CustomizedSnackbar {...snackbar} handleClose={handleCloseSnackbar} />
          <Deletion open={openDeleteConfirmation} onClose={() => setOpenDeleteConfirmation(false)} handleDelete={onDeleteUserProfilePictureClick} isDeleting={isDeletingPhoto} />
          <Box className={styles.accountPanel}>
            <Box className={styles.profilePicturePanel}>
              <Box sx={{ display: 'flex' }}>
                <AccountCircleIcon color="error" sx={{ mr: '1ch' }} />
                <p>Twój profil</p>
              </Box>
              <form className={styles.profilePictureContainer} encType='multipart/form-data'>
                <input ref={changePhotoRef} hidden accept="image/*" type="file" multiple={false} onChange={previewPhoto} name="picture" />
                <Box sx={{ display: 'flex' }}>
                  {!isSubmittingPhoto ? (<StyledTooltip title={"Zmień zdjęcie profilowe"}>
                    <IconButton
                      size="small"
                      sx={{
                        alignSelf: 'flex-start',
                        visibility: (isPhotoChanging ? 'visible' : 'hidden')
                      }}
                      onClick={onChangeUserProfilePictureClick}
                    >
                      <CheckIcon color="success" />
                    </IconButton>
                  </StyledTooltip>) : (
                    <CustomizedProgress position='flex-start' />
                  )}
                  <StyledTooltip
                    title={"Kliknij aby zmienić zdjęcie profilowe"}
                  >
                    <div id={styles.profilePicture} style={{ backgroundImage: `url(${photoUrl})` }} onClick={onPhotoClick} />
                  </StyledTooltip>
                  <StyledTooltip title={"Usuń zdjęcie profilowe"}>
                    <IconButton
                      size="small"
                      sx={{
                        alignSelf: 'flex-start',
                        visibility: (isPhotoChanging || photoUrl !== DefaultProfilePicture ? 'visible' : 'hidden')
                      }}
                      onClick={() => setOpenDeleteConfirmation(true)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </StyledTooltip>
                </Box>
                <p id={styles.profilePictureText}>{userAccountInfo.firstName && userAccountInfo.lastName ? userAccountInfo.firstName + ' ' + userAccountInfo.lastName : "-"}</p>
                <p id={styles.profilePictureText}>{userAccountInfo.birthDate ?? "-"}</p>
              </form>
            </Box>
            <Box className={styles.profileInfoPanel}>
              <Box className={styles.profileParametersPanel}>
                <Box sx={{ display: 'flex' }}>
                  <HeightIcon color="error" sx={{ mr: '1ch' }} />
                  <p>Twoje parametry</p>
                </Box>
                <Box className={styles.profileParametersContainer}>
                  <p id={styles.profileParametersText}>Waga</p>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <OutlinedInput
                      className={styles.profileInput}
                      placeholder='-'
                      type='number'
                      onChange={handleChangeWeight}
                      value={userParameters.weight}
                      error={!isFormValid.isWeightValid}
                    />
                    <p style={{ marginLeft: '1ch' }}>kg</p>
                  </Box>
                  <p id={styles.profileParametersText}>Wzrost</p>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <OutlinedInput
                      className={styles.profileInput}
                      placeholder='-'
                      type='number'
                      onChange={handleChangeHeight}
                      value={userParameters.height}
                      error={!isFormValid.isHeightValid}
                    />
                    <p style={{ marginLeft: '1ch' }}>cm</p>
                  </Box>
                  {!isSubmittingParameters ? (
                    <Button id={styles.saveButton} onClick={onUpdateUserParametersClick}>Zastosuj zmiany</Button>
                  ) : (
                    <CustomizedProgress position='flex-end' />
                  )}
                </Box>
              </Box>
              <Box className={styles.profileSummaryPanel}>
                <Box sx={{ display: 'flex' }}>
                  <AnalyticsIcon color="error" sx={{ mr: '1ch' }} />
                  <p>Podsumowanie</p>
                </Box>
                <Box className={styles.profileSummaryContainer}>
                  <Box className={styles.summaryPart}>
                    <DirectionsRunIcon color="primary" />
                    <Box className={styles.summaryPartTextContainer}>
                      <p id={styles.summaryPartText}><b>100</b></p>
                      <p id={styles.summaryPartText}>Sesje treningowe</p>
                    </Box>
                  </Box>
                  <Box className={styles.summaryPart}>
                    <AccessTimeIcon color="success" />
                    <Box className={styles.summaryPartTextContainer}>
                      <p id={styles.summaryPartText}><b>10d 21h 46min</b></p>
                      <p id={styles.summaryPartText}>Łączny czas trwania</p>
                    </Box>
                  </Box>
                  <Box className={styles.summaryPart}>
                    <LocalFireDepartmentIcon color="error" />
                    <Box className={styles.summaryPartTextContainer}>
                      <p id={styles.summaryPartText}><b>97564 kcal</b></p>
                      <p id={styles.summaryPartText}>Łączna liczba kalorii</p>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box >
  );
}