<template>
  <div class="code-window h-full flex bg-vscode-bg">
    <!-- Sidebar -->
    <div
      class="w-12 bg-vscode-sidebar flex flex-col items-center py-4 gap-4 border-r border-vscode-border"
    >
      <div
        v-for="tab in sideTabs"
        :key="tab.id"
        class="sidebar-icon"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
        :title="tab.name"
      >
        <span class="text-xl">{{ tab.icon }}</span>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Tab Bar -->
      <div
        class="flex items-center bg-vscode-sidebar border-b border-vscode-border"
      >
        <div
          v-for="file in openFiles"
          :key="file.id"
          class="vscode-tab"
          :class="{ active: currentFile === file.id }"
          @click="currentFile = file.id"
        >
          <span class="text-lg">{{ file.icon }}</span>
          <span>{{ file.name }}</span>
        </div>
      </div>

      <!-- Editor Content -->
      <div
        class="flex-1 overflow-auto font-mono text-sm p-6"
        style="font-size: 13px; line-height: 1.6"
      >
        <!-- Frontend Skills -->
        <div v-if="currentFile === 'frontend'">
          <div class="code-line">
            <span class="text-vscode-purple">const</span>
            <span class="text-vscode-blue"> frontendSkills</span>
            <span class="text-white"> = {</span>
          </div>
          <div
            v-for="(skill, index) in frontendSkills"
            :key="index"
            class="code-line ml-4"
          >
            <span class="text-vscode-green">"{{ skill.name }}"</span>
            <span class="text-white">: </span>
            <span class="text-vscode-orange">"{{ skill.level }}%"</span>
            <span class="text-white" v-if="index < frontendSkills.length - 1"
              >,</span
            >
            <span class="text-macos-dark-text-secondary ml-4"
              >// {{ skill.description }}</span
            >
          </div>
          <div class="code-line"><span class="text-white">};</span></div>
        </div>

        <!-- Backend Skills -->
        <div v-if="currentFile === 'backend'">
          <div class="code-line">
            <span class="text-vscode-purple">interface</span>
            <span class="text-vscode-yellow"> BackendSkills</span>
            <span class="text-white"> {</span>
          </div>
          <div
            v-for="(skill, index) in backendSkills"
            :key="index"
            class="code-line ml-4"
          >
            <span class="text-vscode-blue">{{ skill.name }}</span>
            <span class="text-white">: </span>
            <span class="text-vscode-green">"{{ skill.level }}%"</span>
            <span class="text-white">;</span>
            <span class="text-macos-dark-text-secondary ml-4"
              >// {{ skill.description }}</span
            >
          </div>
          <div class="code-line"><span class="text-white">}</span></div>
        </div>

        <!-- Database Skills -->
        <div v-if="currentFile === 'database'">
          <div class="code-line">
            <span class="text-vscode-purple">class</span>
            <span class="text-vscode-yellow"> DatabaseExpertise</span>
            <span class="text-white"> {</span>
          </div>
          <div
            v-for="(skill, index) in databaseSkills"
            :key="index"
            class="code-line ml-4"
          >
            <span class="text-vscode-blue">{{ skill.name }}</span>
            <span class="text-white">(): </span>
            <span class="text-vscode-green">Proficiency</span>
            <span class="text-white"> {</span>
          </div>
          <div
            v-for="(skill, index) in databaseSkills"
            :key="'impl-' + index"
            class="code-line ml-8"
          >
            <span class="text-vscode-purple">return</span>
            <span class="text-white"> { </span>
            <span class="text-vscode-blue">level</span>
            <span class="text-white">: </span>
            <span class="text-vscode-orange">"{{ skill.level }}%"</span>
            <span class="text-white"> };</span>
          </div>
          <div class="code-line ml-4"><span class="text-white">}</span></div>
          <div class="code-line"><span class="text-white">}</span></div>
        </div>

        <!-- Cloud Skills -->
        <div v-if="currentFile === 'cloud'">
          <div class="code-line">
            <span class="text-vscode-purple">const</span>
            <span class="text-vscode-blue"> cloudServices</span>
            <span class="text-white"> = {</span>
          </div>
          <div
            v-for="(service, index) in cloudSkills"
            :key="index"
            class="code-line ml-4"
          >
            <span class="text-vscode-green">"{{ service.name }}"</span>
            <span class="text-white">: </span>
            <span class="text-vscode-orange">"{{ service.level }}%"</span>
            <span class="text-white" v-if="index < cloudSkills.length - 1"
              >,</span
            >
            <span class="text-macos-dark-text-secondary ml-4" v-if="service.description"
              >// {{ service.description }}</span
            >
          </div>
          <div class="code-line"><span class="text-white">};</span></div>
        </div>

        <!-- DevOps -->
        <div v-if="currentFile === 'devops'">
          <div class="code-line">
            <span class="text-vscode-purple">export</span>
            <span class="text-vscode-purple"> const</span>
            <span class="text-vscode-blue"> devOpsTools</span>
            <span class="text-white"> = [</span>
          </div>
          <div
            v-for="(tool, index) in devOpsTools"
            :key="index"
            class="code-line ml-4"
          >
            <span class="text-white">{</span>
          </div>
          <div
            v-for="(tool, index) in devOpsTools"
            :key="'tool-' + index"
            class="code-line ml-8"
          >
            <span class="text-vscode-green">tool</span>
            <span class="text-white">: </span>
            <span class="text-vscode-orange">"{{ tool.name }}"</span>
            <span class="text-white">,</span>
          </div>
          <div
            v-for="(tool, index) in devOpsTools"
            :key="'exp-' + index"
            class="code-line ml-8"
          >
            <span class="text-vscode-green">experience</span>
            <span class="text-white">: </span>
            <span class="text-vscode-orange">"{{ tool.level }}%"</span>
          </div>
          <div
            v-for="(tool, index) in devOpsTools"
            :key="'close-' + index"
            class="code-line ml-4"
          >
            <span class="text-white">}</span>
            <span class="text-white" v-if="index < devOpsTools.length - 1"
              >,</span
            >
          </div>
          <div class="code-line"><span class="text-white">];</span></div>
        </div>
      </div>

      <!-- Status Bar -->
      <div
        class="flex items-center justify-between px-4 py-1 bg-primary text-white text-xs"
      >
        <div class="flex items-center gap-4">
          <span>⚡ Abdul-muiz Olaleye</span>
          <span>UTF-8</span>
          <span>JavaScript</span>
        </div>
        <div class="flex items-center gap-4">
          <span
            >Ln {{ Math.floor(Math.random() * 50) + 1 }}, Col
            {{ Math.floor(Math.random() * 20) + 1 }}</span
          >
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeWindow",
  data() {
    return {
      activeTab: "files",
      currentFile: "frontend",
      sideTabs: [
        { id: "files", name: "Explorer", icon: "📁" },
        { id: "search", name: "Search", icon: "🔍" },
        { id: "git", name: "Source Control", icon: "🔀" },
        { id: "extensions", name: "Extensions", icon: "⚡" },
      ],
      openFiles: [
        { id: "frontend", name: "frontend.js", icon: "📄" },
        { id: "backend", name: "backend.ts", icon: "📘" },
        { id: "database", name: "database.sql", icon: "🗄️" },
        { id: "cloud", name: "cloud.yml", icon: "☁️" },
        { id: "devops", name: "devops.yml", icon: "⚙️" },
      ],
      frontendSkills: [
        {
          name: "HTML5",
          level: 95,
          description: "Semantic markup, accessibility",
        },
        { name: "CSS3", level: 90, description: "Flexbox, Grid, animations" },
        { name: "JavaScript", level: 85, description: "ES6+, async/await" },
        { name: "TypeScript", level: 75, description: "Type-safe development" },
        { name: "Vue.js", level: 80, description: "Composition & Options API" },
        { name: "Nuxt.js", level: 75, description: "Vue.js framework" },
        {
          name: "React Native",
          level: 75,
          description: "Mobile app development",
        },
        {
          name: "Tailwind CSS",
          level: 85,
          description: "Utility-first styling",
        },
        { name: "Bootstrap", level: 80, description: "CSS framework" },
        { name: "Ionic", level: 70, description: "Cross-platform mobile" },
        { name: "Capacitor", level: 70, description: "Native runtime" },
        { name: "Flutter", level: 70, description: "Mobile framework" },
        { name: "Three.js", level: 65, description: "3D graphics library" },
      ],
      backendSkills: [
        { name: "Python", level: 85, description: "Django, Flask, FastAPI" },
        { name: "Node.js", level: 80, description: "Express, API development" },
        { name: "FastAPI", level: 80, description: "Modern async framework" },
        { name: "AWS CDK", level: 75, description: "TypeScript & Python" },
        { name: "Java", level: 75, description: "Spring Boot, OOP" },
        { name: "PHP", level: 70, description: "Laravel, WordPress" },
      ],
      databaseSkills: [
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 75 },
        { name: "Oracle", level: 70 },
        { name: "SQL Server (SSMS)", level: 70 },
        { name: "MongoDB", level: 80 },
        { name: "Firebase", level: 75 },
      ],
      cloudSkills: [
        { name: "EC2", level: 80, description: "Compute instances" },
        { name: "Lambda", level: 80, description: "Serverless functions" },
        { name: "API Gateway", level: 75, description: "API management" },
        { name: "S3", level: 85, description: "Object storage" },
        { name: "DynamoDB", level: 75, description: "NoSQL database" },
        { name: "RDS", level: 75, description: "Relational database" },
        { name: "Aurora", level: 70, description: "Managed database" },
        { name: "CloudWatch", level: 75, description: "Monitoring & logging" },
        { name: "EventBridge", level: 70, description: "Event bus" },
        { name: "Systems Manager (SSM)", level: 70, description: "Operations management" },
        { name: "SNS", level: 70, description: "Notifications" },
        { name: "IAM", level: 80, description: "Identity & access" },
        { name: "KMS", level: 70, description: "Key management" },
        { name: "Textract", level: 70, description: "Document analysis" },
        { name: "Bedrock", level: 70, description: "AI foundation models" },
        { name: "Google Firebase", level: 75, description: "Backend platform" },
      ],
      devOpsTools: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 85 },
        { name: "GitHub Actions", level: 75 },
        { name: "Render", level: 70 },
        { name: "Netlify", level: 75 },
        { name: "Linux CLI", level: 80 },
        { name: "VS Code", level: 95 },
        { name: "Cursor", level: 85 },
        { name: "Eclipse", level: 70 },
        { name: "Android Studio", level: 75 },
        { name: "PyCharm", level: 75 },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar-icon {
  @apply p-2 cursor-pointer text-macos-dark-text-secondary hover:text-white transition-colors rounded;
}

.sidebar-icon.active {
  @apply text-white bg-vscode-editor;
}

.code-line {
  @apply py-0.5;
}
</style>

