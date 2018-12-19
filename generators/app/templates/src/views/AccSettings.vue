<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{$t('app.accountPage.title')}}</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-validate="{required: true, max: 50}" prepend-icon="person" name="fname" :label="$t('app.accountPage.firstNameLabel')" type="text" v-model="fname"></v-text-field>
                  <v-alert :value="errors.has('fname')" type="error">{{ errors.first('fname') }}</v-alert>  

                 <v-text-field v-validate="{required: true, max: 50}" prepend-icon="person" name="lname" :label="$t('app.accountPage.lastNameLabel')" type="text" v-model="lname"></v-text-field>
                  <v-alert :value="errors.has('lname')" type="error">{{ errors.first('lname') }}</v-alert>  

                  <v-text-field  v-validate="{required: true, email: true, min:5, max: 254}" prepend-icon="email" name="email" :label="$t('app.accountPage.emailLabel')" type="text" v-model="email"></v-text-field>
                  <v-alert :value="errors.has('email')" type="error">{{ errors.first('email') }}</v-alert>

                  <v-flex xs12 sm6 d-flex>
                    <v-select v-validate="{required: true, min:2, max: 6}" prepend-icon="language" name='lang' v-model="lang"
                      :items="languages"
                      label="Language"
                      solo
                    ></v-select>
                  </v-flex>               
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='register'>{{$t('app.submit')}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {getAcc, changeAcc} from '../store/login'
  import * as identity from '../store/identity'
  import * as storage from '../utils/storage'
  
  import { Settings } from 'luxon'

    export default {
    inject: ['$validator'],
    data: () => ({
      fname: '',
      lname: '',
      email: '',
      lang: '',
      languages: [{text:"Deutsch", value: 'de'},{text:"English", value:'en'},{text:"Български", value:'bg'},],
      registered: null,
    }),
    created() {
      this.getData();
    },
    computed: {
      formValid() {
        return Object.keys(this.fields).every(field => {
          return this.fields[field] && this.fields[field].valid;
        });
      }
    },
    methods: {
      async register() {
        let res;
        try {
          res = await changeAcc(this.fname, this.lname, this.email, this.lang, identity.getProfile().username);
          localStorage.setItem('langkey', this.lang);
          this.$i18n.locale = this.lang;

          //vue datetime luxon locale
          Settings.defaultLocale = this.lang

          this.$store.dispatch('snackShowAction', {text: this.$t('app.accountUpdated'), val: true, color: "success"})
          this.registered = true
        }
        catch(err) {
          console.log(err)
          this.registered = false
          this.$store.dispatch('snackShowAction', {text: response.title, val: true, color: "error"})
        }
      },
      async getData() {
        try {
          let response = await getAcc();
          this.fname = response.firstName;
          this.lname = response.lastName;
          this.email = response.email;
          this.lang = response.langKey;
        }
        catch(err) {
          console.log(err)
        }
      },
    }
  }
</script>
<style scoped>
  
</style>