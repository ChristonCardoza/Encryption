import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector} from 'react-redux';

import useStyles from './styles';
import Message from './Message/Message';
const Messages = () => {

    const messages = useSelector((state) => state.messages);
    const classes = useStyles();

    // const { messages, isLoading } = useSelector((state) => state.messages);
    // console.log(messages);
    // if (!messages.length && !isLoading) {
    //     return 'No Messages!';
    // }
    // console.log("All Messages", messages)
    return (
        !messages.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    messages.map((message) => (
                        <Grid key={message._id} item xs={12} sm={6} md={6} lg={3}>
                            <Message message={message} />
                        </Grid>
                    ))
                }
            </Grid>
        )
     );
}

export default Messages;