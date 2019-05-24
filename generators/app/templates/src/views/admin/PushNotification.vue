
<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{$t('app.pushNotification.title')}}</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field  prepend-icon="email" name="subject" v-validate="{required: true}" :label="$t('app.pushNotification.subjectLabel')" type="text" v-model="subject"></v-text-field>
                  <v-alert :value="errors.has('subject')" type="error">{{ errors.first('subject') }}</v-alert>

                  <v-text-field  prepend-icon="email" name="description" v-validate="{required: true}" :label="$t('app.pushNotification.descriptionLabel')" type="text" v-model="description"></v-text-field>
                  <v-alert :value="errors.has('description')" type="error">{{ errors.first('description') }}</v-alert>

                  <v-btn></v-btn>
                  
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='push'>{{$t('app.pushNotification.submit')}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
	import * as store from '../../store/stats'
		export default {
    inject: ['$validator'],
		data: () => ({
		  subject: '',
		  description: '',
		}),
    computed: {
      formValid() {
        return Object.keys(this.fields).every(field => {
          return this.fields[field] && this.fields[field].valid;
        });
      }
    },
		methods: {
			async push() {
				try {
					await store.pushNotification(this.subject, this.description);
          this.$store.dispatch('snackShowAction', {text: this.$t('pushNotification.pushed'), val: true, color: "success"})
				}
				catch(err) {
          let msg = err.response.data.message;
          this.$store.dispatch('snackShowAction', {text: msg, val: true, color: "error"})
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