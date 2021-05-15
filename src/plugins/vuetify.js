import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#212121',
        secondary: '#ffffff',
        accent: '#000000',
        error: '#630803',
        info: '#507097',
        success: '#2dad64',
        warning: '#f44185',
      },
    },
    dark: true,
  },
});
