import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="headerContainer">
                <div className="topBar">
                    <span class="appTitle">DSA Visualiser</span>
                    <ul className="menus">
                        <a><li>Home</li></a>
                        <a><li>About</li></a>
                        <a><li>Contact</li></a>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;