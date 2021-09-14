function getLocation (latlong) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(latlong);
    } else { 
      alert("access denied")
    }
}



export default getLocation
  