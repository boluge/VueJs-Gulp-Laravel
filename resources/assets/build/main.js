import scss from '../sass/app.scss'

import Vue from 'vue'
import Resource from 'vue-resource'

import MealsContainer from './vue/MealsContainer.vue'

Vue.use(Resource)

new Vue({
  el: 'body',
  components: {
    mealscontainer: MealsContainer
  }
})
