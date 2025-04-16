<script setup>
import { useEventsStore } from '@/stores/MyStore'
import { storeToRefs } from 'pinia'
import EventList from '@/components/EventList.vue'

const store = useEventsStore()
const { events } = storeToRefs(store)


</script>

<template>
  <div class="events-view">
    <div class="header">
      <h1>Список событий</h1>
      <RouterLink to="/events/create" class="create-btn">
        + Создать событие
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

.create-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.create-btn:hover {
  background: #388E3C;
}
</style>

