

<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Create new User</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent='create'>
                  
                    
                      <v-text-field  autofocus  v-validate='{"min":"1","max":"50","pattern":"(^[_.@A-Za-z0-9-]*$)","alpha_dash":true}' name="login" label="Login" type="text" v-model="login"></v-text-field>
                      <v-alert :value="errors.has('login')" type="error">{{ errors.first('login') }}</v-alert>  
                    

                    
                    
                    
                  
                  
                    

                    
                      <v-checkbox   :value='activated' label='Activated' v-validate='{"boolean":true}' name='active' ></v-checkbox>
                      <v-alert :value="errors.has('activated')" type="error">{{ errors.first('activated') }}</v-alert>
                    
                    
                    
                  
                  
                    

                    
                    
                    
                      <v-select   :items='authoritiess' solo name="authorities" label="Authorities" v-model="authorities"></v-select>
                      <v-alert :value="errors.has('authorities')" type="error">{{ errors.first('authorities') }}</v-alert>
                    
                  
                  
                    
                      <v-text-field  v-validate='{"alpha_dash":true}' name="createdBy" label="Created By" type="text" v-model="createdBy"></v-text-field>
                      <v-alert :value="errors.has('createdBy')" type="error">{{ errors.first('createdBy') }}</v-alert>  
                    

                    
                    
                    
                  
                  
                    

                    
                    
                      <v-menu
                          ref="menucreatedDate"
                          :close-on-content-click="false"
                          v-model="menucreatedDate"
                          :nudge-right="40"
                          :return-value.sync="createdDate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="createdDate"
                            label="Created Date"
                            prepend-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="createdDate" @input="$refs.menucreatedDate.save(date)"></v-date-picker>

                        </v-menu>
                        <v-alert :value="errors.has('createdDate')" type="error">{{ errors.first('createdDate') }}</v-alert>
                    
                    
                  
                  
                    
                      <v-text-field  v-validate='{"min":"5","max":"254","alpha_dash":true}' name="email" label="Email" type="text" v-model="email"></v-text-field>
                      <v-alert :value="errors.has('email')" type="error">{{ errors.first('email') }}</v-alert>  
                    

                    
                    
                    
                  
                  
                    
                      <v-text-field  v-validate='{"max":"50","alpha_dash":true}' name="firstName" label="First Name" type="text" v-model="firstName"></v-text-field>
                      <v-alert :value="errors.has('firstName')" type="error">{{ errors.first('firstName') }}</v-alert>  
                    

                    
                    
                    
                  
                  
                    
                      <v-text-field  v-validate='{"max":"256","alpha_dash":true}' name="imageUrl" label="Image Url" type="text" v-model="imageUrl"></v-text-field>
                      <v-alert :value="errors.has('imageUrl')" type="error">{{ errors.first('imageUrl') }}</v-alert>  
                    

                    
                    
                    
                  
                  
                    
                      <v-text-field  v-validate='{"min":"2","max":"6","alpha_dash":true}' name="langKey" label="Lang Key" type="text" v-model="langKey"></v-text-field>
                      <v-alert :value="errors.has('langKey')" type="error">{{ errors.first('langKey') }}</v-alert>  
                    

                    
                    
                    
                  
                  
                    
                      <v-text-field  v-validate='{"alpha_dash":true}' name="lastModifiedBy" label="Last Modified By" type="text" v-model="lastModifiedBy"></v-text-field>
                      <v-alert :value="errors.has('lastModifiedBy')" type="error">{{ errors.first('lastModifiedBy') }}</v-alert>  
                    

                    
                    
                    
                  
                  
                    

                    
                    
                      <v-menu
                          ref="menulastModifiedDate"
                          :close-on-content-click="false"
                          v-model="menulastModifiedDate"
                          :nudge-right="40"
                          :return-value.sync="lastModifiedDate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="lastModifiedDate"
                            label="Last Modified Date"
                            prepend-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="lastModifiedDate" @input="$refs.menulastModifiedDate.save(date)"></v-date-picker>

                        </v-menu>
                        <v-alert :value="errors.has('lastModifiedDate')" type="error">{{ errors.first('lastModifiedDate') }}</v-alert>
                    
                    
                  
                  
                    
                      <v-text-field  v-validate='{"max":"50","alpha_dash":true}' name="lastName" label="Last Name" type="text" v-model="lastName"></v-text-field>
                      <v-alert :value="errors.has('lastName')" type="error">{{ errors.first('lastName') }}</v-alert>  
                    

                    
                    
                    
                  
                  
                  
        
               <!--  <v-alert type='success' :value="registered==true">You successfully created a vendor</v-alert>
                <v-alert type='error' :value="registered==false">Please try again, server error</v-alert>   -->              
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="errors.any() || !formValid" color="primary" @click='create'>Create</v-btn>
                <v-btn @click='cancel'>Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  let store = require('../../../store/userx').default;
   
  let create = store.create;
		export default {
    inject: ["$validator"],
		data: () => ({
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
        
      
        
          
          activated: "",
        
      
        
          
          authorities: "",
        
        authorities : [],
        authoritiess: [
          
            "ROLE_ADMIN",
          
            "ROLE_USER",
          
        ],
        
      
        
          
          createdBy: "",
        
      
        
          
            menucreatedDate: '',
          
          createdDate: "",
        
      
        
          
          email: "",
        
      
        
          
          firstName: "",
        
      
        
          
          imageUrl: "",
        
      
        
          
          langKey: "",
        
      
        
          
          lastModifiedBy: "",
        
      
        
          
            menulastModifiedDate: '',
          
          lastModifiedDate: "",
        
      
        
          
          lastName: "",
        
      
      

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
			async create() {
				try {
					await create({
            
              login:this.login, 
            
              activated:this.activated, 
            
              authorities:this.authorities, 
            
              createdBy:this.createdBy, 
            
              createdDate:this.createdDate, 
            
              email:this.email, 
            
              firstName:this.firstName, 
            
              imageUrl:this.imageUrl, 
            
              langKey:this.langKey, 
            
              lastModifiedBy:this.lastModifiedBy, 
            
              lastModifiedDate:this.lastModifiedDate, 
            
              lastName:this.lastName, 
            
            
          });
          this.$store.dispatch('snackShowAction', {text: "Successfully created", val: true, color: "success"})
          this.registered = true
          this.$router.go(-1);
        }
        catch(err) {
          this.$store.dispatch('snackShowAction', {text: "error", val: true, color: "error"})
          this.registered = false
        }
			},
      cancel() {
        this.$router.go(-1);
      },
      async getData() {
          try {
            let [
             
            ] = await Promise.all([
                 
              ]);
             
          }
          catch(err) {console.log(err)}
      },
		}
	}
</script>
<style scoped>
	
</style>