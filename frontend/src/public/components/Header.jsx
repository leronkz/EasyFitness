import React from 'react';
import Logo from '../img/logo_dashboard.svg';
import styles from '../modules/header.module.css';
import {Divider, IconButton, Tooltip} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router';
function Header(props){
    const navigate = useNavigate();
    const {title} = props;
    return(

        <div className={styles.headerMain}>
            <div className={styles.controlPanel}>
                <div className={styles.leftControl}>
                    <img id={styles.headerLogo} src={Logo} alt="Easy Fitness Logo"/>
                    <span className={styles.headerText}>{title}</span>
                </div> 
                <div className={styles.rightControl}>
                    <Tooltip title="Go back">
                        <IconButton
                         size="medium"
                         onClick = {() => navigate(-1)}
                        //  disabled
                        >
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Go forward">
                        <IconButton
                         size="medium"
                         onClick={()=> navigate(1)}
                        //  disabled
                        >
                            <ChevronRightIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <Divider sx={{width:"100%", borderBottomWidth:2}} />
        </div>

    );
}

export default Header;