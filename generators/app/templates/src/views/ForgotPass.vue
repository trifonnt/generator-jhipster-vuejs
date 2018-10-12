<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Reset password</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>

                  <v-text-field  v-validate="{required: true, email: true, min:5, max: 254}" prepend-icon="email" name="email" label="Email" type="text" v-model="email"></v-text-field>
                  <v-alert :value="errors.has('email')" type="error">{{ errors.first('email') }}</v-alert>

                <v-alert type='success' :value="registered==true">Email sent</v-alert>
                <v-alert type='error' :value="registered==false">Please try again, server error</v-alert>                
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='register'>Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {forgot} from '../store/login'
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
        try {
          await forgot(this.email);
          this.registered = true
        }
        catch(err) {
          console.log(err)

          this.registered = false
        }
      }
    }
  }
</script>
<style scoped>
  
</style>