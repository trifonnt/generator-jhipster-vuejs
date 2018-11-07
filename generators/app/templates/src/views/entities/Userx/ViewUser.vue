

<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>View user</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                
                  
                  <div><v-chip label>Login</v-chip>{{login}}</div>
                  
                
                  
                  <div><v-chip label>Activated</v-chip>{{activated}}</div>
                  
                
                  
                    <div><v-chip label>Authorities</v-chip><div>
                      <v-chip v-for='val in authorities' :key='val' color="primary" text-color="white">{{val}}</v-chip>
                    </div></div>
                  
                
                  
                  <div><v-chip label>Created By</v-chip>{{createdBy}}</div>
                  
                
                  
                  <div><v-chip label>Created Date</v-chip>{{createdDate}}</div>
                  
                
                  
                  <div><v-chip label>Email</v-chip>{{email}}</div>
                  
                
                  
                  <div><v-chip label>First Name</v-chip>{{firstName}}</div>
                  
                
                  
                  <div><v-chip label>Image Url</v-chip>{{imageUrl}}</div>
                  
                
                  
                  <div><v-chip label>Lang Key</v-chip>{{langKey}}</div>
                  
                
                  
                  <div><v-chip label>Last Modified By</v-chip>{{lastModifiedBy}}</div>
                  
                
                  
                  <div><v-chip label>Last Modified Date</v-chip>{{lastModifiedDate}}</div>
                  
                
                  
                  <div><v-chip label>Last Name</v-chip>{{lastName}}</div>
                  
                
                   
                <v-btn @click='back'><v-icon right dark>arrow_back</v-icon> Back</v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    let store = require('../../../store/userx').default
    let getEntityById = store.getEntityById;
    
		export default {
		data: () => ({
      
        
        login: "",
      
        
        activated: "",
      
        
        authorities: "",
      
        
        createdBy: "",
      
        
        createdDate: "",
      
        
        email: "",
      
        
        firstName: "",
      
        
        imageUrl: "",
      
        
        langKey: "",
      
        
        lastModifiedBy: "",
      
        
        lastModifiedDate: "",
      
        
        lastName: "",
      
      
		}),
    created() {
      this.getData();
    },
		methods: {
      async getData() {
        try {
          let entity = await getEntityById(this.$route.params.id);
          
            this.login = entity.login;
          
            this.activated = entity.activated;
          
            this.authorities = entity.authorities;
          
            this.createdBy = entity.createdBy;
          
            this.createdDate = entity.createdDate;
          
            this.email = entity.email;
          
            this.firstName = entity.firstName;
          
            this.imageUrl = entity.imageUrl;
          
            this.langKey = entity.langKey;
          
            this.lastModifiedBy = entity.lastModifiedBy;
          
            this.lastModifiedDate = entity.lastModifiedDate;
          
            this.lastName = entity.lastName;
          
          
        }
        catch(err) {console.log(err)}
      },
      back() {
        this.$router.go(-1)
      }
		}
	}
</script>
<style scoped>
	
</style>