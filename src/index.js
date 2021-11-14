let venueArray=[];
let infoContainer = document.querySelector("#infoContainer");

//load page with nothing. just drop down menu
document.addEventListener("DOMContentLoaded", function(){
  loadImages();
})

//my forEach fx to render info onto page
function loadImages(){
  fetch('http://localhost:3000/venues')
  .then(resp => resp.json())
  .then(results=>{
    results.forEach(result=>{
      addName(result);
      addImage(result);
      likebutton(result)
    })
  });
}

function addImage(venue){
  let img = document.createElement("img");
  img.src = venue.image;
  img.width = 500;
//event listener 2: hidden feat of info about club 
  let div = document.createElement("div")
  div.setAttribute("class", "myDiv")
  div.innerText = venue.year
  img.setAttribute("onclick", onclick="myfunction()")
  img.append(div)
  infoContainer.append(img)
  }

  //HOW TO SELECT THE DIV THAT IS BEING CLICKED ON
function myfunction(){
  const div = document.getElementsByClassName("myDiv")
 if (e.div.style.display === "none") {
  e.div.style.display = "block";
    } else {
      e.div.style.display = "none";
      }
    }

function addName(venue){
  const h3 = document.createElement("h3");
  h3.innerText =venue.name; 
  infoContainer.append(h3)
}
  //select contatiner where element will go
  //create an html element that the innertext of the name
 //append the element to the container 

function likebutton(venue){
  const heartButton = document.createElement("button")
  const p = document.createElement("p")
  p.innerText=`${venue.likes} people liked this venue`
  heartButton.innerText = "♥ Like Me";
  heartButton.setAttribute("class", venue.type_of_venue)
  
  heartButton.setAttribute("id", venue.id) 
  heartButton.addEventListener("click", (e) => {
  updateLikes(e)
    })
  infoContainer.append(p, heartButton)
} 

//event listener 3: like button w display of likes next to it
function updateLikes(e){
  //prevent refreshing page
  e.preventDefault();
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/venues/${e.target.id}`, {
    method: "PATCH",
    headers:{
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
.then(resp =>console.log(resp.json()))
.then(like_obj=>{
  e.target.previousElementSibling.innerText = `${more} people liked this venue`
})
}




/*
//event listener 1: when form submits(dropdown menu), fetch the option submitted
//display the clubs that correlates to option value 
*/




