<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useEventsStore } from "@/stores/MyStore.js";
import BtnVue from "@/UI/BtnVue.vue";

const store = useEventsStore()


const form = ref({
  title: '',
  description: '',
  time: ''
})

const router = useRouter()

const handleSubmit = async () => {
  try {
    await store.addEvent({
      ...form.value,
      id: Date.now()
    })
    router.push('/events')
  } catch (error) {
    console.error('Ошибка сохранения:', error)
  }
}

const cancelCreate = () => {
  router.push('/events')
}

</script>

<template>
  <div class="event-form">
    <h2>Новое событие</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Время</label>
        <input type="time" v-model="form.time">
      </div>

      <div class="form-group">
        <label>Название</label>
        <input v-model="form.title" required>
      </div>

      <div class="form-group">
        <label>Описание</label>
        <textarea v-model="form.description"></textarea>
      </div>

      <div class="form-actions">
        <BtnVue type="button" @click="cancelCreate">Отмена</BtnVue>
        <BtnVue type="submit" @click="handleSubmit">Сохранить</BtnVue>
      </div>
    </form>
  </div>
</template>

<style scoped>
.event-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-top: 20px;
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
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

</style>