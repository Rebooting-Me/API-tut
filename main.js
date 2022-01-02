let timer
let deleteDelay

async function start(){
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
}

start()


function createBreedList(breedList){
    document.getElementById("breed").innerHTML = `
    <select onchange = "getImages(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList).map(function(br){
                return `<option>${br}</option>`
            }).join('')}
    </select>
`
}

async function getImages(images){
    if(images != "Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${images}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(breed){
    let currentPos = 0
    clearInterval(timer)
    clearTimeout(deleteDelay)

    if(breed.length > 1){
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${breed[0]}')"></div>
    <div class="slide" style="background-image: url('${breed[1]}')"></div>
    `
    currentPos += 2
    if(breed.length == 2){currentPos = 0}
    timer = setInterval(nextSlide, 3000)
    }else{
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${breed[0]}')"></div>
    <div class="slide"></div>
    `
    }
    
    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${breed[currentPos]}')"></div>`)
        deleteDelay = setTimeout(function (){document.querySelector(".slide").remove()}, 1000)
        if(currentPos + 1 >= breed.length){
            currentPos = 0
        }else{
            currentPos++
        }
    }
}