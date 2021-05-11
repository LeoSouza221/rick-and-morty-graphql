<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3>Episodes</h3>
        <v-divider></v-divider>
      </v-col>
      <v-col>
        <v-data-iterator
          :items="episodes.results"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card>
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
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query getEpisodes {
  episodes {
    results {
      name
      air_date
      episode
      created
      characters {
        name
      }
    }
  }
}`;

export default {
  name: 'Episodes',

  data: () => ({
    itemTeste: [
      {
        id: 1,
        name: 'teste',
      },
    ],
  }),

  apollo: {
    episodes: {
      query,
    },
  },
};
</script>
