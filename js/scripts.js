let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon) {
    let repository = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    //In your addListItem() function, add an event listener to the button you created. It should listen to a click. As for its event handler function, call the showDetails function there, passing the pokemon object as a parameter when a Pokémon is clicked.//
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    repository.appendChild(listpokemon);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  function showLoadingMessage() {
    const loading = document.createElement('h1')
    console.log(loading)
    loading.textContent = "Loading.....";
  }
  function hideLoadingMessage() {
    const loading =  document.createElement('h1');
    loading.classList.add("hide");
  }
  //added new function
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    
    modalTitle.empty ();
    modalBody.empty ();
  
    let nameElement = $ ("<p> " + "Name : " + item.name + "</p> ");
  
    let imageElement = document.createElement('img');
    imageElement.setAttribute ("src", item.imageUrl);
  
    let heightElement = $ ("<p> " + "Height : " + item.height + "</p> ")
  
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);

    console.log (item);
}
  

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal, //new fuction called here
  };

})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});