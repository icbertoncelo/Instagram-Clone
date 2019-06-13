import React from 'react';
import { Link } from 'react-router-dom';

import './styles.sass';

import Logo from '../../assets/logo.svg';
import Camera from '../../assets/camera.svg';

const Header = () => (
  <header id="main-header">
    <div className="header-content">
      <Link to="/">
        <img src={Logo} alt="Instagram Clone" />
      </Link>
      <Link to="/new">
        <img src={Camera} alt="Send" />
      </Link>
    </div>
  </header>
);

export default Header;
