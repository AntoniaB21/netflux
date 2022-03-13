<template>
  <div class="mainView">
    <div>
      <div class="search-container">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          class="search-input"
          v-model="requete"
          v-on:keypress="goShow"
        />
      </div>
    </div>
    <div class="search-show" v-if="show">
        <span
            class="showSearch"
            v-for="show in shows"
            :key="show.id" @click="goToShow(show.show.id)"
        >
            <div class="showSearch-img">
                <img class="show-cover link"
                :src="`${
                  show.show.image
                    ? show.show.image.medium
                    : require('@/assets/no-image-placeholder.jpg')
                }`"
            alt="TV show image" />
            </div>
        </span>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchShow",
  data() {
    return {
      requete: "",
      show: [],
      image: null,
      baseURL: "https://api.tvmaze.com/search/shows"
    };
  },
  computed: {
    shows() {
      return this.show;
    }
  },
  methods: {
    goToShow(id) {
      this.$router.push(`/show/${id}`);
    },
    goShow(e) {
      if (e.key == "Enter") {
        axios.get(`${this.baseURL}?q=${this.requete}`).then((response) => {
          this.show = response.data;
          console.log('show', this.show);
        });
        this.requete = "";
      }
    },
  },
};
</script>