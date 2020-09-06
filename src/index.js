// Obter um usuário
// Obter o número de telefone de um usuário, a partir de seu Id
// Obter o endereço do usuário, a partir do Id

function getUser(callback){
  setTimeout(() => {
    return callback(null,{
      id:1,
      name:'Miro',
      birth:new Date(),
    }
  )}, 1000)
}

function getPhone(idUser, callback){
  setTimeout(() => {
    console.log(idUser)
    return callback(null,{
      phone:981111111,
      ddd:11,
    }
  )},2000)
}

function getAddress(idUser, callback){
  setTimeout(() => {
    console.log(idUser)
    return callback(null, {
      street:'Rua Tchurusbango Tchurusbago',
      number:0,
    })
  },1000)
}


/** Explicação
 *  Foram criadas funções, com um setTimeOut, simulando uma conexão.
 *  Será retornado um callback, que cai em um erro ou executa uma ação de sucesso.
 *  E vai fazendo isso em pilha, no primeiro erro, será interrompida a execução
 */

getUser(function resolveUser(error,user){
  if (error){
    console.error('deu ruim', user)
    return;
  }
  
  getPhone(user.id, function resolvePhone(error1,phone){
    if (error1){
      console.error('deu ruim no phone', phone)
    }

    getAddress(user.id, function resolveAddress(error2, address){
      if (error2){
        console.error('deu ruim no address', address)
      }
    
      console.log(`Name:${user.name}, Phone:(${phone.ddd})-${phone.phone}, Address:${address.street}, ${address.number}`)
    })
  })
});