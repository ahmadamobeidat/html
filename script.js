let map;
let defalte={ lat: -34.397, lng: 150.644 };

//get the map , can get par and not
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
function Search()
{
    LoadingSpinner();
let querry = document.getElementById("searchBox").value; 

    if (querry)
//make new object to create  request 
{ let request = new XMLHttpRequest();
      request.open("GET", "http://api.positionstack.com/v1/forward?access_key=82eb64b9129547181c780c53891dbe52&query="+querry);
    
      request.send();
      request.onload = () => { //lamdafunction to get the data and execute at the same time
        console.log(request);
        if (request.status === 200) {
          let locationInfo = JSON.parse(request.response).data;
        
            if (locationInfo.length > 0) {
                let location = locationInfo[0];
                let payload = { lat: location.latitude, lng: location.longitude };
                initMap(payload);
                hideSpinner();
            }
            else {
                alert("location not found");
                hideSpinner();
            }
        

          // by default the response comes in the string format, we need to parse the data into JSON
          console.log(locationInfo);
        } else
        {

            console.log((`error ${request.status} ${request.statusText}`));
            alert("location not found");
            hideSpinner();
        }

      };
}

}


let mylet;

function LoadingSpinner()
{
    document.getElementById("Spinner").style.display = "block";
    document.getElementById("Full").style.display = "none";
}

function hideSpinner()
{
    document.getElementById("Spinner").style.display = "none";
    document.getElementById("Full").style.display = "block";
}
