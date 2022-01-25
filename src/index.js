import hello from './hello'
import imgsrc from './assets/2.jpg'
import bgIndex from './assets/bgIndex.png'

import svgsrc from './assets/illustration.svg'
import atxt from './assets/a.txt'
import './style.css'
import './style.less'

import _ from 'lodash'

import './async-module'

console.log(hello())
console.log(imgsrc) 

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img) 


const img2 = document.createElement('img')
img2.style.cssText = 'width: 600px; height: 200px'
img2.src = svgsrc
document.body.appendChild(img2) 


const blaock = document.createElement('div')
blaock.textContent = atxt
document.body.appendChild(blaock) 




const img3 = document.createElement('img')
img3.style.cssText = 'width: 600px; height: 200px'
img3.src = bgIndex
document.body.appendChild(img3) 


console.log(_.join(['1', '2', '3'], '!'))



const button = document.createElement('button')
button.textContent = '点击加法运算'

// webpackPrefetch 预加载
// webpackChunkName 打包之后名称
// webpackPrefetch 用到在加载类似懒加载

button.addEventListener('click', () => {
  import(/* webpackChunkName: 'math', webpackPreload: true */'./math.js').then(({ add }) => {
    console.log(add(4, 5))
  })
}) 
document.body.appendChild(button) 