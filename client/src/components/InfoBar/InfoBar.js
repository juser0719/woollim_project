import React from 'react';
import './InfoBar.css';
import closeIcon from '../icons/closeIcon.png';
import onIcon from '../icons/onIcon.png';


const InfoBar = ({room}) => (
    <div className = "info_Bar">
        <div className = "leftContainer">
            <img className = "onIcon" src = {onIcon} alt = "onicon"/>
            <h3>{room}</h3>
        </div>

        <div className = "rightContainer">
            <a href = "/"><img src = {closeIcon} alt = "close" /></a>
        </div>
    </div>

);

export default InfoBar;