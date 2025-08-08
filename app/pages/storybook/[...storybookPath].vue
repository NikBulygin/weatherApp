<template>
  <iframe 
    :src="storybookUrl"
    class="w-full h-screen border-0"
    title="Storybook"
  />
</template>

<script setup>
const route = useRoute()

const storybookUrl = computed(() => {
  const baseUrl = '/storybook/'
  const path = route.path.replace('/storybook', '')
  return `${baseUrl}${path}`
})

definePageMeta({
  layout: false
})
</script> 