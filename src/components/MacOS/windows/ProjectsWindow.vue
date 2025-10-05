<template>
  <div class="projects-window h-full flex flex-col bg-macos-dark-bg">
    <!-- Toolbar -->
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between px-3 md:px-4 py-2 md:py-2 gap-3 md:gap-0 border-b border-macos-dark-border bg-macos-dark-sidebar"
    >
      <div class="flex items-center gap-2">
        <button class="toolbar-btn" @click="viewMode = 'grid'">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </button>
        <button class="toolbar-btn" @click="viewMode = 'list'">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <select
          v-model="selectedCategory"
          class="bg-macos-dark-window border border-macos-dark-border rounded px-3 py-1 text-sm text-macos-dark-text"
        >
          <option value="all">All Projects</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="Chrome Extension">Chrome Extension</option>
          <option value="Web Design">Web Design</option>
        </select>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="flex-1 overflow-auto p-4 md:p-6">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4"
      >
        <div
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="project-card-grid"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-40 object-cover rounded-t-lg"
          />
          <div class="p-4">
            <h3
              class="font-semibold text-macos-dark-text mb-2 text-sm line-clamp-2"
            >
              {{ project.title }}
            </h3>
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="(tech, idx) in project.technologies.slice(0, 3)"
                :key="idx"
                class="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded"
              >
                {{ tech }}
              </span>
            </div>
            <div class="flex gap-2">
              <a :href="project.demoLink" target="_blank" class="btn-link">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                  />
                  <path
                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                  />
                </svg>
              </a>
              <a :href="project.codeLink" target="_blank" class="btn-link">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="flex-1 overflow-auto">
      <div class="divide-y divide-macos-dark-border">
        <div
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="project-card-list"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-20 h-20 object-cover rounded"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-macos-dark-text mb-1">
              {{ project.title }}
            </h3>
            <p class="text-sm text-macos-dark-text-secondary mb-2 line-clamp-2">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="(tech, idx) in project.technologies.slice(0, 5)"
                :key="idx"
                class="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <a
              :href="project.demoLink"
              target="_blank"
              class="btn-primary text-center"
              >Live Demo</a
            >
            <a
              :href="project.codeLink"
              target="_blank"
              class="btn-secondary text-center"
              >Code</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clauseguard from "../../../img/clauseguard.png";
import helpMeOut from "../../../img/help3.png";
import quizMaker from "../../../img/quiz.png";
import smartBrains from "../../../img/smartbrains.png";
import weatherApp from "../../../img/weatherapp.png";
import deGentlesoul from "../../../img/degen.png";
import dotNotation from "../../../img/DotNotation.png";
import tullips from "../../../img/tullips.png";
import artNFT from "../../../img/blockchain.png";
import blogPlatform from "../../../img/blogplatform.png";

