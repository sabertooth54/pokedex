let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  
  function add(pokemon) {
    repository.push(pokemon);
    
  }
  
  function getAll() {
    return repository;
    }
  

  function addListItem(pokemon) {
    let repository = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    repository.appendChild(listpokemon);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });


  }
  //fucnction for retrieving the pokemon from API 
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
     let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        
        return response.json();
      })
      //what will be displayed in Modal
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = [];

        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
          }
      })
      .catch(function (e) {
        
        console.error(e);
      });
  }
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }
  function closeModal(item) {

    const closeBtn = document.querySelector('btn btn-primary');
    closeBtn.addEventListener('click', closeModal);
  }
  
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty ();//used to prvent error of Modal title stacking on each other, if more than one Pokemon was clicked
    modalBody.empty ();

    let pokemonName = $('<h2>' + item.name + '</h2>');

    let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');

    let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');

    let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    let pokemonImage = $('<img class=\'pokemon-modal-image\'>');
    pokemonImage.attr('src', item.imageUrl); 
    
    
    

    modalTitle.append(pokemonName); // pokemonName is displayed as the title in the modal
    modalBody.append(pokemonImage); // pokemonImage is displayed in the body of the modal
    modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
    modalBody.append(pokemonWeight); // pokemonWeight is displayed in the body of the modal
    modalBody.append(pokemonAbilities); // pokemonDetails are displayed in the body of the modal
  }
  

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    
  };
})();//the IIFE stops here

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});