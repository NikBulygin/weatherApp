<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">
          🌤️ Weather Forecast
        </h1>
        <p class="text-blue-100 text-lg">
          Search for locations and get current weather conditions
        </p>
      </header>
      
      <WeatherForecast />
    </div>
  </div>
</template>

<script setup>
// Main app component
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

* {
  box-sizing: border-box;
}
</style>
