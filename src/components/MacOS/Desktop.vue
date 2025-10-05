<template>
  <div
    class="desktop-container h-screen w-screen overflow-hidden relative bg-macos-dark-bg"
  >
    <!-- Wallpaper -->
    <div class="wallpaper absolute inset-0"></div>

    <!-- Menu Bar -->
    <MenuBar :isDark="true" @open-app="openApp" @toggle-theme="toggleTheme" />

    <!-- Windows -->
    <MacWindow
      v-for="window in windows"
      :key="window.id"
      :windowId="window.id"
      :title="window.title"
      :isOpen="window.isOpen"
      :isActive="activeWindow === window.id"
      :initialPosition="window.position"
      :initialSize="window.size"
      @close="closeWindow"
      @minimize="minimizeWindow"
      @activate="activateWindow"
    >
      <component :is="window.component" @open-window="openApp" />
    </MacWindow>

    <!-- Dock -->
    <MacDock
      :openWindows="openWindows"
      @open-app="openApp"
      @minimize-all="minimizeAll"
    />
  </div>
</template>

<script>
import MenuBar from "./MenuBar.vue";
import MacDock from "./Dock.vue";
import MacWindow from "./Window.vue";
import AboutWindow from "./windows/AboutWindow.vue";
import ProjectsWindow from "./windows/ProjectsWindow.vue";
import CodeWindow from "./windows/CodeWindow.vue";
import TerminalWindow from "./windows/TerminalWindow.vue";
import FinderWindow from "./windows/FinderWindow.vue";
import ContactWindow from "./windows/ContactWindow.vue";

export default {
  name: "MacDesktop",
  components: {
    MenuBar,
    MacDock,
    MacWindow,
    AboutWindow,
    ProjectsWindow,
    CodeWindow,
    TerminalWindow,
    FinderWindow,
    ContactWindow,
  },
  data() {
    return {
      activeWindow: null,
      windows: [
        {
          id: "finder",
          title: "Finder",
          component: "FinderWindow",
          isOpen: false,
          position: { x: 50, y: 80 },
          size: { width: 900, height: 600 },
        },
        {
          id: "about",
          title: "About - Abdul-muiz Olaleye",
          component: "AboutWindow",
          isOpen: false,
          position: { x: 100, y: 100 },
          size: { width: 800, height: 600 },
        },
        {
          id: "projects",
          title: "Projects",
          component: "ProjectsWindow",
          isOpen: false,
          position: { x: 150, y: 120 },
          size: { width: 900, height: 650 },
        },
        {
          id: "code",
          title: "Visual Studio Code",
          component: "CodeWindow",
          isOpen: false,
          position: { x: 200, y: 80 },
          size: { width: 1000, height: 700 },
        },
        {
          id: "terminal",
          title: "Terminal",
          component: "TerminalWindow",
          isOpen: false,
          position: { x: 250, y: 150 },
          size: { width: 700, height: 450 },
        },
        {
          id: "contact",
          title: "Contact - Abdul-muiz Olaleye",
          component: "ContactWindow",
          isOpen: false,
          position: { x: 300, y: 100 },
          size: { width: 800, height: 650 },
        },
      ],
    };
  },
  computed: {
    openWindows() {
      return this.windows.filter((w) => w.isOpen).map((w) => w.id);
    },
  },
  mounted() {
    // Open Finder by default
    setTimeout(() => {
      this.openApp("finder");
    }, 500);
  },
  methods: {
    openApp(appId) {
      const window = this.windows.find((w) => w.id === appId);
      if (window) {
        window.isOpen = true;
        this.activateWindow(appId);
      }
    },
    closeWindow(windowId) {
      const window = this.windows.find((w) => w.id === windowId);
      if (window) {
        window.isOpen = false;
        if (this.activeWindow === windowId) {
          // Find next open window
          const nextWindow = this.windows.find(
            (w) => w.isOpen && w.id !== windowId
          );
          this.activeWindow = nextWindow ? nextWindow.id : null;
        }
      }
    },
    minimizeWindow(windowId) {
      const window = this.windows.find((w) => w.id === windowId);
      if (window) {
        window.isOpen = false;
      }
    },
    activateWindow(windowId) {
      this.activeWindow = windowId;
    },
    minimizeAll() {
      this.windows.forEach((w) => (w.isOpen = false));
      this.activeWindow = null;
    },
    toggleTheme() {
      // Theme toggle functionality (future implementation)
      console.log("Theme toggle clicked");
    },
  },
};
</script>

<style scoped>
.wallpaper {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #4facfe 75%,
    #00f2fe 100%
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Alternative minimal wallpaper */
.wallpaper-minimal {
  background: radial-gradient(
      circle at 30% 20%,
      rgba(0, 122, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 80%,
      rgba(88, 86, 214, 0.1) 0%,
      transparent 50%
    ),
    #1e1e1e;
}
</style>

