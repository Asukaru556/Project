<script setup>
import Card from "@/UI/Card.vue";
import BtnVue from "@/UI/BtnVue.vue";
import EditEvent from "@/components/EditEvent.vue";
import { useAuth } from '@/composables/useAuth';
import { computed } from 'vue';

const { isAuthenticated } = useAuth();

const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['id', 'title', 'time', 'description', 'author'].every(
        key => key in value
      );
    }
  },
  isEditing: Boolean,
});

const emit = defineEmits(["edit", "save", "cancel", "delete"]);

// Исправленное форматирование времени
const formattedTime = computed(() => {
  return props.item.time.replace(/(\d{2})(\d{2})/, '$1:$2') || '00:00';
});

const handleSave = (updatedEvent) => {
  if (!updatedEvent.title?.trim()) {
    alert('Название события не может быть пустым');
    return;
  }

  // Добавляем нормализацию времени
  const normalizedEvent = {
    ...updatedEvent,
    time: updatedEvent.time.padStart(5, '0').replace(/(\d{2})(\d{2})/, '$1:$2')
  };

  emit("save", normalizedEvent);
};

const handleEdit = () => {
  if (!props.item || Object.keys(props.item).length === 0) {
    alert('Событие не загружено');
    return;
  }
  emit('edit');
};

const handleDelete = () => {
  if (confirm(`Удалить событие "${props.item.title}"?`)) {
    emit("delete", props.item.id); // Правильно эмитим событие
  }
};
</script>

<template>
  <Card :class="{ 'editing-mode': isEditing }">
    <template #title>
      <template v-if="!isEditing">
        <span class="event-id">#{{ item.id }}</span>
        <h3 class="event-title">{{ item.title }}</h3>
        <time class="event-time">{{ formattedTime }}</time>
      </template>
    </template>

    <div v-if="!isEditing" class="content-wrapper">
      <p class="description">{{ item.description }}</p>
      <div class="author-info">
        <span class="author-label">Автор:</span>
        <span class="author-name">{{ item.author }}</span>
      </div>
    </div>

    <EditEvent
      v-if="isEditing"
      :event="item"
      @save="handleSave"
      @cancel="$emit('cancel')"
    />

    <template #footer>
      <div class="actions">
        <template v-if="!isEditing && isAuthenticated">
          <BtnVue
            @click="handleEdit"
            aria-label="Редактировать событие"
            class="mr"
          >
            Изменить
          </BtnVue>
          <BtnVue
            type="cancel"
            @click="handleDelete"
            aria-label="Удалить событие"
          >
            Удалить
          </BtnVue>
        </template>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.mr {
  margin-right: 0.75rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-id {
  color: #666;
  margin-right: 0.5rem;
}

.event-title {
  display: inline;
  margin: 0;
  font-size: 1.25rem;
}

.event-time {
  margin-left: 0.5rem;
  color: #888;
  font-size: 0.9em;
}

.description {
  margin: 0;
  line-height: 1.5;
  color: #444;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9em;
}

.author-label {
  color: #666;
}

.author-name {
  font-weight: 500;
  color: #222;
}

.editing-mode {
  border-color: #4a90e2;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.1);
}
</style>