<script setup>
import { useEventsStore } from "@/stores/MyStore";
import { storeToRefs } from 'pinia'
import NewCard from "@/components/NewCard.vue";
import { ref, onMounted } from 'vue'

const store = useEventsStore()
const { events, loading, error } = storeToRefs(store)
const editingId = ref(null)
const editedEvent = ref(null)

onMounted(async () => {
  if (events.value.length === 0) {
    await store.fetchEvents()
  }
})

const startEditing = (event) => {
  editingId.value = event.id;
  editedEvent.value = { ...event };
};

const saveEvent = async (updatedEvent) => {
  try {
    await store.updateEvent(updatedEvent);
    editingId.value = null;
  } catch (e) {
    console.error('Ошибка сохранения:', e.message);
    alert(e.message);
  }
};


const handleDelete = async (eventId) => {
  if (confirm('Удалить событие?')) {
    try {
      await store.deleteEvent(eventId);
      store.events = [...store.events];
    } catch (e) {
      alert(e.message);
    }
  }
};

</script>

<template>
  <div class="event-list-container">
    <div v-if="loading" class="loading-state">
      <progress class="loading-indicator" indeterminate>Загрузка...</progress>
    </div>

    <div v-else-if="error" class="error-state">
      ⚠️ Ошибка загрузки: {{ error }}
    </div>

    <div v-else-if="!events.length" class="empty-state">
      📅 Событий пока нет
    </div>

    <div v-else class="events-grid">
      <NewCard
        v-for="event in events"
        :key="event.id"
        :item="event"
        :is-editing="editingId === event.id"
        @edit="startEditing(event)"
        @save="saveEvent"
        @cancel="editingId = null"
        @delete="handleDelete(event.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.event-list-container {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state {
  text-align: center;
  padding: 2rem;
}

.loading-indicator {
  width: 200px;
  height: 8px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.error-state {
  padding: 1.5rem;
  background: #ffe5e5;
  color: #cc0000;
  border-radius: 8px;
  text-align: center;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }

  .event-list-container {
    padding: 1rem;
  }
}
</style>