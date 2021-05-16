<template>
  <v-dialog
    v-model="value"
    width="500"
    persistent
  >
    <v-card>
      <card-details
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
            @click="closeModal"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </card-details>
    </v-card>
  </v-dialog>
</template>

<script>
import CardDetails from '@/components/CardDetails.vue';

export default {
  name: 'EpisodeDetail',

  components: {
    CardDetails,
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },
    episodeInfo: {
      type: Object,
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit('value', false);
    },
  },
};
</script>
