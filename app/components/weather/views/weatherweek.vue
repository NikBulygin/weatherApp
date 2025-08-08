<template>
  <div class="flex overflow-x-auto space-x-4 pb-2">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="min-w-[120px] p-2 border rounded shadow-sm text-sm text-center"
    >
      <div class="font-medium">{{ item.label }}</div>
      <div>🌡 {{ item.temperature }}°C</div>
      <div>💧 {{ item.precipitation }} мм</div>
      <div>💨 {{ item.wind }} м/с</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    label: string
    temperature: string
    precipitation: string
    wind: string
  }[]
}>()
</script>
