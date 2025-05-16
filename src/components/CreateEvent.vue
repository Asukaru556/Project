<script setup>
import { useRouter } from 'vue-router'
import {ref, watch, computed} from 'vue'
import { useEventsStore } from "@/stores/MyStore.js";
import BtnVue from "@/UI/BtnVue.vue";
import MultiFields from "@/components/MultiFields.vue";
import { validation } from '@/js/validation.js'
import { useAuth } from '@/composables/useAuth'

const { userLogin } = useAuth()
const router = useRouter()
const store = useEventsStore()
const isValid = ref(false)

const Form = ref([
  {
    name: 'title',
    label: 'Название',
    type: 'text',
    model: '',
    rules: 'title',
    placeholder: 'Введите название',
    error: '',
  },
  {
    name: 'time',
    label: 'Время',
    type: 'time',
    model: '',
    error: '',
  },
  {
    name: 'description',
    label: 'Описание',
    type: 'textarea',
    model: '',
    placeholder: 'Введите описание',
    error: '',
  },
])

watch(
    Form,
    () => {
      const { data, valid } = validation(Form.value)
      Form.value = data
      isValid.value = valid
    },
    { deep: true },
)


const handleSubmit = async () => {
  if (!isValid.value) return;
  try {
    const eventData = {
      title: Form.value.find(f => f.name === 'title').model,
      description: Form.value.find(f => f.name === 'description').model,
      time: Form.value.find(f => f.name === 'time').model.replace(/:/g, ''), // Формат HHmm
      author: userLogin.value
    };

    await store.addEvent(eventData);
    router.push('/events');
  } catch (error) {
    console.error('Ошибка сохранения:', error);
    alert(error.message);
  }
};


const cancelCreate = () => {
  router.push('/events')
}

</script>

<template>
  <div class="form-wrapper">
    <h2 class="form-title">Новое событие</h2>

    <form @submit.prevent="handleSubmit" class="event-form">
      <MultiFields
          v-for="field in Form"
          :key="field.name"
          :label="field.label"
          v-model="field.model"
          :placeholder="field.placeholder"
          :type="field.type"
          :is-textarea="field.type === 'textarea'"
          :rules="field.rules"
          :error="field.error"
      />

      <div class="author">
        <label>Автор:</label>
        <span class="author-name">{{ userLogin }}</span>
      </div>

      <div class="action-buttons">
        <BtnVue
            type="button"
            @click="cancelCreate"
            class="cancel-btn"
        >
          Отмена
        </BtnVue>
        <BtnVue
            type="submit"
            :disabled="!isValid"
            class="submit-btn"
        >
          Сохранить
        </BtnVue>
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

.author {
  margin-bottom: 10px;
}
</style>