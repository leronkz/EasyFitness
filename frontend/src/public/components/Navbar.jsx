import React from "react";
import styles from '../modules/navbar.module.css';
import { IconButton, Tooltip } from "@mui/material";
import HomeIcon from '../img/assets/navbar/home.svg';
import ActivityIcon from '../img/assets/navbar/activity.svg';
import ScheduleIcon from '../img/assets/navbar/schedule.svg';
import DietIcon from '../img/assets/navbar/diet.svg';
import LogoutIcon from '../img/assets/navbar/logout.svg';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
function Navbar(props){
    

    return(

        <div className={styles.navbarMain}>
            <div className={styles.mainNavPanel}>
                <Link to="/dashboard">
                    <Tooltip title="Go to Dashboard">
                    <IconButton
                        size="medium"
                        // sx={{background:"orange"}}
                    >
                        <img id={styles.navIcon} src={HomeIcon}/>    
                    </IconButton>
                    </Tooltip>
                </Link>
                <Link to="/activity">
                    <Tooltip title="Go to Activity">
                    <IconButton
                        size="medium"
                    >
                        <img id={styles.navIcon} src={ActivityIcon}/>       
                    </IconButton>
                    </Tooltip>
                </Link>
                <Link to="/schedule">
                    <Tooltip title="Go to Schedule">
                    <IconButton
                        size="medium"
                    >
                        <img id={styles.navIcon} src={ScheduleIcon}/>    
                    </IconButton>
                    </Tooltip>
                </Link>
                <Link to="/diet">
                    <Tooltip title="Go to Diet">
                    <IconButton
                        size="medium"
                    >
                        <img id={styles.navIcon} src={DietIcon}/>    
                    </IconButton>
                    </Tooltip>
                </Link>
                <Link to="/">
                    <Tooltip title="Logout">
                    <IconButton
                        size="medium"
                    >
                        <img id={styles.navIcon} src={LogoutIcon} style={{marginLeft:9}}/>    
                    </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className={styles.bottomNavPanel}>
                    <Avatar alt="Profile picture" sx={{width:56, height:56}}/>
            </div>
        </div>

    );

}

export default Navbar;