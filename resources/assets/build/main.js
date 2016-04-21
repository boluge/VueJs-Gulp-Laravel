import Vue from 'vue'
import Resource from 'vue-resource'

import MealsList from './vue/MealList.vue'

Vue.use(Resource)

new Vue({
  el: 'body',
  components: {
    mealslist: MealsList
  }
})
