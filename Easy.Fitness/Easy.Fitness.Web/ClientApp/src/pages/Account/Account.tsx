import styles from '../../public/modules/account.module.css';
import { Box, Button, Container, CssBaseline, Divider, Fade, IconButton, OutlinedInput, Toolbar, Tooltip } from '@mui/material';
import Navbar from '../../public/components/Navbar';
import Header from '../../public/components/Header';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DefaultProfilePicture from '../../public/img/assets/account/default.svg';
import { useState, useRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTooltip } from '../../public/components/StyledTooltip';
import HeightIcon from '@mui/icons-material/Height';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export default function Account() {

  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(DefaultProfilePicture);
  const [image, setImage] = useState<any | null>(null);
  const [isPhotoChanging, setIsPhotoChanging] = useState<boolean>(false);
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);

  const changePhotoRef = useRef<any | null>(null);

  const onPhotoClick = () => {
    changePhotoRef.current.click();
  };

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
          <Box className={styles.accountPanel}>
            <Box className={styles.profilePicturePanel}>
              <Box sx={{ display: 'flex' }}>
                <AccountCircleIcon color="error" sx={{ mr: '1ch' }} />
                <p>Twój profil</p>
              </Box>
              <Box className={styles.profilePictureContainer}>
                <input ref={changePhotoRef} hidden accept="image/*" type="file" multiple={false} onChange={previewPhoto} name="picture" />
                <Box sx={{ display: 'flex' }}>
                  <StyledTooltip title={"Zmień zdjęcie profilowe"}>
                    <IconButton
                      size="small"
                      sx={{
                        alignSelf: 'flex-start',
                        visibility: (isPhotoChanging || photoUrl !== DefaultProfilePicture ? 'visible' : 'hidden')
                      }}
                    >
                      <CheckIcon color="success" />
                    </IconButton>
                  </StyledTooltip>
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
                        visibility: (isPhotoChanging ? 'visible' : 'hidden')
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </StyledTooltip>
                </Box>
                <p id={styles.profilePictureText}>Imie Nazwisko</p>
                <p id={styles.profilePictureText}>Data urodzenia</p>
              </Box>
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
                      placeholder='100'
                      type='number'
                    />
                    <p style={{ marginLeft: '1ch' }}>kg</p>
                  </Box>
                  <p id={styles.profileParametersText}>Wzrost</p>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <OutlinedInput
                      className={styles.profileInput}
                      placeholder='180'
                      type='number'
                    />
                    <p style={{ marginLeft: '1ch' }}>cm</p>
                  </Box>
                  <Button id={styles.saveButton}>Zastosuj zmiany</Button>
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