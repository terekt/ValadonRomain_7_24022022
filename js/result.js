// met à jour l'affichage des recette via le résultat de recherche
function resultDisplay(result){

    var recetteSection = document.querySelector(".resultat-container");
    recetteSection.innerHTML = "";

    if (result != "") { // si la recherche n'est pas vide
        result.forEach((recette) => { // créé et insère un élément html pour chaque élément de la liste
            const recetteModel = recetteFactory(recette);
            const recetteDOM = recetteModel.recetteDOM();
            recetteSection.appendChild(recetteDOM);
        });
    }
}