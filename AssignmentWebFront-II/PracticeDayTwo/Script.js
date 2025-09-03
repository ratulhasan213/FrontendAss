document.addEventListener("DOMContentLoaded", function () {
   
    const singleItem = document.getElementById("singleitem");
    const inputText = document.getElementById("inputext");
    const searchButton = document.getElementById("searchbutt");
    const showResult = document.getElementById("showresult");




    async function printSingleMealDetails(id) {
        let response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        let data = await response.json();

        // console.log(data.meals);

        let food = data.meals[0];

        const div = document.createElement("div");
        div.classList.add("singleFood");
        
        div.innerHTML = `
         <img src="${food.strMealThumb}"  alt="${id}" >
         <h2>${food.strMeal}</h2>
         <p>Ingredients:</p>
         <ul id = "list"></ul>
        `;

        const ul = div.querySelector("#list");

          for (let i = 1; i <= 20; i++) {
            let ingredient = food[`strIngredient${i}`];

              if (ingredient && ingredient.trim() !== "") {
                
                  const li = document.createElement("li");
                  li.innerText = ingredient;

                  ul.appendChild(li);
                  
               }
          }
        
        
        singleItem.appendChild(div);


       
    }




    async function getFoodDetails(key) {
      
       
        key = key.trim().toLowerCase();


        let atleastOne = false;

        for (let i = 97; i <= 122; i++){
            
            let ch = String.fromCharCode(i);
            

              let response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?f=${ch}`
              );

            //   console.log(response);
            let data = await response.json();
            
            

            if (data.meals != null) {

               
                
                for (let k = 0; k < data.meals.length; k++) {
                     
                        let mealName = data.meals[k].strMeal.trim().toLowerCase();
                        let copyName = data.meals[k].strMeal;
                        let mealId = data.meals[k].idMeal;

                        let check = false;
                    
                        let index = 0;
                        for (let j = 0; j < mealName.length; j++) {
                            
                                let temp = mealName[j];

                                if (temp == key[index]) {
                                    index++;
                                } else {
                                    index = 0;
                                }

                                if (index == key.length) {
                                    check = true;
                                    break;
                                }
                            
                        }
                    
                        if (check) {
                            // console.log(mealName);

                            atleastOne = true;

                            const div = document.createElement("div");
                            div.classList.add("foodCard");
                            div.innerHTML = `

                            <img src="${data.meals[k].strMealThumb}"  alt="${mealId}" class = "clickimage">
                            
                            <h2>${copyName}</h2>
                            
                            `;

                            showResult.appendChild(div);

                    
                        } 
                        
                       
                    

                }

                
                
            } 

         

           
        }



                if (!atleastOne) {
                  // no item found:
                  const div = document.createElement("div");
                  div.innerHTML = `
                        <h1> &#128546; NO Items Found !!!</h1>
                        `;

                  showResult.appendChild(div);
                }
        

        // console.log("end");
        

        const clickimages = document.getElementsByClassName("clickimage");

        for (let img of clickimages) {

             img.addEventListener("click", function () {
                 const foodId = parseInt(img.alt);
                
                 printSingleMealDetails(foodId);
                 
             });
            
        }

       

            

          
            

      
        

       
    }
    


    searchButton.addEventListener("click", function () {
       
        inputData = inputText.value;

        if (inputData.length == 0) {

            alert("Input data should not be empty");
           
        }
        else {
            //    console.log("Your input: " + inputData);  

              getFoodDetails(inputData);

        }
        
    });



});






/* 


{idMeal: '52831', strMeal: 'Chicken Karaage', strMealAlternate: null, strCategory: 'Chicken', strArea: 'Japanese', …}
dateModified
: 
null
idMeal
: 
"52831"
strArea
: 
"Japanese"
strCategory
: 
"Chicken"
strCreativeCommonsConfirmed
: 
null
strImageSource
: 
null
strIngredient1
: 
"Chicken"
strIngredient2
: 
"Ginger"
strIngredient3
: 
"Garlic"
strIngredient4
: 
"Soy sauce"
strIngredient5
: 
"Sake"
strIngredient6
: 
"Granulated sugar"
strIngredient7
: 
"Potato starch"
strIngredient8
: 
"Vegetable oil"
strIngredient9
: 
"Lemon"
strIngredient10
: 
""
strIngredient11
: 
""
strIngredient12
: 
""
strIngredient13
: 
""
strIngredient14
: 
""
strIngredient15
: 
""
strIngredient16
: 
""
strIngredient17
: 
""
strIngredient18
: 
""
strIngredient19
: 
""
strIngredient20
: 
""
strInstructions
: 
"Add the ginger, garlic, soy sauce, sake and sugar to a bowl and whisk to combine. Add the chicken, then stir to coat evenly. Cover and refrigerate for at least 1 hour.\r\n\r\nAdd 1 inch of vegetable oil to a heavy bottomed pot and heat until the oil reaches 360 degrees F. Line a wire rack with 2 sheets of paper towels and get your tongs out. Put the potato starch in a bowl\r\n\r\nAdd a handful of chicken to the potato starch and toss to coat each piece evenly.\r\n\r\nFry the karaage in batches until the exterior is a medium brown and the chicken is cooked through. Transfer the fried chicken to the paper towel lined rack. If you want the karaage to stay crispy longer, you can fry the chicken a second time, until it's a darker color after it's cooled off once. Serve with lemon wedges."
strMeal
: 
"Chicken Karaage"
strMealAlternate
: 
null
strMealThumb
: 
"https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg"
strMeasure1
: 
"450 grams Boneless skin"
strMeasure2
: 
"1 tablespoon"
strMeasure3
: 
"1 clove"
strMeasure4
: 
"2 tablespoons"
strMeasure5
: 
"1 tablespoon"
strMeasure6
: 
"2 teaspoon"
strMeasure7
: 
"1/3 cup"
strMeasure8
: 
"1/3 cup"
strMeasure9
: 
"1/3 cup"
strMeasure10
: 
""
strMeasure11
: 
""
strMeasure12
: 
""
strMeasure13
: 
""
strMeasure14
: 
""
strMeasure15
: 
""
strMeasure16
: 
""
strMeasure17
: 
""
strMeasure18
: 
""
strMeasure19
: 
""
strMeasure20
: 
""
strSource
: 
"https://norecipes.com/karaage-recipe"
strTags
: 
null
strYoutube
: 
"https://www.youtube.com/watch?v=XivddFddthc"
[[Prototype]]
: 
Object






*/