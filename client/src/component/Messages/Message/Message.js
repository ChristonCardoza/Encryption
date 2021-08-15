import React from 'react';
import { Card, CardMedia, Typography, ButtonBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

import useStyles from './styles';
import msgImage1 from '../../../images/1.jpg';
import msgImage2 from '../../../images/2.png';
import msgImage3 from '../../../images/3.png';
import msgImage4 from '../../../images/4.jpg';


    
const Message = ({ message }) => {
    const classes = useStyles();
    const history = useHistory();
    const images = [msgImage1, msgImage2, msgImage3, msgImage4];

    const openMessage = () => {

       history.push(`/messages/${message._id}`);

    }

    // console.log("SingleMessage", message)

    return (

        <Card className={classes.card} raised elevation={6} >
            <ButtonBase  className={classes.cardAction} component="span" onClick={openMessage} >
                <CardMedia className={classes.media} image={images[Math.floor(Math.random() * images.length)]} title={message.startDate} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{message._id}</Typography>
                    <Typography variant="body2">{message.startDate}</Typography>
                    <Typography variant="body2">{message.endDate}</Typography>
                </div>
            </ButtonBase>    
        </Card>

    );
}

export default Message;