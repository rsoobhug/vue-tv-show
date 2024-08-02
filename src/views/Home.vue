<template>
  <div class="home-container">
    <h1>TV Shows</h1>
    <input
      type="text"
      v-model="searchQuery"
      @input="searchShows"
      placeholder="Search for TV show"
      class="input-type-text"
    />
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <!-- <button class="btn btn-primary">Click Me</button> -->
    <div v-if="filteredShows.length > 0">
      <div v-for="show in filteredShows" :key="show.id">
        <router-link class="home-search-link" :to="{name: 'TVShowDetails', params: {id: show.id}}">
          <div class="row">
          <div class="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 img-container">
          <img class="image" :src="show.image?.medium" alt="Show Image" />
          <div class="show-title">{{ show.title }}</div>
        </div>
        <div class="col-12  col-xs-12 col-sm-12 col-md-9 col-lg-9">
          <p>{{ useSanitiseHtml(show?.summary) }}</p>
        </div>
        </div>

        </router-link>
   
      </div>
  
      <!-- <ul>
        <li v-for="show in filteredShows" :key="show.id">
          <router-link :to="{name: 'TVShowDetails', params: {id: show.id}}" >
            <img :src="show.image?.medium" alt="Show Image" />
            <p>{{ show.title }}</p>
            <p>{{ useSanitiseHtml(show?.summary) }}</p>
          </router-link>
        </li>
      </ul> -->
    </div>
    <div v-if="searchQuery.length > 0 && filteredShows.length === 0 && !loading && !error">
      <p>No shows found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useSanitiseHtml } from '../composables/sanitiseHtml';


// Reactive variables
const searchQuery = ref('');
const shows = ref([]);
const loading = ref(false);
const error = ref('');

// Function to fetch shows from the API
const fetchShows = async (query) => {
  if (!query) {
    shows.value = []; // Clear shows if query is empty
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data,"data s")
    shows.value = data.map(item => ({
      id: item.show.id,
      title: item.show.name,
      image: item.show.image,
      summary: item.show.summary,
    }));
  } catch (err) {
    error.value = 'Failed to fetch data. Please try again later.';
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the search query and fetch shows accordingly
watch(searchQuery, (newQuery) => {
  fetchShows(newQuery);
});

// Computed property to filter shows
const filteredShows = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return shows.value.filter(show => 
    show.title.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
/* Add your styles here */

.home-container {

  width: 70em;
  display: flex;
  justify-content: center;
  flex-direction:column;

  .img-container {
    padding-bottom: 24px;
    .image {
      width:200px;
      padding-bottom: 10px;
    }
  } 

  .home-search-link {
    text-decoration: none;
    color:black;
    padding:0px;
  }

  .input-type-text {
    border-radius: 100px;
  }
}
input {
  padding: 8px;
  margin-bottom: 16px;
  width: 100%;
  /* max-width: 300px; */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

img {
  width: 100px;
  height: auto;
  margin-right: 16px;
}

.error {
  color: red;
  margin-bottom: 16px;
}

@media screen and (max-width: 800px) {
  .home-container {
    width: auto;
    .img-container {
    .image {
      width:-webkit-fill-available;
      padding-bottom: 10px;
    }
  } 
  }
}
</style>
