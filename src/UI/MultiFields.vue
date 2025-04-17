  <script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'text',
    validator: (value) => ['text', 'password', 'email', 'textarea'].includes(value),
  },
  label: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  rules: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
})

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="field">
    <div v-if="props.label">
      {{ props.label }}
    </div>
    <input
        v-if="props.type !== 'textarea'"
        :placeholder="props.placeholder"
        :type="props.type"
        :value="props.modelValue"
        class="input"
        @input="updateValue"
    />

    <textarea
        v-else
        :placeholder="props.placeholder"
        :value="props.modelValue"
        class="input textarea"
        @input="updateValue"
    />

    <div v-if="props.error" class="error">{{ props.error }}</div>
  </div>
</template>

<style scoped>
.field {
  padding-bottom: 10px;
}

.input {
  width: 250px;
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 0;
  border: 1px #999 solid;
}

.error {
  color: #8a0404;
  font-size: 12px;
  font-style: italic;
}
</style>
