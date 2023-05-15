import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';



function Nav() {
    const [active, IsActive] = useState(false);

    const handleNavClick = () => {
        IsActive(false);
    }

    return (
        <div className='Navbar'>
            <span className='nav-logo'>
                <h1>WebScraper</h1>
            </span>
            <div className={`nav-items ${active && "switch"}`}>
                <Link to={"/home"} onClick={handleNavClick}>Home</Link>
                <Link to={"/amazon"} onClick={handleNavClick}>Amazon</Link>
                <Link to={"/snapdeal"} onClick={handleNavClick}>SnapDeal</Link>
                <Link to={"/flipkart"} onClick={handleNavClick}>FlipKart</Link>
            </div>
            <div className={`nav-toggle ${active && "switch"}`}
                onClick={() => IsActive(!active)}>
                <div className='navs'></div>
            </div>
        </div>
    );
};

export default Nav