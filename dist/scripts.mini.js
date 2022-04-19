let pokemonRepository = (function () {
  let t = [],
    e = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(e) {
    t.push(e);
  }
  function i(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types),
          (t.weight = e.weight),
          (t.abilities = []);
        for (let n = 0; n < e.abilities.length; n++)
          t.abilities.push(e.abilities[n].ability.name);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function o(t) {
    i(t).then(function () {
      !(function (t) {
        let e = $(".modal-body"),
          n = $(".modal-title");
        n.empty(), e.empty();
        let i = $("<h2>" + t.name + "</h2>"),
          o = $("<p>Height: " + t.height + "</p>"),
          l = $("<p>Weight: " + t.weight + "</p>"),
          a = $("<p>Abilities: " + t.abilities + "</p>"),
          s = $("<img class='pokemon-modal-image'>");
        s.attr("src", t.imageUrl),
          n.append(i),
          e.append(s),
          e.append(o),
          e.append(l),
          e.append(a);
      })(t);
    });
  }
  return {
    add: n,
    getAll: function () {
      return t;
    },
    addListItem: function (t) {
      let e = document.querySelector(".pokemon-list"),
        n = document.createElement("li"),
        i = document.createElement("button");
      (i.innerText = t.name),
        i.classList.add("button-class"),
        n.appendChild(i),
        e.appendChild(n),
        i.addEventListener("click", () => {
          o(t);
        });
    },
    loadList: function () {
      return fetch(e)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            let e = { name: t.name, detailsUrl: t.url };
            n(e), console.log(e);
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: i,
    showDetails: o,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
