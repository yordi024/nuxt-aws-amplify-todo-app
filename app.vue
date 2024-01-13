<template>
  <div class="relative">
    <UButton
      @click="toggleDark()"
      class="fixed right-0 mt-2 mr-2"
      color="white"
      :icon="isDark ? 'i-heroicons-moon-solid' : 'i-heroicons-sun'"
    />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>
