import React from 'react';
import {withRouter} from 'react-router-dom';
import '../style.css';
import Header from './Header';
import Planet from './Planet';
import WithLoading from './WithLoading';
// import Focus from './Focus';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };

        // Bind
        // this.onTime = this.onTime.bind(this);
    };
    
    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), 3000);
    };

    render() {
        if (this.state.loading === true) {
            return (
                <div id='home'>
                <WithLoading/>
                </div>
            )
        };
        if (this.state.loading === false) {
            return (
                <div id='home'>
                    <Header/>
                    <Planet/>
                </div>
            )
        };
    };
};

export default withRouter(Home);