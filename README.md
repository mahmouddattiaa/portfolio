# ⚡ Mahmoud Attia - Systems Engineer Portfolio

A high-performance, developer-centric portfolio built with **Next.js 14**, **Tailwind CSS v4**, and **Framer Motion**. Designed with a "Cyber/IDE" aesthetic to reflect deep systems engineering expertise.

![Portfolio Preview](public/preview.png)

## 🚀 Features

- **Cyber/IDE Aesthetic**: Dark mode (Zinc-950), Violet/Cyan accents, and JetBrains Mono/Geist Mono typography.
- **Immersive Animations**:
  - Typewriter effects.
  - Drifting background nebula (Framer Motion).
  - Infinite scrolling grid with 3D perspective.
  - Glassmorphic panels with "glow" hover effects.
- **Bento Grid Layout**: Responsive grid showcasing selected high-impact projects.
- **Interactive Details**: Custom modal system (`layoutId` transitions) for deep-diving into project architecture without leaving the page.
- **Performance First**: Server Components, optimized fonts (Geist), and zero layout shift.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Alpha/Beta features enabled)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript (Strict Mode)

## 📂 Project Structure

```bash
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global theme, variables, and animations
│   │   ├── page.tsx          # Main entry (Hero, Grid, Contact)
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── animated-background.tsx  # Drifting blobs & grid
│   │   ├── hero.tsx                 # Hero section with typewriter
│   │   ├── project-card.tsx         # Interactive bento cards
│   │   ├── project-details-modal.tsx# Framer Motion modal
│   │   ├── tech-stack.tsx           # Auto-scrolling marquee
│   │   ├── experience-timeline.tsx  # Work history
│   │   └── contact.tsx              # Footer/Contact info
│   └── lib/
│       └── data.ts           # Static data for projects/experience
```

## 🏃‍♂️ Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mahmouddattia/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🎨 Design System

- **Background**: `bg-[#09090b]` (Zinc 950)
- **Primary Accent**: `text-violet-500` (#8b5cf6)
- **Secondary Accent**: `text-cyan-400` (#22d3ee)
- **Surface**: Glassmorphism with `backdrop-filter: blur(12px)`
- **Code Font**: Geist Mono / JetBrains Mono

---

© 2026 Mahmoud Attia. Built for the web of tomorrow.
