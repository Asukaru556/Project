<script setup>
import Card from "@/UI/Card.vue";
import BtnVue from "@/UI/BtnVue.vue";
import EditEvent from "@/components/EditEvent.vue";
import { useAuth } from '@/composables/useAuth';

const { isAuthenticated } = useAuth();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isEditing: Boolean,
});

const emit = defineEmits(["edit", "save", "cancel", "delete"]);

const handleSave = (updatedEvent) => {
  emit("save", updatedEvent);
};
</script>

<template>
  <Card>
    <template v-slot:title>
      <template v-if="!isEditing">
        #{{ item.id }} {{ item.title }} ({{ item.time }})
      </template>
    </template>

    <div v-if="!isEditing" class="descr">{{ item.description }}</div>
    <div v-if="!isEditing">Автор: {{ item.author }}</div>

    <EditEvent
        v-if="isEditing"
        :event="item"
        @save="handleSave"
        @cancel="$emit('cancel')"
    />

    <template v-slot:footer>
      <div class="actions">
        <template v-if="!isEditing">
          <BtnVue
              v-if="isAuthenticated"
              @click="$emit('edit')"
              class="mr">
            Изменить
          </BtnVue>
          <BtnVue
              v-if="isAuthenticated"
              type="cancel"
              @click="$emit('delete', item.id)"
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
  margin-right: 10px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.descr{
  margin-bottom: 20px;
}
</style>