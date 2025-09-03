document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("inputtex");
  const SearchButton = document.getElementById("seacrhbutt");
  const drinksContain = document.getElementById("drinkscontainer");
  const addedDrinks = document.getElementById("drinksthatadded");
  const allContain = document.getElementById("allcontainer");
  const modalContain = document.getElementById("modalcontainer");
  const totalSpan = document.getElementById("totalcartspan");

  async function showFirstTen() {
    for (let id = 11001; id <= 11030; id++) {
      let response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      let data = await response.json();

      let drink = data.drinks ? data.drinks[0] : null;

      if (drink == null) {
        continue;
      }

      const div = document.createElement("div");
      div.classList.add("drinkscard");

      div.innerHTML = `
            
              <img src="${drink.strDrinkThumb}" alt="${drink.idDrink}">

              <div class="text-div">

                <p>Name:${drink.strDrink}</p>
                <p>Catagory: ${drink.strCategory}</p>
                <p>Instruction: ${drink.strInstructions.slice(0, 10)}...</p>
                <div class = "butt-div">
                    <button class = "addtocart" data-id="${drink.idDrink}">
                    Add To Cart
                    </button>
                    <button class = "detailsbutton" data-id="${
                      drink.idDrink
                    }">Details</button>    
                </div>
        
              </div>
             
              
            `;

      drinksContain.appendChild(div);
    }

    const addToCartButtons = document.querySelectorAll(".addtocart");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const drinkId = this.dataset.id;

        button.innerText = "Already Selected";
        button.disabled = true;
        addToCart(drinkId);
      });
    });

    const detailsButton = document.querySelectorAll(".detailsbutton");

    detailsButton.forEach((button) => {
      button.addEventListener("click", function () {
        const drinkId = this.dataset.id;

        showModal(drinkId);
      });
    });
  }

  showFirstTen();

  async function showModal(id) {
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    if (!response.ok) {
      console.groupEnd("Error");
    }

    let data = await response.json();
    let drink = data.drinks[0];

    const div = document.createElement("div");
    div.classList.add("modalcard");

    div.innerHTML = `
            
               <div className="modalimagecontainer">
                     <img src="${
                       drink.strDrinkThumb
                     }" id = "modalimage" alt="iamge" />
                </div>
           

                <div className="modaltextcontainer">
                      <p>Details</p>
                      <p>Catagory: ${drink.strCategory}</p>
                      <p>Alcoholic: ${drink.strAlcoholic}</p>
                      <p>${drink.strInstructions.slice(0, 50)}</p>
        
               </div>
               
               <button id = "closebuttton">Close</button>
            
            `;

    allContain.classList.add("show");
    modalContain.appendChild(div);

    const closeButton = document.getElementById("closebuttton");

    closeButton.addEventListener("click", function fun() {
      modalContain.removeChild(div);
      allContain.classList.remove("show");
    });
  }

  async function getDrinkDetails(key) {
    key = key.trim().toLowerCase();
    let atleastOne = false;

    for (let i = 97; i <= 122; i++) {
      let ch = String.fromCharCode(i);

      let response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${ch}`
      );
      let data = await response.json();

      if (data.drinks == null) {
        continue;
      }

      for (let k = 0; k < data.drinks.length; k++) {
        let drinkName = data.drinks[k].strDrink.trim().toLowerCase();

        let check = false;

        let index = 0;

        for (let j = 0; j < drinkName.length; j++) {
          let temp = drinkName[j];

          if (temp == key[index]) {
            index++;
          } else {
            index = 0;
          }

          if (index == key.length) {
            check = true;
            index = k;
            break;
          }
        }

        if (check) {
          atleastOne = true;

          const div = document.createElement("div");
          div.classList.add("drinkscard");

          let drink = data.drinks[k];

          div.innerHTML = `
            
                        <img src="${drink.strDrinkThumb}" alt="${
            drink.idDrink
          }">

                        <div class="text-div">

                            <p>Name:${drink.strDrink}</p>
                            <p>Catagory: ${drink.strCategory}</p>
                            <p>Instruction: ${drink.strInstructions.slice(
                              0,
                              10
                            )}...</p>
                            <div class = "butt-div">
                                <button class = "addtocart" data-id="${
                                  drink.idDrink
                                }">
                                Add To Cart
                                </button>
                               <button class = "detailsbutton" data-id="${
                                 drink.idDrink
                               }">
                               Details</button>       
                            </div>
                    
                        </div>
                        
                        
                        `;

          drinksContain.appendChild(div);
        }
      }
    }

    if (!atleastOne) {
      // no item found:
      const div = document.createElement("div");
      div.innerHTML = `<h1> &#128546; NO Items Found !!!</h1>`;

      drinksContain.appendChild(div);
      return;
    }

    const addToCartButtons = document.querySelectorAll(".addtocart");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const drinkId = this.dataset.id;

        button.innerText = "Already Selected";
        button.disabled = true;
        addToCart(drinkId);
      });
    });

    const detailsButton = document.querySelectorAll(".detailsbutton");

    detailsButton.forEach((button) => {
      button.addEventListener("click", function () {
        const drinkId = this.dataset.id;
        showModal(drinkId);
      });
    });
  }

  let totalDrink = 1;

  async function addToCart(id) {
    if (totalDrink > 8) {
      alert("Cannot add more than 8 drinks");
      return;
    }
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    let data = await response.json();
    let drink = data.drinks[0];

    const div = document.createElement("div");
    div.classList.add("addeddrink");
    div.innerHTML = `
         <div class="totaldrinkcontainer">
            <p>${totalDrink}</p>
        </div>
         <div class="imagecontainer">
              <img src="${drink.strDrinkThumb}" alt="${drink.idDrink}">
        </div>
        <div class="namecontainer">
              <p>${drink.strDrink}</p>
        </div>
       
      
        
        
        `;

    addedDrinks.appendChild(div);
    totalSpan.innerText = totalDrink;
    totalDrink++;
  }

  SearchButton.addEventListener("click", function () {
    inputData = inputText.value;

    if (inputData.length == 0) {
      alert("Input data should not be empty");
    } else {
      //    console.log("Your input: " + inputData);

      drinksContain.innerHTML = "";

      getDrinkDetails(inputData);
    }
  });
});
