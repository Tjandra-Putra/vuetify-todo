<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">Delete Task?</v-card-title>
      <v-card-text>Are you sure you want to discard this task?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">cancel</v-btn>
        <v-btn color="red darken-1" text @click="$store.dispatch('deleteTask', task.id)">confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
};
</script>

<style></style>
