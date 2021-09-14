import './App.css';
import React from 'react';
import {Button,Grid,Paper,withStyles,Hidden} from '@material-ui/core'
import ButtonGrp from './components/ButtonGrp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import firebase from 'firebase';
import {useHistory} from "react-router-dom";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Socialicons from './components/Socialicons';



const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

  
  function About() {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };




    const history = useHistory()
    const redirect = ()=>history.push("/")
    const redirect2 = ()=>history.push("/myprofile")
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
            <Grid name="body" style={styles.mydiv2}>
            <br></br>
            <br></br>
            <br></br>
            
            <Accordion style={{paddingLeft: 20, paddingRight:20}} square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography><b>Aims and Objectives</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Nowadays when patient comes for treatment in hospital due to any accident or disease and he/she requires to have a certain blood of blood group which is not available in hospital, Management will be arranging the blood for the blood group required for the patient from other blood banks across or nearby the hospitals to arrange it and managed to treat the patient but if the situation is critical and the case is emergency every second counts, Every second of every day, people around the world of all ages and from all walks of life need blood transfusions to survive or may be unpredictable death.

          </Typography>
        </AccordionDetails>
      </Accordion >
      <Accordion style={{paddingLeft: 20, paddingRight:20}} square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography><b>Why LIFE SAVIOUR?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Life saviour is a web based application connected with a mobile application with an interactive user interface, where government authorized medical facilities and mobile app users can register. Each user has the access to add and update their data. It allows the communication with all medical facilities and individual users in a time saving and effective manner. The registered medical facilities and individuals have access to the real time data available. It provides with the contact information and location of the result nearest available.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{paddingLeft: 20, paddingRight:20}} square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography><b>Motivation and Need</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Nowadays web applications are used for Marketing, Business, learning and many other works so we thought why not using it for saving lives, every day we lose thousands of lives because of short of blood/organ or because of not providing them blood/organ at the right time in such situations this application is highly needed through which blood and organs are searched in seconds not hours or days.
          </Typography>
        </AccordionDetails>
      </Accordion>
            
            </Grid>            
          </Grid>
        </Grid>
      </div>
      </>
    );
  }
  
  export default About;
  
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