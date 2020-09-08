const api = require('../services/api')


// Criando meu próprio map
Array.prototype.myMap = function (callback){
  const newArray = []
  for(let i=0; i <= this.length - 1; i++){
    const result = callback(this[i],i)
    newArray.push(result)
  }
  return newArray;
}



const main = async () => {
  try {
    
    const results = await api.getPeople('1')
    const starships = []
    
    // results.starships.forEach((item) => {
    //   starships.push(item)
    // })

    const films = results.films.myMap((film, indice) => {
      return film
    })
    console.log(films)
    
    results.starships.map((starship) => {
      return starships.push(starship)
    })
     console.log(starships)

  } catch (error) {
    console.error('Deu ruim', error)
  }
}

main()