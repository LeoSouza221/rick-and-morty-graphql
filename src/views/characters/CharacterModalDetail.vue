<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <v-card>
      <character-detail
        :character="characterInfo"
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
      </character-detail>
    </v-card>
  </v-dialog>
</template>

<script>
import CharacterDetail from './CharacterDetail.vue';

export default {
  name: 'CharacterModalDetail',

  components: {
    CharacterDetail,
  },

  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    characterInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>
