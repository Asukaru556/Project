<script setup>
import BtnVue from "@/UI/BtnVue.vue";
import MultiFields from "@/components/MultiFields.vue";
import { ref } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel']);

const formData = ref({
  title: props.event.title,
  time: props.event.time,
  description: props.event.description,
});

const formFields = ref([
  {
    name: 'title',
    label: 'Название',
    type: 'text',
    get model() { return formData.value.title; },
    set model(value) { formData.value.title = value; }
  },
  {
    name: 'time',
    label: 'Время',
    type: 'time',
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

const handleSave = () => {
  emit('save', {
    ...props.event,
    ...formData.value
  });
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
      <BtnVue @click="handleSave">
        Сохранить
      </BtnVue>
    </div>
  </div>
</template>

<style scoped>
.edit-form {
  padding: 15px 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.mr {
  margin-right: 10px;
}
</style>