  <script setup>
  import { computed, ref, watch } from 'vue'
  import MultiFields from '@/components/MultiFields.vue'
  import BtnVue from '@/UI/BtnVue.vue'
  import { validation } from '@/js/validation.js'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  import { auth, db } from '@/fireBase/fireBase.js'
  import { useRouter } from 'vue-router'
  import { doc, setDoc } from 'firebase/firestore'

  const Form = ref([
    {
      id: 0,
      name: 'email',
      label: 'Email',
      type: 'text',
      model: '',
      rules: 'email',
      placeholder: 'Введите Email',
      error: '',
    },
    {
      id: 1,
      name: 'login',
      label: 'Логин',
      type: 'text',
      model: '',
      rules: 'login',
      placeholder: 'Введите логин',
      error: '',
    },
    {
      id: 2,
      name: 'password',
      label: 'Пароль',
      type: 'password',
      model: '',
      rules: 'password',
      placeholder: 'Введите пароль',
      error: '',
    },
    {
      id: 3,
      name: 'verificationPassword',
      label: 'Повторите пароль',
      type: 'password',
      model: '',
      placeholder: 'Введите пароль',
      error: '',
      rules: 'confirm',
    },
    {
      id: 4,
      name: 'gender',
      label: 'Выберите пол',
      type: 'select',
      model: '',
      viewLabel: '',
      viewValue: '',
      options: ["Мужчина","Женщина"],
    },
    {
      id: 5,
      name: 'city',
      label: 'Выберите город',
      type: 'combobox',
      model: '',
      viewLabel: 'label',
      viewValue: 'id',
      options: [
        { id: 1, label: 'Москва' },
        { id: 2, label: 'Санкт-Петербург' },
        { id: 3, label: 'Новосибирск' },
        { id: 4, label: 'Екатеринбург' },
        { id: 5, label: 'Казань' },
        { id: 6, label: 'Нижний Новгород' },
        { id: 7, label: 'Челябинск' },
        { id: 8, label: 'Самара' },
        { id: 9, label: 'Омск' },
        { id: 10, label: 'Ростов-на-Дону' },
        { id: 11, label: 'Уфа' },
        { id: 12, label: 'Красноярск' },
        { id: 13, label: 'Пермь' },
        { id: 14, label: 'Воронеж' },
        { id: 15, label: 'Волгоград' },
        { id: 16, label: 'Краснодар' },
        { id: 17, label: 'Саратов' },
        { id: 18, label: 'Тюмень' },
        { id: 19, label: 'Тольятти' },
        { id: 20, label: 'Ижевск' },
        { id: 21, label: 'Барнаул' },
        { id: 22, label: 'Ульяновск' },
        { id: 23, label: 'Иркутск' },
        { id: 24, label: 'Хабаровск' },
        { id: 25, label: 'Ярославль' },
        { id: 26, label: 'Владивосток' },
        { id: 27, label: 'Махачкала' },
        { id: 28, label: 'Томск' },
        { id: 29, label: 'Оренбург' },
        { id: 30, label: 'Кемерово' }
      ],
      placeholder: 'Начните вводить город...'
    },
  ])

  const router = useRouter()
  const isValid = ref(false)

  async function registerUser() {
    if (!isValid.value) return

    try {
      const userCredential = await createUserWithEmailAndPassword(
          auth,
          Form.value[0].model,
          Form.value[2].model
      )
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        login: Form.value[1].model,
        email: Form.value[0].model,
        createdAt: new Date()
      })

      router.push('/')
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  watch(
    Form,
    () => {
      const { data, valid } = validation(Form.value)
      Form.value = data
      isValid.value = valid && isConfirm.value
    },
    { deep: true },
  )

  const isConfirm = computed(() => {
    const confirm = Form.value[3].model === Form.value[2].model
    Form.value[3].error = !confirm ? 'пароли не совпадают' : ''
    return confirm
  })

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
        :options="field.options"
        :view-label="field.viewLabel"
        :view-value="field.viewValue"
      />
      <div class="actions">
        <BtnVue :disabled="!isValid" class="mr" @click.prevent="registerUser">
          Зарегистрироваться
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
