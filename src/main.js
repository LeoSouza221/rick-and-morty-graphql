import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  store,
  vuetify,
  render(h) { return h(App); },
}).$mount('#app');
