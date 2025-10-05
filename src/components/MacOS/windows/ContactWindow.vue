<template>
  <div class="contact-window h-full overflow-auto p-4 md:p-8 bg-macos-dark-bg">
    <!-- Header -->
    <div class="text-center mb-6 md:mb-8">
      <div class="text-5xl md:text-6xl mb-4">📧</div>
      <h1 class="text-2xl md:text-3xl font-bold text-macos-dark-text mb-2">
        Get In Touch
      </h1>
      <p class="text-macos-dark-text-secondary">
        Let's connect! I'm always open to discussing new opportunities and
        collaborations.
      </p>
    </div>

    <!-- Contact Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
      <!-- Email Card -->
      <a href="mailto:abdulmuiz.olatunbosun@gmail.com" class="contact-card">
        <div class="flex items-start gap-4">
          <div class="text-4xl">📧</div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-macos-dark-text mb-1">
              Email
            </h3>
            <p class="text-primary text-sm break-all">
              abdulmuiz.olatunbosun@gmail.com
            </p>
            <span class="text-xs text-macos-dark-text-secondary mt-2 block"
              >Click to send email</span
            >
          </div>
        </div>
      </a>

      <!-- Phone Card -->
      <a href="tel:+17538861887" class="contact-card">
        <div class="flex items-start gap-4">
          <div class="text-4xl">📱</div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-macos-dark-text mb-1">
              Phone
            </h3>
            <p class="text-primary text-sm">+1 (753) 886-1887</p>
            <span class="text-xs text-macos-dark-text-secondary mt-2 block"
              >Click to call</span
            >
          </div>
        </div>
      </a>

      <!-- Location Card -->
      <div class="contact-card cursor-default hover:scale-100">
        <div class="flex items-start gap-4">
          <div class="text-4xl">📍</div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-macos-dark-text mb-1">
              Location
            </h3>
            <p class="text-primary text-sm">Ottawa, Ontario</p>
            <span class="text-xs text-macos-dark-text-secondary mt-2 block"
              >Canada</span
            >
          </div>
        </div>
      </div>

      <!-- Availability Card -->
      <div class="contact-card cursor-default hover:scale-100">
        <div class="flex items-start gap-4">
          <div class="text-4xl">⏰</div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-macos-dark-text mb-1">
              Availability
            </h3>
            <p class="text-primary text-sm">Open to opportunities</p>
            <span class="text-xs text-macos-dark-text-secondary mt-2 block"
              >Full-time, Contract, Freelance</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Social Links Section -->
    <div class="mb-6 md:mb-8">
      <h2 class="text-lg md:text-xl font-semibold text-macos-dark-text mb-4">
        Connect on Social Media
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="https://github.com/muheeeeez"
          target="_blank"
          class="social-card"
        >
          <img
            src="../../../img/github-icon.png"
            alt="GitHub"
            class="w-8 h-8"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-macos-dark-text">GitHub</h3>
            <p class="text-sm text-macos-dark-text-secondary">@muheeeeez</p>
          </div>
          <span class="text-primary">→</span>
        </a>

        <a
          href="https://www.linkedin.com/in/abdul-muiz-olaleye/"
          target="_blank"
          class="social-card"
        >
          <img
            src="../../../img/linkedin-icon.png"
            alt="LinkedIn"
            class="w-8 h-8"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-macos-dark-text">LinkedIn</h3>
            <p class="text-sm text-macos-dark-text-secondary">
              abdul-muiz-olaleye
            </p>
          </div>
          <span class="text-primary">→</span>
        </a>

        <a
          href="https://twitter.com/IAmMuizOlaleye"
          target="_blank"
          class="social-card"
        >
          <img
            src="../../../img/twitter-icon.png"
            alt="Twitter"
            class="w-8 h-8"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-macos-dark-text">Twitter</h3>
            <p class="text-sm text-macos-dark-text-secondary">
              @IAmMuizOlaleye
            </p>
          </div>
          <span class="text-primary">→</span>
        </a>
      </div>
    </div>

    <!-- Quick Actions -->
    <div
      class="flex flex-col md:flex-row gap-3 md:gap-4 justify-center pt-6 border-t border-macos-dark-border"
    >
      <button
        @click="sendEmail"
        class="btn-primary px-6 py-3 flex items-center justify-center gap-2"
      >
        <span>📧</span>
        <span>Send Email</span>
      </button>
      <button
        @click="downloadResume"
        class="btn-secondary px-6 py-3 flex items-center justify-center gap-2"
      >
        <span>📄</span>
        <span>Download Resume</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactWindow",
  methods: {
    sendEmail() {
      window.location.href = "mailto:abdulmuiz.olatunbosun@gmail.com";
    },
    downloadResume() {
      const pdfUrl = "/src/resume/Abdul-muiz-Olaleye.pdf";
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Abdul-muiz-Olaleye-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.contact-card {
  @apply bg-macos-dark-sidebar border border-macos-dark-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:scale-105 cursor-pointer;
}

.contact-card:active {
  @apply scale-100;
}

.social-card {
  @apply bg-macos-dark-sidebar border border-macos-dark-border rounded-lg p-4 flex items-center gap-3 transition-all duration-300 hover:border-primary hover:shadow-lg hover:scale-105 cursor-pointer;
}

.social-card:active {
  @apply scale-100;
}
</style>

