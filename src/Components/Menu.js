import React from 'react';
import '../style.css';

class Menu extends React.Component {
    constructor () {
        super();

        this.state = {
            toggle: false
        };

        // Bind
        this.handleClick = this.handleClick.bind(this);
    };



    handleClick() {

        this.setState({
            toggle: !this.state.toggle
        });
    }

    render() {

        const styles = {
            lineTop: {
              transform: this.state.toggle ? ' translate(4px) rotate(45deg)':'none',
              transformOrigin: 'top left',
              marginBottom: '5px',
            },
            lineMiddle: {
              opacity: this.state.toggle ? 0: 1,
              transform: this.state.open ? 'translateX(-16px)':'none',
            },
            lineBottom: {
              transform: this.state.toggle ? 'translateX(-1px) rotate(-45deg)':'none',
              transformOrigin: 'top left',
              marginTop: '5px',
            },
            open: {
                transform: this.state.toggle ? 'none':'translateX(250px)',
            }
        }

        return (
            <div id='menu'>
                <div id='menuButton' onClick={this.handleClick}>
                    <div style={{...styles.lineTop}}/>
                    <div style={{...styles.lineMiddle}}/>
                    <div style={{...styles.lineBottom}}/>
                </div>
                <ul id='nav' style={{...styles.open}} >
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