<template>
  <v-container>
    <v-data-iterator
      :items="orderedResults"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :loading="loading"
      hide-default-footer
    >
      <template v-slot:loading>
        <v-progress-linear
          indeterminate
          color="primary"
        ></v-progress-linear>
      </template>
      <template v-slot:header>
        <v-row class="mt-5">
          <v-col cols="12" sm="3">
            <div class="d-flex align-center">
              <h3 class="title">{{ listName }}</h3>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6">
            <v-row>
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
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="searchValue"
                  clearable
                  dense
                  flat
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  class="search-input"
                  @input="searchText"
                ></v-text-field>
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
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        circle
        :length="pageCount"
        :total-visible="5"
        color="warning"
        @input="changePage"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ListItems',

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    listName: {
      type: String,
      default: 'List',
    },
    newSearch: {
      type: Function,
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
    timeout: null,
    itemsPerPage: 20,
    page: 1,
    sortBy: '',
    searchValue: '',
  }),

  computed: {
    orderedResults() {
      const newArray = this.results;
      return newArray.sort((previous, currentb) => {
        if (previous[this.sortBy] < currentb[this.sortBy]) {
          return -1;
        }
        if (previous[this.sortBy] > currentb[this.sortBy]) {
          return 1;
        }
        return 0;
      });
    },
  },

  methods: {
    doNewSearch() {
      const search = {
        page: this.page,
        name: this.searchValue,
      };
      this.$emit('newSearch', search);
    },

    searchText(text) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        console.log('aqui', text);
        if (typeof text === 'object' || (text.length && text.length >= 3)) {
          this.page = 1;
          this.doNewSearch();
        }
      }, 1000);
    },

    changePage() {
      this.doNewSearch();
    },
  },
};
</script>
