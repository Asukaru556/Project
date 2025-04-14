<script setup>
import Card from "@/UI/Card.vue";
import {ref} from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isEditing: Boolean
})

const emit = defineEmits(['edit', 'save', 'cancel'])

const editedData = ref({ ...props.item })



const handleSave = () => {
  emit('save', editedData.value)
}

const handleCancel = () => {
  editedData.value = { ...props.item }
  emit('cancel')
}


</script>

<template>
  <Card>
    <template v-slot:title>
      <input class="edit-input" v-if="isEditing" v-model="editedData.title" placeholder="Название">
      <input class="edit-input" v-if="isEditing" v-model="editedData.time" placeholder="Время">
      <template v-else>#{{ item.id }} {{ item.title }} ({{ item.time }})</template>
    </template>

    <div v-if="!isEditing">{{ item.description }} </div>
    <textarea class="edit-textarea" v-else v-model="editedData.description" placeholder="Описание"></textarea>

    <template v-slot:footer>
      <div class="actions">

        <template v-if="!isEditing">
          <button class="btn btn-edit" @click="$emit('edit')">Изменить</button>
          <button class="btn btn-delete" @click="$emit('delete', item.id)">Удалить</button>
        </template>

        <template v-else>
          <button class="btn btn-save" @click="handleSave">Сохранить</button>
          <button class="btn btn-delete" @click="handleCancel">Отмена</button>
        </template>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.btn {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-edit {
  background-color: #FF8C00;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-save {
  background-color: #69a13e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background-color: #E07B00;  /* Ещё темнее при наведении */
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn-delete {
  background-color: #8B0000;  /* Тёмно-красный */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-delete:hover {
  background-color: #6B0000;  /* Ещё темнее при наведении */
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.edit-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.edit-textarea {
  width: 100%;
  min-height: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}
</style>