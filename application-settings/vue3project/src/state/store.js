import { createStore } from 'vuex';

import modules from './modules';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()],
});

export default store;

