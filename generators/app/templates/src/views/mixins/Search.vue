<template>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex>
          <v-text-field v-model='searchQuery'
          placeholder="Search"
        ></v-text-field>
          </v-flex>
          <v-flex >
          <v-btn color="primary" @click='search'>
              <v-icon>search</v-icon>
          </v-btn>
          <v-btn color="primary" v-show='searchQuery' @click='deleteQuery'>
              <v-icon>delete</v-icon>
          </v-btn>

            </v-flex>
        </v-layout>
      </v-container>
    </v-form>
</template>

<script>
	export default {
		data: () =>  ({
			
		}),
		computed: {
			searchQuery: {
				get() {return this.$store.state.table.product.search},
				set(val) {this.$store.commit('setSearch', val)}
			}
		},
		methods: {
	      search() {
	        if(!this.searchQuery) return false;
	        this.$store.dispatch('search', this.searchQuery)
	      },
	      deleteQuery() {
	        this.$store.dispatch('search', '')
	      },
		},
	}
</script>

<style>
	
</style>