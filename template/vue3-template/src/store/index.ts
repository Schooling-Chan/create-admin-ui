import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state: Record<string, any>) {
      state.count++;
    },
  },
  actions: {
    increment(context: Record<string, any>) {
      context.commit("increment");
    },
  },
});
