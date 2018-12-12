

<template>
 <v-app id="inspire">
  <div class='margin'></div>
  <div id='toptable' style='display:flex'>
    <div id='createnew'>
      <v-btn to='/admin/userx/new'  color="primary">
          <v-icon>add</v-icon>
          Create new User
      </v-btn>
    </div>
   <search></search>
   <div id='filterlabels'>
    <filter-labels :change='getData' store-name="userx"></filter-labels>
   </div>
  </div>
    <div  v-show='areAllChecked'>
      <v-btn @click='deleteAll'>Delete all
            <v-icon color="red">delete</v-icon>
      </v-btn>
      <v-btn @click='print'>Print
        <v-icon color="block">print</v-icon>
      </v-btn>
      <div id='selectLabels'>
        <select-labels v-on:selected='selectLabels' store-name="userx"></select-labels>
      </div>
    </div>
 <delete-dialog store-name="userx"></delete-dialog>
 <v-data-table
    :headers="headers"
    :items="entitys"
    :loading='loading'
    class="elevation-1"
    :pagination.sync='pagination'
    :total-items='totalItems'
    :rows-per-page-items="[1,10,20,50]"
    select-all
  >
    <template slot="headers" slot-scope="props">
      <!--entity-table-head :data.sync='props' :pagination.sync='pagination' :indeterminite.sync='indeterminite' :allChecked.sync='areAllChecked'></entity-table-head-->
    </template>
    <template slot="items" slot-scope="props">
        <entity-table-body :headers = 'headers' :items = 'props' store-name="userx"></entity-table-body>
    </template>
  </v-data-table>

  </v-app>
</template>

<script>
  import table from '../../mixins/Table'
  import {createStore} from '../../../storex/'
  import SelectLabels from '../../common/SelectLabels.vue'
  import FilterLabels from '../../common/FilterLabels.vue'
  import Search from './Search.vue'
  import EntityTableBody from './EntityTableBody.vue'
  import EntityTableHead from './EntityTableHead.vue'

	export default {
      mixins: [table("userx")],
      data: () => ({
        headers: [
          
            { text: "Login", value: "login" },
          
            { text: "Activated", value: "activated" },
          
            { text: "Authorities", value: "authorities" },
          
            { text: "Created By", value: "createdBy" },
          
            { text: "Created Date", value: "createdDate" },
          
            { text: "Email", value: "email" },
          
            { text: "First Name", value: "firstName" },
          
            { text: "Image Url", value: "imageUrl" },
          
            { text: "Lang Key", value: "langKey" },
          
            { text: "Last Modified By", value: "lastModifiedBy" },
          
            { text: "Last Modified Date", value: "lastModifiedDate" },
          
            { text: "Last Name", value: "lastName" },
          
          
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        labels: [
          {text:'completed', value:1},
          {text:'in progress', value:2}
        ],
        selectedLabels: [],
      }),
      computed: {
        checkedDeleted() {
          return this.$store.state.table.entity.checkedDeleted
        },
      },
      methods: {
        selectLabels(labels) {
          this.getData({labels})
        },
        print() {
          window.print()
        }
      },
      beforeCreate() {
        this.$store = createStore('userx', '')
      },
      components: {
        SelectLabels,
        FilterLabels,
        Search,
        EntityTableBody,
        EntityTableHead,
      }
	}
</script>
<style>
<style>
  #toptable {
    display: flex;
    position: sticky;
    top: 0;
    background: #f5f5f5;
    width: 100%;
    z-index: 1;
  }
  #createnew {
    display: inline-block;
    align-self: center;
  }
  #selectLabels {
    display: inline-block;
  }
  #filterlabels {
    display: inline-block;
    margin-left: 10px;
  }
  #filterlabels .v-select.v-select--chips .v-select__selections  {
    min-height: initial;
  }
  .greenlabel {
    background: green;
    width: 30px;
    height: 30px;
  }
  .margin {
  }
  .rightalign {
    text-align: right;
  }
</style>