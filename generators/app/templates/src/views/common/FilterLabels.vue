<template>

  <v-select
    :items="labels"
    v-model="filterLabels"
    label="Label"
    multiple
    chips
    item-avatar='search'
    >
      <template slot='item' slot-scope='label'>
        <v-list-tile-avatar>
          <div class='greenlabel'></div>
        </v-list-tile-avatar>
        <v-checkbox></v-checkbox>
        <v-list-tile-content>
          <v-list-tile-title v-html="label.item.text"></v-list-tile-title>
        </v-list-tile-content>
      </template>
  </v-select>

</template>

<script>
  export default {
    data: ()=>({
      labels: [
        {text:'completed', value:1},
        {text:'in progress', value:2}
      ],
      filterLabels: [],
    }),
    
    watch: {
      watch: {
        async filterLabels(vals) {
          this.$emit('change')
        }
      },
    },
  }
</script>

<style>
  
</style>