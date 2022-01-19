async function getComponent() {
  const { default: _ } = await import('lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['1', '2', '3'], ' ')
  return element
}

getComponent().then(element => {
  document.body.appendChild(element)
})