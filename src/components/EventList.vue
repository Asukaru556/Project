<script setup>
import { useEventsStore } from "@/stores/MyStore.js";
import { storeToRefs } from 'pinia'
import NewCard from "@/components/NewCard.vue";
import { ref } from 'vue'

const store = useEventsStore()
const { events } = storeToRefs(store)
const editingId = ref(null)

const startEditing = (event) => {
  editingId.value = event.id
}

const saveEvent = (updatedEvent) => {
  store.updateEvent(updatedEvent)
  editingId.value = null
}

const cancelEditing = () => {
  editingId.value = null
}
</script>

<template>
  <div class="events-container">
    <NewCard
        v-for="event in events"
        :key="event.id"
        :item="event"
        :is-editing="editingId === event.id"
        @edit="startEditing(event)"
        @save="saveEvent"
        @cancel="cancelEditing"
        @delete="store.deleteEvents"
    />
  </div>
</template>

<style scoped>
.events-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}
</style>