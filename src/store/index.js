import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

let db = new Localbase("db"); // save/cached to browser, localbase is asynchronous
db.config.debug = false; // removes log messages for localbase

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      // {
      //   id: 1,
      //   title: "Wake Up",
      //   done: false,
      //   dueDate: "2020-10-16",
      // },
      // {
      //   id: 2,
      //   title: "Buy Food",
      //   done: false,
      //   dueDate: "2020-10-16",
      // },
      // {
      //   id: 3,
      //   title: "Clean Room",
      //   done: false,
      //   dueDate: null,
      // },
    ],
    snackbar: {
      show: false,
      text: "",
    },
    sorting: false,
  },
  mutations: {
    // change data in the state by comitting a mutation. e.g delete, update
    // cannot use asynchronous code in mutation, do that in api

    setSearch(state, value) {
      state.search = value;
    },

    addTask(state, newTask) {
      state.tasks.push(newTask);
    },

    doneTask(state, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },

    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    editTaskTitle(state, payload) {
      // payload is an object type
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },

    updateTaskDueDate(state, payload) {
      // payload is an object type
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },

    // draggable function
    setTasks(state, tasks) {
      state.tasks = tasks;
    },

    showSnackBar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },

    hideSnackBar(state) {
      state.snackbar.show = false;
    },

    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
  },
  actions: {
    // trigerring actions method = dispatching actions
    addTask({ commit }, newTaskTitle) {
      // so at FieldAddTask.vue, instead of .commit which will
      // only call the function above, use .dispatch to dispatch this function in actions
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
      };
      // add to localbase database. developer tools --> application --> IndexedDB not local storage or sessions storage
      db.collection("tasks")
        .add(newTask)
        .then(() => {
          commit("addTask", newTask);
          commit("showSnackBar", "Task added!");
        });
    },

    doneTask({ state, commit }, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];

      db.collection("tasks")
        .doc({
          id: id,
        })
        .update({
          done: !task.done,
        })
        .then(() => {
          commit("doneTask", id);
        });
    },

    deleteTask({ commit }, id) {
      db.collection("tasks")
        .doc({ id: id })
        .delete()
        .then(() => {
          commit("deleteTask", id);
          commit("showSnackBar", "Task deleted!");
        });
    },

    editTaskTitle({ commit }, payload) {
      db.collection("tasks")
        .doc({
          id: payload.id,
        })
        .update({
          title: payload.title,
        })
        .then(() => {
          commit("editTaskTitle", payload);
          commit("showSnackBar", "Task Edited!");
        });
    },

    updateTaskDueDate({ commit, state }, payload) {
      db.collection("tasks")
        .doc({
          id: payload.id,
        })
        .update({
          dueDate: payload.dueDate,
        })
        .then(() => {
          commit("updateTaskDueDate", payload);
          commit("showSnackBar", "Due Date Updated!");

          console.log(state.tasks);
        });
    },

    setTasks({ commit }, tasks) {
      db.collection("tasks").set(tasks);
      commit("setTasks", tasks);
    },
    // from localbase
    getTasks({ commit }) {
      db.collection("tasks")
        .get()
        .then((tasks) => {
          // console.log(tasks);
          commit("setTasks", tasks);
        });
    },
  },
  getters: {
    // getter is a method that takes data from the state and modifies/filters it in someway and returns it
    // Vuex getters is to Vue computed as Vuex state is to Vue data. In an action or getter,
    // if you use a list of products multiple times to find a result would you then use getters. products or state.
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks;
      }
      // if there is something in the search field
      return state.tasks.filter((task) => task.title.toLowerCase().includes(state.search.toLowerCase()));
    },
  },

  modules: {
    // break vuex store into multiple modules with each modules with its own states, mutation, action and getters
  },
});
