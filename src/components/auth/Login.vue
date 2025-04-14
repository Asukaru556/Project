<script setup>
import { ref, watch } from 'vue'
import MultiFields from '@/UI/MultiFields.vue'
import BtnVue from '@/UI/BtnVue.vue'
import { validation } from '@/js/validation.js'

const Form = ref([
  {
    name: 'login',
    label: 'Логин',
    type: 'text',
    model: '',
    rules: 'email',
    placeholder: 'Введите логин',
    error: '',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    model: '',
    rules: 'password',
    placeholder: 'Введите пароль',
    error: '',
  },
])

const isValid = ref(false)

function setLogin() {
  if (!isValid.value) return
  const loginData = Form.value.map((el) => {
    return {
      id: el.id,
      name: el.name,
      password: el.model,
    }
  })
  console.log('loginData', loginData)
}

watch(
  Form,
  () => {
    const { data, valid } = validation(Form.value)
    Form.value = data
    isValid.value = valid
  },
  { deep: true },
)

function clearForm() {
  Form.value = Form.value.map((el) => {
    return {
      ...el,
      model: '',
    }
  })
}
</script>

<template>
  <form>
    <MultiFields
      v-for="field in Form"
      :id="field.id"
      :key="field.id"
      v-model="field.model"
      :error="field.error"
      :label="field.label"
      :placeholder="field.placeholder"
      :rules="field.rules"
      :type="field.type"
    />
    {{ isValid }}
    <div class="actions">
      <BtnVue :disabled="!isValid" class="mr" @click.prevent="setLogin">Войти</BtnVue>
      <BtnVue :type="'cancel'" @click.prevent="clearForm">Сбросить</BtnVue>
    </div>
  </form>
</template>

<style scoped>
form {
  padding: 20px 0;
}

.actions {
  padding: 10px 0;
}

.mr {
  margin-right: 10px;
}
</style>
