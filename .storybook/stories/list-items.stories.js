import ListItems from '../../src/components/ListItems';

export default {
  title: 'ListItems',
};

export const empty = () => ({
  components: { ListItems },
  template: `
    <list-items 
      :results="[]"
      :pageCount=1
      :keys="[]"
    >
    </list-items>
  `,
})

export const withCards = () => ({
  components: { ListItems },
  template: `
    <list-items 
      :results="[
        {
          text: 'test'
        },
        {
          text: 'test 1'
        },
      ]"
      :pageCount=1
      :keys="[]"
    >
      <template v-slot:info-cards="{ items }">
        <v-col
          v-for="item in items"
          :key="item.text"
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              <h4 class="ml-3">{{ item.text }}</h4>
            </v-card-title>
          </v-card>
        </v-col>
      </template>
    </list-items>
  `,
})

export const loadingResults = () => ({
  components: { ListItems },
  template: `
  <list-items 
    :results="[]"
    :pageCount=1
    :keys="[]"
    :loading="true"
  >
  </list-items>
  `,
})

export const withSortOptions = () => ({
  components: { ListItems },
  template: `
    <list-items 
      :results="[
        {
          text: 'A',
          number: 2,
        },
      ]"
      :pageCount=1
      :keys="[
        {
          name: 'Text',
          value: 'text',
        },
        {
          name: 'Number',
          value: 'number',
        }
      ]"
    >
      <template v-slot:info-cards="{ items }">
        <v-col
          v-for="item in items"
          :key="item.text"
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              <h4 class="ml-3">{{ item.text }}</h4>
              <h4 class="ml-3">{{ item.number }}</h4>
            </v-card-title>
          </v-card>
        </v-col>
      </template>
    </list-items>
  `,
})

