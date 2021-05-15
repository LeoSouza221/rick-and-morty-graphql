<template>
  <v-container>
    <v-data-iterator
      :items="results"
      hide-default-footer
    >
      <template v-slot:header>
        <v-row class="mt-5">
          <v-col cols="12" sm="3">
            <div class="d-flex align-center">
              <h3>{{ listName }}</h3>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="searchValue"
                  clearable
                  dense
                  flat
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search Episode"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="sortBy"
                  flat
                  dense
                  hide-details
                  :items="keys"
                  item-text="name"
                  item-value="value"
                  prepend-inner-icon="mdi-sort-descending"
                  label="Sort by"
                  class="mb-1"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </template>
      <template v-slot:default="props">
        <v-row class="mt-5">
          <slot name="info-cards" v-bind:items="props.items">
          </slot>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  name: 'ListItems',

  props: {
    listName: {
      type: String,
      default: 'List',
    },
    results: {
      type: Array,
      required: true,
    },
    keys: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    sortBy: '',
    searchValue: '',
  }),
};
</script>
