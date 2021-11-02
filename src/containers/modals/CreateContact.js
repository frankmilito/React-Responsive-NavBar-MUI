import React ,{useState}from 'react';
import {Button,CircularProgress,TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  field:{
    marginBottom: 8,
    marginTop:8
  },
  actionArea:{
    paddingBottom: 16,
    display:'flex',
    justifyContent:'center'
  },
  center:{
    display:'flex',
    justifyContent:'center'
  }         

});


export default function CreateContact({opened,handleClose,gapi,listConnectionNames}) {
const classes = useStyles()
const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [email,setEmail] = useState('')
const [loading, setLoading] = useState(false)
const [firstNameError,setFirstNameError] = useState('')
const [lastNameError,setLastNameError] = useState('')
const [emailError,setEmailError] = useState('')

function handleCreateContact(){
  if(!email||!lastName||!firstName){
    !email? setEmailError('email is required') : setEmailError('')
    !firstName ? setFirstNameError('First name is required'): setFirstNameError('')
    !lastName ? setLastNameError('Last name is required') :  setLastNameError('')
    return
  }else{
    setFirstNameError('')
    setLastNameError('')
    setEmailError('')
  }

 setLoading(true)
   new Promise((resolve)=>{
     resolve(gapi)
   })
   .then(function () {
   return gapi.client.request({
       'method': "POST",
       'path': 'https://people.googleapis.com/v1/people:createContact',
       'datatype': 'jsonp',
       'parent': "Kante",
       'body': {
           "names": [
               {
                   "givenName": firstName,
                   "familyName": lastName
               }
           ],
           "emailAddresses": [
               {
                   "value": email
               }
           ],
       }
   })

})
.then(function (response) {
  //  console.log(response.result);
   listConnectionNames(()=>{
     Swal.fire({
       icon: 'success',
       title: 'Success',
       text: 'Contact created successfully'
     })
     setLoading(false)
     setEmail('')
     setFirstName('')
     setLastName('')
     handleClose()
  })
}, function (reason) {
   setLoading(false)
   setEmail('')
   setFirstName('')
   setLastName('')
   Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Could not create contact'
  })
  handleClose()
});
};

  return (
    <div>
      <Dialog
        open={opened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle 
          id="alert-dialog-title"
          className={classes.center}
        >
          Contact's Details
        </DialogTitle>
        <DialogContent>
          <TextField 
            variant="outlined"
            type="text" 
            name="firstname"
            label="First Name"
            size="small"
            error={firstNameError}
            helperText={firstNameError} 
            onChange={e=>setFirstName(e.target.value)}
            className={classes.field}
          /><br />
          <TextField
            variant="outlined" 
            type="text" 
            name="lastname"
            label="Last Name"
            size="small"
            error={lastNameError}
            helperText={lastNameError} 
            onChange={e=>setLastName(e.target.value)}
            className={classes.field}
          /><br />
          <TextField
            variant="outlined" 
            type="email" 
            name="email"
            label="Email"
            size="small"
            error={emailError}
            helperText={emailError} 
            onChange={e=>setEmail(e.target.value)}
            className={classes.field}
          />
          
        </DialogContent>
        <DialogActions 
          className={classes.actionArea}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateContact}
            disabled={loading}
          >
            {!loading?'CREATE CONTACT':<CircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
