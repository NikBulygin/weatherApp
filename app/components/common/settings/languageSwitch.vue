<template>
  <UModal 
    v-if="allLocales.length > 1"
    :title="t('language.selectTitle')"
    :description="t('language.selectDescription')"
    :ui="{ content: 'max-w-[800px] max-h-[600px] min-w-[300px] min-h-[200px] sm:min-w-[400px] sm:min-h-[300px]' }">
    <UButton 
      :label="currentLanguageName" 
      variant="ghost" 
      icon="i-lucide-globe"
    />

    <template #body>
      <UContainer
        class="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 
        h-full w-full justify-center items-center overflow-y-auto responsive-padding flex-1"
        >
        <UButton
          v-for="locale in allLocales"
          :key="locale.code"
          :label="`${getFlag(locale.code)} ${locale.name}`"
          :variant="locale.code === currentLocale ? 'solid' : 'outline'"
          :color="locale.code === currentLocale ? 'primary' : 'neutral'"
          size="lg"
          class="justify-center text-center min-w-[200px] min-h-[60px] sm:min-w-[250px] sm:min-h-[80px] text-sm sm:text-base md:text-lg font-medium"
          @click="handleSetLocale(locale.code)"
        />
      </UContainer>
    </template>
  </UModal>
</template>

<script setup lang="ts">
interface Locale {
  code: string
  name: string
  language: string
  file: string
}

const { locale, locales, t, setLocale } = useI18n()

const currentLocale = computed(() => locale.value)

const allLocales = computed(() => {
  return (locales.value as Locale[])
})

const currentLanguageName = computed(() => {
  const currentLocale = (locales.value as Locale[]).find(l => l.code === locale.value)
  return currentLocale ? `${getFlag(currentLocale.code)} ${currentLocale.name}` : t('language.selectLanguage')
})

const getFlag = (code: string): string => {
  const flagMap: Record<string, string> = {
    'en': '🇺🇸',
  }
  return flagMap[code] || '🌐'
}

const handleSetLocale = (localeCode: string) => {
  setLocale(localeCode as i18nLocale)
}
</script>