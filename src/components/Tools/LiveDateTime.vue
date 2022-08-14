<template>
  <div class="text-subtitle-1 ml-4">{{ date }}</div>
</template>

<script>
import { format } from "date-fns";

export default {
  data() {
    return {
      date: "",
    };
  },
  methods: {
    getDate() {
      this.date = format(new Date(), "MMMM d, H:mm:ss");
      setTimeout(this.getDate, 1000); // every second will be called
    },
  },
  mounted() {
    this.getDate();
  },
};
</script>

<style></style>
