import React, { useEffect } from 'react'
import { Container, Grow, Grid }  from '@material-ui/core';
import { useDispatch } from 'react-redux';


import { getMessages } from '../../action/message';
import Messages from '../Messages/Messages';
import useStyles from './styles';

const Home = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Messages />
                    </Grid> 
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home