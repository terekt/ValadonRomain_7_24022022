import { search } from './search.js';
import { recetteFactory } from './factory.js';
import recipes from './recipes.js';

// met à jour l'affichage des recette via le résultat de recherche
export function results(result){

    var recetteSection = document.querySelector(".resultat-container");
    recetteSection.innerHTML = "";

    if (result != "") { // si la recherche n'est pas vide
        result.forEach((recette) => { // créé et insère un élément html pour chaque élément de la liste
            const recetteModel = new recetteFactory(recette);
            const recetteDOM = recetteModel.recetteDOM();
            recetteSection.appendChild(recetteDOM);
        });
    }
}