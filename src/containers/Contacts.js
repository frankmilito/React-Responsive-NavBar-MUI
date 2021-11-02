import React, {useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {
  Grid,Button,Box,IconButton,
  Typography,
  Table,TableCell,TableContainer,TableHead,TableRow,TableBody,Paper
} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import {makeStyles} from '@material-ui/core/styles'
import CreateContact from './modals/CreateContact'
import { useHistory } from 'react-router'
import DeleteContact from './modals/DeleteContact'
import EditContact from './modals/EditContact'


const useStyles = makeStyles(theme=>({
    root: {
      padding: 16,
    },
    btn:{
      marginRight: 8
    },
    tableContainer:{
      marginTop: 32
    },
    heading:{
      marginBottom: 32
    },
    box:{
      marginTop: 24,
    },
    account:{
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: 8
    }
}))

function Contacts({handleSignoutClick,gapi,listConnectionNames}){
    const classes = useStyles()
    const history = useHistory()
    const contactList = useSelector(state=>state.contact.contacts)
    const {isAuthenticated,currentUser,userEmail}= useSelector(state=>state.auth)
    const [open, setOpen] = React.useState(false);
    const [isDelete, setIsDelete] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const [isEdit,setIsEdit] = useState(false)
    const [resourceId,setResourceId]= useState('')
    const [firstName,setFirstName]= useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
    const [tag,setTag] = useState()
      
    const handleClose = () => {
      setOpen(false);
    };

    const handleDeleteContact = (resourceName)=>{
      setResourceId(resourceName)
      setIsCreate(false)
      setIsEdit(false)
      setIsDelete(true)
      setOpen(true)
    }

    const handleCreateContact = ()=>{
      setIsDelete(false)
      setIsEdit(false)
      setIsCreate(true)
      setOpen(true)
    }

    const handleEditContact = (resourceName,lastname,firstname,email,etag)=>{
      setEmail(email)
      setFirstName(firstname)
      setLastName(lastname)
      setResourceId(resourceName)
      setTag(etag)
      setIsDelete(false)
      setIsCreate(false)
      setIsEdit(true)
      setOpen(true)
    }

    useEffect(()=>{
      if(!isAuthenticated){
        history.push('/')
      }
    },[isAuthenticated])

    return(
        <div className={classes.root}>
            <Box className={classes.account}>
              <Typography variant="caption">
                {`signed in as ${userEmail}`}
              </Typography>
            </Box>
            <Grid 
              container
              justifyContent="flex-end"
              spacing={1}
            >
              <Button
                variant="contained"
                color="primary" 
                onClick={handleCreateContact}
                className={classes.btn}
              >
                Create Contact
              </Button>
              <Button 
                variant="outlined"
                color="primary"
                onClick={handleSignoutClick}
              >
                Sign Out
              </Button>
            </Grid>
            <Grid container 
              className={classes.tableContainer}
              justifyContent="center"
            >
              <Grid item xs={12} md={8}>
                <Typography variant="h5" className={classes.heading}>
                  { `${currentUser}'s Google Contacts`}
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Action(s)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contactList && contactList.length>0 && contactList.map((contact,index) => {
                        const {names,emailAddresses,resourceName,etag} = contact
                        let safeEmail
                        !emailAddresses ? safeEmail =[{value:""}]: safeEmail=emailAddresses
                        return (<TableRow
                          key={index+names[0].givenName}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {index+1}
                          </TableCell>
                          <TableCell align="right">{names && names[0]?.givenName}</TableCell>
                          <TableCell align="right">{names && names[0]?.familyName}</TableCell>
                          <TableCell align="right">{emailAddresses && emailAddresses[0]?.value}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              aria-label="edit"
                              size="small"
                              onClick={()=>handleEditContact(resourceName,names[0].familyName,names[0].givenName,safeEmail[0].value,etag)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              aria-label="delete"
                              size="small"
                              onClick={()=>handleDeleteContact(resourceName)}
                              style={{color:"red"}}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )})}

                    </TableBody>
                  </Table>
                </TableContainer>
                {
                        !contactList || contactList.length===0 && 
                          <Box className={classes.box}>
                            <Typography>
                              You do not have any contacts.
                            </Typography>
                          </Box>
                }
              </Grid>
            </Grid>
            {isCreate&&!isDelete&&!isEdit&&
              <CreateContact 
              opened={open} 
              handleClose={handleClose} 
              gapi={gapi}
              listConnectionNames={listConnectionNames}
            />
            }
            {isDelete&&!isCreate&&!isEdit&&
              <DeleteContact 
                resourceName={resourceId}
                opened={open} 
                handleClose={handleClose} 
                gapi={gapi}
                listConnectionNames={listConnectionNames}
              />
            }
            {isEdit&&!isCreate&&!isDelete&&
              <EditContact 
                resourceName={resourceId}
                emailAddress={email}
                givenName={firstName}
                surname={lastName}
                opened={open}
                etag={tag} 
                handleClose={handleClose} 
                gapi={gapi}
                listConnectionNames={listConnectionNames}
              />
            }
        </div>
    )
}

export default Contacts