import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar2.css';

export function Navbar2() {
  const location = useLocation();
  if (
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register'
  ) {
    return <div />;
  }

  return (
    <div className="NavBar2">
      <Link className="navButton" to="/userInfo">
        <button className="button-31user2" type="button">
          Information
        </button>
      </Link>
      <Link className="navButton" to="/sondage">
        <button className="button-31user2" type="button">
          Sondage
        </button>
      </Link>
      <Link className="navButton" to="/listes">
        <button className="button-31user2" type="button">
          Voter
        </button>
      </Link>
    </div>
  );
}
