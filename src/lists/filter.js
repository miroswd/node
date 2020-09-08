const {getPeople} = require('../services/api') // Pegando somente um método

// const papoca = 'papoca esse like'
// console.log(papoca.indexOf('essea') !== -1) // retorna true ou false


// prototype => manipula o array
Array.prototype.myFilter = function (callback) {
  const list = []
  for(index in this){
    const item = this[index];
    const result = callback(item, index, this)

    if(!result) continue;
    list.push(item)
  }
  return list;
}

const main = async () => {
  try {
    const {results} = await getPeople('a')
    const larsFamily = results.filter((item) => {
      /* Por padrão, retorna um boolean, para informar
         se mantém ou remove da lista */
      
      // verificando se existe a string lars dentro de item.name, pegando a posição no array
      const result = item.name.toLowerCase().indexOf(`lars`) !== -1 
      return result
    })

    const names = larsFamily.map((people) => people.name)
    console.log(`lars`, names)

    const vader = results.myFilter((item, index, list) => {
      return item.name.toLowerCase().indexOf('vader') !== -1
    })
    
    const vaderFamily = vader.map(people => people.name)
    console.log(`vader`, vaderFamily)

  } catch (error) {
    console.error('error', error)
  }

}

main()