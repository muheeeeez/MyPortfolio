<template>
  <div
    v-if="isOpen"
    class="window-container fixed animate-window-appear"
    :style="windowStyle"
    :class="{ 'z-40': isActive, 'z-30': !isActive }"
    @mousedown="bringToFront"
  >
    <div
      class="window-shadow rounded-lg overflow-hidden flex flex-col bg-macos-dark-window border border-macos-dark-border"
      :style="{ height: '100%', width: '100%' }"
    >
      <!-- Title Bar -->
      <div
        class="window-titlebar flex items-center justify-between px-3 md:px-4 py-2 bg-macos-dark-sidebar border-b border-macos-dark-border no-select"
        :class="{ 'cursor-move': !isMobile }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <!-- Traffic Lights -->
        <div class="traffic-lights flex gap-1.5 md:gap-2">
          <div class="traffic-light close" @click.stop="closeWindow"></div>
          <div
            class="traffic-light minimize hidden md:block"
            @click.stop="minimizeWindow"
          ></div>
          <div
            class="traffic-light maximize hidden md:block"
            @click.stop="toggleMaximize"
          ></div>
        </div>

        <!-- Title -->
        <div
          class="text-xs md:text-sm font-medium text-macos-dark-text truncate max-w-[60%]"
        >
          {{ title }}
        </div>

        <!-- Spacer -->
        <div class="w-12 md:w-16"></div>
      </div>

      <!-- Content -->
      <div class="window-content flex-1 overflow-auto macos-scrollbar">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MacWindow",
  props: {
    title: {
      type: String,
      required: true,
    },
    windowId: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    initialPosition: {
      type: Object,
      default: () => ({ x: 100, y: 100 }),
    },
    initialSize: {
      type: Object,
      default: () => ({ width: 800, height: 600 }),
    },
  },
  data() {
    return {
      position: { ...this.initialPosition },
      size: { ...this.initialSize },
      isMaximized: false,
      isDragging: false,
      dragStart: { x: 0, y: 0 },
      savedPosition: null,
      savedSize: null,
      isMobile: false,
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);

    // Auto-maximize on mobile
    if (this.isMobile) {
      this.isMaximized = true;
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
  },
  computed: {
    windowStyle() {
      // Always fullscreen on mobile
      if (this.isMobile || this.isMaximized) {
        return {
          left: "0px",
          top: "0px",
          width: "100vw",
          height: "100vh",
        };
      }
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: `${this.size.width}px`,
        height: `${this.size.height}px`,
      };
    },
  },
  methods: {
    closeWindow() {
      this.$emit("close", this.windowId);
    },
    minimizeWindow() {
      this.$emit("minimize", this.windowId);
    },
    toggleMaximize() {
      if (this.isMaximized) {
        // Restore
        if (this.savedPosition && this.savedSize) {
          this.position = { ...this.savedPosition };
          this.size = { ...this.savedSize };
        }
        this.isMaximized = false;
      } else {
        // Maximize
        this.savedPosition = { ...this.position };
        this.savedSize = { ...this.size };
        this.isMaximized = true;
      }
    },
    bringToFront() {
      this.$emit("activate", this.windowId);
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
      // Auto-maximize on mobile when switching to mobile view
      if (this.isMobile && !this.isMaximized) {
        this.isMaximized = true;
      }
    },
    startDrag(e) {
      if (this.isMaximized || this.isMobile) return;

      // Support both mouse and touch
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      this.isDragging = true;
      this.dragStart = {
        x: clientX - this.position.x,
        y: clientY - this.position.y,
      };

      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.stopDrag);
      document.addEventListener("touchmove", this.drag);
      document.addEventListener("touchend", this.stopDrag);
    },
    drag(e) {
      if (!this.isDragging) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      this.position = {
        x: clientX - this.dragStart.x,
        y: Math.max(28, clientY - this.dragStart.y), // Don't go above menu bar
      };
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.stopDrag);
      document.removeEventListener("touchmove", this.drag);
      document.removeEventListener("touchend", this.stopDrag);
    },
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.drag);
    document.removeEventListener("mouseup", this.stopDrag);
    document.removeEventListener("touchmove", this.drag);
    document.removeEventListener("touchend", this.stopDrag);
    window.removeEventListener("resize", this.checkMobile);
  },
};
</script>

<style scoped>
.window-titlebar {
  -webkit-app-region: drag;
}

.traffic-light {
  -webkit-app-region: no-drag;
}
</style>

