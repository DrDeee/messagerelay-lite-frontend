<template>
  <div class="confirm bg-light border-bottom border-dark">
    <div class="lead text-center p-3 text-dark">{{ info }}</div>
    <div class="row mb-3">
        <button class="col-2 mx-auto btn" @click="$emit('click')">Okay</button>
    </div>
  </div>
</template>

<style scoped>
.confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
}
</style>

<script>
export default {
  props: ['info'],
}
</script>
