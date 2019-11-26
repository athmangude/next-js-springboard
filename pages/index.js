import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect((state) => ({ items: state.items }))
export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home page will come here</h1>
            </div>
        );
    }
}

// export default connect((state) => ({ items: state.items }))(Home);