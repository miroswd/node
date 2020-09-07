// Obter um usuário
// Obter o número de telefone de um usuário, a partir de seu Id
// Obter o endereço do usuário, a partir do Id

// importando um módulo interno do nodejs
const util = require("util")
const getAddressPromise = util.promisify(getAddress) // Converte o callback para promise

function getUser(){
  // Problema => reject(err)
  // Sucesso => resolve
  return new Promise(function resolvePromise(resolve, reject){
    setTimeout(() =>{
      // return reject(new Error('REJECT'))
      return resolve({
        id:1,
        name:'Miro',
        birth:new Date(),
        })
      }, 1000)
  })
}

function getPhone(idUser){
  return new Promise((resolve,reject)=> {
    setTimeout(() => {
      // return reject(new Error('Phone deu zebra'))
      return resolve({
        phone:981111111,
        ddd:11,
      }
    )},2000)
  })
}

function getAddress(idUser, callback){
  setTimeout(() => {
    return callback(null, {
      street:'Rua Tchurusbango Tchurusbago',
      number:0,
    })
  },1000)
}

const userPromise = getUser()
// Para manipular o sucesso, usamos .then
// Para manipular erros, usamos .catch

// result:user
// Resolver as promises em pilha, o retorno é o último resultado que foi manipulado, retorno do último then
userPromise.then((user)=>{return getPhone(user.id).then((result)=>{
  return {
    user:{
      name:user.name,
      id:user.id,
    },
    phone:result
  }
})}).then((result) => {
  const address = getAddressPromise(result.user.id)
  return address.then(function resolverAddress(resultAddress) {
    return {
      user:result.user,
      phone:result.phone,
      address:resultAddress
    }
  })
})
  .then(function(result){
    console.log(`
    Name:${result.user.name}
    Phone:${result.phone.ddd}-${result.phone.phone}
    Address:${result.address.street}, ${result.address.number}
    `)
  })
  .catch(function(error){
    console.error('QUEBROU',error)
  })



/** Explicação
 *  Foram criadas funções, com um setTimeOut, simulando uma conexão.
 *  Será retornado um callback, que cai em um erro ou executa uma ação de sucesso.
 *  E vai fazendo isso em pilha, no primeiro erro, será interrompida a execução
 */

// getUser(function resolveUser(error,user){
//   if (error){
//     console.error('deu ruim', user)
//     return;
//   }
  
//   getPhone(user.id, function resolvePhone(error1,phone){
//     if (error1){
//       console.error('deu ruim no phone', phone)
//     }

//     getAddress(user.id, function resolveAddress(error2, address){
//       if (error2){
//         console.error('deu ruim no address', address)
//       }
    
//       console.log(`Name:${user.name}, Phone:(${phone.ddd})-${phone.phone}, Address:${address.street}, ${address.number}`)
//     })
//   })
// });