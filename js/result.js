const searchinput = document.getElementById("searchinput")

searchinput.addEventListener("keyup", function () { // quand on tape une touche du clavier
    const input = searchinput.value; // récupère la valeur de la barre de recherche

    if (input.length > 2) { // si on a plus de 2 charactères
        var result = recipes.filter(function (item) { // crée et retourne un nouveau tableau à partir de la base de donnée
            const name = item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()); // récupère les recettes dont le nom correspond à la recherche
            const description = item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()); // description

            for (let i = 0; i < item.ingredients.length; i++) { // ingrédients
                var ingredientList = item.ingredients[i].ingredient.toLocaleLowerCase().includes(input.toLocaleLowerCase());
            }

            return (name || description || ingredientList) // retourne les éléments correspondants aux 3 critères
        })
    }
    else { // sinon revois une variable vide
        result = "";
    }

    console.log(result);

    //met à jour l'affichage des recette via le résultat de recherche
    var recetteSection = document.querySelector(".resultat-container");

    recetteSection.innerHTML = "";
    if (result != "") { // si la recherche n'est pas vide
        result.forEach((recette) => { // créé et insère un élément html pour chaque élément de la liste
            const recetteModel = recetteFactory(recette);
            const recetteDOM = recetteModel.recetteDOM();
            recetteSection.appendChild(recetteDOM);
        });
    }
})




function recetteFactory(data) {
    const { id, name, ingredients, time, description } = data;

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

            if (ingredientMetric == "grammes") { // réduit la taille l'unité de mesure pour correspondre aux maquettes
                ingredientMetric = "g";
            }
            if (ingredientMetric == "cuillères à soupe") {
                ingredientMetric = "cuillères";
            }
            if (ingredientMetric == undefined) { // si aucune unité de mesure n'est récupéré, renvoyer une valeure vide
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