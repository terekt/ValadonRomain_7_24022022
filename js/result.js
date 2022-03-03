/*function BinarySearchJSON (List,Index,ColumnName) {
    var First = 0
    var Last = List.length - 1
    while (First <= Last) {
       var Middle = Math.floor((First+Last)/2)
       if (List[Middle][ColumnName] < Index) {
         First = Middle + 1
       } else if (List[Middle][ColumnName] > Index) {
         Last = Middle - 1
       } else {
         return List[Middle]
       }
    }
    return false
}

console.log(BinarySearchJSON(recipes,1,"id"))
console.log(BinarySearchJSON(recipes,9,"id"))
console.log(BinarySearchJSON(recipes,12,"id"))*/

const searchinput = document.getElementById("searchinput")

searchinput.addEventListener("keyup", function () {
    const input = searchinput.value;
    if (input.length > 2) {
        var result = recipes.filter(function (item) {
            const name = item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()); // récupère les recettes dont le nom correspond
            const description = item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()); // description

            for (let i = 0; i < item.ingredients.length; i++) { // ingrédients
                var ingredientList = item.ingredients[i].ingredient.toLocaleLowerCase().includes(input.toLocaleLowerCase());
            }

            return (name || description || ingredientList)
        })
    } else {
        result = "En attente de recherche"
    }

    if (result == "") {
        result = "Aucun résultat"
    }
    console.log(result);

    //met à jour l'affichage des recette via le résultat de recherche
    var recetteSection = document.querySelector(".resultat-container");

    recetteSection.innerHTML = "";
    result.forEach((recette) => {
        const recetteModel = recetteFactory(recette);
        const recetteDOM = recetteModel.recetteDOM();
        recetteSection.appendChild(recetteDOM);
    });
})




function recetteFactory(data) {
    const { id, name, ingredients, time, description } = data;

    //console.log(ingredients);

    /*for (let i = 0; i < ingredients.length; i++) { // ingrédients
        var ingredientItem = ingredients[i].ingredient;
        console.log(ingredientItem);
    }*/

    function recetteDOM() {
        const recetteList = document.createElement("div");
        recetteList.setAttribute("class", "resultat");

        let card = "";

        card += `
        <img src="img/coco.jpeg" alt="${name}">
        <div class="resultat-info">
            <div class="titre-container">
                <div class="nom">${name}</div>
                <div class="temps">
                    <i class="fas fa-clock"></i>
                    <p>${time} min</p>
                </div>
            </div>
            <div class="description-container">
                <div class="ingredients">`

        for (let i = 0; i < ingredients.length; i++) { // ingrédients
            var ingredientItem = ingredients[i].ingredient;
            var ingredientQuantity = ingredients[i].quantity;
            var ingredientMetric = ingredients[i].unit;

            if (ingredientMetric == "grammes") {
                ingredientMetric = "g";
            }
            if (ingredientMetric == "cuillères à soupe") {
                ingredientMetric = "cuillères";
            }
            if (ingredientMetric == undefined) {
                ingredientMetric = "";
            }

            card += `<div><b>${ingredientItem}:</b> ${ingredientQuantity} ${ingredientMetric}</div>`
        }

        card += `</div>
                <div class="texte-recette">
                    <p>${description}</p>
                </div>
            </div>
        </div>`;

        recetteList.innerHTML = card;

        return recetteList;
    }
    return {
        id,
        name,
        ingredients,
        time,
        description,
        recetteDOM,
    };
}