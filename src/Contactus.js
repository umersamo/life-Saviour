import './App.css';
import React, { useState } from 'react';
import {Button,Grid,Paper,TextareaAutosize,Hidden,TextField} from '@material-ui/core'
import ButtonGrp from './components/ButtonGrp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import firebase from 'firebase';
import {useHistory} from "react-router-dom";
import Socialicons from './components/Socialicons';
import Socialiconsblack from './components/Socialiconsblack';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    width:"100%"
  },
});

  function Contactus() {
    const history = useHistory()
    const redirect = ()=>history.push("/")
    const redirect2 = ()=>history.push("/myprofile")
    const [email,setemail]=useState("")
    const [feedback,setfeedback]=useState("")
    const [ButtonLoading,setButtonLoading] = useState(false)
   
   
    let check=(e)=>{
      e.preventDefault()
      setButtonLoading("true")
      if(email&&feedback===""){
        alert("Fill all the fields")
        setButtonLoading("false")
      }else{
        firebase.database().ref("lifesaviour/feedbacks/"+Date.now()).set({
          email:email,
          feedback:feedback
        }).then(()=>{
          alert("Thank You! your feedback is recieved")
          setemail("")
          setfeedback("")
          setButtonLoading("false")
        }).catch((err)=>{
          setButtonLoading("false")
        })
      }
      
    }



    //for dropdown menu
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };

    const signout = (event) => {
      firebase.auth().signOut().then(()=>{
        redirect()
      }).catch((err)=>{
        alert(err.message)
      })
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
    const classes = useStyles();

    return (
      <>
      
      <div>

        <Grid container >
        <Hidden xsDown>

          <Grid item xs={12} md={4} style={styles.mydiv}>
            <img src="./images/icon2.png" alt="" style={styles.myimg}></img>
            <h5 style={{color:"#FFFFFF"}}>"BE A LIFE SAVIOUR"</h5>
            <br></br>
            <br></br>
            <h5 style={{color:"#FFFFFF"}}>Contact us</h5>
            <Socialicons/>
          </Grid>
          </Hidden>


          <Grid item xs={12} md={8} style={styles.mydiv3}>
            <Grid name="header" style={styles.grey}>
            <Grid style={{textAlign: 'right', margin:10,}}>


         {/* for dropdown menu */}

      <div>
        <Button variant="contained" color="primary"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}><img src="./images/profile1.png" alt="" class="rounded" style={styles.myimg3} />
        Profile
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:1000}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={redirect2} >My Profile</MenuItem>
                    
                    <MenuItem onClick={signout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>


            {/* for navbar */}
            </Grid>
            <Grid style={styles.mydiv2}>
               <ButtonGrp/>
            </Grid>
            <br></br>
            <br></br>
            </Grid>


            {/* body */}
            <Grid name="body" textAlign="center" style={styles.mydiv2}>
            <br></br>

            
            <h2 style={{color:"#3D9DED"}}>Contact US</h2>
            <TableContainer Align className={classes.Paper} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Phone no.</TableCell>
                    <TableCell align="center">03003001999</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Ymersamo1@gmail.com</TableCell>
                  </TableRow>
                </TableHead>
                </Table>
                </TableContainer>

          <h2 style={{color:"#3D9DED"}}>Feedback</h2>
          <TableContainer Align className={classes.Paper} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center"> <TextField   label="Enter your Email" size="small" variant="outlined" value={email} onChange={(e)=>{setemail(e.target.value)}} /></TableCell>
                    <TableCell align="center"><TextareaAutosize aria-label="empty textarea" value={feedback} placeholder="Please enter your feedback" onChange={(e)=>{setfeedback(e.target.value)}}/></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"><Button color="secondary" variant="contained" disable={ButtonLoading} onClick={check}>Submit</Button></TableCell>
                  </TableRow>
                </TableHead>
                </Table>
                </TableContainer>
         
          <br></br>
          <Socialiconsblack/>
            
            </Grid>            
          </Grid>
        </Grid>
      </div>
      </>
    );
  }
  
  export default Contactus;
  
  const styles={
    mydiv:{
      paddingTop:50,
      paddingBottom:50,
      textAlign:"center",
      backgroundColor:"#000000",
      height:657,     
    },
    mydiv1:{
      paddingTop:20,
      paddingBottom:10,
      textAlign:"center",
      backgroundColor:"#000000",
      height:200,     
    },
    mydiv2:{
      textAlign:"center",
      height:'60%',   
      paddingRight:10,
      paddingLeft:10,  
    },
    mydiv3:{
      height:602,
    },
    mybutton:{     
      marginBottom:10,     
    },
    myimg:{
      marginTop:170,
      width:250,
      height:125,
    },
    grey:{
      backgroundColor:"#66a3ff",
      paddingTop:10,
      height:'20%',
    },
    footer: {
      backgroundColor:"#403E3D",
      height:'20%',
    },
    myimg2:{
      width:70,
      height:70,
    },
    myimg3:{
      width:30,
      height:30,
    },
    h3:{
      fontcolor:"#47A9EC",
       marginBottom:20,     
    }
  }