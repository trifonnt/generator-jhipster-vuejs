<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{$t('app.register.title')}}</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-validate="{required: true, max: 50, regex: /^[_.@A-Za-z0-9-]*$/}" prepend-icon="person" name="login" :label="$t('app.register.usernameLabel')" type="text" v-model="username"></v-text-field>
                  <v-alert :value="errors.has('username')" type="error">{{ errors.first('username') }}</v-alert>  

                  <v-text-field  v-validate="{required: true, email: true, min:5, max: 254}" prepend-icon="email" name="email" :label="$t('app.register.emailLabel')" type="text" v-model="email"></v-text-field>
                  <v-alert :value="errors.has('email')" type="error">{{ errors.first('email') }}</v-alert>

                  <v-text-field ref='password' v-validate="{required: true, min: 4, max: 100}" prepend-icon="lock" name="password" :label="$t('app.register.passwordLabel')" type="password" v-model="password"></v-text-field>
                  <v-alert :value="errors.has('password')" type="error">{{ errors.first('password') }}</v-alert>

                  <v-text-field v-validate="{confirmed:'password'} "prepend-icon="lock" name="password2" :label="$t('app.register.passwordConfirmationLabel')" type="password"></v-text-field>
                  <v-alert :value="errors.has('password2')" type="error">{{ errors.first('password2') }}</v-alert>
                              
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='register'>{{$t('app.register.title')}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {register} from '../store/login'
    export default {
    inject: ['$validator'],
    data: () => ({
      username: '',
      password: '',
      email: '',
      registered: null,
    }),
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
          res = await register(this.username, this.password, this.email);
          this.registered = true
          this.$store.dispatch('snackShowAction', {text: this.$t('app.registered'), val: true, color: "success"})
        }
        catch(err) {
          this.registered = false
          this.$store.dispatch('snackShowAction', {text: res.title, val: true, color: "error"})
        }
      }
    }
  }
</script>
<style scoped>
  
</style>