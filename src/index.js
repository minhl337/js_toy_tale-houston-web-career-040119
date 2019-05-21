const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
});
// OR HERE!


let toys = []
let toysDiv
let likeAmnt
document.addEventListener('DOMContentLoaded',function(){

  toysDiv = document.querySelector("div#toy-collection");

fetch('http://localhost:3000/toys').then(res => res.json()).then(function(e){
  e.preventDefault
  toys = e
  renderToys(toys)
})

let addButton = document.querySelector('form.add-toy-form')

addButton.addEventListener("submit", function(e){
  e.preventDefault

  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": e.target.children[1].value,
      "image": e.target.children[3].value,
      "likes": 0
    })
  }).then(res => res.json()).then(function(newToys){
    e.target.reset()
    toys.push(newToys)
    renderToys(newToys)
  })
})

let likeButtons = document.querySelectorAll("button.like-btn");

toysDiv.addEventListener("click",function(e){
  e.preventDefault

  let id = e.target.id
  // fetch(`http://localhost:3000/toys/${id}`).then(res => res.json()).then(function(thing){

  // likeAmnt = thing.likes
  // })
  
  let x = parseInt(e.target.id)
  let y = toys.filter(pop => pop.id === x)[0].likes

  
  let like = parseInt(y)
  if(like != NaN){
  like = like + 1;
  } else{
    like = 1;
  }

  // let newLikes = parseInt(likeAmnt)+1

  if(e.target.className === "like-btn"){
  fetch(`http://localhost:3000/toys/${id}`,{
    method: "PATCH",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "likes": like
    })
  }).then(res=> res.json()).then(function(obj){
    let a =toys.filter(pop => pop.id === obj.id)[0];
    let b = toys.indexOf(a)
    toys[b]=obj
    toysDiv.innerHTML=""
    renderToys(toys)
  })

  }
})


});

function renderToys(toys){
  toys.forEach(function(toy){
    toysDiv.innerHTML = toysDiv.innerHTML + `<div class="card" id="${toy.name}"> 
    <h2>${toy.name}</h2> 
    <img class="toy-avatar" src="${toy.image}"> 
    <p id="${toy.name}">${toy.likes}</p>
    <button class="like-btn" id="${toy.id}" name="${toy.name}">Like <3</button>
    </div>`
  })

}
