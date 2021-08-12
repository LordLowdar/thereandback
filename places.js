
function getEnd(){  
    var city = localStorage.getItem('EndingCity')

fetch(`https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${city}`, {
 	    "method": "GET",
 	    "headers": {
 		    "x-rapidapi-key": "81ac340436msh24215b45d49edcfp15f7e3jsn08c006be0de1",
 		    "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com"
 	    }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.lat, data.lon);
        now1 (data.lat, data.lon)
    })
        //below function to use lat and lon
function now1 (lat,lon){
fetch(`https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?lat=${lat}&lon=${lon}&radius=16000&limit=10`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "81ac340436msh24215b45d49edcfp15f7e3jsn08c006be0de1",
            "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com"
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for (var i= 0; i < 10; i++){
            console.log(data.features[i]
            )
            ;
            const row = document.createElement("tr")
            const nameData= document.createElement("td")
            const distData= document.createElement("td")
            const rateData= document.createElement("td")
            const wikiData= document.createElement("td")
            const xidData= document.createElement("td")
            document.querySelector(".tables").appendChild(row)
            row.appendChild(nameData)
            row.appendChild(distData)
            row.appendChild(rateData)
            row.appendChild(wikiData)
            row.appendChild(xidData)
            nameData.textContent = data.features[i].properties.name
            distData.textContent = Math.round(data.features[i].properties.dist)
            rateData.textContent = data.features[i].properties.rate
          //  wikiData.textContent = data.features[i].properties.wikidata
          //  xidData.textContent = data.features[i].properties.xid

            const xid = data.features[i].properties.xid
            
            row.addEventListener("click",function(){
                fetch(`https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${xid}`,{
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "81ac340436msh24215b45d49edcfp15f7e3jsn08c006be0de1",
                        "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com"
                    }
                })
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data)
                    const display= document.getElementById('display')
                    
                   // display.inneHTML = `` this is to display data
                    if(data.preview){
                        display.innerHTML = `<img src=${data.preview.source}>
                        <p1>${data.wikipedia_extracts.html}</p1>`

                    }
                    display.innerHTML += `<p><a target="_blank" href="${data.otm}">
                    See more
                    </a></p>`;
                    
                })    
            })
    }
})
.catch(function(error){
        console.log('there was an error', error);
    })	
}

}

getEnd()

