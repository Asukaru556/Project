<script setup>
import { useEventsStore } from '@/stores/MyStore'
import { storeToRefs } from 'pinia'
import EventList from '@/components/EventList.vue'
import BtnVue from "@/UI/BtnVue.vue";

const store = useEventsStore()
const { events } = storeToRefs(store)


</script>

<template>
  <div class="events-view">
    <div class="header">
      <h1>Список событий</h1>
      <RouterLink to="/events/create" >
        <BtnVue >+ Создать событие</BtnVue>
      </RouterLink>
    </div>
    <EventList :events="events" />
  </div>
</template>

<style scoped>
.events-view {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}


</style>

