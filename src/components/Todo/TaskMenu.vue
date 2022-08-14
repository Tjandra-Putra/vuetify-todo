<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="handleClick(index)">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- hidden modals -->
    <dialog-edit v-if="dialogs.edit" :task="task" @close="dialogs.edit = false"></dialog-edit>
    <dialog-due-date v-if="dialogs.dueDate" :task="task" @close="dialogs.dueDate = false"></dialog-due-date>
    <dialog-delete v-if="dialogs.delete" :task="task" @close="dialogs.delete = false"></dialog-delete>
  </div>
</template>

<script>
export default {
  props: ["task"],
  data: () => ({
    dialogs: {
      delete: false,
      dueDate: false,
      edit: false,
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: "Due Date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.dueDate = true;
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
        },
      },
      {
        title: "Sort",
        icon: "mdi-drag-horizontal-variant",
        click() {
          this.$store.commit("toggleSorting");
        },
      },
    ],
  }),
  methods: {
    // using index to see which buttons have been clicked
    handleClick(index) {
      this.items[index].click.call(this); // trigerring the function from the object, use .call to refer to vue instance/method
    },
  },
  components: {
    "dialog-edit": require("@/components/Todo/Dialogs/DialogEdit.vue").default,
    "dialog-due-date": require("@/components/Todo/Dialogs/DialogDueDate.vue").default,
    "dialog-delete": require("@/components/Todo/Dialogs/DialogDelete.vue").default,
  },
};
</script>

<style></style>
