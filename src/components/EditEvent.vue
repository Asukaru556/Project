<script setup>
import {ref} from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel']);

const form = ref({ ...props.event })

const handleSave = () => {
  emit('save', form.value)
}

const handleCancel = () => {
  emit('cancel');
};

</script>

<template>
  <form @submit.prevent="handleSave" class="edit-form">
    <div class="form-group">
      <label>Время</label>
      <input v-model="form.time" type="text" required>
    </div>

    <div class="form-group">
      <label>Название</label>
      <input v-model="form.title" type="text" required>
    </div>

    <div class="form-group">
      <label>Описание</label>
      <textarea v-model="form.description"></textarea>
    </div>

    <div class="form-actions">
      <button type="button" @click="handleCancel" class="cancel-btn">
        Отмена
      </button>
      <button type="submit" class="save-btn">
        Сохранить
      </button>
    </div>
  </form>
</template>

<style>

.edit-form {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.save-btn {
  background: #4CAF50;
  color: white;
}

.cancel-btn {
  background: #f44336;
  color: white;
}

</style>