<template>
	<div id="nav-bar">
		<div class="header-container">
			<div class="main-header">
				<img id="logo" src="../assets/Netflix-logo.png" alt="Netflix logo">
				<ul class="primary-navigation">
					<li class="navigation-tab">
						<router-link to="/">Home</router-link>
					</li>
					<li class="navigation-tab">
						<router-link to="/searchshow">Search Show</router-link>
					</li>
				</ul>
			</div>
		</div>

	</div>

</template>
<script>
	export default {
		name: "NavBar",
	}
</script>

<style>
#nav {
	padding: 30px;
}

#logo {
	width: 10%;
	margin-right: 25px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

a:hover {
	cursor: pointer;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

.navigation-tab {
	list-style-type: none;
	margin-left: 18px;
}

.navigation-tab a {
	position: relative;
	display: flex;
	align-items: center;
	height: 100%;
	text-decoration: none;
	color: #fff;
}

.primary-navigation {
	display: flex;
	align-items: center;
	margin: 0;
	padding: 0;
}

.header-container {
		top: 0px;
		position: relative;
		background: transparent;
		z-index: 1;
}

.main-header {
	background-color: transparent;
	height: 68px;
	background-image: linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
	font-size: 14px;
	position: relative;
	display: flex;
	align-items: center;
	padding: 0 4%;
	transition: background-color .4s;
	z-index: 2;
}
</style>
