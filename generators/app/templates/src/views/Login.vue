
<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-validate="{required: true, max: 50, regex: /^[_.@A-Za-z0-9-]*$/}" prepend-icon="person" name="login" label="Login" type="text" v-model="username"></v-text-field>
                  <v-alert :value="errors.has('login')" type="error">{{ errors.first('login') }}</v-alert>
                  <v-text-field v-validate="{required: true, min: 4, max: 100}" id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                   <v-alert :value="errors.has('password')" type="error">{{ errors.first('password') }}</v-alert>
                   <v-checkbox
				      label="Remember me"
				      v-model="remember"
				    ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='login'>Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
	import {login as log} from '../store/login'
		export default {
    inject: ['$validator'],
		data: () => ({
		  username: '',
		  password: '',
		  remember: false,
		}),
    computed: {
      formValid() {
        return Object.keys(this.fields).every(field => {
          return this.fields[field] && this.fields[field].valid;
        });
      }
    },
		methods: {
			async login() {
				try {
					await log(this.username, this.password, this.remember);
          this.$router.push('/')
				}
				catch(err) {
					alert("Invalid login");
				}
			}
		}
	}
</script>
<style scoped>
	.v-alert.error {
		height: 10px;
	}
</style>