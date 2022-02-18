    let pokemonRepository = (function () {
  
        let pokemonList = [
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
      
        function getAll () {
          return pokemonList;
        }
      
        function add (pokemon) {
          pokemonList.push (pokemon);
        }
        return {
          getAll: getAll,
          add: add
          }
          
        }
      )()
      
      console.log(pokemonRepository.getAll());