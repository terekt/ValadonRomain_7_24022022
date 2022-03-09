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