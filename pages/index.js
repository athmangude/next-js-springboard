import React, { Component } from 'react';
import { connect } from 'react-redux';

// @connect((state) => ({ items: state.items }))
class Home extends Component {
    // static async getInitialProps(ctx) {
    //     console.log(ctx);
    // }
    
    render() {
        return (
            <div>
                <h1>Home page will come here</h1>
            </div>
        );
    }
}

export default connect((state) => ({ items: state.items }))(Home);