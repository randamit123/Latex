import React from 'react';
/* import Link from "next/link"; */
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import myImage from './PaperLeaf logo (leaf only) (1).png';

export function Navbar(){
    const navigate = useNavigate();
    return(
        <div className='nav-bar'>
            <div>
                <img src={myImage} className='logo'/>
            </div>
            <div className='nav-options'>
                <button className='nav-button' onClick={() => navigate('/page')}>Home</button>
                <button className='nav-button'>Help</button>
                <button className='nav-button'>Account</button>
            </div>
        </div>
    )
} 