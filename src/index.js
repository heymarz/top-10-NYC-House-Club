let venueArray=[];

//load page with nothing. just drop down menu
let eHandler = function(){
  fetch('http://localhost:3000/venues')
  .then(resp => resp.json())
  .then(data=>{renderOnPage(data) });
}

function renderOnPage(venues){
  //select contatiner where element will go
  let infoContainer = document.querySelector("#infoContainer");

  venues.forEach(venue => {
  //create an html element that the innertext of the name
  const h3 = document.createElement("h3");
  h3.innerText =venue.name;
  const img = document.createElement("img");
  img.src = venue.image;
  img.width = 500;


  //append the element to the container     
  let div = document.createElement("div");
  div.classList.add("sleeve");
  div.append(h3, img);
  infoContainer.append(div)    
  }); 
}


document.addEventListener("DOMContentLoaded", function(){
  eHandler();

})


/*
//event listener 1: when form submits(dropdown menu), fetch the option submitted

//display the clubs that correlates to option value 

//event listener 2: hidden feat of info about club 

//event listener 3: like button w display of likes next to it

*/

