import './App.css';
import React ,{useState,useContext,useEffect} from 'react';
import {Button,TextField,Grid,Paper,Hidden} from '@material-ui/core'
import ButtonGrp from './components/ButtonGrp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import firebase from "firebase"
import {useHistory} from "react-router-dom";
import Socialicons from './components/Socialicons';

//Importing use_context
import {UserContext} from './App'

//for location
import getLocation from './FetchLocation';



  
  export default function Donateblood() {
    const history = useHistory()
    const redirect = ()=>history.push("/")
    const redirect2 = ()=>history.push("/Myprofile")

    const signout = (event) => {
      firebase.auth().signOut().then(()=>{
        redirect()
      }).catch((err)=>{
        alert(err.message)
      })
      setOpen(false);
    };
    
    const [blood,setblood]= React.useState("");
    const [amount,setamount]= React.useState("");
    const user = useContext(UserContext)
    const [long,setLong] = useState("")
    const [lat,setLat] = useState("")
    const[loading,setLoading]=useState(false)

    useEffect(()=>{
      getLocation(latlong)
      },[lat,long])
      
    const latlong=(position)=>{
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
      
    }


  //Adding blood details to firebase
  let check = (e)=>{
    e.preventDefault()
    setLoading(true)
    if(blood === "" || amount === ""){
      alert("Please fill all the fields");
      setLoading(false)
    }else{
      let id=Date.now()
      firebase.database().ref("lifesaviour/blood/"+id).set({
        id:id,
      useremail:user.useremail,
        fullname:user.fullname,
        phone:user.phone,
        address:user.address,
        blood:blood.toLowerCase(),
        amount:amount,
        latitude:lat,
        longitude:long,
  }).then(()=>{
        alert("blood added successfully")
        setLoading(false)
          }).catch((err)=>{
        alert(err.message)
        setLoading(false)
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
  

    


    return (
      <>
          
      <div>
        <Grid container >

          {/* for side logo */}
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
          onClick={handleToggle}><img src="./images/profile1.png" alt="" className="rounded" style={styles.myimg3} />
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
                    <MenuItem onClick={redirect2} href="\Contactus">My Profile</MenuItem>
                    
                    <MenuItem onClick={signout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
 
            </Grid>
            {/* for navbar */}
            <Grid style={styles.mydiv2}>
               <ButtonGrp/>
            </Grid>
            <br></br>
            <br></br>
            </Grid>


            {/* body */}
            <Grid name="body" style={styles.mydiv2}>
            <br></br>
            <br></br>
            <br></br>
            <h2>Donate Blood</h2>
            <br></br>
            <TextField style ={styles.TextField}  label="Enter Blood Group" variant="outlined" onChange={(e)=>{setblood(e.target.value)}}/>
            <TextField style ={styles.TextField}  label="Amount of Blood in units" variant="outlined" onChange={(e)=>{setamount(e.target.value)}} />
            <Button style ={styles.TextField} disabled={loading} variant="contained" color="secondary"  onClick={check}>
            Donate now
            </Button>
            
            
            </Grid>            
          </Grid>
        </Grid>
      </div>
      </>
    );
  }
  
  
  
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
      
    },
    TextField:{
      width: '100%',
      marginBottom: 20,
     
      
    }
  }