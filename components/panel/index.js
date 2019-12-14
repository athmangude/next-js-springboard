import styled from 'styled-components';
import styles from './index.css';
import Typography from '@material-ui/core/Typography';

const PanelWrapper = styled.div`${styles}`;

export default () => (
    <PanelWrapper>
        <Typography variant="body1">Springboard enables you kickstart your next ReactJS projects using NextJS. It packs all the benefits of server-rendering alongside <code>redux</code>for state management, <code>material-ui</code> and <code>styled-components</code>.</Typography>
        <br />
        <Typography variant="body2">Happy coding</Typography>
    </PanelWrapper>
)