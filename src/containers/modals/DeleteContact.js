import React ,{useState}from 'react';
import {Button,CircularProgress, Typography} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2'


export default function DeleteContact({opened,handleClose,gapi,listConnectionNames,resourceName}) {
const [loading, setLoading] = useState(false)

function handleDeleteContact(){
 setLoading(true)
   const newPromise = new Promise((resolve)=>{
     resolve(gapi)
   })
   .then(function () {
    return gapi.client.people.people.deleteContact({
        "resourceName": resourceName
    })

})
.then(function (response) {
//    console.log(response.result);
   listConnectionNames(()=>{
     Swal.fire({
       icon: 'success',
       title: 'Success',
       text: 'Contact deleted successfully'
     })
     setLoading(false)
     handleClose()
  })
}, function (reason) {
//    console.log('Error: ' + reason.result.error.message);
   setLoading(false)
   Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Unable to delete contact'
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
        <DialogTitle id="alert-dialog-title">Delete Contact</DialogTitle>
        <DialogContent>
            <Typography variant="body1">Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteContact}
            disabled={loading}
            size="small"
            variant="contained"
            color="primary"
          >
            {!loading?'Yes':<CircularProgress size={16}/>}
          </Button>
          <Button 
            onClick={handleClose}
            size="small"
            variant="outlined"
            color="primary"
        >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
