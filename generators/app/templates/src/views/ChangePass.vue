<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{$t('app.cpassword.title')}}</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field ref='password' v-validate="{required: true, min: 4, max: 100}" prepend-icon="lock" name="cpassword" :label="$t('app.cpassword.currentLabel')" type="password" v-model="cpassword"></v-text-field>
                    <v-alert :value="errors.has('cpassword')" type="error">{{ errors.first('cpassword') }}</v-alert>

                    <v-text-field ref='password' v-validate="{required: true, min: 4, max: 100}" prepend-icon="lock" name="password" :label="$t('app.cpassword.passwordLabel')" type="password" v-model="password"></v-text-field>
                    <v-alert :value="errors.has('password')" type="error">{{ errors.first('password') }}</v-alert>

                    <v-text-field v-validate="{confirmed:'password'} "prepend-icon="lock" name="password2" :label="$t('app.cpassword.passwordConfirmationLabel')" type="password"></v-text-field>
                    <v-alert :value="errors.has('password2')" type="error">{{ errors.first('password2') }}</v-alert>  
 
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='change'>{{$t('app.send')}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {changePass} from '../store/login'
    export default {
    inject: ['$validator'],
    data: () => ({
      password: '',
      cpassword: '',
      reset: null,
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
      async change() {
        let res;
        try {
          res = await changePass(this.cpassword, this.password);
          this.$store.dispatch('snackShowAction', {text: this.$t('app.changePass'), val: true, color: "success"})
          this.reset = true
        }
        catch(err) {
          this.reset = false
          this.$store.dispatch('snackShowAction', {text: res.title, val: true, color: "error"})

        }
      }
    }
  }
</script>
<style scoped>
  
</style>