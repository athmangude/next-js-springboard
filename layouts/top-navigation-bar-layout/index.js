import Head from 'next/head';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default ({ children, title="Springboard" }) => {
    return (
        <div className="top-navigation-bar-layout">
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header className="navigation-bar">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Springboard
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
            <div className="content">
                {children}
            </div>
        </div>
    )
}