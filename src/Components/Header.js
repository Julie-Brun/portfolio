import React from 'react';
import '../style.css';
import Title from './Title';
import Menu from './Menu';

class Header extends React.Component {

    render() {
        return (
            <div id='header'>
                <Title name='Julie Brun' work='Développeuse Web'/>
                {/* <Menu/> */}
            </div>
        )
    }
}

export default Header;