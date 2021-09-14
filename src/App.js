import React ,{useEffect,useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

//Pages
import Home from './Home';
import AdminHome from './AdminHome';
import About from './About';
import Contactus from './Contactus';
import Login from './Login';
import Signup from './Signup';
import Donateblood from './Donateblood';
import Search from './Search';
import Donateorgan from './Donateorgan';
import Searchresults from './Searchresults';
import Myprofile from './Myprofile';
import Mylist from './Mylist';

//use_context
export const UserContext = React.createContext()


const useStyles = makeStyles((theme) => ({
  root: {

    flexGrow: 1,
  },
}));

function App() {
  const classes=useStyles()
const [IsloggIn,setIsloggIn] = useState(false)
const [currentUser,setCurrentUser] = React.useState("");
const [user,setUser] = React.useState({})
const [phone,setPhone] = React.useState("")
const [fullname,setfullname] = React.useState("")
const [useremail,setuseremail] = React.useState("")
const [address,setaddress] = React.useState("")
const [Loading,setLoading] = useState(true)


    //Fetch data from firebase for use_context
useEffect(()=>{
  fetchUser()
},[user])

const fetchUser = () =>{
  firebase.auth().onAuthStateChanged((user)=>{
      if(user){
         let name=user.email.split("@")
          setCurrentUser(name[0])
          fetchUserData()
          setIsloggIn(true)
          setLoading(false)
      }else{
        setLoading(false)
      }
  })
}

const fetchUserData = ()=>{

 firebase.database().ref("lifesaviour/usersInformation/"+currentUser)
 .once("value")
 .then((snap)=>{
     setUser(snap.val())
     setfullname(user["fullname"])
     setPhone(user["phone"])
     setuseremail(user["useremail"])
     setaddress(user["address"])
 })
 .catch((err)=>{
    alert(err.message)
 })
}
  const details = {
    useremail:useremail,
    phone:phone,
    fullname:fullname,
    address:address
  }



  return (
    
    <div className={classes.root}>
      {
      Loading?
      <body style={{textAlign:"center"}}><img src={'./images/loading.png'} alt="" style={{width:210,height:250,marginTop:120,alignText:"center"}}></img><br></br> <CircularProgress /></body>
      :  
        IsloggIn?
            <Router>
              <Switch>
              <Route exact path="/" component={Login} />
                <Route path="/Signup" component={Signup}/>
                <Route path="/Home" component={Home}/>
                <Route path="/AdminHome" component={AdminHome}/>
                <Route path="/About" component={About}/>
                <Route path="/Contactus" component={Contactus}/>
                <Route path="/Search" component={Search}/>
                <Route path="/Searchresults" component={Searchresults}/>
                <Route path="/Mylist" component={Mylist}/>
                <UserContext.Provider value={details}>
                <Route path="/Myprofile" component={Myprofile}/>
                <Route path="/Donateblood" component={Donateblood}/>
                <Route path="/Donateorgan" component={Donateorgan}/>
                </UserContext.Provider>
              </Switch>
            </Router>
            :<Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/Signup" component={Signup}/>
              </Switch>
            </Router>
            }
          

    </div>
    
   
  );
}

export default App;

