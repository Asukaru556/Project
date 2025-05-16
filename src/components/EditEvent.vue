<script setup>
import BtnVue from "@/UI/BtnVue.vue";
import MultiFields from "@/components/MultiFields.vue";
import { ref, watch } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
    validator: (e) => e.id && typeof e.id === 'number'
  }
});

const emit = defineEmits(['save', 'cancel']);

const formData = ref({
  id: props.event.id,
  title: props.event.title,
  time: props.event.time,
  description: props.event.description
});

watch(() => props.event, (newEvent) => {
  formData.value = { ...newEvent };
});

const formFields = ref([
  {
    name: 'title',
    label: 'Название',
    type: 'text',
    required: true,
    get model() { return formData.value.title; },
    set model(value) { formData.value.title = value; }
  },
  {
    name: 'time',
    label: 'Время',
    type: 'time',
    required: true,
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
    get model() { return formData.value.time; },
    set model(value) { formData.value.time = value; }
  },
  {
    name: 'description',
    label: 'Описание',
    type: 'textarea',
    get model() { return formData.value.description; },
    set model(value) { formData.value.description = value; }
  }
]);

const validateForm = () => {
  let isValid = true;

  for (const field of formFields.value) {

    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.value.time)) {
      alert('Некорректный формат времени. Используйте HH:mm');
      isValid = false;
      break;
    }

    if (field.required && !formData.value[field.name]?.trim()) {
      alert(`Поле "${field.label}" обязательно для заполнения`);
      isValid = false;
      break;
    }

    if (field.pattern && !new RegExp(field.pattern).test(formData.value[field.name])) {
      alert(`Некорректный формат для поля "${field.label}"`);
      isValid = false;
      break;
    }
  }

  return isValid;
};

const handleSave = () => {
  if (!validateForm()) return;

  const [hours, minutes] = formData.value.time.split(':');
  const normalizedTime = `${hours.padStart(2, '0')}:${minutes.padEnd(2, '0')}`;

  emit('save', {
    ...formData.value,
    id: props.event.id,
    time: normalizedTime
  });

  // Добавьте автоматическое закрытие формы
  emit('cancel');
};
</script>

<template>
  <div class="edit-form">
    <MultiFields
      v-for="field in formFields"
      :key="field.name"
      v-model="field.model"
      :label="field.label"
      :type="field.type"
    />

    <div class="form-actions">
      <BtnVue type="cancel" @click="$emit('cancel')" class="mr">
        Отмена
      </BtnVue>
      <BtnVue @click="handleSave" type="submit">
        Сохранить
      </BtnVue>
    </div>
  </div>
</template>

<style scoped>
.edit-form {
  padding: 15px 0;
  max-width: 500px;
  margin: 0 auto;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
}

.mr {
  margin-right: 10px;
}
</style>