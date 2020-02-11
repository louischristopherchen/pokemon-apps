import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = (props) => {
  const { pathConfig }     = props;
  const { path }           = pathConfig;
  const { navbar, active } = styles;
  return (
    <div className={navbar}>
      <Link to="/pokemon" className={path && path === "/pokemon/:id?" ? active : ""}>Pokemon List</Link>
      <Link to="/my-pokemon" className={path && path === "/my-pokemon/:id?" ? active : ""}>My Pokemon</Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { pathConfig } = state
  return { pathConfig }
}
export default connect(mapStateToProps, null)(Navbar);