<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">
      {{ displayRangeTitle }}
    </h2>

    <div class="flex space-x-2">
      <button
        v-for="r in ranges"
        :key="r"
        :class="[
          'px-3 py-1 border rounded text-sm',
          range === r ? 'bg-blue-500 text-white' : 'bg-gray-100'
        ]"
        @click="range = r"
      >
        {{ t('weather.' + r) }}
      </button>
    </div>

    <WeatherViewsWeatherDay v-if="range === 'day'" :data="displayData" />
    <WeatherViewsWeatherweek v-else-if="range === 'week'" :data="displayData" />
    <!-- <WeatherWeek v-else-if="range === 'month'" :data="displayData" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { format, addDays } from 'date-fns'
import { useI18n } from 'vue-i18n'


import {
  processDayData,
  processWeekData,
  processMonthData
} from '~/utils/weather'

const { t } = useI18n()

const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()

const range = ref<'day' | 'week' >('day')
const displayData = ref<any[]>([])
const weatherData = ref<any>(null)
const loading = ref(false)

const ranges = ['day', 'week']

const displayRangeTitle = computed(() => t(`weather.${range.value}`))

watchEffect(async () => {
  if (
    props.latitude === null ||
    props.longitude === null ||
    isNaN(props.latitude) ||
    isNaN(props.longitude)
  ) {
    displayData.value = []
    return
  }

  loading.value = true

  const today = new Date()
  const start = format(today, 'yyyy-MM-dd')
  let end = start
  let url = ''

  try {
    if (range.value === 'month') {
      end = format(addDays(today, 29), 'yyyy-MM-dd')
      url = `https://api.open-meteo.com/v1/forecast?latitude=${props.latitude}&longitude=${props.longitude}&daily=temperature_2m_mean,precipitation_sum,wind_speed_10m_max&start_date=${start}&end_date=${end}&timezone=auto`
    } else {
      end = format(addDays(today, range.value === 'week' ? 6 : 0), 'yyyy-MM-dd')
      url = `https://api.open-meteo.com/v1/forecast?latitude=${props.latitude}&longitude=${props.longitude}&hourly=temperature_2m,precipitation,windspeed_10m&start_date=${start}&end_date=${end}&timezone=auto`
    }

    const res = await fetch(url)
    const data = await res.json()
    weatherData.value = data

    if (range.value === 'day') {
      displayData.value = processDayData(data.hourly)
    } else if (range.value === 'week') {
      displayData.value = processWeekData(data.hourly)
    } else {
      displayData.value = processMonthData(data.daily)
    }
  } catch (err) {
    console.error(t('weather.error'), err)
    displayData.value = []
  }

  loading.value = false
})
</script>
