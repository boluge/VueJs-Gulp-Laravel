import Vue from 'vue'
import VueRessource from 'vue-resource'

import MealsList from '../vue/MealsContainer'

/* eslint-disable no-new */
Vue.use(VueRessource)

new Vue({
  el: 'body',
  components: {
    mealslist: MealsList
  },
  methods: {
    say: function (msg) {
      /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.log(msg)
    }
  }
})
