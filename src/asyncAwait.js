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


// passo 1, adicionar a palavra async na função, automaticamente retornará uma promise
main()
let data = 1

const saveData = () => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      return resolve(data=2)
    },2000)
  })
}

const save = async () => {
  data = await saveData()
  return data
}
save()
console.log(data)

async function main(){
  try {
    console.time('medida-promise')
    const user = await getUser()
    // const phone = await getPhone(user.id)
    // const address = await getAddressPromise(user.id)


    // Deixando mais performático
    // Promise.all => Roda em segundo plano, já que não dependem da resposta do usuário
    const result = await Promise.all([
      getPhone(user.id),
      getAddressPromise(user.id)
    ])

    const phone = result[0]
    const address = result[1]


    data = {
      Name:`${user.name}`,
      Phone:`${phone.ddd}-${phone.phone}`,
      Address:`${address.street}, ${address.number}`,
    }
    console.timeEnd('medida-promise')
     return data

  } catch (error) {
    console.log('deu ruim', error)  
  }
}


// main().then()