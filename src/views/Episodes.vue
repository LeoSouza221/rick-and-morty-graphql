<template>
  <v-container>
    <list-items
      listName="Episodes"
      :results="episodes.results"
      :keys="episodeSortKeys"
    >
      <template v-slot:info-cards="{ items }">
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-btn
              color="warning"
              fab
              dark
              small
              absolute
              bottom
              right
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-card-title class="subheading font-weight-bold">
              {{ item.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>Data:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ item.air_date }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Episode:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ item.episode }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Characters:</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-chip-group
                  column
                >
                  <v-chip
                    v-for="(character, index) in limitCharacters(item.characters)"
                    :key="index"
                    pill
                  >
                    <v-avatar left v-if="character.image.length">
                      <v-img :src="character.image"></v-img>
                    </v-avatar>
                    {{ character.name }}
                  </v-chip>
                </v-chip-group>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </template>
    </list-items>
  </v-container>
</template>

<script>
import ListItems from '@/components/ListItems.vue';
import gql from 'graphql-tag';

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
    ListItems,
  },

  data: () => ({
    data: [],
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
    },
  },

  methods: {
    limitCharacters(characterList, n = 10) {
      let newCharecterList = [];

      if (characterList.length > 10) {
        newCharecterList = characterList.slice(0, n);
        newCharecterList.push({ name: '...', image: '' });
      } else {
        newCharecterList = characterList;
      }

      return newCharecterList;
    },
  },
};
</script>
