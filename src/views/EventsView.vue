<script setup>
import { useEventsStore } from '@/stores/MyStore'
import { storeToRefs } from 'pinia'
import EventList from '@/components/EventList.vue'
import BtnVue from "@/UI/BtnVue.vue";
import { useAuth } from '@/composables/useAuth';

const { isAuthenticated } = useAuth();
const store = useEventsStore()
const { events } = storeToRefs(store)
</script>

<template>
  <div class="events-view">
    <div class="header">
      <h1>Список событий</h1>
      <RouterLink to="/events/create" >
        <BtnVue v-if="isAuthenticated">+ Создать событие</BtnVue>
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
  width: 1000px;
  display: flex;
  justify-content: flex-start; /* Изменяем на flex-start */
  align-items: center;
  gap: 20px; /* Добавляем промежуток между элементами */
  margin-bottom: 20px;
}

.header h1 {
  margin-right: auto; /* Заголовок будет прижиматься к левому краю */
}

</style>

