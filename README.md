# Nova — DSA Interview Prep

A personal DSA prep app with an AI-powered chatbot, structured roadmap, streak tracking, and review queue.

**Live demo:** https://algoforge-bi85.onrender.com

---

## Features

- **Roadmap** — 17 topics across 3 phases (Foundation → Intermediate → Advanced), each with curated LeetCode + TUF problem links
- **AI Tutor** — Gemini-powered chatbot for hints, explanations, and mock interview practice
- **Progress tracking** — per-topic completion percentage and daily streak
- **Review queue** — mark problems for later review with the 📌 button
- **Light/dark mode**

---

## Getting Started (Live App)

1. Open the [live app](https://algoforge-bi85.onrender.com)
2. Complete the short onboarding chat — the AI will ask about your experience level and set up your profile
3. You'll land on the **Dashboard** with your roadmap and progress
4. Click any topic to start a session, solve problems, and chat with the AI tutor
5. Your progress is saved automatically

> **Note:** The app is hosted on Render's free tier — it may take ~30 seconds to wake up if it hasn't been used recently.

---

## Running Locally

**Prerequisites:** Java 17, Maven

```bash
git clone https://github.com/amrita4250/Algoforge.git
cd Algoforge
```

Add your API key to `src/main/resources/application.properties`:
```properties
gemini.api.key=YOUR_GEMINI_API_KEY
```

```bash
mvn spring-boot:run
```

App runs at `http://localhost:8082`

---

## Tech Stack

- **Backend:** Java 17, Spring Boot 3
- **Frontend:** Vanilla JS, HTML, CSS
- **AI:** Google Gemini API
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Render
