import React from 'react';
import {withRouter} from 'react-router-dom';
import '../style.css';
// import Loading from './Loading';
import Header from './Header';
// import Planet from './Planet';
// import Focus from './Focus';

class Home extends React.Component {
    render() {
        return (
            <div id='home' >
                <Header/>
            </div>
        )
    }
};

export default withRouter(Home);