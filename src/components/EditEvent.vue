<script setup>
import BtnVue from "@/UI/BtnVue.vue";
import MultiFields from "@/UI/MultiFields.vue";
import { ref } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel']);

const form = ref({ ...props.event });

const handleSave = () => {
  emit('save', form.value);
};
</script>

<template>
  <div class="edit-form">
    <MultiFields
        v-model="form.title"
        label="Название"
        rules="required"
    />

    <MultiFields
        v-model="form.time"
        label="Время"
        rules="required"
    />

    <MultiFields
        v-model="form.description"
        label="Описание"
        type="textarea"
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