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
  <button v-else :class="disabled ? 'disabled' : ''">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  border: 1px #333 solid;
  border-radius: 0;
  background: #333;
  color: #fff;
}

button.cancel {
  background: #f8f8f8;
  border: 1px #333 solid;
  color: #181818;
}

button.disabled {
  opacity: 0.7;
  cursor: no-drop;
}
</style>
