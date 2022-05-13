let pokemonRepository = (function () {
  let t = [],
    e = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(e) {
    e.name && e.detailsUrl ? t.push(e) : console.log("Pokemon is not correct!");
  }
  function o() {
    let t = $("input").val();
    $("li").each(function () {
      let e = $(this);
      e.text().startsWith(t) ? e.show() : e.hide();
    });
  }
  function l(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then((t) => t.json())
      .then((e) => {
        (t.weight = e.weight),
          (t.imageUrl = e.sprites.front_default),
          (t.svgUrl = e.sprites.other.dream_world.front_default),
          (t.height = e.height);
        let n = [];
        e.types.forEach((t) => n.push(t.type.name)), (t.types = n);
      })
      .catch((t) => console.log(t));
  }
  return (
    $("input").on("input", o),
    {
      getAll: function () {
        return t;
      },
      add: n,
      loadList: function () {
        return fetch(e)
          .then((t) => t.json())
          .then((t) => {
            t.results.forEach((t) => {
              n({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch((t) => console.log(t));
      },
      loadDetails: l,
      addListItem: function (t) {
        let e = document.querySelector("ul"),
          n = document.createElement("li");
        n.classList.add("col-sm-6");
        let o = document.createElement("button");
        (o.innerText = t.name),
          o.addEventListener("click", (e) => {
            !(function (t) {
              l(t).then(() => {
                !(function (t) {
                  let e = $(".modal-body"),
                    n = $(".modal-title");
                  n.empty(), e.empty();
                  let o = $(`<h1>${t.name}</h1>`),
                    l = $(
                      `<img class="modal-img mx-auto" src="${t.svgUrl}" alt="Drawing of Pokemon ${t.name}">`
                    ),
                    a = $(`<p class="ml-4 mt-3 mb-0">Height: ${t.height}</p>`),
                    i = $(`<p class="ml-4 mb-0">Weight: ${t.weight}</p>`),
                    s = $(`<p class="ml-4">Types: ${t.types.join(", ")}</p>`);
                  n.append(o),
                    e.append(l),
                    e.append(a),
                    e.append(i),
                    e.append(s);
                })(t);
              });
            })(t),
              e.target.blur();
          }),
          o.classList.add("btn", "btn-block", "btn-outline-primary"),
          o.classList.add("m-1", "bg-yellow"),
          o.setAttribute("data-toggle", "modal"),
          o.setAttribute("data-target", ".modal"),
          n.appendChild(o),
          e.appendChild(n);
      },
      filterList: o,
    }
  );
})();
pokemonRepository.loadList().then(() => {
  pokemonRepository
    .getAll()
    .sort((t, e) => t.name > e.name)
    .forEach((t) => {
      pokemonRepository.addListItem(t);
    });
});
