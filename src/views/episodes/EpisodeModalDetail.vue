<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <v-card>
      <episode-detail
        :episode="episodeInfo"
      >
        <template v-slot:button-detail>
          <v-btn
            color="warning"
            fab
            dark
            small
            absolute
            right
            @click="$emit('closeModal')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </episode-detail>
    </v-card>
  </v-dialog>
</template>

<script>
import EpisodeDetail from './EpisodeDetail.vue';

export default {
  name: 'EpisodeModalDetail',

  components: {
    EpisodeDetail,
  },

  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    episodeInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>
