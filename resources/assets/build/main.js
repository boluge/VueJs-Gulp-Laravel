import Vue from 'vue'
import Resource from 'vue-resource'

import MealsList from './vue/MealsContainer.vue'

Vue.use(Resource)

new Vue({
  el: 'body',
  components: {
    mealslist: MealsList
  }
})