export default {
  name: "ProjectsWindow",
  data() {
    return {
      viewMode: "grid",
      selectedCategory: "all",
      projects: [
        {
          title: "ClauseGuard - AI-Powered Contract Analysis",
          description:
            "Intelligent contract analysis using OpenAI GPT-4, Vue.js, and FastAPI",
          image: clauseguard,
          technologies: [
            "Vue.js",
            "JavaScript",
            "OpenAI GPT-4",
            "FastAPI",
            "Supabase",
          ],
          category: "Web Development",
          demoLink: "https://clauseguardai.org/",
          codeLink: "#",
        },
        {
          title: "QuizMakerAI",
          description:
            "AI-powered educational platform with quiz creation and analytics",
          image: quizMaker,
          technologies: ["Nuxt.js 3", "Vue.js 3", "Pinia", "JWT", "Chart.js"],
          category: "Web Development",
          demoLink: "https://quizmai.com/",
          codeLink: "https://github.com/QuizMakerAI/QuizMakerFrontend",
        },
        {
          title: "HelpMeOut",
          description: "Screen recording & video sharing web application",
          image: helpMeOut,
          technologies: ["Vue.js", "TypeScript", "Tailwind CSS", "Firebase"],
          category: "Web Development",
          demoLink: "https://help-meout.netlify.app/",
          codeLink: "https://github.com/muheeeeez/HelpMeOut-v2",
        },
        {
          title: "SmartBrain",
          description: "AI Face Detection Web App",
          image: smartBrains,
          technologies: ["Vue.js", "Tailwind CSS", "Firebase", "Axios"],
          category: "Web Development",
          demoLink: "https://smart-brain-dev.netlify.app/",
          codeLink: "https://github.com/muheeeeez/Smartbrain-Frontend",
        },
        {
          title: "Weather App",
          description: "Real-time Weather Chrome Extension",
          image: weatherApp,
          technologies: [
            "Vue.js",
            "Tailwind CSS",
            "Chrome API",
            "OpenWeather API",
          ],
          category: "Chrome Extension",
          demoLink:
            "https://chromewebstore.google.com/detail/weather-app/gmhpmnpccmpioibfpgjjcnmcgdbdkkmi",
          codeLink: "https://github.com/muheeeeez/WeatherAppChromeExtention",
        },
        {
          title: "DE Gentlesoul Global",
          description: "Travel and education agency website",
          image: deGentlesoul,
          technologies: ["Vue.js", "Google Analytics", "Calendly"],
          category: "Web Development",
          demoLink: "https://degentlesoulresources.info/",
          codeLink: "https://github.com/muheeeeez/Gentlesoul_Global",
        },
        {
          title: "Blog Platform",
          description: "Full-featured blog platform with user authentication",
          image: blogPlatform,
          technologies: ["HTML5", "CSS3", "PHP", "MySQL", "JavaScript"],
          category: "Web Development",
          demoLink: "https://blogplatform.kesug.com/",
          codeLink: "https://github.com/BlogSystemProject/BlogSystem",
        },
        {
          title: "DotNotation",
          description: "Educational platform for programming courses",
          image: dotNotation,
          technologies: ["HTML5", "CSS3", "Font Awesome"],
          category: "Web Design",
          demoLink: "https://dotnotation.netlify.app/",
          codeLink: "https://github.com/muheeeeez/Dotnotation-Website",
        },
        {
          title: "Tullips",
          description: "Modern, interactive website design",
          image: tullips,
          technologies: ["Vue.js"],
          category: "Web Design",
          demoLink: "https://tullipsweb.netlify.app/",
          codeLink: "https://github.com/muheeeeez/Tulllips-Website",
        },
        {
          title: "Art.NFT",
          description: "Blockchain-themed web application",
          image: artNFT,
          technologies: ["Vue.js", "Font Awesome"],
          category: "Web Design",
          demoLink: "https://artnftblockchain.netlify.app/",
          codeLink: "https://github.com/muheeeeez/Blockchain",
        },
      ],
    };
  },
  computed: {
    filteredProjects() {
      if (this.selectedCategory === "all") {
        return this.projects;
      }
      return this.projects.filter((p) => p.category === this.selectedCategory);
    },
  },
};
</script>

<style scoped>
.toolbar-btn {
  @apply p-2 text-macos-dark-text-secondary hover:text-macos-dark-text hover:bg-macos-dark-border rounded transition-all duration-200 hover:scale-110;
}

.toolbar-btn:active {
  @apply scale-95;
}

.project-card-grid {
  @apply bg-macos-dark-sidebar border border-macos-dark-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 hover:shadow-xl;
}

.project-card-grid:active {
  @apply scale-100 translate-y-0;
}

.project-card-list {
  @apply flex items-start gap-4 p-4 hover:bg-macos-dark-sidebar transition-all duration-200 cursor-pointer hover:scale-102;
}

.project-card-list:active {
  @apply scale-100;
}

.btn-link {
  @apply p-2 bg-macos-dark-sidebar border border-macos-dark-border rounded text-macos-dark-text hover:border-primary transition-all duration-200 flex items-center justify-center hover:scale-110;
}

.btn-link:active {
  @apply scale-95;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

