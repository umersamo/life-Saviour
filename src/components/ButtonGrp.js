import React from 'react';
import {Button,ButtonGroup} from '@material-ui/core';
import {useHistory} from "react-router-dom";

  export default function ButtonGrp() {
    const history = useHistory()
    const redirectabout = ()=>history.push("/About")
    const redirecthome = ()=>history.push("/Home")
    const redirectcontactus = ()=>history.push("/Contactus")
    const redirectlist = ()=>history.push("/Mylist")
    return (
                <ButtonGroup container variant="contained" color="primary" >
                <Button item onClick={redirectabout} >About</Button>
                <Button item onClick={redirecthome} >Home</Button>
                <Button item onClick={redirectcontactus}>Contact Us</Button>
                <Button item onClick={redirectlist}>My List</Button>
                </ButtonGroup>
        );
        }