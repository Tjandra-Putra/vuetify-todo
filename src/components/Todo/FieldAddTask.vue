<template>
  <v-text-field
    outlined
    label="Add Tasks"
    append-icon="mdi-plus"
    hide-details
    clearable
    class="pa-3"
    v-model="newTaskTitle"
    @keyup.enter="addTask"
  >
    <template v-slot:append>
      <v-icon @click="addTask" color="primary" :disabled="newTaskTitleInvalid">mdi-plus</v-icon>
    </template></v-text-field
  >
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: "",
    };
  },
  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle;
    },
  },
  methods: {
    addTask() {
      if (!this.newTaskTitleInvalid) {
        // comitting to the vuex store mutation
        this.$store.dispatch("addTask", this.newTaskTitle);
        this.newTaskTitle = "";
      }
    },
  },
};
</script>
