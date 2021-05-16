<template>
  <div>
    <slot name="button-detail">
    </slot>
    <v-card-title class="subheading font-weight-bold">
      {{ episode.name }}
    </v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item>
        <v-list-item-content>Date:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ episode.air_date }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Episode:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ episode.episode }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Characters:</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-chip-group column>
          <v-chip
            v-for="(character, index) in limitCharacters(episode.characters)"
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
  </div>
</template>

<script>
export default {
  name: 'EpisodeDetail',

  props: {
    hasLimit: {
      type: Boolean,
      default: false,
    },
    episode: {
      type: Object,
      required: true,
    },
  },

  methods: {
    limitCharacters(characterList, n = 10) {
      let newCharecterList = [];

      if (characterList.length > 10 && this.hasLimit) {
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
