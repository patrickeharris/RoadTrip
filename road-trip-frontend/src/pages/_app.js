import React from 'react';
import { Provider } from 'react-redux';
import { buildStore } from '../util/redux';

import Head from 'next/head';
import { CssBaseline } from '@material-ui/core';
import { RoadTripThemeProvider } from '../util/theme';

import {Navbar} from '../components';
import { About, Footer, Header } from '../containers';

import './styles/app.css';

let initialState = {};
let store = buildStore(initialState);

const RoadTripApp = ({ Component, pageProps }) => {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider store={ store }>
            <Head>
                <title>TrailBlazers</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <RoadTripThemeProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />

                <Component {...pageProps} />
            </RoadTripThemeProvider>
            <div className="App">
            </div>
        </Provider>
    )


};

export default RoadTripApp;