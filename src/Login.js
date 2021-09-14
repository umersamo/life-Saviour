import React from 'react';
import {TextField,Button, Grid} from '@material-ui/core'
import firebase from 'firebase/app'
import {useHistory} from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
export default function Login(){
  const history = useHistory()
  const redirectuser = ()=>history.push("/Home")
  const redirectadmin = ()=>history.push("/AdminHome")
  const redirectsignup = ()=>history.push("/Signup")
  const [useremail,setuseremail] = React.useState("")
  const [password,setpassword] = React.useState("")
  const [loading,setloading] = React.useState(false)
    let checking = (e)=>{
      e.preventDefault()
        setloading(true)
        if(useremail && password === ""){
           alert("Please fill all the fields");
           setloading(false)
        }
        else{
          let name = useremail.toLowerCase().split("@")
          firebase.database()
          .ref("lifesaviour/")
          .child(`usersInformation`)
          .orderByChild("useremail")
          .equalTo(useremail.toLowerCase())
          .once("value")
          .then((data)=>{
            const user = data.val();
            const key = Object.keys(user)
            if(user[key[0]].status === "approved"){
              firebase.auth().signInWithEmailAndPassword(useremail.toLowerCase(),password)
              .then(()=>{
                if(useremail.toLowerCase()==="adminlifesaviour@gmail.com" && password === "admin123"){
                  redirectadmin()
              }else{
                 redirectuser()
              }
              })
              .catch((err)=>{
                alert(err.message)
                setloading(false)
              })
            }else{
              alert("Hello "+name[0]+"! your account is not approved yet, wait for admin's approval")
              setloading(false)
            }
          })
          .catch((err)=>{
            alert("invalid username or password")
            setloading(false)
          })
        }
      }
    return (
        <div style={styles.mydiv}>  
            {/* body */}
        <Grid container style={styles.mygrid}>
            <Grid item md={4} xs={0}></Grid>
              <Grid item md={4} xs={12}  style={styles.mydiv1} >
                <Grid container >
                <Hidden xsDown> <Grid item md={12} style={styles.mydiv3}></Grid></Hidden>
                    <Grid item style={styles.mydiv2} xs={12} md={12}>
                      <img src="./images/icon.png" alt="" style={styles.myimg}></img>
                          <TextField style ={styles.TextField} label="Enter Username" variant="outlined" onChange={(e)=>{setuseremail(e.target.value)}}/>
                          <TextField style ={styles.TextField} label="Enter password" variant="outlined" type="password" autoComplete="current-password" onChange={(e)=>{setpassword(e.target.value)}}/>
                          <Button style ={styles.TextField} disabled={loading} variant="contained"  color="primary" onClick={checking}>
                          Login
                          </Button>
                          <h3>Don't have an account?</h3>
                          <Button style ={styles.TextField} variant="contained" color="secondary"  onClick={redirectsignup}>
                          Register now
                          </Button>
                          </Grid>
                  <Hidden xsDown><Grid item md={12} style={styles.mydiv3}></Grid></Hidden>
                </Grid>   
              </Grid>
            <Grid item md={4} xs={0}></Grid>
        </Grid>
     </div>    
    );
}
const styles={
    mydiv:{

        backgroundColor:"#000000",
    },
    mydiv1:{
      textAlign:"center",
      height:'100%',      
  },
  mydiv3:{
    backgroundColor:"#000000",
    height:70,      
},
    mydiv2:{
        textAlign:"center",
        backgroundColor:"#FFFFFF",
        height:517,
        padding:40,       
    },
    myimg:{

        marginBottom: 20,
        width:200,
        height:100,
      },
    TextField:{
        width: '100%',
        marginBottom: 20,
        
      }
    
}