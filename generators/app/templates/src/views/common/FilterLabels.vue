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
        <span>
          {{label.item.count}}
        </span>
      </template>
  </v-select>

</template>

<script>
  let store = require('../../store/products').default('product')
  export default {
    data: ()=>({
      labels: [
        {text: 'completed', value: 1, count: 3,},
        {text: 'in progress', value: 2, count: 3,}
      ],
      filterLabels: [],
    }),
    methods: {
      async getLabelData() {
        try {
          let response = await store.getLabelData();
          this.labels = response.labels;
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    created() {
      //this.getLabelData();
    },
    watch: {
      watch: {
        async filterLabels(vals) {
          this.$emit('change')
        }
      },
    },
    props: {
      storeName: String,
    }
  }
</script>

<style>
  
</style>