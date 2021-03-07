import React, { useState } from 'react';
import './App.css';
import { Container, Grid, TextField, Button, AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6),
    },
    form: {
        padding: theme.spacing(6)
    }
}));

export default function App() {
    const classes = useStyles();

    const [errorMessageName, setErrorMessageName]  = useState('');
    const [errorMessageEmail, setErrorMessageEmail]  = useState('');
    const [errorMessageMessage, setErrorMessageMessage]  = useState('');

    const [postData, setPostData] = useState({
        name: '', 
        email: '', 
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let missingField = false;

        if (postData.name) {
            setErrorMessageName('');
        } else {
            setErrorMessageName('Missing Subject');
            missingField = true;
        }
        if (postData.email) {
            setErrorMessageEmail('');
        } else {
            setErrorMessageEmail('Missing Email');
            missingField = true;
        }
        if (postData.message) {
            setErrorMessageMessage('');
        } else {
            setErrorMessageMessage('Missing text');
            missingField = true;
        }

        if (missingField) {
            return;
        }

        // 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
        // https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
        //   Solved by editing API Gateway of "send-email" lambda to have "authorizationToken" in the comma delimited list of Access-Control-Allow-Headers only for OPTIONS (i.e. uncheck POST)
        axios.post("https://1adyv6kadj.execute-api.us-west-1.amazonaws.com/dev/send-email", 
        {
            "to": postData.email,
            "from" : "tracyngoc.le@gmail.com",
            "subject": postData.name,
            "text": postData.message
        }, {
            headers: {
              'authorizationToken': 'abc123',
              'Content-Type': 'application/json',
            }
        }
    )};

    

  return (
    <div className="App">
    <Container className={classes.container} maxWidth="sm">
        <AppBar className={ classes.appBar } position='static' color='inherit'>
            <Typography className= { classes.heading } variant='h3' align='center'>User Interface Challenge</Typography>
        </AppBar>
        <form className={ classes.form} onSubmit= { handleSubmit } validate>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        { errorMessageName ? 
                                <TextField error label="Error" helperText="Field required"
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setPostData({ ...postData, name: e.target.value })} 
                                />
                            : 
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setPostData({ ...postData, name: e.target.value })} 
                            />
                        }
                        </Grid> 

                        <Grid item xs={12}>
                        { errorMessageEmail ? 
                                <TextField error label="Error" helperText="Field required"
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setPostData({ ...postData, email: e.target.value })} 
                                />
                            : 
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setPostData({ ...postData, email: e.target.value })} 
                            />
                         }
                         </Grid> 
    
                        <Grid item xs={12}>
                        { errorMessageMessage ? 
                                <TextField error label="Error" helperText="Field required"
                                    fullWidth
                                    label="Message"
                                    name="message"
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
                                />
                            : 
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
                            />
                         }
                         </Grid> 
    
                    </Grid>
                    </Grid>
                    <Grid item xs={12}>

                    <Button color="secondary" fullWidth type="submit" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Container>
    </div>
  );
}
