// Somar as alturas
const {getPeople} = require('../services/api')


Array.prototype.myReduce = function(callback, initialValue){
  let finalValue = typeof initialValue !== undefined ? initialValue : this[0]
  for(let i = 0; i <= this.length - 1; i++){
    finalValue = callback(finalValue, this[i], this)
  }
  return finalValue
}


async function main(){
  try {
    const {results} = await getPeople('a')
  
    const height = results.map(people => parseInt(people.height))

    const total = height.reduce((prev,next) =>{
      return prev+next
    },0)
    
    console.log(`height`, height)
    console.log(`total`, total)

    const myList = [['Miro','Erick'],['NodeBr','JS']]
    const final = myList.myReduce((prev, next) => {
      return prev.concat(next)
    },[]).join(', ')
    console.log(final)
  } catch (error) {
    console.log('Deu ruim', error)
  }
}

main()