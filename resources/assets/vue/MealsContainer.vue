<style>
.mealslist {
  margin: 30px;
  background: #607D8B;
  padding: 5px 15px;
  border-radius: 6px;
  color: #fff;
}
.json {
  margin: 40px;
  color: #455A64;
}
</style>

<template>
  <div class="mealslist" v-for="meal in meals">
    <meal v-bind:name="meal.name" v-bind:sugar="meal.blood_sugar" v-bind:created="meal.created_at"></meal>
  </div>
</template>

<script>
  import MealComponent from './MealList'
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
