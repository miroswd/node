const api = require("../services/api")

async function main(){
  try {
    const result = await api.getPeople('1')
    const films = []
     console.time('for')
     for(let i=0; i <= result.films.length; i++){
       const film = result.films[i]
       films.push(film)
     }    
     console.timeEnd('for')
     console.time('forin')
     for(let i in result.films){
       const film = result.films[i]
       films.push(film) 
     }
     console.timeEnd('forin')
    console.time('forof')
    for(film of result.films){
      films.push(film)
    }
    console.timeEnd('forof')

    console.log(`films:`, films)
  } catch (error) {
    console.error(`Internal error`, error)
  }
}
main()
