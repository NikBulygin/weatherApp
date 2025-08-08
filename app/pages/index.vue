<template>
    <h1>Test</h1>
    {{ coords }}
    <p>Located at: {{ locatedAt }}</p>
    <p v-if="error">Error: {{ error.message }}</p>
    <button @click="resume">Resume</button>
    <button @click="pause">Pause</button>

    <SelectLocaton v-model="SelectLocation" />

    {{ SelectLocation }}

    <WeatherView
      v-if="SelectLocation"
      :latitude="SelectLocation.latitude"
      :longitude="SelectLocation.longitude"
      range="day"
    />

    <WeatherView
      v-if="SelectLocation"
      :latitude="SelectLocation.latitude"
      :longitude="SelectLocation.longitude"
      range="week"
    />

 <WeatherView
      v-if="SelectLocation"
      :latitude="SelectLocation.latitude"
      :longitude="SelectLocation.longitude"
      range="week"
    />
    
</template>

<script setup lang="ts">

import { useGeolocation } from '@vueuse/core';
import { reverseGeocode } from '#imports';
const { coords, locatedAt, error, resume, pause } = useGeolocation();

const SelectLocation = ref<{ 
  latitude: number; 
  longitude: number 
} | null>(null);

if (coords.value) {
  SelectLocation.value = {
    latitude: coords.value.latitude,
    longitude: coords.value.longitude
  };
}

</script>