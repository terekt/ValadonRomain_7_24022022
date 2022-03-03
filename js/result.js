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

searchinput.addEventListener("keyup", function(){
    const input = searchinput.value;
    if (input.length > 2) {
        var result = recipes.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    } else {
        result = "En attente de recherche"
    }

    if (result == "") {
        result = "Aucun résultat"
    }
    console.log(result);
})