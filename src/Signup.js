import React from 'react';
import {TextField,Button,Grid,Hidden} from '@material-ui/core'
import firebase from 'firebase/app'
import {useHistory} from "react-router-dom";

export default function Signup(){
    const history = useHistory()
    const redirect = ()=>history.push("/")
    const [fullname,setfullname] = React.useState("")
    const [phone,setphone] = React.useState("")
    const [age,setage] = React.useState("")
    const [address,setaddress] = React.useState("")
    const [useremail,setuseremail] = React.useState("")
    const [password,setpassword] = React.useState("")
    const [loading,setloading] = React.useState(false)

    let check=(e)=>{
        e.preventDefault()
        setloading(true)
        if(useremail === "" || password === "" || fullname === "" || phone === "" || age === "" || address === ""){
           alert("Please fill all the fields");
           setloading(false)
        }else{
                      
                 let uni = useremail.split("@")
                firebase.database().ref("lifesaviour/usersInformation/"+uni[0].toLowerCase()).set({
                      useremail:useremail.toLowerCase(),
                      password:password,
                      fullname:fullname,
                      phone:phone,
                      age:age,
                      address:address,
                      status:"unapproved"
                }).then(()=>{
                  firebase.auth().createUserWithEmailAndPassword(useremail.toLowerCase(),password)
                  .then(()=>{
                    alert("user registered")
                    setloading(false)
                    redirect()
                  })
                  .catch((err)=>{
                    alert(err.message)
                    setloading(false)
                  })
                })
                .catch((err)=>{
                  alert(err.message)
                  setloading(false)
                })
      }
        
    }

    return (
        <div  style={styles.mydiv}>
            
        {/* body */}
        <Grid container style={styles.mygrid}>
            <Grid item md={4} xs={0}></Grid>
        
            <Grid item md={4} xs={12}  style={styles.mydiv1} >
              <Grid container >
              <Hidden xsDown> <Grid item md={12} style={styles.mydiv3}></Grid></Hidden>
            <Grid item style={styles.mydiv2} xs={12} md={12}>
            <h2>Signup</h2>  
            <TextField style ={styles.TextField}  label="Enter your name" variant="outlined" onChange={(e)=>{setfullname(e.target.value)}}/>
            <TextField style ={styles.TextField}  label="Enter your Email" variant="outlined" onChange={(e)=>{setuseremail(e.target.value)}} />
            <TextField style ={styles.TextField}  label="Enter your Phone no" variant="outlined" onChange={(e)=>{setphone(e.target.value)}}/>

            <TextField style ={styles.TextField}  label="Enter your Password" type="password"  variant="outlined" secureTextEntry={true} onChange={(e)=>{setpassword(e.target.value)}}/>
            <TextField style ={styles.TextField}  label="Enter your age" variant="outlined" onChange={(e)=>{setage(e.target.value)}}/>
            <TextField style ={styles.TextField}  label="Enter your Street Address" variant="outlined" onChange={(e)=>{setaddress(e.target.value)}} />

            <Button style ={styles.TextField} disabled={loading} variant="contained" color="secondary" onClick={check}>
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
    height:30,      
    },
    mydiv2:{
        textAlign:"center",
        backgroundColor:"#FFFFFF",
        height:597,
        paddingLeft:40,
        paddingRight:40 ,       
    },
    TextField:{
        width: '100%',
        marginBottom: 20,
        height:'8%',
        
      }
    
}