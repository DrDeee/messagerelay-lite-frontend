<template>
  <div class="confirm bg-light border-bottom border-dark">
    <div class="lead text-center p-3 text-dark">{{ question }}</div>
    <div class="row mb-3">
        <button class="col-2 mx-auto btn" @click="$emit('yes')">Ja</button>
        <button class="col-2 mx-auto btn danger" @click="$emit('no')">Nein</button>
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
  props: ['question', 'yes', 'no'],
}
</script>
