import './App.css';
import React,{useEffect,useState} from 'react';
import {Button,Grid,Paper,Hidden} from '@material-ui/core'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import firebase from 'firebase';
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';    
import GridList from '@material-ui/core/GridList';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles2 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: 5,
      width: "100%",
      height: 300,
      
    },
  table: {
    width:"100%"
  },
  },
}));
const useStyles3 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
    height: 200,
  }
}));
  
function AdminHome() {
    const history = useHistory()
    const redirect = ()=>history.push("/")
    
    //for unapproved users

const [result,setResult] =useState([])
const [Loading,setLoading] = useState(true)
const [ButtonLoading,setButtonLoading] = useState(false)
const [keys,setKeys] = useState([])
const [result2,setResult2] =useState([])
const [Loading2,setLoading2] = useState(true)
const [keys2,setKeys2] = useState([])

useEffect(()=>{
      firebase.database()
      .ref("lifesaviour/")
      .child("usersInformation/")
      .orderByChild("status")
      .equalTo("unapproved")
      .once("value")
      .then((data)=>{
          setKeys(Object.keys(data.val()))
          setResult(data.toJSON())
          setLoading(false)
      })
      .catch((err)=>{
        setLoading(false)
      })

      firebase.database()
      .ref("lifesaviour/")
      .child("feedbacks/")
      .once("value")
      .then((data)=>{
          setKeys2(Object.keys(data.val()))
          setResult2(data.toJSON())
          setLoading2(false)
      })
      .catch((err)=>{
        setLoading(false)
      })
      
  },[ButtonLoading])


  let checking=(email)=>{
    setButtonLoading(true)
    let name = email.split("@")
    firebase.database().ref("lifesaviour/usersInformation/"+name[0]).update({
      status:"approved"
    })
    .then(()=>{
      setButtonLoading(false)
      alert("user approved")
    })
    .catch((err)=>{
      setButtonLoading(false)
      alert(err.message)
    })
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
  

      //for Gridlist
      const classNamees3 = useStyles3();
      const classNamees2 = useStyles2();

    return (
      <>
          
      
      <div>
        <Grid container >
        <Hidden xsDown>

        <Grid item xs={12} md={4} style={styles.mydiv}>
          <img src="./images/icon2.png" alt="" style={styles.myimg}></img>
          <h5 style={{color:"#FFFFFF"}}>"BE A LIFE SAVIOUR"</h5>
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
          onClick={handleToggle}><img src="./images/profile1.png" alt=""  class="rounded" style={styles.myimg3} />
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
                    <MenuItem onClick={handleClose} href="\Contactus">My Profile</MenuItem>
                    
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
            <h3>Admin Panel</h3>
            </Grid>
            <br></br>
            <br></br>
            </Grid>


            {/* body */}
            <Grid name="body" style={styles.mydiv2}>
            <h3 style={{color:"#3D9DED"}}>Unapproved Users </h3>
            <div className={classNamees3.root}>
            <GridList  cellHeight={120} className={classNamees3.gridList} cols={1} component={Paper} >
            <Table className={classNamees2.table} style={{marginBottom:20,marginTop:20}} aria-label="simple table">
                  <TableHead>
                  <TableRow>                    
                    <TableCell align="center"><b>Fullname</b></TableCell>
                    <TableCell align="center"><b>Email</b></TableCell>
                    <TableCell align="center"><b>Phone</b></TableCell>
                    <TableCell align="center"><b>Address</b></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>


            {
            Loading?<h3 style={{color:"#3D9DED"}}>loading...</h3>:
            keys.map((val,index)=>(
              
              <>  
                  <TableRow>                    
                    <TableCell align="center">{result[val].fullname}</TableCell>
                    <TableCell align="center">{result[val].useremail}</TableCell>
                    <TableCell align="center">{result[val].phone}</TableCell>
                    <TableCell align="center">{result[val].address}</TableCell>
                    <TableCell align="center"><Button  variant="contained" color="primary" onClick={()=>checking(result[val].useremail)}>
                    Approve
                    </Button></TableCell>
                  </TableRow>
                  
              </>
            ))}
            </TableHead>
            </Table>

            </GridList>
            </div>

            <h3 style={{color:"#3D9DED"}}>Feedbacks </h3>
            <div className={classNamees3.root}>
            
            <GridList  cellHeight={120} className={classNamees3.gridList} cols={1} component={Paper} >
            <Table className={classNamees2.table} style={{marginBottom:20,marginTop:20}} aria-label="simple table">
                  <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>Email</b></TableCell>
                    <TableCell align="center"><b>Feedbacks</b></TableCell>
                  </TableRow>
            {
            Loading2?<h3 style={{color:"#3D9DED"}}>loading...</h3>:
            keys2.map((val,index)=>(
              
              <>  
                  <TableRow>                    
                    <TableCell align="center">{result2[val].email}</TableCell>
                    <TableCell align="center">{result2[val].feedback}</TableCell>
                  </TableRow>
                  
              </>
            ))}
            </TableHead>
            </Table>

            </GridList>
            </div>
            </Grid>            
          </Grid>
        </Grid>
      </div>
      </>
    );
  }
  
  export default AdminHome;
  
  const styles={
    mydiv:{
      paddingTop:50,
      paddingBottom:50,
      textAlign:"center",
      backgroundColor:"#000000",
      height:657,
      
    },
    mydiv2:{
      paddingRight:10,
      paddingLeft:10,
      textAlign:"center",
      height:'60%',
      
      
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