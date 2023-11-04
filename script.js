// GLOBAL VARIABLE TO SAVE DATA FROM IP
let data;
let lat,long,city,region,org,hostname;

let ip = localStorage.getItem("ip");
let ipurl = ` https://ipapi.co/${ip}/json/`

let listpo;

// LOADING DATA OF IP
    function loadIpdata(){
     // putting ip into p tag in nav
       let navip = document.getElementById("navip");
       navip.innerHTML=`<p id="navip">IP Address: <span>${ip}</span></p>`
        // ASSIGNING DETAILS GOT FROM IP DATA
        lat = data.latitude;
        long = data.longitude;
        city = data.city;
        region = data.region;
        org = data.org;
        // input data got from IP to HTML
        let latip = document.getElementById("latip");
        latip.innerHTML=`<p id="navip">Lat:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span>${lat}</span></p>`;

        let longip = document.getElementById("longip");
        longip.innerHTML=`<p id="navip">Long:&nbsp&nbsp<span>${long}</span></p>`;

        let cityip = document.getElementById("cityip");
        cityip.innerHTML=`<p id="navip">City:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span>${city}</span></p>`;

        let regionip = document.getElementById("regionip");
        regionip.innerHTML=`<p id="navip">Region:&nbsp&nbsp<span>${region}</span></p>`;
        
        let orgip = document.getElementById("orgip");
        orgip.innerHTML=`<p id="navip">Organisation: <span>${org}</span></p>`;

        // input more user information in section 2
        let zoneip = data.timezone;
        let userpin = data.postal;
    
        let tzoneip = document.getElementById("tzoneip");
        tzoneip.innerHTML =`<p id="tzoneip">Time Zone:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${zoneip}</p>`;

        let datetime = new Date().toLocaleString("en-US", { timeZone: `${zoneip}` });
        let dtip = document.getElementById("dtip");
        dtip.innerHTML=`<p id="dtip">Date and Time:&nbsp&nbsp${datetime}</p>`;

        let pinip = document.getElementById("pinip");
        pinip.innerHTML =`<p id="tzoneip">Time Zone:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${userpin}</p>`;
        
        // CALLING GOOGLE MAPS FUNCTION WITH LATITUDE AND LONGITUDE
        loadmaps(lat,long);
    }

// CALLING IP OF USER AND FETCHING DETAILS
    async function getIpdetails(){
     const response = await fetch(ipurl);
     data = await response.json();
     console.log(data);
     console.log("working");
     loadIpdata();
     postofficedata(data.postal);
     
    }


// GETTING POST OFFICE DATA AT USER LOCATION
    async function postofficedata(pincode){
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        data = await response.json();
        console.log(data);

        let message = data[0].Message;
        listpo = data[0].PostOffice;

        postofficecards(message,listpo);
    }


//POST OFFICE DATA GOT AND NOW RENDERING CARDS
  function postofficecards(message,list){
    // update msg no.of postoffice
    let postelnos = document.getElementById("postelnos");
    postelnos.innerHTML=`<p id="postelnos">Message:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${message}</p>`;
    
     // using foreachmethod
      let maindiv = document.getElementById("postofficelist");
      maindiv.innerHTML="";
      list.forEach((data)=>{
         let div = document.createElement("div");
         div.setAttribute("class","postoffice");
         div.innerHTML=`
         <p>Name: </p>
         <p>Branch Type</p>
         <p>Delivery Status</p>
         <p>District</p>
         <p>Division</p>
         `
      })
    }


// CALLING GOOGLE MAPS API
 function loadmaps(loc1,loc2){
     map = new google.maps.Map(document.getElementsByClassName("googlediv")[0],{
               center: {lat: loc1, lng: loc2},
               zoom: 12,
               title: "hello"
       });
       new google.maps.Marker({
        position: {lat: loc1, lng: loc2},
        map,
        title: "Hello World!",
      });
 }



// Message
// : 
// "Number of pincode(s) found:3"
// PostOffice
// : 
// (3) [{…}, {…}, {…}]
    // data path
//  let data = {
//         asn
// : 
// "AS132497"
// city
// : 
// "Mumbai"
// continent_code
// : 
// "AS"
// country
// : 
// "IN"
// country_area
// : 
// 3287590
// country_calling_code
// : 
// "+91"
// country_capital
// : 
// "New Delhi"
// country_code
// : 
// "IN"
// country_code_iso3
// : 
// "IND"
// country_name
// : 
// "India"
// country_population
// : 
// 1352617328
// country_tld
// : 
// ".in"
// currency
// : 
// "INR"
// currency_name
// : 
// "Rupee"
// in_eu
// : 
// false
// ip
// : 
// "103.195.249.238"
// languages
// : 
// "en-IN,hi,bn,te,mr,ta,ur,gu,kn,ml,or,pa,as,bh,sat,ks,ne,sd,kok,doi,mni,sit,sa,fr,lus,inc"
// latitude
// : 
// 19.0748
// longitude
// : 
// 72.8856
// network
// : 
// "103.195.248.0/23"
// org
// : 
// "DIGITAL NETWORK ASSOCIATES PRIVATE LIMITED"
// postal
// : 
// "400070"
// region
// : 
// "Maharashtra"
// region_code
// : 
// "MH"
// timezone
// : 
// "Asia/Kolkata"
// utc_offset
// : 
// "+0530"
// version
// : 
// "IPv4"
//     }