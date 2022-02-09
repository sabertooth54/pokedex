
var pokemonList = [{name:"Bulbasaur", type: ["grass","monster"],height: 0.7},{name:"Butterfree", type: "bug",height: 1.1},{name:"Metapod",type :"bug",height: 0.7},{name:"Charizard",type :["Dragon","Monster"], height: 1.7},{name:"Weedle",type :"bug", height: 0.3},{name:"Ekans",type: ["Dragon","Field"], height: 2.0},{name:"Arbok",type: ["Dragon","Field"], height: 3.5}]
            var text = "";
            
            for (var i = 0; i < pokemonList.length; i++) {
                if (pokemonList[i].height >= 1){
               
                    let big = "wow it's big"

                    text +=  `
                    <span style="font-size:24px;"><strong>Name</strong>: ${pokemonList[i].name}</span>
                    <span style="font-size:24px;"><strong>Height</strong>: ${pokemonList[i].height} ${big}</span><br>
                    
                    `
                }

   
    
            
            console.log(pokemonList[i].name,pokemonList[i].height)
            document.getElementById("text").innerHTML = text
            }
            
          

