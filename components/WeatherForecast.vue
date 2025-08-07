<template>
  <div class="space-y-6">
    <!-- Search Section -->
    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            @keyup.enter="selectFirstLocation"
            type="text"
            placeholder="Search for a city..."
            class="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
          />
          <div v-if="searchResults.length > 0" class="mt-2 bg-white/10 rounded-lg overflow-hidden">
            <div
              v-for="(location, index) in searchResults"
              :key="index"
              @click="selectLocation(location)"
              class="px-4 py-3 hover:bg-white/20 cursor-pointer border-b border-white/10 last:border-b-0"
            >
              <div class="text-white font-medium">{{ location.name }}</div>
              <div class="text-white/70 text-sm">{{ location.country }}</div>
            </div>
          </div>
        </div>
        <button
          @click="getCurrentLocation"
          class="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl border border-white/30 transition-colors"
        >
          📍 My Location
        </button>
      </div>
    </div>

    <!-- Current Weather -->
    <div v-if="currentWeather" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-white mb-2">{{ selectedLocation?.name }}</h2>
        <div class="text-6xl font-bold text-white mb-4">{{ Math.round(currentWeather.temperature) }}°C</div>
        <div class="text-white/80 text-lg mb-4">{{ currentWeather.description }}</div>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-white/60 text-sm">Humidity</div>
            <div class="text-white font-semibold">{{ currentWeather.humidity }}%</div>
          </div>
          <div>
            <div class="text-white/60 text-sm">Wind</div>
            <div class="text-white font-semibold">{{ currentWeather.windSpeed }} km/h</div>
          </div>
          <div>
            <div class="text-white/60 text-sm">Pressure</div>
            <div class="text-white font-semibold">{{ currentWeather.pressure }} hPa</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Forecast -->
    <div v-if="dailyForecast.length > 0" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h3 class="text-xl font-bold text-white mb-4">7-Day Forecast</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        <div
          v-for="(day, index) in dailyForecast"
          :key="index"
          class="bg-white/10 rounded-xl p-4 text-center"
        >
          <div class="text-white/80 text-sm mb-2">{{ day.date }}</div>
          <div class="text-2xl mb-2">🌤️</div>
          <div class="text-white font-semibold">{{ Math.round(day.maxTemp) }}°</div>
          <div class="text-white/70 text-sm">{{ Math.round(day.minTemp) }}°</div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-white text-lg">Loading weather data...</div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
      <div class="text-red-200 text-center">
        <div class="text-lg font-semibold mb-2">Error</div>
        <div>{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const searchResults = ref([])
const selectedLocation = ref(null)
const currentWeather = ref(null)
const dailyForecast = ref([])
const loading = ref(false)
const error = ref('')

// Search for locations
const handleSearch = async () => {
  if (searchQuery.value.length < 2) {
    searchResults.value = []
    return
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery.value)}&count=5&language=en&format=json`
    )
    const data = await response.json()
    
    if (data.results) {
      searchResults.value = data.results
    } else {
      searchResults.value = []
    }
  } catch (err) {
    console.error('Search error:', err)
    searchResults.value = []
  }
}

// Select location and get weather
const selectLocation = async (location) => {
  selectedLocation.value = location
  searchResults.value = []
  searchQuery.value = location.name
  await getWeatherData(location.latitude, location.longitude)
}

// Select first location from search results
const selectFirstLocation = async () => {
  if (searchResults.value.length > 0) {
    await selectLocation(searchResults.value[0])
  }
}

// Get current location
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    loading.value = true
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        selectedLocation.value = {
          name: 'Current Location',
          latitude,
          longitude
        }
        await getWeatherData(latitude, longitude)
      },
      (err) => {
        error.value = 'Unable to get your location'
        loading.value = false
      }
    )
  } else {
    error.value = 'Geolocation is not supported by this browser'
  }
}

// Get weather data
const getWeatherData = async (latitude, longitude) => {
  loading.value = true
  error.value = ''

  try {
    // Get current weather
    const currentResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&timezone=auto`
    )
    const currentData = await currentResponse.json()

    // Get daily forecast
    const forecastResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    )
    const forecastData = await forecastResponse.json()

    // Process current weather
    const current = currentData.current
    currentWeather.value = {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      pressure: current.surface_pressure,
      description: getWeatherDescription(current.weather_code)
    }

    // Process daily forecast
    dailyForecast.value = forecastData.daily.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      maxTemp: forecastData.daily.temperature_2m_max[index],
      minTemp: forecastData.daily.temperature_2m_min[index],
      weatherCode: forecastData.daily.weather_code[index]
    }))

  } catch (err) {
    error.value = 'Failed to fetch weather data'
    console.error('Weather API error:', err)
  } finally {
    loading.value = false
  }
}

// Get weather description from WMO code
const getWeatherDescription = (code) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm'
  }
  return descriptions[code] || 'Unknown'
}

// Initialize with a default location (Moscow)
onMounted(async () => {
  await selectLocation({
    name: 'Moscow',
    country: 'Russia',
    latitude: 55.7558,
    longitude: 37.6176
  })
})
</script>
