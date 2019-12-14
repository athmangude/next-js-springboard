import React, { Component } from 'react';
import { connect } from 'react-redux';
import initialize from 'Utils/initialize';


import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Panel from 'Components/panel';

import TopNavigationBarLayout from 'Layouts/top-navigation-bar-layout';

@connect((state) => ({ items: state.items }))
export default class Home extends Component {
    static getInitialProps(ctx) {
        initialize(ctx);
    }
    
    render() {
        return (
            <TopNavigationBarLayout title="Home">
                <Container maxWidth="md">
                    <Box my={4}>
                        <Typography variant="h4" gutterBottom>Next.JS Springboard</Typography>
                        <Typography variant="body1" gutterBottom>Build something awesome</Typography>
                        <Panel />
                    </Box>
                </Container>
            </TopNavigationBarLayout>
        );
    }
}

// export default connect((state) => ({ items: state.items }))(Home);