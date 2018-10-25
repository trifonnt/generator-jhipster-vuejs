import {objtourl, urltoobj} from '../../utils/url'
import ProductTableBody from './ProductTableBody.vue'
import ProductTableHead from './ProductTableHead.vue'
import DeleteDialog from './DeleteDialog.vue'
import Search from './Search.vue'

import {mapState, mapMutations} from 'vuex'
  


export default (name) => {
  let store = require('../../store/products').default(name);
  let getData = store.getData;
  let deleteItemById = store.deleteItemById;
  let getCountEntity = store.getCountEntity;
  let deleteAll = store.deleteAll;

    return {
      data: () => ({
        headers: [
        { text: 'ID', value: 'id' },
        { text: 'Code', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'EAN', value: 'ean' },
        { text: 'Active', value: 'active' },
        { text: 'Qty requested', value: 'qtyRequested'},
        { text: 'Actions', value: 'actions', sortable: false }
      ],

        }),
    created() {
      let [,url] = window.location.href.split("#");
      if(url == null) {
        //this.getData({page: 0, search:'',rowsPerPage: this.pagination.rowsPerPage});
      }
      else {
        url = urltoobj(url);
        url.page = +url.page;
        if(url.pagination.descending == "false") url.pagination = false;
        if(url.pagination.descending == "true") url.pagination = true;
        url.rowsPerPage = +url.rowsPerPage;
        this.pagination = url;
      }
    },
/*   watch: {
      'pagination': {

      handler: 'watchPagination',
      deep: true,
    }
  },*/
  computed: {
    pagination: {
      get() {return this.$store.state.table.product.pagination},
      set(val) {console.warn(val);this.$store.dispatch('changePaginationWatcher', val)}
    },
    pages: function() {
      return Math.ceil(this.totalItems/this.pagination.rowsPerPage) || 0;
    },
    page: {
      get() {return this.$store.state.table.product.pagination.page},
      set(val) {console.log("H2");this.$store.dispatch('changePaginationWatcher', {page:val})},
    },

    sortBy() {
      let sort = null;
      if(this.pagination.sortBy != null) sort = this.pagination.sortBy+','+((this.pagination.descending)?'desc':'asc');
      return sort;
    },
    areAllChecked() {
      return this.$store.getters.allChecked
    },
    loading() {
      return this.$store.state.table.product.loading
    },
    totalItems() {
      return this.$store.state.table.product.totalItems
    },
    indeterminite() {
      return this.$store.state.table.product.indeterminite
    },
    checkedDeleted() {
      return this.$store.state.table.product.checkedDeleted
    },
    products() {
      return this.$store.state.table.product.products
    },
  },
    methods: {
      console() {

      },

      async getData(obj) { // {page, sort, search, rowsPerPage}
        try {
          console.warn('AAAAAAAAA')
          await this.$store.dispatch('getData', obj || this.pagination)

        }
        catch(err) {console.log(err)}
      },
      deleteQuery() {
        this.searchQuery = '';
        this.$store.dispatch('search', '')
      },
      async deleteAll() {
        try {
          console.log(this.checkedDeleted)
          //await deleteAll(this.checkedDeleted)
          this.$store.dispatch('snackShowAction', {text: "error", val: true, color: "error"})
        }
        catch(err) {
          this.$store.dispatch('snackShowAction', {text: "error", val: true, color: "error"})
        }
        this.$store.commit('deleteAllChecked');
      },
      changeSort(val) {
        return this.$store.commit('changeSort',val);
      },
    },
    components: {
      ProductTableBody,
      ProductTableHead,
      DeleteDialog,
      Search,
    }
  }
}