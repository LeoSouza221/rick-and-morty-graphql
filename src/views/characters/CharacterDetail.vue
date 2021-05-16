<template>
  <div>
    <slot name="button-detail">
    </slot>
    <v-card-title class="subheading font-weight-bold">
      <v-avatar left v-if="character && character.image.length">
        <v-img :src="character.image"/>
      </v-avatar>
      <h4 class="ml-3">{{ character.name }}</h4>
    </v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item>
        <v-list-item-content>Location:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ character.location.name }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Episodes:</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-chip-group column>
          <v-chip
            v-for="(episode, index) in limitCharacters(character.episode)"
            :key="index"
            pill
          >
            {{ episode.name }}
          </v-chip>
        </v-chip-group>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'CharacterDetail',

  props: {
    character: {
      type: Object,
      required: true,
    },
    hasLimit: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    limitCharacters(episodeList, n = 10) {
      let newCharecterList = [];

      if (episodeList.length > 10 && this.hasLimit) {
        newCharecterList = episodeList.slice(0, n);
        newCharecterList.push({ name: '...' });
      } else {
        newCharecterList = episodeList;
      }

      return newCharecterList;
    },
  },
};
</script>
