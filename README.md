# Flow Website V2

![Flow Logo](public/flow-icon.svg)

A stunning, high-performance landing page for **Flow**, a modern, community-driven YouTube client for Android. This website showcases the app's features, privacy-first philosophy, and technical roadmap with a premium "YouTube Red" aesthetic.

## ✨ Core Features

- **Interactive Visuals**: Neural mesh particle backgrounds (tsParticles) and glassmorphic UI components.
- **Dynamic Stats**: Real-time GitHub statistics (Stars, Forks, Contributors, etc.) fetched via an automated GitHub Action workflow to ensure the site is always up-to-date withouthitting API rate limits.
- **Advanced Animations**: Smooth scroll-triggered reveals, transformations, and responsive micro-interactions powered by Framer Motion and GSAP.
- **Mock UI Previews**: High-fidelity, interactive skeletons of the Flow Android app, including vertical video (Shorts) and adaptive music/video player modes.
- **Detailed Roadmap**: An integrated roadmap modal showcasing project progress and future milestones.
- **Fully Responsive**: Optimized for all devices, from ultra-wide monitors to mobile screens.

## 🚀 Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Particles**: [@tsparticles/react](https://particles.js.org/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/A-EDev/Flow.git
   ```

2. Navigate to the website directory:
   ```bash
   cd v2
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 🤖 GitHub Stats Workflow

The repository includes a GitHub Action located in `.github/workflows/update-stats.yml`. This workflow:
1. Runs hourly to fetch the latest repository statistics via the GitHub API.
2. Updates `public/stats.json`.
3. Commits the changes back to the repository.

The frontend consumes this local JSON file to provide high-speed, dynamic status updates without client-side API calls.

## 📜 License

This project is licensed under the **GPL v3.0 License** - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [A-EDev](https://github.com/A-EDev)
