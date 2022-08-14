<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">Edit Task</v-card-title>
      <v-card-text
        >Edit the title of this task

        <v-text-field v-model="taskTitle" @keyup.enter="saveTask"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">cancel</v-btn>
        <v-btn color="red darken-1" text @click="saveTask" :disabled="taskTitleInvalid">save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      taskTitle: null,
    };
  },
  mounted() {
    // on page load
    this.taskTitle = this.task.title;
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle === this.task.title;
    },
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        let payload = {
          id: this.task.id,
          title: this.taskTitle,
        };

        this.$store.dispatch("editTaskTitle", payload);
        this.$emit("close");
      }
    },
  },
};
</script>

<style></style>
