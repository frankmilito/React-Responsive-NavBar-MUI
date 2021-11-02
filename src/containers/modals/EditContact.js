import React ,{useState,useEffect}from 'react';
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

export default function EditContact({opened,handleClose,gapi,listConnectionNames,emailAddress,givenName,surname,resourceName,etag}) {
const classes = useStyles()
const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [email,setEmail] = useState('')
const [loading, setLoading] = useState(false)
const [firstNameError,setFirstNameError] = useState('')
const [lastNameError,setLastNameError] = useState('')
const [emailError,setEmailError] = useState('')

function handleEditContact(){
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
   return gapi.client.people.people.updateContact({
    "resourceName": resourceName,
    "sources": [
      "READ_SOURCE_TYPE_CONTACT"
    ],
    "updatePersonFields": "emailAddresses,names",
    "resource": {
      "etag": etag,
      "emailAddresses": [
        {
          "value": email
        }
      ],
      "names": [
        {
          "givenName": firstName,
          "familyName": lastName
        }
      ]
    }
  })

})
.then(function (response) {
   console.log(response.result);
   listConnectionNames(()=>{
     Swal.fire({
       icon: 'success',
       title: 'Success',
       text: 'Contact Updated Successfully'
     })
     setLoading(false)
     handleClose()
  })

}, function (reason) {
setLoading(false)
Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Could not update contact'
  })
handleClose()
// console.log(reason)
});
};

useEffect(()=>{
    emailAddress && setEmail(emailAddress)
    givenName && setFirstName(givenName)
    surname && setLastName(surname)
},[surname,emailAddress,givenName])

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
            Modify Details
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            size="small" 
            type="text" 
            name="firstname"
            label="First Name"
            className={classes.field} 
            value={firstName}
            error={firstNameError}
            helperText={firstNameError} 
            onChange={e=>setFirstName(e.target.value)}
          /><br />
          <TextField
            variant="outlined"
            size="small"   
            type="text" 
            name="lastname"
            label="Last Name"
            className={classes.field}
            value={lastName}
            error={lastNameError}
            helperText={lastNameError}
            onChange={e=>setLastName(e.target.value)}
          /><br />
          <TextField
            variant="outlined"
            size="small"   
            type="text" 
            name="email"
            label="Email"
            value={email}
            error={emailError}
            helperText={emailError} 
            className={classes.field}
            onChange={e=>setEmail(e.target.value)}
          />
          
        </DialogContent>
        <DialogActions 
            className={classes.actionArea}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditContact}
            disabled={loading}
          >
            {!loading?'Edit Contact':<CircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
