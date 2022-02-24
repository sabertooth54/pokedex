    let pokemonRepository = (function () {
      let repository = [
  
          {
            name:"Bulbasaur", 
            type: ["grass","monster"],
            height: 0.7},
          {
            name:"Butterfree", 
            type: "bug",
            height: 1.1},
          {
            name:"Metapod",
            type :"bug",
            height: 0.7},
          {
            name:"Charizard",
            type :["Dragon","Monster"], 
            height: 1.7},
          {
            name:"Weedle",
            type :"bug", 
            height: 0.3},
          {
            name:"Ekans",
            type: ["Dragon","Field"], 
            height: 2.0},
          {
            name:"Arbok",
            type: ["Dragon","Field"], 
            height: 3.5}];
      
            function add(pokemon) {
              if (
                typeof pokemon === "object" &&
                "name" in pokemon &&
                "height" in pokemon &&
                "types" in pokemon
              ) {
                repository.push(pokemon);
              } else {
                console.log("pokemon is not correct");
              }
            }
            function getAll() {
              return repository;
            }
            function addListItem(pokemon){
              let pokemonList = document.querySelector(".pokemon-list");
              let listpokemon = document.createElement("li");
              let button = document.createElement("button");addEventListener("click", function() {console.log(pokemon)});
              button.innerText = pokemon.name;
              button.classList.add("button-class");
              listpokemon.appendChild(button);
              pokemonList.appendChild(listpokemon);
            }

            function showDetails(pokemon){
              console.log(pokemonRepository);
            }
          
          
            return {
              add: add,
              getAll: getAll,
              addListItem: addListItem
              
            };
          })();
          
          pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });
          
          console.log(pokemonRepository.getAll());
          
          pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
          });