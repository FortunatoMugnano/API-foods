console.log("Hello")




fetch("http://localhost:8088/restaurants")
    .then(restaurants => restaurants.json())
    .then(parsedRestaurants => {
        console.table(parsedRestaurants)
    })

// STARTING THE EXERCISE HERE   

const foodContainer = document.querySelector(".foodList")


//Create the string for the HTML    

function createFoodHTML(food) {
    let foodHtml = `
      <section>
      <h3>Name: ${food.name}</h3>
      <p>Category: ${food.category}</p>
      <p>Ethnicity: ${food.ethnicity}</p>
      <p>Ingridients: ${food.ingredients}</p>
      <p>Country of origin: ${food.origins}</p>
      <p>Calories per serving: ${food.calories}</p>
      <p>Fat per serving: ${food.fat}</p>
      <p>Sugar per serving: ${food.sugar}</p>
      </section>
      `
    return foodHtml
}

function addFoodToDom(htmlString) {
    foodContainer.innerHTML += htmlString
}




fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    };
                    if (productInfo.product.origins_text) {
                        food.origins = productInfo.product.origins_text
                    } else {
                        food.origins = "no country listed"
                    };
                    if (productInfo.product.nutriments.calories) {
                        food.calories = productInfo.product.nutriments.calories
                    } else {
                        food.calories = "no calories listed"
                    };
                    if (productInfo.product.nutriments.fat_value) {
                        food.fat = productInfo.product.nutriments.fat_value
                    } else {
                        food.fat = "no fats listed"
                    };
                    if (productInfo.product.sugar_text) {
                        food.sugar = productInfo.product.sugar_text
                    } else {
                        food.sugar = "no sugars listed"
                    };

                    // Produce HTML representation
                    const foodAsHTML = createFoodHTML(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })


/* Ingredients
Country of origin
Calories per serving
Fat per serving
Sugar per serving */