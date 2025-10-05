<template>
  <div class="terminal h-full flex flex-col bg-black text-green-400 font-mono">
    <!-- Terminal Output -->
    <div class="flex-1 overflow-auto p-4 text-sm" ref="terminalOutput">
      <div
        v-for="(line, index) in terminalLines"
        :key="index"
        class="terminal-line"
      >
        <span v-html="line"></span>
      </div>

      <!-- Input Line -->
      <div class="flex items-center">
        <span class="text-primary mr-2">abdul@portfolio</span>
        <span class="text-white mr-2">~</span>
        <span class="text-primary mr-2">$</span>
        <input
          ref="terminalInput"
          v-model="currentCommand"
          @keydown.enter="executeCommand"
          @keydown.tab.prevent="handleTab"
          @keydown.up.prevent="navigateHistory('up')"
          @keydown.down.prevent="navigateHistory('down')"
          class="flex-1 bg-transparent outline-none text-green-400"
          autofocus
        />
        <span class="terminal-cursor">█</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TerminalWindow",
  data() {
    return {
      currentCommand: "",
      commandHistory: [],
      historyIndex: -1,
      terminalLines: [
        '<span class="text-blue-400">╔══════════════════════════════════════════════════════════╗</span>',
        '<span class="text-blue-400">║</span>  <span class="text-white font-bold">Welcome to Abdul-muiz\'s Interactive Terminal</span>      <span class="text-blue-400">║</span>',
        '<span class="text-blue-400">╚══════════════════════════════════════════════════════════╝</span>',
        "",
        "<span class=\"text-yellow-400\">Type 'help' to see available commands</span>",
        "",
      ],
      availableCommands: {
        help: "Display all available commands",
        about: "Display information about me",
        skills: "List my technical skills",
        contact: "Show contact information",
        projects: "List my projects",
        social: "Show social media links",
        email: "Send me an email",
        resume: "Download my resume",
        clear: "Clear the terminal",
        neofetch: "Display system information",
      },
    };
  },
  mounted() {
    this.$refs.terminalInput.focus();
  },
  methods: {
    executeCommand() {
      const cmd = this.currentCommand.trim().toLowerCase();

      if (!cmd) return;

      // Add command to output
      this.terminalLines.push(
        `<span class="text-primary">abdul@portfolio</span> <span class="text-white">~</span> <span class="text-primary">$</span> ${this.currentCommand}`
      );

      // Add to history
      this.commandHistory.push(this.currentCommand);
      this.historyIndex = this.commandHistory.length;

      // Execute command
      this.processCommand(cmd);

      // Clear input
      this.currentCommand = "";

      // Scroll to bottom
      this.$nextTick(() => {
        this.$refs.terminalOutput.scrollTop =
          this.$refs.terminalOutput.scrollHeight;
      });
    },

    processCommand(cmd) {
      const commands = cmd.split(" ");
      const mainCmd = commands[0];

      switch (mainCmd) {
        case "help":
          this.terminalLines.push(
            '<span class="text-white font-bold">Available Commands:</span>'
          );
          Object.entries(this.availableCommands).forEach(([cmd, desc]) => {
            this.terminalLines.push(
              `  <span class="text-primary">${cmd.padEnd(
                12
              )}</span> <span class="text-gray-400">${desc}</span>`
            );
          });
          break;

        case "about":
          this.terminalLines.push(
            '<span class="text-white font-bold">About Me:</span>'
          );
          this.terminalLines.push(
            '  Name: <span class="text-primary">Abdul-muiz Olaleye</span>'
          );
          this.terminalLines.push(
            '  Role: <span class="text-primary">Full Stack Developer</span>'
          );
          this.terminalLines.push(
            '  Location: <span class="text-primary">Ottawa, Canada</span>'
          );
          this.terminalLines.push(
            '  Education: <span class="text-primary">Computer Programming (Algonquin College)</span>'
          );
          this.terminalLines.push(
            '  GPA: <span class="text-primary">3.94</span>'
          );
          break;

        case "skills":
          this.terminalLines.push(
            '<span class="text-white font-bold">Technical Skills:</span>'
          );
          this.terminalLines.push(
            '  Frontend: <span class="text-primary">Vue.js, React Native, TypeScript, Tailwind CSS</span>'
          );
          this.terminalLines.push(
            '  Backend: <span class="text-primary">Python, Node.js, FastAPI, Java, PHP</span>'
          );
          this.terminalLines.push(
            '  Database: <span class="text-primary">MySQL, MongoDB, PostgreSQL, Firebase</span>'
          );
          this.terminalLines.push(
            '  DevOps: <span class="text-primary">Git, GitHub, AWS, Docker</span>'
          );
          break;

        case "contact":
          this.terminalLines.push(
            '<span class="text-white font-bold">Contact Information:</span>'
          );
          this.terminalLines.push(
            '  Email: <a href="mailto:abdulmuiz.olatunbosun@gmail.com" class="text-primary underline">abdulmuiz.olatunbosun@gmail.com</a>'
          );
          this.terminalLines.push(
            '  Phone: <span class="text-primary">+1 (753) 886-1887</span>'
          );
          this.terminalLines.push(
            '  GitHub: <a href="https://github.com/muheeeeez" target="_blank" class="text-primary underline">muheeeeez</a>'
          );
          this.terminalLines.push(
            '  LinkedIn: <a href="https://www.linkedin.com/in/abdul-muiz-olaleye/" target="_blank" class="text-primary underline">abdul-muiz-olaleye</a>'
          );
          break;

        case "projects":
          this.terminalLines.push(
            '<span class="text-white font-bold">Featured Projects:</span>'
          );
          this.terminalLines.push(
            '  1. <span class="text-primary">ClauseGuard</span> - AI-Powered Contract Analysis Platform'
          );
          this.terminalLines.push(
            '  2. <span class="text-primary">QuizMakerAI</span> - Educational Assessment Platform'
          );
          this.terminalLines.push(
            '  3. <span class="text-primary">HelpMeOut</span> - Screen Recording Web Application'
          );
          this.terminalLines.push(
            '  4. <span class="text-primary">SmartBrain</span> - AI Face Detection App'
          );
          break;

        case "social":
          this.terminalLines.push(
            '<span class="text-white font-bold">Social Media:</span>'
          );
          this.terminalLines.push(
            '  GitHub: <a href="https://github.com/muheeeeez" target="_blank" class="text-primary underline">https://github.com/muheeeeez</a>'
          );
          this.terminalLines.push(
            '  LinkedIn: <a href="https://www.linkedin.com/in/abdul-muiz-olaleye/" target="_blank" class="text-primary underline">https://www.linkedin.com/in/abdul-muiz-olaleye/</a>'
          );
          this.terminalLines.push(
            '  Twitter: <a href="https://twitter.com/IAmMuizOlaleye" target="_blank" class="text-primary underline">https://twitter.com/IAmMuizOlaleye</a>'
          );
          break;

        case "email":
          window.location.href = "mailto:abdulmuiz.olatunbosun@gmail.com";
          this.terminalLines.push(
            '<span class="text-green-400">Opening email client...</span>'
          );
          break;

        case "resume":
          this.downloadResume();
          this.terminalLines.push(
            '<span class="text-green-400">Downloading resume...</span>'
          );
          break;

        case "clear":
          this.terminalLines = [];
          break;

        case "neofetch":
          this.terminalLines.push(
            '                  <span class="text-primary">          abdul@portfolio</span>'
          );
          this.terminalLines.push(
            '    <span class="text-primary">███████</span>       <span class="text-primary">     -------------------</span>'
          );
          this.terminalLines.push(
            '  <span class="text-primary">████████████</span>     <span class="text-white">OS:</span> <span class="text-gray-400">Portfolio v1.0</span>'
          );
          this.terminalLines.push(
            ' <span class="text-primary">█████████████</span>     <span class="text-white">Host:</span> <span class="text-gray-400">Full Stack Developer</span>'
          );
          this.terminalLines.push(
            ' <span class="text-primary">█████████████</span>     <span class="text-white">Kernel:</span> <span class="text-gray-400">Vue.js 3.3.4</span>'
          );
          this.terminalLines.push(
            '  <span class="text-primary">████████████</span>     <span class="text-white">Uptime:</span> <span class="text-gray-400">2+ years coding</span>'
          );
          this.terminalLines.push(
            '    <span class="text-primary">███████</span>       <span class="text-white">Shell:</span> <span class="text-gray-400">zsh, bash</span>'
          );
          this.terminalLines.push(
            '                  <span class="text-white">Terminal:</span> <span class="text-gray-400">VS Code</span>'
          );
          this.terminalLines.push(
            '                  <span class="text-white">CPU:</span> <span class="text-gray-400">Problem Solver</span>'
          );
          this.terminalLines.push(
            '                  <span class="text-white">GPU:</span> <span class="text-gray-400">Creative Thinker</span>'
          );
          this.terminalLines.push(
            '                  <span class="text-white">Memory:</span> <span class="text-gray-400">230+ GitHub contributions</span>'
          );
          break;

        default:
          this.terminalLines.push(
            `<span class="text-red-400">Command not found: ${cmd}</span>`
          );
          this.terminalLines.push(
            "<span class=\"text-yellow-400\">Type 'help' to see available commands</span>"
          );
      }

      this.terminalLines.push("");
    },

    handleTab() {
      const partial = this.currentCommand.toLowerCase();
      const matches = Object.keys(this.availableCommands).filter((cmd) =>
        cmd.startsWith(partial)
      );

      if (matches.length === 1) {
        this.currentCommand = matches[0];
      } else if (matches.length > 1) {
        this.terminalLines.push(
          `<span class="text-primary">abdul@portfolio</span> <span class="text-white">~</span> <span class="text-primary">$</span> ${this.currentCommand}`
        );
        this.terminalLines.push(matches.join("  "));
        this.terminalLines.push("");
      }
    },

    navigateHistory(direction) {
      if (direction === "up" && this.historyIndex > 0) {
        this.historyIndex--;
        this.currentCommand = this.commandHistory[this.historyIndex];
      } else if (
        direction === "down" &&
        this.historyIndex < this.commandHistory.length - 1
      ) {
        this.historyIndex++;
        this.currentCommand = this.commandHistory[this.historyIndex];
      } else if (
        direction === "down" &&
        this.historyIndex === this.commandHistory.length - 1
      ) {
        this.historyIndex = this.commandHistory.length;
        this.currentCommand = "";
      }
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
.terminal-line {
  @apply mb-1;
}

input {
  font-family: inherit;
  font-size: inherit;
}
</style>

