let infoContainer = document.querySelector("#infoContainer");

//event listenter 1: load page with DOM 
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

function addName(venue){
  const h3 = document.createElement("h3");
  h3.innerText =venue.name; 
  infoContainer.append(h3)
}

function addImage(venue){
  let img = document.createElement("img");
  img.src = venue.image;
  img.width = 600;
  //event listener 2: hidden feat of info about club 
  img.addEventListener("click", flipIt)
  let div = document.createElement("div")
  div.setAttribute("class", "hidden")
  div.innerHTML = `
    <h5>Name: ${venue.name}</h5>
    <p>Est since: ${venue.year}</p>
    <p>Maximum Capacity: ${venue.max_capacity}</p>
    <p>Type of venue: ${venue.type_of_venue}</p>
    <p>Reason why you should visit: ${venue.cool_factor}</p>
  `;
  img.append(div)
  infoContainer.append(img)
}

//toggling between 2 classes 
  function flipIt(event) {
  let targetId = event.target.firstChild
  if(targetId.className === "hidden"){
    //does it not display the div?
    console.log("yes")
    targetId.className = "show"
  }else{
    console.log("no")
    targetId.className = "hidden"
    }
  }

//event listener 3: like button w display of likes next to it
function likebutton(venue){
  const heartButton = document.createElement("button")
  const p = document.createElement("p")
  p.innerText=`${venue.likes} people liked this venue`
  p.style.display = "inline block"
  heartButton.innerText = "♥ Like Me";
  heartButton.setAttribute("id", venue.id) 
  heartButton.addEventListener("click", (e) => {
  updateLikes(e)
    })
  infoContainer.append(p, heartButton)
} 

function updateLikes(e){
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
.then(resp =>resp.json())
.then(like_obj=>{
  e.target.previousElementSibling.innerText = `${more} people liked this venue`
})
}
