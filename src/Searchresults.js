import './App.css';
import React ,{useEffect,useState} from 'react';
import {Button,Grid,Paper,Hidden,Divider} from '@material-ui/core'
import ButtonGrp from './components/ButtonGrp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {useHistory} from "react-router-dom";
import firebase from 'firebase';
import Socialicons from './components/Socialicons';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
//for gridlist
import GridList from '@material-ui/core/GridList';
//for location
import getLocation from './FetchLocation';
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
    height: 400,
  }
}));
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
  export default function Searchresults(props) {
    //const {} = props.location.state
    const history = useHistory()
    const redirect = (val)=>history.push(val)
    let find=""
    let searchfor=""
    if (props.location.state !== "undefined"){
      searchfor=props.location.state.searchfor
      find=props.location.state.find
    }else{
      redirect("/Search")
    }
    const [result,setResult] =useState([])
    const [Loading,setLoading] = useState(true)
    const [keys,setKeys] = useState([])
    const [long,setLong] = useState("")
    const [lat,setLat] = useState("")
    const [Sorted,setSorted] = useState({})
    const [SortedKeys,setSortedKeys] = useState([])
    const signout = (event) => {
      firebase.auth().signOut().then(()=>{
        redirect("/")
      }).catch((err)=>{
        alert(err.message)
      })
      setOpen(false);
    };
    const latlong=(position)=>{
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)      
    }    
    useEffect(()=>{
      getLocation(latlong)
      fetchingdata()
      },[lat,long,Loading])
      const fetchingdata =()=>{
        if(lat&&long){
        firebase.database()
        .ref("lifesaviour/")
        .child(find+"/")
        .orderByChild(find)
        .equalTo(searchfor)
        .once("value")
        .then((data)=>{          
          setKeys(Object.keys(data.val()))
          setResult(data.toJSON())
          let nearest= []
          let valueArray = {}
          const keys = Object.keys(data.val())
          const fetcheddata = data.toJSON();
              if(find==="blood"){
              keys.map((val,index)=>{
                  Object.assign(valueArray,{
                    [getDistanceFromLatLonInKm(fetcheddata[val].latitude,fetcheddata[val].longitude,lat,long)+`${getDistanceFromLatLonInKm(fetcheddata[val].latitude,fetcheddata[val].longitude,lat,long) === 0?".000":"000"}`+index]:{
                      blood:fetcheddata[val].blood,
                    amount:fetcheddata[val].amount,
                    fullname:fetcheddata[val].fullname,
                    useremail:fetcheddata[val].useremail,
                    phone:fetcheddata[val].phone,
                    address:fetcheddata[val].address,
                    latitude:fetcheddata[val].latitude,
                    longitude:fetcheddata[val].longitude,                  
                    }
                  })
                  nearest.push(getDistanceFromLatLonInKm(fetcheddata[val].latitude,fetcheddata[val].longitude,lat,long)+`${getDistanceFromLatLonInKm(fetcheddata[val].latitude,fetcheddata[val].longitude,lat,long) === 0?".000":"000"}`+index)
              })}else{
                keys.map((val,index)=>{
                  Object.assign(valueArray,{
                    [getDistanceFromLatLonInKm(fetcheddata[val].latitude,fetcheddata[val].longitude,lat,long)+`${getDistanceFromLatLonInKm(fetcheddata[val].latitude,fetcheddata[val].longitude,lat,long) === 0?".000":"000"}`+index]:{
                    organ:fetcheddata[val].organ,
                    desc:fetcheddata[val].desc,
                    fullname:fetcheddata[val].fullname,
                    useremail:fetcheddata[val].useremail,
                    phone:fetcheddata[val].phone,
                    address:fetcheddata[val].address,
                    latitude:fetcheddata[val].latitude,
                    longitude:fetcheddata[val].longitude,                  
                    }
                  })
                  nearest.push(getDistanceFromLatLonInKm(fetcheddata[val].latitude,fetcheddata[val].longitude,lat,long)+`${getDistanceFromLatLonInKm(fetcheddata[val].latitude,fetcheddata[val].longitude,lat,long) === 0?".000":"000"}`+index)
              })
              }

              
                setSorted(valueArray)
                const sortedArray = nearest.sort(function(a,b){return b-a})
                setSortedKeys(sortedArray.reverse())
                setLoading(false)
        })
        .catch((err)=>{
          alert(searchfor+" is not available at the moment")
          redirect("/Search")
          setLoading(false)
        })
      }else
      {
        setLoading(true)
      }
      }
      //DISTANCE FINDING ALGORITM
      function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; 
          var dLat = deg2rad(lat2-lat1);  
          var dLon = deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; 
          return d;
      }    
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
      //for Gridlist
    const classNamees3 = useStyles3();
    //for paper
    const classNamees2 = useStyles2();
    //for dropdown menu   
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    // const LeftContent = props => <Avatar.Icon {...props} source={require("../assets/icon.png")} />
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
        <Hidden xsDown>
        <Grid item xs={12} md={4} style={styles.mydiv}>
          <img src="./images/icon2.png" alt="" style={styles.myimg}></img>
          <h5 style={{color:"#FFFFFF"}}>"BE A LIFE SAVIOUR"</h5>
          <br></br>
          <br></br>
          <h5 style={{color:"#FFFFFF"}}>"Contact us"</h5>
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
                    <MenuItem onClick={()=>redirect("/Myprofile")} >My Profile</MenuItem>
                    
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
            <h2 style={{color:"#3D9DED"}}>Showing results for {searchfor}</h2>
            {
            Loading&&lat===0?<h2 style={{color:"#3D9DED"}}>fetching your location please wait...</h2>:          
            <div className={classNamees3.root}>           
            <GridList  cellHeight={120} className={classNamees3.gridList} cols={1} >
              {
                find==="blood"?
                SortedKeys.map((val,index)=>(
                  <Table className={classNamees2.table} style={{marginBottom:20}} aria-label="simple table">
                  <TableHead>               
                  <TableRow>                    
                    <TableCell align="center"><h1 style={{color:"#3D9DED"}}>{  Sorted[val] && Sorted[val].blood }</h1><h3>{parseFloat(val).toFixed(2) } Kilometers away</h3></TableCell>
                  </TableRow>
                  <TableRow>                    
                    <TableCell align="center">Amount: {  Sorted[val] && Sorted[val].amount } units  |   Name: {  Sorted[val] && Sorted[val].fullname }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Email: {Sorted[val] && Sorted[val].useremail}  |   Address: {Sorted[val] && Sorted[val].address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center"><h3>Phone no: {Sorted[val] && Sorted[val].phone}</h3></TableCell>
                  </TableRow>  
                    </TableHead>
                    <Divider></Divider>
                    </Table>                    
                   )):
                   SortedKeys.map((val,index)=>(
                    <Table className={classNamees2.table} style={{marginBottom:20}} aria-label="simple table">
                    <TableHead>                 
                    <TableRow>                    
                      <TableCell align="center"><h1 style={{color:"#3D9DED"}}>{  Sorted[val] && Sorted[val].organ }</h1><h3>{parseFloat(val).toFixed(2) } Kilometers away</h3></TableCell>
                    </TableRow>
                    <TableRow>                    
                      <TableCell align="center">Description: {  Sorted[val] && Sorted[val].desc }  |   Name: {  Sorted[val] && Sorted[val].fullname }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Email: {Sorted[val] && Sorted[val].useremail}  |   Address: {Sorted[val] && Sorted[val].address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center"><h3>Phone no: {Sorted[val] && Sorted[val].phone}</h3></TableCell>
                    </TableRow>  
                      </TableHead>
                      <Divider></Divider>
                      </Table>
                   ))            
        }         
        </GridList>
        </div>
            }            
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
    },
    text:{
            fontSize:20,
        }
  }