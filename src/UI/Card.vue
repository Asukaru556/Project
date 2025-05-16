<script setup>
import { computed } from 'vue';

const props = defineProps({
  padding: {
    type: String,
    default: '1.25rem'
  },
  shadow: {
    type: Boolean,
    default: true
  }
});

const cardStyle = computed(() => ({
  padding: props.padding,
  boxShadow: props.shadow ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
}));
</script>

<template>
  <div class="card" :style="cardStyle">
    <div v-if="$slots.title" class="title">
      <slot name="title"></slot>
    </div>

    <div class="content">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #ffffff;
  transition: all 0.2s ease;
}

.title {
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.content {
  padding: 1rem 0;
}

.footer {
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.card:hover {
  transform: translateY(-2px);
}
</style>