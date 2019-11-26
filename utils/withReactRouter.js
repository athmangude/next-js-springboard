import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

const isServer = typeof window === 'undefined';

export default App => {
    return class AppWithReactRouter extends Component {
        static async getInitialProps(appContext) {
            const {
                ctx: {
                    req: {
                        originalUrl,
                        locals = {},
                    },
                },
            } = appContext;

            return {
                originalUrl,
                context: locals.context || {},
            };
        }

        render() {
            console.log('[this.props]', this.props);
            if (isServer) {
                const { StaticRouter } = require('react-router');

                return (
                    <StaticRouter
                        location={this.props.originalurl}
                        context={this.props.context}
                    >
                        <App {...this.props} />
                    </StaticRouter>
                );
            }

            return (
                <BrowserRouter>
                    <App {...this.props} />
                </BrowserRouter>
            );
        }
    }
}