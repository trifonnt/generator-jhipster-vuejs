<template>
  <div class="about">
	<img v-img:group src='https://via.placeholder.com/150'>
	<img v-img:group src='https://via.placeholder.com/250'>
	<img v-img:group src='https://via.placeholder.com/350'>
	<img v-img:group src='https://via.placeholder.com/450'>
  </div>
</template>

<style scoped>
	.about {
		width: 310px;	
	}
	img {
		width: 150px;
		object-fit: cover;
		margin-left: 3px;
	}
</style>