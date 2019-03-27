<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">

                <v-toolbar-title>{{$t('userx.newappApp.userx.home.createOrEditLabel')}}</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent='edit' @keyup.native.enter='enterForm'>
                      <v-text-field :readonly='isReadOnly("")' v-hasRole="'ROLE_USER,ROLE_ADMIN'"  prepend-inner-icon='*'   autofocus  name="login" :label="$t('userx.newappApp.userx.login')" type="text" v-model="login"></v-text-field>
                      <v-alert v-hasRole="'ROLE_USER,ROLE_ADMIN'" :value="errors.has('login')" type="error">{{ errors.first('login') }}</v-alert>  






                      <v-text-field :readonly='isReadOnly("")' v-hasRole="'ROLE_USER,ROLE_ADMIN'"   name="firstName" :label="$t('userx.newappApp.userx.firstName')" type="text" v-model="firstName"></v-text-field>
                      <v-alert v-hasRole="'ROLE_USER,ROLE_ADMIN'" :value="errors.has('firstName')" type="error">{{ errors.first('firstName') }}</v-alert>  






                      <v-text-field :readonly='isReadOnly("")' v-hasRole="'ROLE_USER,ROLE_ADMIN'"   name="lastName" :label="$t('userx.newappApp.userx.lastName')" type="text" v-model="lastName"></v-text-field>
                      <v-alert v-hasRole="'ROLE_USER,ROLE_ADMIN'" :value="errors.has('lastName')" type="error">{{ errors.first('lastName') }}</v-alert>  






                      <v-text-field :readonly='isReadOnly("")' v-hasRole="'ROLE_USER,ROLE_ADMIN'"  prepend-inner-icon='*'   name="email" :label="$t('userx.newappApp.userx.email')" type="text" v-model="email"></v-text-field>
                      <v-alert v-hasRole="'ROLE_USER,ROLE_ADMIN'" :value="errors.has('email')" type="error">{{ errors.first('email') }}</v-alert>  






                      <v-text-field :readonly='isReadOnly("")' v-hasRole="'ROLE_USER,ROLE_ADMIN'"   name="imageUrl" :label="$t('userx.newappApp.userx.imageUrl')" type="text" v-model="imageUrl"></v-text-field>
                      <v-alert v-hasRole="'ROLE_USER,ROLE_ADMIN'" :value="errors.has('imageUrl')" type="error">{{ errors.first('imageUrl') }}</v-alert>  







                      <v-checkbox :readonly='isReadOnly("")' v-hasRole="'ROLE_USER,ROLE_ADMIN'"   v-model='activated' :label="$t('userx.newappApp.userx.activated')" name='activated'></v-checkbox>
                      <v-alert v-hasRole="'ROLE_USER,ROLE_ADMIN'" :value="errors.has('activated')" type="error">{{ errors.first('activated') }}</v-alert>







                       <multiselect
                        v-validate = '{"required":true}'
                        data-vv-name = 'id'
                        data-vv-value-path = 'id'
                        :searchable = "true"
                        :show-labels="false"
                        :multiple = 'true'
                        :close-on-select="false" 
                        id='authorities'
                        label='name'
                        v-model = 'authorities'
                        :options = 'authoritiesValues'
                        :placeholder="$t('userx.newappApp.userx.authorities')"
                        track-by='id'
                      >
                       <template slot="option" slot-scope="props">
                        <div>{{props.option}}</div>
                      </template>
                      <template slot='singleLabel' slot-scope="{option}">
                        <div>{{option}}</div>
                      </template>
                      </multiselect>




                      <v-text-field :readonly='isReadOnly("")' v-hasRole="'ROLE_USER,ROLE_ADMIN'"  prepend-inner-icon='*'   name="createdBy" :label="$t('userx.newappApp.userx.createdBy')" type="text" v-model="createdBy"></v-text-field>
                      <v-alert v-hasRole="'ROLE_USER,ROLE_ADMIN'" :value="errors.has('createdBy')" type="error">{{ errors.first('createdBy') }}</v-alert>  










                      <datetime v-hasRole="'ROLE_USER,ROLE_ADMIN'" type='datetime' v-model="createdDate" input-id="createdDate" input-class='borderField'>
                          <label for="createdDate" slot="before">{{$t('userx.newappApp.userx.createdDate')}}</label>
                      </datetime>   


                      <v-text-field :readonly='isReadOnly("")' v-hasRole="'ROLE_USER,ROLE_ADMIN'"   name="lastModifiedBy" :label="$t('userx.newappApp.userx.lastModifiedBy')" type="text" v-model="lastModifiedBy"></v-text-field>
                      <v-alert v-hasRole="'ROLE_USER,ROLE_ADMIN'" :value="errors.has('lastModifiedBy')" type="error">{{ errors.first('lastModifiedBy') }}</v-alert>  










                      <datetime v-hasRole="'ROLE_USER,ROLE_ADMIN'" type='datetime' v-model="lastModifiedDate" input-id="lastModifiedDate" input-class='borderField'>
                          <label for="lastModifiedDate" slot="before">{{$t('userx.newappApp.userx.lastModifiedDate')}}</label>
                      </datetime>   




                       <multiselect
                        v-validate = '{"required":true}'
                        data-vv-name = 'id'
                        data-vv-value-path = 'id'
                        :searchable = "true"
                        :show-labels="false"
                        :multiple = 'false'
                        :close-on-select="true" 
                        id='langKeys'
                        label='name'
                        v-model = 'langKey'
                        :options = 'langKeyValues'
                        :placeholder="$t('userx.newappApp.userx.langKey')"
                        track-by='id'
                      >
                       <template slot="option" slot-scope="props">
                        <div>{{props.option}}</div>
                      </template>
                      <template slot='singleLabel' slot-scope="{option}">
                        <div>{{option}}</div>
                      </template>
                      </multiselect>




             <!--    <v-alert type='success' :value="registered==true">You successfully created a vendor</v-alert>
                <v-alert type='error' :value="registered==false">Please try again, server error</v-alert>  -->               
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any()" color="primary" @click='edit'>{{$t('userx.newappApp.userx.home.createOrEditLabel')}}</v-btn>
                <v-btn @click='cancel'>{{$t('app.cancel')}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {getProfile} from '../../../store/identity'
  import InputFile from '../../common/InputFile.vue'

  let store = require('../../../store/userx').default;
    let create = store.create;
    let relationStores = {};
    let getEntityByTemplate = store.getEntityByTemplate;    
    export default {
    inject: ['$validator'],
    components: {
      InputFile,
    },
    data: () => ({
      activeDropdown: '',
      currentPage: 1,
      pageLength: 0,
      editorOptions: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
          ],
        }
      },
      registered: null,


        login: "",


        firstName: "",


        lastName: "",


        email: "",


        imageUrl: "",
            authoritiesValues: ["ROLE_USER","ROLE_ADMIN"],
            authorities: "ROLE_USER",


        createdBy: "",
            menucreatedDate: '',


        createdDate: "",


        lastModifiedBy: "",
            menulastModifiedDate: '',


        lastModifiedDate: "",
            langKeyValues: ["en","bg"],
            langKey: "en",

    }),
    created() {
      this.getData();
    },
    watch: {
    },
    methods: {
      async getDropdownData() {
        if(!this.activeDropdown) return;
        let relation,count;
        let prop = this.activeDropdown + 'search';
        relation = await relationStores[this.activeDropdown].getData(this.currentPage-1, "id,asc", this[prop])
        count = relation.headers['x-total-count']
        relation = relation.data
        this[this.activeDropdown] = relation;
        this.pageLength = Math.ceil(count/10);
      },
      changePage(val) {
        this.currentPage = val;
        this.getDropdownData();
      },
      changeSearch(val) {
        let prop = this.activeDropdown + 'search';
        this[prop] = val
      },
      newDropdown(event) {
        this.activeDropdown = event;
        this.getDropdownData();
      },
      enterForm() {
        if(!this.errors.any()) this.create()
      },
      isReadOnly(roles) {
        if(roles == "false" || !roles) return false;
        if(!roles.length) return roles;
        if(roles.includes(',') 
          && roles.split(',').every(r=>!getProfile().roles.includes(r)).length==0) return false;
        else if(!roles.includes(',') && getProfile().jwt && getProfile().roles[0]!=roles) return false;
        return true
      },
      async uploadFile(obj) {
        try {
          let res = await store.uploadFile(obj.file[0], obj.name)
          let prop = 'loading'+obj.name;
          this[prop] = false;
          prop = 'dialogFile'+ obj.name.charAt(0).toLowerCase() + obj.name.slice(1);
          this[prop] = false
          this.$store.dispatch('snackShowAction', {text: this.$t('file.newappApp.file.created', {id: res.id}), val: true, color: "success"})
          this[obj.name+'Id'] = res.id;

        }
        catch(err) {
          console.error(err)
        }
      },
      async edit() {
        let res;
        try {
/*          let res = await edit({
            id: this.$route.params.id,
            
              login:this.login, 
            
              firstName:this.firstName, 
            
              lastName:this.lastName, 
            
              email:this.email, 
            
              imageUrl:this.imageUrl, 
            
              activated:this.activated, 
            
              authorities:this.authorities, 
            
              createdBy:this.createdBy, 
            
              createdDate:this.createdDate, 
            
              lastModifiedBy:this.lastModifiedBy, 
            
              lastModifiedDate:this.lastModifiedDate, 
            
              langKey:this.langKey, 
            
            
          });*/
          res = await create({
              login:this.login,
              firstName:this.firstName,
              lastName:this.lastName,
              email:this.email,
              imageUrl:this.imageUrl,
              activated:this.activated,
              authorities:this.authorities,
              createdBy:this.createdBy,
              createdDate:this.createdDate,
              lastModifiedBy:this.lastModifiedBy,
              lastModifiedDate:this.lastModifiedDate,
              langKey:this.langKey,
          });
          this.$store.dispatch('snackShowAction', {text: this.$t('userx.newappApp.userx.created', {id: res.id}), val: true, color: "success"})
          this.registered = true
          this.$router.go(-1);
        }
        catch(err) {
          let msg = err.response.data.title;
          this.$store.dispatch('snackShowAction', {text: msg, val: true, color: "error"})          
          this.registered = false
        }
      },
      cancel() {
        this.$router.go(-1);
      },
      async getData() {
        try {
          let [
entity] = await Promise.all([
                getEntityByTemplate()
              ]);
            this.login = entity.login;
                        this.firstName = entity.firstName;
                        this.lastName = entity.lastName;
                        this.email = entity.email;
                        this.imageUrl = entity.imageUrl;
                        this.activated = entity.activated;
                        this.authorities = entity.authorities;
                        this.createdBy = entity.createdBy;
                        this.createdDate = entity.createdDate;
                        this.lastModifiedBy = entity.lastModifiedBy;
                        this.lastModifiedDate = entity.lastModifiedDate;
                        this.langKey = entity.langKey;
                    }
        catch(err) {console.log(err)}
      },
    }
  }
</script>
<style scoped>
  .leftcol {
    width:200px;
    float: left;
  }
  .rightcol {
    width: 200px;
    float: right;
  }
</style>