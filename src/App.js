import './App.css';
import { Container, Grid, TextField, Button, AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <div className="App">
    <Container className={classes.container} maxWidth="sm">
        <AppBar className={ classes.appBar } position='static' color='inherit'>
            <Typography className= { classes.heading } variant='h3' align='center'>User Interface Challenge</Typography>
        </AppBar>
        <form className={ classes.form}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Name" name="name" size="small" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField fullWidth label="Email" name="email" size="small" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            size="small"
                            variant="outlined"
                        />
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


