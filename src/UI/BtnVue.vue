<script setup>
defineProps({
  type: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button v-if="type === 'cancel'" :class="disabled ? 'disabled' : ''" class="cancel">
    <slot></slot>
  </button>
  <button v-else :class="disabled ? 'disabled' : ''" class="primary">
    <slot></slot>
  </button>
</template>

<style>

button {
  margin: 5px;
  padding: 10px 20px;
  border: 1px solid #333;
  border-radius: 0;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.primary {
  background-color: #333;
}

button.primary:hover:not(.disabled) {
  background-color: #4a4a4a;
}

button.cancel {
  background-color: #f8f8f8;
  border: 1px solid #333;
  color: #181818;
}

button.cancel:hover:not(.disabled) {
  background-color: #e8e8e8;
}

button.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button.disabled:hover {
  background-color: inherit;
}

</style>
