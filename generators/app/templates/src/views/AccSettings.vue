<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Change account</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-validate="{required: true, max: 50}" prepend-icon="person" name="fname" label="First name" type="text" v-model="fname"></v-text-field>
                  <v-alert :value="errors.has('fname')" type="error">{{ errors.first('fname') }}</v-alert>  

                 <v-text-field v-validate="{required: true, max: 50}" prepend-icon="person" name="lname" label="Last name" type="text" v-model="lname"></v-text-field>
                  <v-alert :value="errors.has('lname')" type="error">{{ errors.first('lname') }}</v-alert>  

                  <v-text-field  v-validate="{required: true, email: true, min:5, max: 254}" prepend-icon="email" name="email" label="Email" type="text" v-model="email"></v-text-field>
                  <v-alert :value="errors.has('email')" type="error">{{ errors.first('email') }}</v-alert>

                  <v-flex xs12 sm6 d-flex>
                    <v-select v-validate="{required: true, min:2, max: 6}" prepend-icon="language" name='lang' v-model="lang"
                      :items="languages"
                      label="Language"
                      solo
                    ></v-select>
                  </v-flex>

                <v-alert type='success' :value="registered==true">You successfully changed your profile</v-alert>
                <v-alert type='error' :value="registered==false">Please try again, server error</v-alert>                
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='register'>Submit</v-btn>
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

		export default {
    inject: ['$validator'],
		data: () => ({
		  fname: '',
		  lname: '',
      email: '',
      lang: '',
      languages: [{text:"Deutsch", value: 'de'},{text:"English", value:'en'},],
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
				try {
          await changeAcc(this.fname, this.lname, this.email, this.lang, identity.getProfile().username);
          localStorage.setItem('langkey', this.lang);
          this.$i18n.locale = this.lang;

          this.registered = true
				}
				catch(err) {
          console.log(err)
					this.registered = false
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
        catch(err) {}
      },
		}
	}
</script>
<style scoped>
	
</style>