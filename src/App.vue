<template>
  <v-app>
    <v-app-bar
      app
      color="accent"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('@/../public/rick_logo.png')"
          transition="scale-transition"
          width="120"
        />
      </div>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        v-if="this.$vuetify.breakpoint.name === 'xs'"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(button, index) in buttons"
            :key="index"
            :to="button.route"
          >
            <v-list-item-title>
              <v-icon>{{ button.icon }}</v-icon>
              {{ button.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div v-else>
        <v-btn
          v-for="(button, index) in buttons"
          :key="index"
          :to="button.route"
          text
        >
          <v-icon>{{ button.icon }}</v-icon>
          <span class="mr-2">{{ button.name }}</span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    buttons: [
      {
        name: 'Episodes',
        route: 'episodes',
        icon: 'mdi-filmstrip',
      },
      {
        name: 'Characters',
        route: 'characters',
        icon: 'mdi-account-group',
      },
    ],
  }),

  created() {
    console.log();
  },
};
</script>
