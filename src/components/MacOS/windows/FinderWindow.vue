<template>
  <div class="finder-window h-full flex flex-col md:flex-row">
    <!-- Sidebar -->
    <div
      class="w-full md:w-48 bg-macos-dark-sidebar border-b md:border-b-0 md:border-r border-macos-dark-border p-4 md:block hidden"
    >
      <div class="text-xs font-semibold text-macos-dark-text-secondary mb-2">
        Favorites
      </div>
      <div class="space-y-1">
        <div class="finder-sidebar-item" @click="$emit('open-window', 'about')">
          <span class="mr-2">👤</span>
          <span>About Me</span>
        </div>
        <div
          class="finder-sidebar-item"
          @click="$emit('open-window', 'projects')"
        >
          <span class="mr-2">📁</span>
          <span>Projects</span>
        </div>
        <div class="finder-sidebar-item" @click="$emit('open-window', 'code')">
          <span class="mr-2">💻</span>
          <span>Skills</span>
        </div>
        <div
          class="finder-sidebar-item"
          @click="$emit('open-window', 'contact')"
        >
          <span class="mr-2">📧</span>
          <span>Contact</span>
        </div>
      </div>

      <div
        class="text-xs font-semibold text-macos-dark-text-secondary mb-2 mt-6"
      >
        Recent
      </div>
      <div class="space-y-1">
        <div class="finder-sidebar-item text-sm" @click="downloadResume">
          <span class="mr-2">📄</span>
          <span>Resume.pdf</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-4 md:p-8 overflow-auto">
      <!-- Welcome Header -->
      <div class="mb-6 md:mb-8">
        <h1 class="text-2xl md:text-4xl font-bold text-macos-dark-text mb-2">
          Welcome! 👋
        </h1>
        <p class="text-base md:text-lg text-macos-dark-text-secondary">
          I'm Abdul-muiz Olaleye, a Cloud Engineer & Full Stack Developer
        </p>
      </div>

      <!-- Quick Access Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div class="finder-card" @click="$emit('open-window', 'about')">
          <div class="text-5xl mb-3">👤</div>
          <h3 class="text-lg font-semibold mb-1">About Me</h3>
          <p class="text-sm text-macos-dark-text-secondary">
            Learn about my background and experience
          </p>
        </div>

        <div class="finder-card" @click="$emit('open-window', 'projects')">
          <div class="text-5xl mb-3">📁</div>
          <h3 class="text-lg font-semibold mb-1">Projects</h3>
          <p class="text-sm text-macos-dark-text-secondary">
            View my portfolio of work
          </p>
        </div>

        <div class="finder-card" @click="$emit('open-window', 'code')">
          <div class="text-5xl mb-3">💻</div>
          <h3 class="text-lg font-semibold mb-1">Skills</h3>
          <p class="text-sm text-macos-dark-text-secondary">
            Explore my technical expertise
          </p>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="mb-6 md:mb-8">
        <h2 class="text-xl md:text-2xl font-semibold text-macos-dark-text mb-4">
          💼 Let's Connect
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="finder-card" @click="$emit('open-window', 'contact')">
            <div class="text-4xl mb-2">📧</div>
            <h3 class="font-semibold mb-1">Email Me</h3>
            <p class="text-xs text-macos-dark-text-secondary">
              abdulmuiz.olatunbosun@gmail.com
            </p>
          </div>
          <div class="finder-card" @click="downloadResume">
            <div class="text-4xl mb-2">📄</div>
            <h3 class="font-semibold mb-1">Resume</h3>
            <p class="text-xs text-macos-dark-text-secondary">Download my CV</p>
          </div>
        </div>
      </div>

      <!-- Featured Project -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-macos-dark-text mb-4">
          Featured Project
        </h2>
        <div class="finder-featured-card">
          <img
            src="../../../img/quiz.png"
            alt="Learnly AI"
            class="w-full h-48 object-cover rounded-t-lg"
          />
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">Learnly AI</h3>
            <p class="text-macos-dark-text-secondary mb-4">
              AI-powered educational platform with quiz creation, adaptive learning, and comprehensive analytics
            </p>
            <div class="flex gap-2">
              <span
                class="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full"
                >Nuxt.js 3</span
              >
              <span
                class="px-3 py-1 text-xs bg-secondary/20 text-secondary rounded-full"
                >Vue.js 3</span
              >
              <span
                class="px-3 py-1 text-xs bg-accent/20 text-accent rounded-full"
                >Pinia</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="stat-card">
          <div class="text-3xl font-bold text-primary">29+</div>
          <div class="text-sm text-macos-dark-text-secondary">Repositories</div>
        </div>
        <div class="stat-card">
          <div class="text-3xl font-bold text-secondary">10+</div>
          <div class="text-sm text-macos-dark-text-secondary">Projects</div>
        </div>
        <div class="stat-card">
          <div class="text-3xl font-bold text-accent">230+</div>
          <div class="text-sm text-macos-dark-text-secondary">
            Contributions
          </div>
        </div>
        <div class="stat-card">
          <div class="text-3xl font-bold text-warning">3</div>
          <div class="text-sm text-macos-dark-text-secondary">AWS Certs</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FinderWindow",
  methods: {
    downloadResume() {
      const pdfUrl = encodeURI("/Abdul-muiz Olaleye.pdf");
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Abdul-muiz-Olaleye-Resume.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.finder-sidebar-item {
  @apply flex items-center px-2 py-1.5 text-sm text-macos-dark-text rounded cursor-pointer transition-all duration-200;
}

.finder-sidebar-item:hover {
  @apply bg-macos-dark-border/50 transform scale-105;
}

.finder-sidebar-item:active {
  @apply scale-95;
}

.finder-card {
  @apply bg-macos-dark-sidebar border border-macos-dark-border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:scale-105 hover:-translate-y-1;
}

.finder-card:active {
  @apply scale-100 translate-y-0;
}

.finder-featured-card {
  @apply bg-macos-dark-sidebar border border-macos-dark-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-102;
}

.stat-card {
  @apply bg-macos-dark-sidebar border border-macos-dark-border rounded-lg p-4 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:scale-105;
}
</style>

