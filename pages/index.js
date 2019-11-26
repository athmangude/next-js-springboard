import React, { Component } from 'react';
import { connect } from 'react-redux';
import initialize from '../utils/initialize';

@connect((state) => ({ items: state.items }))
export default class Home extends Component {
    static getInitialProps(ctx) {
        initialize(ctx);
    }
    
    render() {
        return (
            <div>
                <h1>Home page will come here</h1>
            </div>
        );
    }
}

// export default connect((state) => ({ items: state.items }))(Home);