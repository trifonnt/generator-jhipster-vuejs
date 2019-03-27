<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{$t('app.view')}} {{$t('userx.newappApp.userx.detail.title')}}</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.login')}}</v-chip>{{login}}</div>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.firstName')}}</v-chip>{{firstName}}</div>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.lastName')}}</v-chip>{{lastName}}</div>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.email')}}</v-chip>{{email}}</div>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.imageUrl')}}</v-chip>{{imageUrl}}</div>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.activated')}}</v-chip>{{activated}}</div>

                    <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.authorities')}}</v-chip>
                          <v-chip color="primary" text-color="white" v-for='i in authorities' :key='i'>{{i}}</v-chip>
                    </div>

                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.createdBy')}}</v-chip>{{createdBy}}</div>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.createdDate')}}</v-chip>{{createdDate}}</div>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.lastModifiedBy')}}</v-chip>{{lastModifiedBy}}</div>
                  <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.lastModifiedDate')}}</v-chip>{{lastModifiedDate}}</div>

                    <div v-hasRole="'ROLE_USER,ROLE_ADMIN'" ><v-chip label>{{$t('userx.newappApp.userx.langKeys')}}</v-chip>
                          <v-chip color="primary" text-color="white" v-for='i in langKey' :key='i'>{{i}}</v-chip>
                    </div>

                <v-btn @click='print' class='viewbuttons'>{{$t('app.print')}}
                  <v-icon color="block">print</v-icon>
                </v-btn>
                <v-btn @click='back' class='viewbuttons'><v-icon right dark>arrow_back</v-icon> {{$t('app.back')}}</v-btn>
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
    let getFiles = store.getFiles;
    let deleteImage = store.deleteImage;
    import Gallery from '../../common/Gallery.vue'

    export default {
    data: () => ({
        login: "",
        firstName: "",
        lastName: "",
        email: "",
        imageUrl: "",
        activated: "",
        authorities: "",
        createdBy: "",
        createdDate: "",
        lastModifiedBy: "",
        lastModifiedDate: "",
        langKey: "",
    }),
    created() {
      this.getData();
    },
    methods: {
      async getData() {
        try {
          let entity = await getEntityById(this.$route.params.id);
            this.login = entity.login;
            this.firstName = entity.firstName;
            this.lastName = entity.lastName;
            this.email = entity.email;
            this.imageUrl = entity.imageUrl;
            this.activated = entity.activated;
            this.authorities = entity.authorities;
            this.createdBy = entity.createdBy;
            this.createdDate = entity.createdDate;
            this.lastModifiedBy = entity.lastModifiedBy;
            this.lastModifiedDate = entity.lastModifiedDate;
            this.langKey = entity.langKey;
        }
        catch(err) {console.log(err)}
      },
      async viewFiles(name) {
        //only works on relationships for now
        let res = await getFiles(entity[name+'Id']);
        this[name+'images'] = [res]
      },
      back() {
        this.$router.go(-1)
      },
      print() {
        let status = this.$store.state.app.leftDrawer;
        this.$store.commit('setLeftDrawer', false);
        this.$nextTick(()=>window.print());
        window.onafterprint = () => {
          this.$nextTick(() => this.$store.commit('setLeftDrawer', status))
        }
      },
      async deleteImage(image) {
        try {
         await deleteImage(image);
        }
        catch(err) {
          console.error(err)
        }
      }
    },
    components: {
      Gallery,
    }
  }
</script>
<style scoped>
  .v-chip--label, .v-chip--label .v-chip__content {
    width: 200px;
  }
  >>>.v-chip--label, .v-chip--label .v-chip__content {
    width: 200px;
  }
  .smallimage {
    width: 200px;
    height: 100px;
    object-fit: contain;
  }
  .flex {
    display: flex;
  }
</style>