<template>
	<div class="mainView-home">
		<div class="title">
			<h1>Séries</h1>
		</div>
		<div class="billboard">
			<div class="hero-image-wrapper">
				<img id="billboard" src="../assets/seriebillboard.png" alt="Netflix logo">
			</div>
		</div>
		<div class="show">
		<div class="list-shows">
			<div class="episode-details" v-for="show in shows" :key="show.id" @click="goToShow(show.id)">
				<div class="show-img-episode">
						<img v-bind:src="show.image.medium" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ListShow",
  data() {
    return {
      requete: "",
      baseURL: "https://api.tvmaze.com/search/shows",
      baseURLCast: "https://api.tvmaze.com/shows",
    };
  },
  computed: mapState(["shows"]),
  methods: {
    goToShow(id) {
      this.$router.push(`/show/${id}`);
    }
  },
  mounted() {
    this.$store.dispatch("getShows");
  },
};
</script>
<style>

</style>
<style>
@import '../assets/css/style.css';
</style>