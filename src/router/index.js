import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import picnum from '@/pages/picnum'
import numpic from '@/pages/numpic'
import memory from '@/pages/memory'
import edgeangle from '@/pages/edgeangle'
import menu from '@/pages/menu'

Vue.use(Router)

/*let routes=menu.map(nav=>{
	return {
		path:'/'+nav.name,
		name:nav.name,
		component:require(`../pages/${nav.name}`),
	}
})
console.log(picnum)
console.log(routes)

export default new Router({
  routes: routes
})*/
export default new Router({
  routes: [
//  {
//    path: '/',
//    name: 'Hello',
//    component: HelloWorld
//  },
    {
      path: '/picnum',
      name: 'picnum',
      component: picnum
    },
    {
      path: '/numpic',
      name: 'numpic',
      component: numpic
    },
    {
      path: '/memory',
      name: 'memory',
      component: memory
    },
    {
      path: '/edgeangle',
      name: 'edgeangle',
      component: edgeangle
    },
    {
      path: '/',
      name: 'menu',
      component: menu
    },
  ]
})
