<script setup>
</script>

<template>
  <div class="card">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px #999 solid;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;
}

.title {
  padding-bottom: 20px;
  border-bottom: 1px #999 solid;
  font-size: 18px;
}

.content {
  padding: 10px 0;
  font-size: 14px;
}

.footer {
  padding-top: 20px;
  display: flex;
  justify-content: right;
}
</style>
