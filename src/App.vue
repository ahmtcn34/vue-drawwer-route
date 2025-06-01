<script setup lang="ts">
import { computed, ref, watch, provide, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDrawerOpen = computed(() => !!route.matched.find(m => m.components?.drawer))
const isMainContentShifted = ref(false)

const drawerVisible = ref(isDrawerOpen.value)

provide('drawerVisible', drawerVisible)

const handleDrawerClosing = () => {
  isMainContentShifted.value = false
}

const handleDrawerOpening = () => {
  isMainContentShifted.value = true
}

onMounted(() => {
  window.addEventListener('drawer-closing', handleDrawerClosing)
  window.addEventListener('drawer-opening', handleDrawerOpening)
})

onUnmounted(() => {
  window.removeEventListener('drawer-closing', handleDrawerClosing)
  window.removeEventListener('drawer-opening', handleDrawerOpening)
})

watch(isDrawerOpen, (newValue) => {
  if (newValue) {
    drawerVisible.value = true
    isMainContentShifted.value = true
  }
}, { immediate: true })
</script>

<template>
  <div class="app-container">
    <div class="main-content" :class="{ 'main-content-shift': isMainContentShifted }">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <router-view name="drawer" />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

body {
  position: relative;
}

.app-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: visible;
}

.main-content {
  width: 100%;
  min-height: 100vh;
  transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
  padding-left: 50px;
  box-sizing: border-box;
}

.main-content-shift {
  transform: translateX(-50px);
}

.page-fade-enter-active {
  transition: all 0.3s ease-out;
}

.page-fade-leave-active {
  transition: all 0.3s ease-in;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
