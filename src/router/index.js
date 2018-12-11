import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home.vue"
import Add from "../components/Add.vue"
import List from "../components/List.vue"
import Collection from "../components/Collection.vue"
import Detail from "../components/Detail.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:Home,
    },
    {
      path:"/home",
      component:Home,
      meta:{keepAlive:true}
    },
    {
      path:"/list",
      component:List,
    },
    {
      path:"/collection",
      component:Collection,
    },
    {
      path:"/add",
      component:Add,
    },
    {
      path:"/detail/:id",
      component:Detail,
      name: "detail"
    },
    {
      path:"*",
      redirect:"/home"
    }
  ]
})
