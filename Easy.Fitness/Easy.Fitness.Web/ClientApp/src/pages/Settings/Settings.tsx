import { Box, Container, CssBaseline, OutlinedInput, Button, Toolbar, FormControl, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';
import Navbar from '../../public/components/Navbar';
import Header from '../../public/components/Header';
import styles from '../../public/modules/settings.module.css';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import KeyIcon from '@mui/icons-material/Key';
import TranslateIcon from '@mui/icons-material/Translate';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useState } from 'react';

export default function Settings() {

  const [language, setLanguage] = useState<string>('Polski');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  }

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
                />
                <p id={styles.profileEditFormText}>Nazwisko</p>
                <OutlinedInput
                  className={styles.settingInput}
                  placeholder='Nazwisko'
                />
                <p id={styles.profileEditFormText}>Numer telefonu</p>
                <MuiPhoneNumber
                  className={styles.settingInput}
                  onChange={() => { }}
                  style={{ fontFamily: 'Lexend' }}
                  variant='outlined'
                  defaultCountry={'pl'}
                  name="phone"
                />
                <p id={styles.profileEditFormText}>Data urodzenia</p>
                <OutlinedInput
                  className={styles.settingInput}
                  type='date'
                />
                <Button id={styles.saveButton}>Zastosuj zmiany</Button>
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
                  />
                  <p id={styles.passwordEditFormText}>Nowe hasło</p>
                  <OutlinedInput
                    className={styles.settingInput}
                    type='password'
                    placeholder='******'
                  />
                  <Button id={styles.saveButton}>Zastosuj zmiany</Button>
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
                      onChange={handleChange}
                      displayEmpty
                      style={{
                        fontFamily: 'Lexend'
                      }}
                    >
                      <MenuItem sx={{fontFamily: 'Lexend'}} value={'pl'}>Polski</MenuItem>
                      <MenuItem sx={{fontFamily: 'Lexend'}} value={'en'}>English</MenuItem>
                      <MenuItem sx={{fontFamily: 'Lexend'}} value={'de'}>Deutsch</MenuItem>
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