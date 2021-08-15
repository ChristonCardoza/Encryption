import React from 'react';
import { Container}  from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import Navbar from './component/Navbar/Navbar';
import MessageDetails from './component/MessageDetails/MessageDetails';

const  App = () => {
    
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/messages/:id"  component={MessageDetails} />
                </Switch>
            </Container>
        </BrowserRouter>
        
    )
}

export default App;