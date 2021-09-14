import './App.css';
import React from 'react';
import {Button,Grid,Paper} from '@material-ui/core'
import ButtonGrp from './components/ButtonGrp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import firebase from 'firebase/app';
import Hidden from '@material-ui/core/Hidden';
import Socialicons from './components/Socialicons';
import {useHistory} from "react-router-dom";
  function Home() {
    const history = useHistory()
    const redirect = ()=>history.push("/")
    const redirect2 = ()=>history.push("/myprofile")
    const redirectDonateblood = ()=>history.push("/Donateblood")
    const redirectDonateorgan = ()=>history.push("/Donateorgan")
    const redirectSearch = ()=>history.push("/Search")
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
    return (
      <>
      <div>
        <Grid container >
        <Hidden xsDown>
          <Grid item xs={12} md={4} style={styles.mydiv}>
            <img src={'./images/icon2.png'} alt="" style={styles.myimg}></img>
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
        <Popper open={open} anchorEl={anchorRef.current} role={undefined}  transition disablePortal style={{zIndex:1000}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                    <MenuItem onClick={redirect2} >My Profile</MenuItem>
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
            <h2>Our Services</h2>
            <Grid container style={{marginTop:20}} >              
              <Grid className="g" style={{paddingTop:10}} item md={4} xs={12}>
            <a onClick={redirectDonateblood} >
                <img src="./images/blood2.png" className="rounded" style={styles.myimg2} alt="..."/>
                <br></br>
                <div className="caption">
                <h5 className="">Donate blood</h5>
                <p className="">Add Blood details<br></br>to donate blood.
                </p>
                </div>
            </a>
            </Grid>
            <Grid className="g" style={{paddingTop:10}} item md={4} xs={12}>
            <a onClick={redirectDonateorgan} >
                <img src="./images/organ3.png" className="rounded" style={styles.myimg2} alt="..."/>
                <br></br>
                <div className="caption">
                <h5 className="">Donate Organ</h5>
                <p className="">Add organ details<br></br>to donate organ.
                </p>
                </div>
            </a>
            </Grid>
            <Grid className="g" style={{paddingTop:10}} item md={4} xs={12}>
            <a onClick={redirectSearch} >
                <img src="./images/find.png" className="rounded" style={styles.myimg2} alt="..."/>
                <br></br>
                <div className="caption">
                <h5 className="">Nearby Facility</h5>
                <p className="">Search for Nearest<br></br>facility of blood<br></br>and organ.
                </p>
                </div>
            </a>
            </Grid>
            </Grid>    
           </Grid>            
          </Grid>
        </Grid>
      </div>
      </>
    );
  } 
  export default Home; 
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