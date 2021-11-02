import React from 'react'
import './App.css';
import Contacts from './containers/Contacts'
import Auth from './containers/Auth'
import {Switch,Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { GET_ALL_CONTACTS, SET_AUTH_STATE } from './redux/constants';
import { ThemeProvider, createTheme} from "@material-ui/core";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffffff"
    },
    primary: {
      main: "#000"
    }
  }
});


function App() {
  const dispatch = useDispatch()
  const gapi = window.gapi
   var CLIENT_ID = '816750444077-vdd4sv7tac9cnvg20pgeg7cio76q4i55.apps.googleusercontent.com';
   var API_KEY = 'AIzaSyAtk1somnFr7o5zI-HMKU9oSsQ0Pkus028';
   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
   var SCOPES = "https://www.googleapis.com/auth/contacts";

   function handleClientLoad() {
     gapi.load('client:auth2', initClient);
   }

   function initClient() {
     gapi.client.init({
       apiKey: API_KEY,
       clientId: CLIENT_ID,
       discoveryDocs: DISCOVERY_DOCS,
       scope: SCOPES
     }).then(function () {
       // Listen for sign-in state changes.
       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
       // Handle the initial sign-in state.
       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      let authValue = gapi.auth2.getAuthInstance().isSignedIn.get()
       dispatch({
          type: SET_AUTH_STATE,
          payload: authValue
       })
     }, function(error) {
         console.log('GAPI INIT ERROR',error)
     });
   }

   function updateSigninStatus(isSignedIn) {
     if (isSignedIn) {
       listConnectionNames(()=>null);
     } 
   }
   async function handleAuthClick(event) {
     await gapi.auth2.getAuthInstance().signIn();
    let authValue = gapi.auth2.getAuthInstance().isSignedIn.get()
    dispatch({
       type: SET_AUTH_STATE,
       payload: authValue
    })
   }

  async function handleSignoutClick(event) {
     await gapi.auth2.getAuthInstance().signOut();
     let authValue = gapi.auth2.getAuthInstance().isSignedIn.get()
     dispatch({
        type: SET_AUTH_STATE,
        payload: authValue
     })
   }

   function listConnectionNames(cb) {
     gapi.client.people.people.connections.list({
        'resourceName': 'people/me',
        'pageSize': 10,
        'personFields': 'names,emailAddresses',
      }).then(function(response) {
        var connections = response.result.connections;
        if (connections?.length > 0) {
            // console.log(connections)
            dispatch({
              type: GET_ALL_CONTACTS,
              payload: connections
          })
          cb()
        } else {
          console.log('No connections found.')
        }
      });
   }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Switch>
          <Route  exact path="/" >
            <Auth 
              initClient={initClient} 
              handleClientLoad={handleClientLoad}
              handleAuthClick={handleAuthClick}
              handleSignoutClick={handleSignoutClick}
              gapi={gapi}
            />
          </Route>
          <Route exact path="/contacts">
            <Contacts 
              handleSignoutClick={handleSignoutClick} 
              gapi={gapi}
              listConnectionNames={listConnectionNames}
            />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
