<template>
  <div class="flex items-center gap-1 sm:gap-2">
    <span class="text-xs sm:text-sm">{{ t('layout.author.withLove') }}</span>
    <UIcon name="i-lucide-heart" class="text-sm sm:text-base md:text-lg text-red-500" />
    <UButton
      icon="i-logos-github-icon"
      variant="ghost"
      size="sm"
      @click="openLink('https://github.com/NikBulygin/weatherApp.git')"
    />
    <UModal 
      :title="t('layout.author.contacts')"
      :description="t('layout.author.contactsDescription')"
      :ui="{ content: 'max-w-[800px] max-h-[600px] min-w-[300px] min-h-[200px] sm:min-w-[400px] sm:min-h-[300px]' }">
      <UButton
        :label="t('layout.author.name')"
        variant="ghost"
        icon="i-heroicons-user"
      />

      <template #body>
        <div class="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 h-full w-full justify-center items-center overflow-y-auto responsive-padding flex-1">
          <!-- Email -->
          <UButton
            :label="`Email`"
            icon="i-logos-google-gmail"
            variant="outline"
            size="lg"
            class="justify-center text-center min-w-[200px] min-h-[60px] sm:min-w-[250px] sm:min-h-[80px] text-sm sm:text-base md:text-lg font-medium"
            :ui="{ leadingIcon: 'w-6 h-6 sm:w-8 sm:h-8' }"
            @click="openEmail('byluginnikita@gmail.com')"
          />

          <!-- Telegram -->
          <UButton
            :label="`Telegram`"
            icon="i-logos-telegram"
            variant="outline"
            size="lg"
            class="justify-center text-center min-w-[200px] min-h-[60px] sm:min-w-[250px] sm:min-h-[80px] text-sm sm:text-base md:text-lg font-medium"
            :ui="{ leadingIcon: 'w-6 h-6 sm:w-8 sm:h-8' }"
            @click="openLink('https://t.me/Bulygin_Nik')"
          />

          <!-- LinkedIn -->
          <UButton
            :label="`LinkedIn`"
            icon="i-logos-linkedin"
            variant="outline"
            size="lg"
            class="justify-center text-center min-w-[200px] min-h-[60px] sm:min-w-[250px] sm:min-h-[80px] text-sm sm:text-base md:text-lg font-medium"
            :ui="{ leadingIcon: 'w-6 h-6 sm:w-8 sm:h-8' }"
            @click="openLink('https://www.linkedin.com/in/nikbulygin/')"
          />

          <!-- GitHub -->
          <UButton
            :label="`GitHub`"
            icon="i-logos-github-icon"
            variant="outline"
            size="lg"
            class="justify-center text-center min-w-[200px] min-h-[60px] sm:min-w-[250px] sm:min-h-[80px] text-sm sm:text-base md:text-lg font-medium"
            :ui="{ leadingIcon: 'w-6 h-6 sm:w-8 sm:h-8 dark:invert' }"
            @click="openLink('https://github.com/NikBulygin')"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const openEmail = (email: string) => {
  window.open(`mailto:${email}`, '_blank')
}

const openLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>