<script setup>
import { ref, watch } from 'vue'
import MultiFields from '@/components/MultiFields.vue'
import BtnVue from '@/UI/BtnVue.vue'
import { validation } from '@/js/validation.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/fireBase/fireBase.js'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const Form = ref([
  {
    name: 'Email',
    label: 'Почта',
    type: 'text',
    model: '',
    rules: 'email',
    placeholder: 'Введите email',
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

const { user } = useAuth()
const router = useRouter()
const isValid = ref(false)

watch(user, (newUser) => {
  if (newUser) {
    router.push('/')
  }
})

async function loginUser() {
  if (!isValid.value) return;

  try {
    const email = Form.value[0].model.trim();
    const password = Form.value[1].model.trim();

    console.log("Попытка входа с:", { email, password });

    await signInWithEmailAndPassword(auth, email, password);
    router.push('/');
  } catch (error) {
    console.error("Код ошибки:", error.code);

    if (error.code === 'auth/invalid-credential') {
      alert('Неверный email или пароль');
    } else {
      Form.value[0].error = 'Ошибка: ' + error.message;
    }
  }
}

watch(
  Form,
  () => {
    const { data, valid } = validation(Form.value)
    Form.value = data
    isValid.value = valid
    console.log('Form valid:', valid)
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
      v-model="field.model"
      :error="field.error"
      :label="field.label"
      :placeholder="field.placeholder"
      :rules="field.rules"
      :type="field.type"
    />
    <div class="actions">
      <BtnVue :disabled="!isValid" class="mr" @click.prevent="loginUser">
        Войти
      </BtnVue>
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
