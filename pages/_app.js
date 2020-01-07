import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
// import { ThemeProvider } from 'styled-components'
import { configureStore } from 'Flux/configureStore';
import theme from 'Config/theme';
import ThemeProvider from 'Utils/StyledMaterialThemeProvider';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
            }
        };
    }

    componentDidMount() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/static/sw.js')
                .then(registration => {
                    console.log('service worker registration successful')
                })
                .catch(err => {
                    console.warn('service worker registration failed', err.message)
                })
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(configureStore, { debug: false })(MyApp);

// https://medium.com/@bhavikbamania/a-beginner-guide-for-redux-with-next-js-4d018e1342b2