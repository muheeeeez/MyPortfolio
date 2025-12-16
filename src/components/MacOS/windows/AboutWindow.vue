<template>
  <div class="about-window h-full overflow-auto p-4 md:p-8 bg-macos-dark-bg">
    <!-- Profile Section -->
    <div
      class="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mb-6 md:mb-8"
    >
      <img
        src="../../../img/moi.jpeg"
        alt="Abdul-muiz Olaleye"
        class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary"
      />
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-2xl md:text-3xl font-bold text-macos-dark-text mb-2">
          Abdul-muiz Olaleye
        </h1>
        <p class="text-lg md:text-xl text-primary mb-3">Cloud Engineer & Full Stack Developer</p>
        <p class="text-macos-dark-text-secondary leading-relaxed">
          I'm a passionate Cloud Engineer & Full Stack Developer based in Ontario, Canada. With a
          BSc in Economics from Babcock University and a Computer Programming
          Diploma from Algonquin College, I bring a unique blend of analytical
          thinking and technical expertise to every project. I specialize in designing
          scalable cloud architectures and building robust, production-ready applications.
        </p>
      </div>
    </div>

    <!-- Info Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8">
      <div class="info-item">
        <div class="info-label">📧 Email</div>
        <div class="info-value">abdulmuiz.olatunbosun@gmail.com</div>
      </div>
      <div class="info-item">
        <div class="info-label">📍 Location</div>
        <div class="info-value">Ontario, Canada</div>
      </div>
      <div class="info-item">
        <div class="info-label">🎓 Education</div>
        <div class="info-value">Algonquin College · Babcock University</div>
      </div>
      <div class="info-item">
        <div class="info-label">📞 Phone</div>
        <div class="info-value">+1 (753) 886-1887</div>
      </div>
    </div>

    <!-- Experience & Education Tabs -->
    <div class="mb-6">
      <div
        class="flex gap-1 md:gap-2 border-b border-macos-dark-border mb-4 overflow-x-auto"
      >
        <button
          class="tab-button"
          :class="{ active: activeTab === 'experience' }"
          @click="activeTab = 'experience'"
        >
          Experience
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'education' }"
          @click="activeTab = 'education'"
        >
          Education
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'certs' }"
          @click="activeTab = 'certs'"
        >
          Certifications
        </button>
      </div>

      <!-- Experience Tab -->
      <div v-if="activeTab === 'experience'" class="space-y-4">
        <div
          v-for="(exp, index) in experience"
          :key="index"
          class="timeline-item"
        >
          <div class="text-sm text-primary font-semibold">{{ exp.period }}</div>
          <h3 class="text-lg font-semibold text-macos-dark-text">
            {{ exp.title }}
          </h3>
          <p class="text-macos-dark-text-secondary text-sm mb-2">
            {{ exp.company }}
          </p>
          <p class="text-macos-dark-text-secondary">{{ exp.description }}</p>
        </div>
      </div>

      <!-- Education Tab -->
      <div v-if="activeTab === 'education'" class="space-y-4">
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="timeline-item"
        >
          <div class="text-sm text-primary font-semibold">{{ edu.period }}</div>
          <h3 class="text-lg font-semibold text-macos-dark-text">
            {{ edu.degree }}
          </h3>
          <p class="text-macos-dark-text-secondary text-sm mb-2">
            {{ edu.institution }}
          </p>
          <p class="text-macos-dark-text-secondary">{{ edu.description }}</p>
        </div>
      </div>

      <!-- Certifications Tab -->
      <div v-if="activeTab === 'certs'" class="space-y-4">
        <div
          v-for="(cert, index) in certifications"
          :key="index"
          class="cert-item"
        >
          <div class="flex items-start gap-4">
            <div class="text-5xl">🏆</div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-macos-dark-text mb-1">
                {{ cert.name }}
              </h3>
              <p class="text-sm text-primary font-semibold mb-1">
                {{ cert.issuer }}
              </p>
              <p class="text-sm text-macos-dark-text-secondary">
                Issued: {{ cert.year }}
              </p>
            </div>
            <div class="text-4xl">✓</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Links -->
    <div class="flex gap-3 pt-4 border-t border-macos-dark-border">
      <a
        href="https://github.com/muheeeeez"
        target="_blank"
        class="social-link"
      >
        <img src="../../../img/github-icon.png" alt="GitHub" class="w-6 h-6" />
      </a>
      <a
        href="https://www.linkedin.com/in/abdul-muiz-olaleye/"
        target="_blank"
        class="social-link"
      >
        <img
          src="../../../img/linkedin-icon.png"
          alt="LinkedIn"
          class="w-6 h-6"
        />
      </a>
      <a
        href="https://twitter.com/IAmMuizOlaleye"
        target="_blank"
        class="social-link"
      >
        <img
          src="../../../img/twitter-icon.png"
          alt="Twitter"
          class="w-6 h-6"
        />
      </a>
      <button class="btn-primary ml-auto" @click="downloadResume">
        Download Resume
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutWindow",
  data() {
    return {
      activeTab: "experience",
      experience: [
        {
          period: "November 2025 - Present",
          title: "Frontend Developer & UI/UX Designer Intern",
          company: "Ridey App – Quikbuynsell",
          description:
            "Designed end-to-end UI/UX workflows in Figma and implemented responsive, production-ready frontend interfaces using Next.js. Collaborated with backend engineers to integrate Python-based APIs for service discovery, booking flows, user registration, and real-time tracking. Established reusable UI components and layout patterns, managed complex user flows across multiple service categories, and maintained clear documentation in Confluence. Used GitLab for version control, merge requests, and CI/CD pipelines.",
        },
        {
          period: "May 2025 - Present",
          title: "Supervisor",
          company: "Farm Boy, Ottawa",
          description:
            "Promoted to supervise a team of associates, overseeing operations, coordinating work schedules, and ensuring exceptional customer service standards.",
        },
        {
          period: "Sep 2024 - May 2025",
          title: "Customer Service Representative",
          company: "Farm Boy, Ottawa",
          description:
            "Delivered exceptional customer service in a fast-paced retail environment while developing valuable skills in communication and problem-solving.",
        },
      ],
      education: [
        {
          period: "January 2024 - August 2025",
          degree: "Computer Programming Diploma",
          institution: "Algonquin College, Ottawa",
          description:
            "Graduated with Honours (GPA: 3.87). Coursework includes OOP, Web Development, Database Management Systems.",
        },
        {
          period: "January 2020 - July 2023",
          degree: "Bachelor of Science in Economics",
          institution: "Babcock University, Nigeria",
          description:
            "Graduated with a GPA of 3.97. Relevant coursework included Econometrics, Monetary Economics, and Political Economics.",
        },
      ],
      certifications: [
        {
          name: "AWS Solutions Architect Associate",
          issuer: "Amazon Web Services",
          year: "December 2025",
        },
        {
          name: "AWS AI Practitioner",
          issuer: "Amazon Web Services",
          year: "March 2025",
        },
        {
          name: "AWS Cloud Practitioner",
          issuer: "Amazon Web Services",
          year: "December 2024",
        },
      ],
    };
  },
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
.info-item {
  @apply bg-macos-dark-sidebar border border-macos-dark-border rounded-lg p-4;
}

.info-label {
  @apply text-sm font-semibold text-macos-dark-text-secondary mb-1;
}

.info-value {
  @apply text-macos-dark-text;
}

.tab-button {
  @apply px-4 py-2 text-sm font-medium text-macos-dark-text-secondary transition-all duration-200 border-b-2 border-transparent;
}

.tab-button.active {
  @apply text-primary border-primary;
}

.tab-button:hover {
  @apply text-macos-dark-text transform scale-105;
}

.tab-button:active {
  @apply scale-95;
}

.timeline-item {
  @apply bg-macos-dark-sidebar border border-macos-dark-border rounded-lg p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-md;
}

.cert-item {
  @apply bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:scale-102;
}

.social-link {
  @apply p-2 bg-macos-dark-sidebar border border-macos-dark-border rounded-lg hover:border-primary transition-colors;
}
</style>

