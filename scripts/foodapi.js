console.log("Hello")

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
    })


fetch("http://localhost:8088/restaurants")
    .then(restaurants => restaurants.json())
    .then(parsedRestaurants => {
        console.table(parsedRestaurants)
    })

// STARTING THE EXERCISE HERE   

const foodContainer = document.querySelector(".foodList")


//Create the string for the HTML    

function createFoodHTML(foodObj) {
    let foodHtml = `
      <section>
      <h3>Name: ${foodObj.name}</h3>
      <p>Category: ${foodObj.category}</p>
      <p>Ethnicity: ${foodObj.ethnicity}</p>
      </section>
      `
    return foodHtml
}

function addFoodToDom(htmlString) {
    foodContainer.innerHTML += htmlString
}


fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(item => {
            const foodAsHTML = createFoodHTML(item)
            addFoodToDom(foodAsHTML)
        })
    })
