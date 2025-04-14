<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <nav>
    <RouterLink v-for="link in items" :key="link.id" :to="link.url"> {{ link.label }}</RouterLink>
  </nav>
</template>

<style scoped></style>
