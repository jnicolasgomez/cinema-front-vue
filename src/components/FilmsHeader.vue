<template>
	<div v-if="$store.state.user" class="nav">
		<router-link to="/movies">Conciertos</router-link>
		<router-link to="/">Mapa</router-link>
		<router-link to="/create">Nuevo Concierto</router-link>
		<a style="float:right;" @click="$store.dispatch('logout')">Logout</a>
		<a style="float:right;" >{{$store.state.user.email}}</a>
		<p style="float:right;" >3000 Puntos</p>
	</div>
	<router-view/>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
			
	},
})
</script>

<style scoped>
.nav {
	background-color: rgb(31, 29, 29);
	overflow: hidden;
	font-family: "Franklin Gothic Medium", "Courier New", monospace;
}

.nav a {
	float: left;
	color: white;
	padding: 14px 16px;
	text-align: center;
	font-size: 17px;
	text-decoration: none;
	margin-right: 5px;
}

.nav p {
	float: left;
	color: white;
	padding: 14px 16px;
	text-align: center;
	font-size: 17px;
	text-decoration: none;
	margin: 0 5px 0 0;
}
.nav a:hover {
	background: #ddd;
	color: #333;
	cursor:pointer;
}
</style>
