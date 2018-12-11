<template>
	<div class='wrapper'>
		<div id='togglewiki'>
			<v-btn outline @click='drawer=!drawer' v-show='menu.length'><v-icon>menu</v-icon>Toggle menu</v-btn>
			<v-btn outline color='green'><v-icon>folder</v-icon><router-link to='/wiki/create'>Create</router-link></v-btn>
		</div>
		<v-navigation-drawer id='wikidrawer'
		  :value="drawer"
		  height='600px'
		  floating
		  :class='{noflex: !drawer}'
		>
		  <v-list>
		    <v-divider></v-divider>
		    <v-list-tile v-for='item in menu'>
		      <v-list-tile-content>
		        <v-list-tile-title><router-link :to="{path: '/wiki', params: { id: item.id }}"> {{item.name}}</router-link></v-list-tile-title>
		      </v-list-tile-content>
		    </v-list-tile>
		    <v-divider></v-divider>
		  </v-list>
		</v-navigation-drawer>
		<v-content id='wikicontent' :class='{addflex: !drawer}'>
			<v-card>
				<v-toolbar color='primary'>
					<v-toolbar-title>{{title}}</v-toolbar-title>
					<v-btn fab small v-show='$route.params.id != "create"'><v-icon color='primary' @click='editWiki'>edit</v-icon></v-btn>
					<v-flex xs2 sm2 lg2 m2 v-show='$route.params.id == "create"' >
		          	<v-text-field id='titlefield'
						v-model="title"
						solo
						label="Title"
						clearable
		          	></v-text-field>
		          </v-flex>
					<v-btn v-show='$route.params.id == "create" '><v-icon color='green' @click='createWiki'>edit</v-icon> Create</v-btn>
					<v-btn fab small v-show='$route.params.id != "create"'><v-icon color='red' @click='deleteWiki'>delete</v-icon></v-btn>
					<v-spacer></v-spacer>
					<v-btn flat color='white'>{{author}}</v-btn>
					<v-btn flat color='white'>{{date}}</v-btn>
				</v-toolbar>
		        <quill-editor ref="myTextEditor"
					v-model="content">
		        </quill-editor>
			</v-card>
		</v-content>
	</div>
</template>

<script>
	import * as store from './wiki'

	export default {
		created() {
			if(this.$route.params.id != 'create') this.getData();
		},
		data: () => ({
			menu: [],
			author: '',
			date: '',
			content: '',
			title: '',
			drawerOpen: true,
		}),
		computed: {
			drawer: {
				get() {
					if(this.$store.state.app.leftDrawer || !this.menu.length) return false;
					return this.drawerOpen;
				},
				set(value) {
					this.drawerOpen = value;
				}
			}
		},
		methods: {
			async getData() {
				try {
					let response = await store.getData(this.$route.params.id);
					this.menu = response.menu;
					this.content = response.content;
					this.author = response.author;
					this.date = response.date;
					this.title = response.title;
					console.log(response)
				}
				catch(err) {
					console.error(err);
				}
			},
			async deleteWiki() {
				try {
					//await store.deleteWiki(this.$route.params.id)
          			this.$store.dispatch('snackShowAction', {text: "Successfully deleted", val: true, color: "success"})
				}
				catch(err) {
					console.error(err)
				}
			},
			async editWiki() {
				try {
					//await store.editWiki(this.$route.params.id, this.content)
          			this.$store.dispatch('snackShowAction', {text: "Successfully edited", val: true, color: "success"})
				}
				catch(err) {
					console.error(err)
				}
			},
			async createWiki() {
				try {
					//await store.createWiki(this.content)
					this.$store.dispatch('snackShowAction', {text: "Succesfully created", val: true, color: "success"})
				}
				catch(err) {
					console.error(err)
				}
			},
		}
	}
</script>

<style scoped>
	.wrapper {
		display: flex;
	}
	#togglewiki {
		position: absolute;
	}
	#wikidrawer {
		flex: 1;
		margin-top: 60px !important;
		margin-right: 10px;
	}
	#wikidrawer.noflex {
		flex:0.00001;
		margin-right: 0;
	}
	#wikicontent.addflex {
		flex: 300;
	}
	#wikicontent {
		flex: 5;
		transition: all 0.2s;
	}
	#wikicontent .v-toolbar {
		color: white;
	}
	#titlefield {
		width: 30px;
	}
</style>