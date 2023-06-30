import React from 'react';
import Header from '../../public/components/Header';
import styles from '../../public/modules/main.module.css'
import Navbar from '../../public/components/Navbar';
import nextIcon from '../../public/img/assets/go_next.svg';
import gymIcon from '../../public/img/assets/activity/gym.svg';
import runningIcon from '../../public/img/assets/activity/running.svg';
import swimmingIcon from '../../public/img/assets/activity/swimming.svg';
import energyIcon from '../../public/img/assets/diet/energy.svg';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
function Main(){
    
    return(

        <div className={styles.container}>
            <header><Header title={"Dashboard"}/></header>
            <div className={styles.mainPanel}>
                <Navbar/>
                <div className={styles.tilesMenu}>
                    <div className={styles.tileRow}>
                        <Link to="/activity" style={{textDecoration:"none"}}>
                            <div className={styles.tile} style={{background: "#F2F9DE"}}>
                                <div className={styles.tileHeader}>
                                    <p className={styles.tileHeaderText}>Activity</p>
                                    <img alt="Go" src={nextIcon}/>
                                </div>
                                <Divider sx={{mt:"1ch", borderBottomWidth:2}}/>
                                <div className={styles.tileBody}>
                                    <div className={styles.activityPreview}>
                                        <div className={styles.activityIconContainer}>
                                            <img alt="activity-icon" src={gymIcon} id={styles.activityIcon}/>
                                        </div>
                                        <p className={styles.tileBodyText}>Gym</p>
                                        <p className={styles.tileBodyText}>17.06.2023</p>
                                    </div>
                                    <div className={styles.activityPreview}>
                                        <div className={styles.activityIconContainer}>
                                            <img alt="activity-icon" src={runningIcon} id={styles.activityIcon}/>
                                        </div>
                                        <p className={styles.tileBodyText}>Running</p>
                                        <p className={styles.tileBodyText}>15.06.2023</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/account" style={{textDecoration:"none"}}>
                            <div className={styles.tile} style={{background:"rgba(90, 128, 226, 0.50)", height:"fit-content"}}>
                                <div className={styles.tileHeader}>
                                    <p className={styles.tileHeaderText}>My account</p>
                                    <img alt="Go" src={nextIcon}/>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.tileRow}>
                        <Link to="/schedule" style={{textDecoration:"none"}}>
                            <div className={styles.tile} style={{background:"#FFF"}}>
                                <div className={styles.tileHeader}>
                                    <p className={styles.tileHeaderText}>Schedule</p>
                                    <img alt="Go" src={nextIcon}/>
                                </div>
                                <Divider sx={{mt:"1ch", borderBottomWidth:2}}/>
                                <div className={styles.tileBody}>
                                    <p className={styles.tileBodyText} style={{marginBottom: "3ch"}}>Next planned activity:</p>
                                    <div className={styles.activityPreview}>
                                        <div className={styles.activityIconContainer} style={{background:"rgba(242, 249, 222, 1)"}}>
                                            <img alt="activity-icon" src={swimmingIcon} id={styles.activityIcon}/>
                                        </div>
                                        <p className={styles.tileBodyText}>Swimming</p>
                                        <p className={styles.tileBodyText}>19.06.2023</p>
                                    </div>
                                </div>   
                            </div>
                        </Link>
                        <Link to="/settings" style={{textDecoration:"none"}}>
                            <div className={styles.tile} style={{background:"rgba(203, 216, 249, 0.50)", height: "fit-content"}}>
                                <div className={styles.tileHeader}>
                                    <p className={styles.tileHeaderText}>Settings</p>
                                    <img alt="Go" src={nextIcon}/>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.tileRow}>
                        <Link to="/diet" style={{textDecoration:"none"}}>
                            <div className={styles.tile} style={{background:"#DFFDFF"}}>
                                <div className={styles.tileHeader}>
                                    <p className={styles.tileHeaderText}>Diet</p>
                                    <img alt="Go" src={nextIcon}/>
                                </div>
                                <Divider sx={{mt:"1ch", borderBottomWidth:2}}/>
                                <div className={styles.tileBody} style={{justifyContent:"space-between"}}>
                                    <div className={styles.energyHeader}>
                                        <div className={styles.activityIconContainer} style={{background:"rgba(255, 251, 217, 1)"}}>
                                            <img alt="energy-icon" src={energyIcon} id={styles.activityIcon}/>
                                        </div>
                                        <p className={styles.tileBodyText}>1865 / 2500 kcal</p>
                                    </div>
                                    <div className={styles.nutritionTable}>
                                        <div style={{display:"flex", flexDirection:"column"}}>
                                            <p className={styles.tileBodyText}>Carbs</p>
                                            <p className={styles.tileBodyText}>150/170 g</p>
                                        </div>
                                        <div style={{display:"flex", flexDirection:"column"}}>
                                            <p className={styles.tileBodyText}>Protein</p>
                                            <p className={styles.tileBodyText}>80/120 g</p>
                                        </div>
                                        <div style={{display:"flex", flexDirection:"column"}}>
                                            <p className={styles.tileBodyText}>Fat</p>
                                            <p className={styles.tileBodyText}>30/45 g</p>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </Link>
                        <Link to="/" style={{textDecoration:"none"}}>
                            <div className={styles.tile} style={{background:"rgba(203, 249, 240, 0.50)", height:"fit-content"}}>
                                <div className={styles.tileHeader}>
                                    <p className={styles.tileHeaderText}>Logout</p>
                                    <img alt="Go" src={nextIcon}/>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Main;