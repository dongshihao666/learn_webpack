console.log('hello~119')


function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('helloworld')
    }, 2000)
  })
}

async function helloworld() {
  let string = await getString()
  console.log(string)
}
export default helloworld