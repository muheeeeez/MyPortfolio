<template>
  <div
    class="menu-bar menu-bar-dark no-select fixed top-0 left-0 right-0 z-50 hidden md:flex"
  >
    <div class="flex items-center space-x-4">
      <!-- Apple Logo / Your Logo -->
      <div class="menu-item font-bold text-base">
        <span class="text-lg">👨‍💻</span>
      </div>

      <!-- App Name -->
      <div class="menu-item font-semibold">Abdul-muiz</div>

      <!-- Menu Items -->
      <div class="menu-item" @click="$emit('open-app', 'about')">File</div>
      <div class="menu-item" @click="$emit('open-app', 'projects')">Edit</div>
      <div class="menu-item">View</div>
      <div class="menu-item">Window</div>
      <div class="menu-item">Help</div>
    </div>

    <!-- Right Side Menu -->
    <div class="flex items-center ml-auto space-x-4">
      <!-- System Icons -->
      <div class="menu-item cursor-pointer" @click="$emit('toggle-theme')">
        <svg
          v-if="!isDark"
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Battery -->
      <div class="menu-item">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z"
          />
          <path d="M18 8h1a1 1 0 011 1v2a1 1 0 01-1 1h-1V8z" />
        </svg>
      </div>

      <!-- WiFi -->
      <div class="menu-item">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Time -->
      <div class="menu-item text-xs font-medium">
        {{ currentTime }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  props: {
    isDark: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentTime: "",
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      this.currentTime = `${day} ${month} ${date}  ${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.menu-item {
  font-size: 13px;
}
</style>

