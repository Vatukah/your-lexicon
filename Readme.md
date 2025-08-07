# 📚 YourLexicon

**YourLexicon** is a smart, AI-powered vocabulary builder that helps users explore, understand, and retain words better — all in an elegant, modern interface. Designed for learners, writers, and language lovers, it combines beautiful UI with deep learning features and real-time performance enhancements.

---

## 🚀 Features

### ✨ Core
- 📖 View definitions, translations, synonyms, and usage for any word
- 🔤 Supports multiple parts of speech (noun, verb, adjective, etc.)
- 🌐 Translate words into various languages
- 📱 Responsive and mobile-friendly design

### 🧠 AI-Powered
- 🧠 **Context-Aware Word Meanings**: Understand how a word is used in different contexts
- ✍️ **AI Sentence Generation**: Automatically generated example sentences for any word
- 📊 **Smart Recommendations**: Get AI-suggested related words and synonyms
- 🎓 **Personalized Learning**: Adaptive learning paths based on user behavior
- 🧩 **Quiz/Flashcards** (Planned): AI-generated vocabulary tests for better retention

### ⚡ Powered by Redis
- 🔁 **Word Caching**: Reduces external API calls and speeds up lookup
- 🔍 **Real-Time Search Suggestions**: Instant autocomplete using Redis
- 🧾 **Recent Searches**: User-specific search history stored in Redis
- 📈 **Trending Words**: Global leaderboard of most searched words
- 📡 **Pub/Sub Events** (Planned): Push notifications for word-of-the-day, trends, etc.

---

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS
- **Routing**: React Router v7
- **State Management**: Context API / React Query (optional)
- **AI APIs**: OpenAI / Hugging Face / LibreTranslate
- **Backend (optional)**: Node.js + Express
- **Database**: Redis (for caching, sessions, stats)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/yourlexicon.git
cd yourlexicon
npm install
npm run dev
