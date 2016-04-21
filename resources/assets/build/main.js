import Vue from 'vue'
import Resource from 'vue-resource'

import MealsContainer from './vue/MealsContainer.vue'

/* eslint-disable no-new */
Vue.use(Resource)
new Vue({
  el: 'body',
  components: {
    mealscontainer: MealsContainer
  }
})

/*eslint-disable no-unused-vars */
import scss from '../sass/app.scss'
