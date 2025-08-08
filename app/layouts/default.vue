<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="container mx-auto responsive-px responsive-py">
        <div class="flex items-center justify-between">
            <h1> {{ t('core.title') }}</h1>
            
            <div class="flex items-center gap-2">
                <CommonSettingsLanguageSwitch />
                <CommonSettingsThemeSwitch />
                  <UBadge size="xl" 
                  :color="online ? 'success' : 'error'"
                  />
            </div>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="container mx-auto responsive-px responsive-py">
        <div class="flex items-center justify-between">
            <CommonAuthorInfo />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
const online = useOnline();
</script>