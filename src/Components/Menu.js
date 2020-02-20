import React from 'react';
import '../style.css';

class Menu extends React.Component {
    render() {
        return (
            <div id='menu'>
                <div id='menuButton'>
                    <div id='topLine'></div>
                    <div id='middleLine'></div>
                    <div id='bottomLine'></div>
                </div>
                <ul id='nav'>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>About me</a></li>
                    <li><a href='#'>My Works</a></li>
                    <li><a href='#'>Contact</a></li>
                </ul>
            </div>
        );
    };
};

export default Menu;