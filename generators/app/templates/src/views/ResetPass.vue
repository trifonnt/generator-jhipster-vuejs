<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Forgotten password</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-alert :value="!$route.query.key" type="error">No key</v-alert>      
                  <div v-show="$route.query.key">
                    <v-text-field ref='password' v-validate="{required: true, min: 4, max: 100}" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                    <v-alert :value="errors.has('password')" type="error">{{ errors.first('password') }}</v-alert>

                    <v-text-field v-validate="{confirmed:'password'} "prepend-icon="lock" name="password2" label="Password confirm" type="password"></v-text-field>
                    <v-alert :value="errors.has('password2')" type="error">{{ errors.first('password2') }}</v-alert>  

                    <v-alert type='success' :value="reset==true">Password reset successfully</v-alert>
                    <v-alert type='error' :value="reset==false">Please try again, server error</v-alert>      
                  </div>            
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='reset'>Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {reset} from '../store/login'
    export default {
    inject: ['$validator'],
    data: () => ({
      password: '',
    }),

    mounted: () => {

    },
    computed: {
      formValid() {
        return Object.keys(this.fields).every(field => {
          return this.fields[field] && this.fields[field].valid;
        });
      }
    },
    methods: {
      async reset() {
        try {
          await reset(this.$route.query.key, this.password);
          this.reset = true
        }
        catch(err) {
          console.log(err)

          this.reset = false
        }
      }
    }
  }
</script>
<style scoped>
  
</style>