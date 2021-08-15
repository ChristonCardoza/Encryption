import React from 'react'
import {  AppBar, Typography}  from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Navbar = () => {

    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2">Messages</Typography>
            </div>        
        </AppBar>
    )
}

export default Navbar