<template>
  <div class="wrapper">
    <v-text-field
      :value="$store.state.search"
      @input="$store.commit('setSearch', $event)"
      @focus="searchClosed = false"
      @blur="searchClosed = true"
      placeholder="Search"
      dense
      clearable
      filled
      prepend-inner-icon="mdi-magnify"
      class="mt-1 expanding-search"
      :class="{ closed: searchClosed && !$store.state.search }"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchClosed: true,
    };
  },
};
</script>

<style>
.wrapper .v-text-field > .v-input__control > .v-input__slot:before,
.wrapper .v-text-field > .v-input__control > .v-input__slot:after {
  border-color: transparent !important;
}

.expanding-search {
  transition: max-width 0.3s;
}

.v-input__slot {
  cursor: pointer !important;
}

.closed {
  max-width: 45px;
}

.closed .v-input__slot {
  background: transparent !important;
}
</style>
