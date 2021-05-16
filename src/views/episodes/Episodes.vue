<template>
  <v-container>
    <episode-detail
      :episodeInfo="episode"
      v-model="dialog"
    />
    <list-items
      listName="Episodes"
      :results="episodesResults"
      :keys="episodeSortKeys"
      :pageCount="pagination.pages"
      @paginate="paginate"
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
            <card-details
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
            </card-details>
          </v-card>
        </v-col>
      </template>
    </list-items>
  </v-container>
</template>

<script>
import ListItems from '@/components/ListItems.vue';
import CardDetails from '@/components/CardDetails.vue';
import gql from 'graphql-tag';
import EpisodeDetail from './EpisodeDetail.vue';

const query = gql`query getEpisodes ($page: Int) {
  episodes (page: $page) {
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
    CardDetails,
    EpisodeDetail,
    ListItems,
  },

  data: () => ({
    dialog: false,
    episode: {},
    pagination: {
      page: 1,
    },
    episodesResults: [],
    episodeSortKeys: [
      {
        name: 'Name',
        value: 'name',
      },
      {
        name: 'Air Date',
        value: 'air_date',
      },
      {
        name: 'Episode',
        value: 'episode',
      },
      {
        name: 'Character',
        value: 'character',
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

    paginate(page) {
      this.$apollo.queries.episodes.fetchMore({
        variables: {
          page,
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
