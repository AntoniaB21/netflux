<template>
  <div class="mainView">
    <div class="episode-card">
      <div class="episode-img">
        <img v-bind:src="this.episodecard.image.medium" />
      </div>
      <div class="infos-episode">
        <div class="principal">
          <div class="name">
            {{ this.episodecard.name }}
          </div>
          <div class="airdate">
            {{ cleanDate }}
          </div>
          <div class="episode-rating">
            Note <span>{{ this.episodecard.rating.average }}</span>
          </div>
        </div>
        <div class="time">
             {{ this.episodecard.runtime }} min
        </div>
      </div>

      <div class="episode-summary">
        {{ removeBalise }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EpisodeCard",
  data() {
    return {
      baseURLCast: `https://api.tvmaze.com/shows/${this.$route.params.id}/episodebynumber?season=${this.$route.params.season}&number=${this.$route.params.number}`,
      episodecard: null,
    };
  },
  computed: {
    cleanDate() {
      let cleanDate = this.episodecard.airdate.substring(
        0,
        this.episodecard.airdate.length - 6
      );
      return cleanDate;
    },
    removeBalise() {
      //remove Balises
      let str = this.episodecard.summary.substring(
        3,
        this.episodecard.summary.length - 4
      );
      return str;
    },
  },
  mounted() {
    axios
      .get(`${this.baseURLCast}`)
      .then((response) => (this.episodecard = response.data));
  },
};
</script>
