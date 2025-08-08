<template>
  <div class="space-y-2 relative">
    <input
      v-model="query"
      @input="onInput"
      type="text"
      class="w-full border px-3 py-2 rounded"
      placeholder="Select cities"
    />

    <ul
      v-if="suggestions.length && query.length > 1"
      class="absolute top-full left-0 w-full border rounded max-h-60 overflow-y-auto bg-neutral-200 dark:bg-neutral-700 z-50 shadow-md"
    >
      <li
        v-for="location in suggestions"
        :key="location.id"
        @click="selectLocation(location)"
        class="px-3 py-2  cursor-pointer"
      >
        {{ location.name }}, {{ location.country }}
      </li>
    </ul>

    <div v-if="selectedName" class="text-sm">
      <strong>Выбрано:</strong> {{ selectedName }}
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PropType } from 'vue'

interface LocationResult {
  id: number
  name: string
  country: string
  latitude: number
  longitude: number
}

interface Coordinates {
  latitude: number
  longitude: number
}

const props = defineProps<{
  modelValue: Coordinates | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Coordinates): void
}>()

const query = ref('')
const suggestions = ref<LocationResult[]>([])
const selectedName = ref('')
const selectedCoords = ref<Coordinates | null>(null)

// Подгрузка подсказок по вводу
const onInput = async () => {
  if (query.value.length < 2) {
    suggestions.value = []
    return
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.value)}&count=5&language=ru&format=json`

  try {
    const res = await fetch(url)
    const data = await res.json()
    suggestions.value = data.results || []
  } catch (err) {
    console.error('Ошибка при получении данных:', err)
  }
}

// Обработка выбора
const selectLocation = (location: LocationResult) => {
  selectedName.value = `${location.name}, ${location.country}`
  query.value = selectedName.value
  suggestions.value = []

  const coords = {
    latitude: location.latitude,
    longitude: location.longitude
  }

  selectedCoords.value = coords
  emit('update:modelValue', coords)
}

// Если координаты передали — делаем reverse geocoding
onMounted(async () => {
  if (props.modelValue) {
    const { latitude, longitude } = props.modelValue
    const location = await reverseGeocode(String(latitude), String(longitude))

    if (location) {
      selectedName.value = `${location.name}, ${location.country}`
      query.value = selectedName.value
    }
  }
})

// Простая реализация обратного геокодинга (по координатам → город)
const reverseGeocode = async (lat: string, lng: string) => {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lng}&language=ru&format=json`
    const res = await fetch(url)
    const data = await res.json()

    return data.results?.[0] || null
  } catch (err) {
    console.error('Ошибка обратного геокодирования:', err)
    return null
  }
}
</script>
