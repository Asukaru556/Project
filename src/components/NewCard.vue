<script setup>
import Card from "@/UI/Card.vue";
import BtnVue from "@/UI/BtnVue.vue";
import EditEvent from "@/components/EditEvent.vue";

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

    <div v-if="!isEditing">{{ item.description }}</div>

    <EditEvent
        v-if="isEditing"
        :event="item"
        @save="handleSave"
        @cancel="$emit('cancel')"
    />

    <template v-slot:footer>
      <div class="actions">
        <template v-if="!isEditing">
          <BtnVue @click="$emit('edit')" class="mr">
            Изменить
          </BtnVue>
          <BtnVue
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
</style>