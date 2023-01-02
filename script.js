let map;
let defalte={ lat: -34.397, lng: 150.644 };


function initMap(first) {
  if (first)
  {
    map = new google.maps.Map(document.getElementById("map"), {
    center: first,
    zoom: 8,
  });
  }
  else 
  {
    map = new google.maps.Map(document.getElementById("map"), {
    center: defalte,
    zoom: 8,
  });

  }

}
//get the name from the searchbox
function myFunction()
{

let querry = document.getElementById("searchBox").value; 

if (querry)
{ let request = new XMLHttpRequest();
      request.open("GET", "http://api.positionstack.com/v1/forward?access_key=82eb64b9129547181c780c53891dbe52&query="+querry);
    
      request.send();
      request.onload = () => {
        console.log(request);
        if (request.status === 200) {
          let locationInfo = JSON.parse(request.response).data;
        
        if(locationInfo.length>0)
        {
        let location= locationInfo[0];
          let payload= { lat: location.latitude, lng: location.longitude};
          initMap(payload);
            }

          // by default the response comes in the string format, we need to parse the data into JSON
          console.log(locationInfo);
        } else {

            console.log((`error ${request.status} ${request.statusText}`));
         
          }

      };
}

}


let mylet;

function myFunction2() {
    mylet = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}