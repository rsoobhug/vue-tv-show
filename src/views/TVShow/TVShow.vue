<script setup>
import { useSanitiseHtml } from '../../composables/sanitiseHtml.js'
import { computed } from 'vue'
</script>

<template>
  <h1 class="tv-show-title">TV Shows</h1>
  <div class="show-container">
    <div class="row">
      <div v-for="show in shows" :key="show.id" class="col-6 col-sm-6 col-md-3 col-lg-3 show-item">
        <router-link :to="{ name: 'TVShowDetails', params: { id: show.id } }">
          <h2>{{ show.name }}</h2>
          <div 
            class="image-container"
            @mouseover="showTooltip(show.id)"
            @mouseleave="hideTooltip"
            @touchstart="showTooltip(show.id)"
            @touchend="hideTooltip"
          >
            <img :src="show.image.medium" />
            <div v-if="tooltipVisible === show.id" class="tooltip" v-html="truncateSummary(show.summary)">
            </div>
          </div>
          <div>
            Genre:
            <span v-for="genre in show.genres" :key="genre"> {{ genre }}, </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shows: [],
      tooltipVisible: null
    }
  },
  mounted() {
    fetch('https://api.tvmaze.com/shows')
      .then((res) => res.json())
      .then((data) => {
        this.shows = data
        console.log(this.shows.length, 'length is')
        console.log(data, 'data is')
      })
      .catch((err) => console.log(err.message))
  },
  methods: {
    showTooltip(showId) {
      this.tooltipVisible = showId
    },
    hideTooltip() {
      this.tooltipVisible = null
    },
    truncateSummary(summary) {
      const maxLength = 250;
      const sanitisedSummary = useSanitiseHtml(summary);
      if (sanitisedSummary.length > maxLength) {
        return sanitisedSummary.slice(0, maxLength) + '...';
      }
      return sanitisedSummary;
    }
  }
}
</script>

<style scoped>
.tv-show-title {
  padding-top: 64px;
}

.show-container {
  width: 80em;
  position: relative;
  margin-bottom: 20px;
}

.image-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: 100%; /* Position the tooltip below the image */
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  white-space: normal; /* Allows text to wrap */
  max-width: 700px; /* Limits the width of the tooltip */
  min-width: 200px; /* Sets a minimum width for the tooltip */
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
  visibility: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds a shadow for better visibility */
}

.image-container:hover .tooltip,
.image-container:active .tooltip {
  opacity: 1;
  visibility: visible;
}

@media screen and (max-width: 800px) {
  .show-container {
    width: auto;
  }
}
</style>
