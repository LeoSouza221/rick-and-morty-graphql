<template>
  <v-container>
    <episode-modal-detail
      :episodeInfo="episode"
      @closeModal="closeModal"
      :dialog="dialog"
    />
    <list-items
      listName="Episodes"
      :results="episodesResults"
      :keys="episodeSortKeys"
      :pageCount="pagination.pages"
      :loading="$apollo.loading"
      @newSearch="newSearch"
    >
      <template v-slot:info-cards="{ items }">
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card>
            <episode-detail
              :episode="item"
              :hasLimit=true
            >
              <template v-slot:button-detail>
                <v-btn
                  color="warning"
                  fab
                  dark
                  small
                  absolute
                  bottom
                  right
                  @click="openEpisodeModal(item)"
                  v-if="item.characters.length > 10"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </episode-detail>
          </v-card>
        </v-col>
      </template>
    </list-items>
  </v-container>
</template>

<script>
import ListItems from '@/components/ListItems.vue';
import gql from 'graphql-tag';
import EpisodeDetail from './EpisodeDetail.vue';
import EpisodeModalDetail from './EpisodeModalDetail.vue';

const query = gql`query getEpisodes ($page: Int, $filter: FilterEpisode) {
  episodes (page: $page, filter: $filter) {
    info {
      count
      pages
      next
      prev
    }
    results{
      id
      name
      air_date
      episode
      characters {
        name
        image
      }
    }
  }
}`;

export default {
  name: 'Episodes',

  components: {
    EpisodeDetail,
    EpisodeModalDetail,
    ListItems,
  },

  data: () => ({
    dialog: false,
    episode: {},
    pagination: {
      pages: 1,
    },
    episodesResults: [],
    episodeSortKeys: [
      {
        name: 'Name',
        value: 'name',
      },
      {
        name: 'Episode',
        value: 'episode',
      },
    ],
  }),

  apollo: {
    episodes: {
      query,
      result({ data: { episodes: { info, results } } }) {
        this.episodesResults = results;
        this.pagination = info;
      },
    },
  },

  methods: {
    openEpisodeModal(episode) {
      this.episode = episode;
      this.dialog = true;
    },

    closeModal() {
      this.dialog = false;
    },

    newSearch({ page, name = '' }) {
      this.$apollo.queries.episodes.fetchMore({
        variables: {
          page,
          filter: { name },
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          const { episodes: { info, results } } = fetchMoreResult;

          this.episodesResults = results;
          this.pagination = info;
        },
      });
    },
  },
};
</script>
