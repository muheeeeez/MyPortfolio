<template>
  <div
    class="fixed bottom-0 md:bottom-4 left-0 md:left-1/2 md:transform md:-translate-x-1/2 z-50 w-full md:w-auto"
  >
    <div
      class="dock dock-dark no-select flex md:inline-flex justify-around md:justify-center items-center w-full md:w-auto overflow-x-auto py-2 md:py-0"
    >
      <!-- Dock Items -->
      <div
        v-for="app in apps"
        :key="app.id"
        class="dock-item flex-shrink-0"
        :class="{ active: app.isOpen }"
        @click="$emit('open-app', app.id)"
        @mouseenter="handleMouseEnter(app.id)"
        @mouseleave="handleMouseLeave"
        :title="app.name"
      >
        <div class="text-2xl md:text-3xl">{{ app.icon }}</div>
      </div>

      <!-- Divider - Hidden on mobile -->
      <div
        class="w-px h-8 md:h-12 bg-macos-dark-border mx-2 hidden md:block"
      ></div>

      <!-- Trash - Hidden on mobile -->
      <div
        class="dock-item hidden md:block"
        @click="$emit('minimize-all')"
        title="Minimize All"
      >
        <div class="text-3xl">🗑️</div>
      </div>
    </div>

    <!-- Tooltip -->
    <transition name="fade">
      <div
        v-if="hoveredApp"
        class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-macos-dark-window text-macos-dark-text text-xs rounded-md border border-macos-dark-border whitespace-nowrap"
      >
        {{ hoveredApp }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MacDock",
  props: {
    openWindows: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      hoveredApp: null,
      apps: [
        { id: "finder", name: "Finder", icon: "🗂️", isOpen: false },
        { id: "about", name: "About.app", icon: "👤", isOpen: false },
        { id: "projects", name: "Projects.app", icon: "📁", isOpen: false },
        { id: "code", name: "Code.app", icon: "💻", isOpen: false },
        { id: "contact", name: "Contact.app", icon: "📧", isOpen: false },
        { id: "terminal", name: "Terminal.app", icon: "⚡", isOpen: false },
      ],
    };
  },
  watch: {
    openWindows: {
      handler(newVal) {
        // Update apps' open state
        this.apps.forEach((app) => {
          app.isOpen = newVal.includes(app.id);
        });
      },
      deep: true,
    },
  },
  methods: {
    handleMouseEnter(appId) {
      const app = this.apps.find((a) => a.id === appId);
      if (app) {
        this.hoveredApp = app.name;
      }
    },
    handleMouseLeave() {
      this.hoveredApp = null;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

