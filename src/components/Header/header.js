import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    render() {
        return (
            <header className="headerContainer">
                <h2 className="appTitle">DSA Visualiser</h2>
                <ul className="menus">
                    <a className="menuItem"><li>Home</li></a>
                    <a className="menuItem"><li>About</li></a>
                    <a className="menuItem"><li>Contact</li></a>
                </ul>
            </header>
        )
    }
}

export default Header;