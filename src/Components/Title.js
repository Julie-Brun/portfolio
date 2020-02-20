import React from 'react';
import '../style.css';

class Title extends React.Component {
    render() {
        return (
            <div id="title">
                <h1>{this.props.name}</h1>
                <h2>{this.props.work}</h2>
            </div>
        );
    };
};

export default Title;