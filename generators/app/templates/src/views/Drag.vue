<template>
<div class="wrapper">
	<v-toolbar color="indigo" dark>
		<v-btn color='primary' @click='save'>
			Save
		</v-btn>

		<v-btn color='primary' @click='getData'>
			Cancel
		</v-btn>
	</v-toolbar>

	<v-list class='vlist' subheader>			
      <v-subheader class='subheader'><span>Text</span></v-subheader>
		<draggable class='' v-model="colOne" :options="{handle:'.handle', group:'drop', ghostClass:'ghost'}" @start="drag=true" @end="drag=false">
		<transition-group type="transition" :name="'flip-list'">
		   <v-list-tile v-for="element in colOne" :key="element.id"> 
		   	 <v-list-tile-content class='listcontent'>
		   	 	<div class='handle'><v-icon>drag_handle</v-icon></div>
				<div class='col'>{{element.id}}</div>
				<div class='col'>{{element.name}}</div>
		   	</v-list-tile-content>
		   </v-list-tile>
		</transition-group>
		</draggable>
	</v-list>
	<v-list class='vlist'>	
	<v-subheader class='subheader'><span>Text 2</span></v-subheader>		
		<draggable class='' v-model="colTwo" :options="{handle:'.handle', group:'drop', ghostClass:'ghost'}" @start="drag=true" @end="drag=false">
		<transition-group type="transition" :name="'flip-list'">
			<v-list-tile v-for="element in colTwo" :key="element.id"> 
			 	<v-list-tile-content class='listcontent'>
		   	 	<div class='handle'><v-icon>drag_handle</v-icon></div>

				<div class='col'>{{element.id}}</div>
				<div class='col'>{{element.name}}</div>
				</v-list-tile-content>
		   </v-list-tile>
		</transition-group>
		</draggable>
	</v-list>
</div>
</template>

<script>
  import draggable from 'vuedraggable'
  let store = require('../store/entity').default('userx')

  export default {
  	data: () => ({
  		colOne: [{id:1, name: 'aaa'},{id:2, name:'aaa'},{id: 3, name: 'aaa'}],
  		colTwo: [{id:4, name: 'bbbb'},{id:5, name:'bbbb'},{id: 6, name: 'bbbb'}]
  	}),
  	created() {
  		this.getData();
  	},
  	methods: {
  		async save() {
  			try {
  				await store.saveItemOrder(colOne, colTwo);
  			}
  			catch(err) {
  				console.log(err)
  			}
  		},
  		async getData() {
  			try {
  				await store.getItemOrder();
  			}
  			catch(err) {
  				console.log(err)
  			}
  		},
  	},
  	components: {
  		draggable,
  	}
  }
</script>

<style >
	.wrapper {
		width: 1300px;
		margin: 0 auto;
		height: 300px;
		margin-top: 30px;
		padding: 10px;
		background: lightblue;
	}
	.flip-list-move {
	  transition: transform 0.5s;
	}

	.handle {
		display: inline-block;
		width: 30px;
		background: transparent;
		cursor: move;
	}
	.col {
		width: 100px;
	}
	.ghost {
	  opacity: 0.5;
	  background: lightgray;
	}
	.listcontent {
		flex-direction: row;
		justify-content: flex-start;
	}
	.vlist {
		margin-top: 20px;
		width: 600px;
		float: left;
		margin-left: 20px;
		margin-bottom: 20px;
		border: 1px solid lightgray;
		padding: 0;
	}
	.vlist > div > span > div:nth-child(even) {
		background: #f5f5f5;
	}
	.subheader {
		justify-content: center;
	}
</style>