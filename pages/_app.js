import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { configureStore } from '../flux/configureStore';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
            }
        };
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(configureStore, { debug: true })(MyApp);

// https://medium.com/@bhavikbamania/a-beginner-guide-for-redux-with-next-js-4d018e1342b2