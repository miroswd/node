const EventEmitter = require("events") // Classe abstrata

class MyEmissor extends EventEmitter{

}

const myEmissor = new MyEmissor()
const eventName = 'click'

myEmissor.on(eventName, function(click){
  console.log('um usuário clicou', click)
})

// myEmissor.emit(eventName, 'na barra de rolagem')
// myEmissor.emit(eventName, 'no botão ok')

// let count = 0
// setInterval(() => {
//   count++
//   myEmissor.emit(eventName,'em algo ' + count)
// }, 1000)


const input = () => {
  return new Promise((resolve,reject)=>{

    const stdin = process.openStdin()
    stdin.addListener('data', (value) => {
      return resolve(value)
    })    
  })
}

input().then((result) => {
  {console.log(result.toString())}
})
