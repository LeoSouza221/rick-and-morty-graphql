<template>
  <v-container>
    <character-modal-detail
      :characterInfo="character"
      @closeModal="closeModal"
      :dialog="dialog"
    />
    <list-items
      listName="Characters"
      :results="characterResults"
      :keys="characterSortKeys"
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
            <character-detail
              :character="item"
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
                  @click="openCharacterModal(item)"
                  v-if="item.episode.length > 10"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </character-detail>
          </v-card>
        </v-col>
      </template>
    </list-items>
  </v-container>
</template>

<script>
import ListItems from '@/components/ListItems.vue';
import gql from 'graphql-tag';
import CharacterDetail from './CharacterDetail.vue';
import CharacterModalDetail from './CharacterModalDetail.vue';

const query = gql`query getCharacters ($page: Int, $filter: FilterCharacter) {
  characters (page: $page, filter: $filter) {
    info {
      count
      pages
    }
    results {
      id
      name
      location {
        name
      }
      image
      episode {
        id
        name
      }
    }
  }
}`;

export default {
  name: 'Characters',

  components: {
    CharacterDetail,
    CharacterModalDetail,
    ListItems,
  },

  data: () => ({
    dialog: false,
    character: {},
    pagination: {
      pages: 1,
    },
    characterResults: [],
    characterSortKeys: [
      {
        name: 'Name',
        value: 'name',
      },
    ],
  }),

  apollo: {
    characters: {
      query,
      result({ data: { characters: { info, results } } }) {
        this.characterResults = results;
        this.pagination = info;
      },
    },
  },

  methods: {
    openCharacterModal(character) {
      this.character = character;
      this.dialog = true;
    },

    closeModal() {
      this.dialog = false;
    },

    newSearch({ page, name = '' }) {
      this.$apollo.queries.characters.fetchMore({
        variables: {
          page,
          filter: { name },
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          const { characters: { info, results } } = fetchMoreResult;

          this.characterResults = results;
          this.pagination = info;
        },
      });
    },

    limitCharacters(episodeList, n = 10) {
      let newCharecterList = [];

      if (episodeList.length > 10) {
        newCharecterList = episodeList.slice(0, n);
        newCharecterList.push({ name: '...', image: '' });
      } else {
        newCharecterList = episodeList;
      }

      return newCharecterList;
    },
  },
};
</script>
