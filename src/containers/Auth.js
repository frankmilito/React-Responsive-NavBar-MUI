import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Grid,Typography,Button,Paper,Box} from '@material-ui/core'
import { SET_USER } from '../redux/constants'
import { useHistory } from 'react-router'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
  maxWidth:'100%',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '40%',
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: '10%',
  },
  },
  paper:{
    maxWidth: '100%',
    padding: 16
  },
  box:{
    marginTop: 16
  }
}));

const Auth =({handleAuthClick,handleSignoutClick,handleClientLoad,gapi})=>{
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
   const {isAuthenticated} = useSelector(state=>state.auth)

     useEffect(()=>{
        handleClientLoad() 
     },[])

     useEffect(()=>{
         if(isAuthenticated){
           let profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
           let username = profile.getName() 
           let useremail = profile.getEmail()
          dispatch({
            type: SET_USER,
            name: username,
            email: useremail
          })
            history.push('/contacts')
         }
     },[isAuthenticated])
    return (
        <div className={classes.root}>
          <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Paper
                elevation={3}
                className={classes.paper}
              >
                <Grid 
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.container}
                >
                <Grid item>
                  <Typography variant="h2">WELCOME</Typography>
                  <Typography variant="caption">
                    Your Google contacts are a click away!
                  </Typography>
                </Grid>
                <Grid 
                  item
                  className={classes.cardContainer}
                >
                  <Box 
                    className={classes.box}
                  >
                    
                        {!isAuthenticated&&
                          <Button 
                            onClick={handleAuthClick}
                            variant="contained"
                            color="primary"
                          >
                            Sign In
                        </Button>
                        }
                        {isAuthenticated &&
                        <Button 
                          onClick={handleSignoutClick}
                          variant="outlined"
                        >
                            Sign Out
                        </Button>
                        }
                   </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
    )
}

export default Auth