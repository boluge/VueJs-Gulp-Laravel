<template>
  <div class="meal-item" v-for="meal in meals">
    <meal v-bind:name="meal.name" v-bind:sugar="meal.blood_sugar" v-bind:created="meal.created_at"></meal>
  </div>
  <!--<p>{{meals | json 2}}</p>-->
</template>

<script>
  import MealComponent from './MealList.vue'
  export default {
    components: {
      'meal': MealComponent
    },
    data: function () {
      return {
        meals: []
      }
    },
    props: ['json'],
    ready () {
      this.fetchLeft()
    },
    methods: {
      fetchLeft: function () {
        this.$http.get(this.json).then(function (results) {
          this.$set('meals', results.data)
        })
      }
    }
  }
</script>
