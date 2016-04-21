<template>
  <div class="meal">
    <span class="glycemie {{class}}">{{sugar}}</span>
    <h2>{{name}}</h2>
    <p class="date">Le {{creation}}</p>
  </div>
</template>

<script>
  import moment from 'moment'
  moment.locale('fr')
  export default {
    props: {
      'name': {type: String},
      'sugar': {type: String},
      'created': {type: String}
    },
    computed: {
      class () {
        if (this.sugar <= 0.7) {
          return 'sugar-hypo'
        } else if (this.sugar > 0.7 && this.sugar <= 1.2) {
          return 'sugar-normal'
        } else if (this.sugar > 1.2 && this.sugar <= 1.7) {
          return 'sugar-warning'
        } else {
          return 'sugar-hyper'
        }
      },
      creation () {
        var date = moment(this.created, 'YYYY-MM-DD HH:mm:ss')
        return date.format('Do MMMM YYYY à HH:mm')
      }
    }
  }
</script>
