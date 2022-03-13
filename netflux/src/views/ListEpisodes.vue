<template>
  <div class="mainView">
    <h1>Séries</h1>
    <div class="card">
      <div class="episodes">
        <div class="number-episodes">
          <span>Episodes:</span>
        </div>

        <div class="list-episodes">
          <div
            class="episode-details"
            v-for="episode in episodes"
            :key="episode.id"
            @click="goToHome(episode.number, episode.season)"
          >
            <span class="episode-detail">
              <div class="episode-number">
                <div class="episode-item">
                  {{ episode.number }}
                </div>
              </div>
              <div class="show-img-episode">
                <img v-bind:src="episode.image.medium" />
              </div>
              <div class="episode-summary">
                <div class="episode-title-duree">
                  <div class="episode-title">
                    {{ episode.name }}
                  </div>
                  <div class="episode-duree">{{ episode.runtime }} min</div>
                </div>
                <div class="episode-summary-details">
                  {{ episode.summary }}
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ListEpisodes",
  data() {
    return {
      requete: "",
      baseURL: "https://api.tvmaze.com/search/shows",
      baseURLCast: "https://api.tvmaze.com/shows",
    };
  },
  computed: mapState(["episodes"]),
  methods: {
    goToHome(number, season) {
      console.log(number);
      this.$router.push(`/episodecard/${number}/${season}`);
    }
  },
  mounted() {
    this.$store.dispatch("getEpisodes");
  },
};
</script>