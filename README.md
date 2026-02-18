# Seven Bit News - Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-Visualization-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![D3.js](https://img.shields.io/badge/D3.js-Data_Visualization-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)](https://d3js.org/)

**An intelligent news aggregation and analysis platform with interactive data visualizations**

</div>

---

## Demo Video

<div align="center">

### Watch Seven Bit News in Action

*90-second walkthrough showcasing AI-powered chat, interactive visualizations, sentiment analysis, and trending news features*

</div>

https://github.com/user-attachments/assets/278aedf5-d297-405e-ad81-54c5388b7eb2

<div align="center">

*Experience the full power of AI-driven news analysis, interactive charts, sentiment tracking, and real-time trending topics*

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Backend Integration](#backend-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Roadmap](#roadmap)

---

## About the Project

**Seven Bit News** is a modern web application that aggregates news from multiple sources across the political spectrum, analyzes sentiment, identifies trends, and presents data through interactive visualizations. Users can explore news topics through an AI-powered chat interface backed by Gemini File Search (RAG), and gain insights through various data representations including word clouds, sentiment charts, geographic distributions, and network graphs.

### Key Highlights

- **AI-Powered Chat Interface** — Conversational news exploration using Gemini with retrieval-augmented generation (RAG) via File Search
- **Interactive Visualizations** — Word clouds, sentiment analysis, geographic distributions, source breakdowns, and network graphs
- **Trending News Tracking** — Real-time trending topics and stories from major outlets
- **Firebase Authentication** — Secure user authentication with Google Sign-In
- **Responsive Design** — Works across desktop, tablet, and mobile devices
- **Markdown-Rendered AI Responses** — Rich formatting with source citations and hyperlinks

---

## Features

### Core Features

- **Interactive Chat Interface**
  - Natural language queries about any news topic
  - Context-aware follow-up responses with full chat history
  - Markdown-rendered AI output with source citations
  - Retry logic for API resilience

- **Data Visualizations**
  - **Word Cloud** — Key terms and topics sized by frequency
  - **Sentiment Analysis** — Bar charts showing positive/negative sentiment distribution per article
  - **Source Distribution** — Pie charts showing the breakdown of left-leaning, centrist, and right-leaning sources
  - **Geographic Distribution** — Interactive map showing where news events are occurring
  - **Network Graphs** — Relationship visualization between topics and entities
  - **Article Tables** — Detailed article listings with links, sources, and sentiment metadata

- **Trending News**
  - Real-time trending topics from major outlets
  - Quick-access cards to start a topic session

- **User Authentication**
  - Google Sign-In via Firebase
  - Per-user session management on the backend

- **Tutorial System**
  - Interactive onboarding walkthrough
  - Feature explanations for new users

---

## Tech Stack

### Core Technologies

- **[React](https://reactjs.org/)** (v18.3.1) — Frontend framework
- **[React Router](https://reactrouter.com/)** (v7.0.1) — Client-side routing
- **[Firebase](https://firebase.google.com/)** (v11.0.2) — Authentication and analytics
- **[React Markdown](https://github.com/remarkjs/react-markdown)** (v10.1.0) — Markdown rendering for AI responses

### Data Visualization Libraries

- **[Chart.js](https://www.chartjs.org/)** (v4.4.7) — Chart components
- **[React-Chartjs-2](https://react-chartjs-2.js.org/)** (v5.3.0) — React wrapper for Chart.js
- **[D3.js](https://d3js.org/)** (v7.9.0) — Data-driven visualizations
- **[D3-Cloud](https://github.com/jasondavies/d3-cloud)** (v1.2.7) — Word cloud generation
- **[Recharts](https://recharts.org/)** (v2.15.1) — Declarative charts
- **[React Force Graph](https://github.com/vasturiano/react-force-graph)** (v1.27.0) — Network graphs
- **[React Simple Maps](https://www.react-simple-maps.io/)** (v3.0.0) — Geographic visualizations
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** (v8.17.10) — 3D graphics (Three.js)

### UI/UX Libraries

- **[React Helmet](https://github.com/nfl/react-helmet)** (v6.1.0) — Document head management
- **[React Tooltip](https://github.com/wwayne/react-tooltip)** (v4.2.21) — Tooltip components

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) — [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) — Comes with Node.js
- **Git** — [Download](https://git-scm.com/)

You'll also need:

- A **Firebase project** with Google Authentication enabled
- The **Seven Bit News Backend** running (see [Backend Integration](#backend-integration))

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/seven_bit_news_frontend.git
cd seven_bit_news_frontend
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> Get these values from your [Firebase Console](https://console.firebase.google.com/) > Project Settings > Your apps > Firebase SDK snippet

### 3. Install Dependencies

```bash
npm install
```

### 4. Update Browser Compatibility Data (Optional)

If you see a browserslist warning:

```bash
npx update-browserslist-db@latest
```

---

## Running Locally

### Prerequisites: Backend Must Be Running

> **Important**: The frontend requires the Seven Bit News Backend to be running for full functionality. Without the backend, the application will not be able to fetch news data or process chat queries.

**Backend Setup:**
1. Navigate to the backend directory: `seven_bit_news_digital_ocean_backend`
2. Follow the backend README for setup instructions
3. Ensure the backend is running on `http://localhost:8000`

### Start the Development Server

```bash
npm start
```

This will:
- Start the React development server
- Open your browser to `http://localhost:3000`
- Enable hot-reloading for automatic refresh on code changes

### Development vs Production Mode

The application automatically detects the environment:

- **Development**: Uses `http://127.0.0.1:8000` for API calls (local backend)
- **Production**: Uses `https://seven-bit-news-api.com` (production backend)

This is configured in `src/config.js`:

```javascript
const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;
```

---

## Deployment

### Frontend Deployment (Vercel — Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel
```

Alternatively, connect your GitHub repository via the [Vercel Dashboard](https://vercel.com/dashboard) for automatic deploys on push.

Other supported platforms include Google Cloud App Engine (via the included `app.yaml`), Netlify, and Docker.

### Backend Deployment

The link to the public backend GitHub repository will be available soon. In the meantime, refer to the backend README in `seven_bit_news_digital_ocean_backend` for local setup instructions.

---

## Project Structure

```
seven_bit_news_frontend/
├── public/
│   └── index.html                  # HTML template
├── src/
│   ├── assets/                     # Static assets (images, media)
│   ├── components/
│   │   ├── ArticleTable.js         # Article list with sentiment metadata
│   │   ├── Footer.js               # Footer component
│   │   ├── LocationChart.js        # Geographic distribution map
│   │   ├── MessageForm.js          # Chat input form
│   │   ├── NetworkGraph.js         # Entity/topic network graph
│   │   ├── SentimentBarChart.js    # Sentiment analysis bar chart
│   │   ├── SignIn.js               # Google Sign-In
│   │   ├── SignOut.js              # Sign out
│   │   ├── SourcesPieChart.js      # News source distribution pie chart
│   │   ├── TrendingNews.js         # Trending topics display
│   │   ├── TrendingNewsMenu.js     # Trending news navigation
│   │   ├── TutorialContent.js      # Tutorial walkthrough content
│   │   ├── TutorialMenu.js         # Tutorial navigation
│   │   └── WordCloud.js            # Word frequency cloud
│   ├── App.js                      # Main application component
│   ├── App.css                     # Application styles
│   ├── config.js                   # API endpoint configuration
│   ├── firebase.js                 # Firebase initialization
│   └── index.js                    # Application entry point
├── .env.example                    # Environment variable template
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

---

## Environment Configuration

### API Configuration

Edit `src/config.js` to update API endpoints:

```javascript
const PROD_URL = "https://your-backend-domain.com";
const DEV_URL = "http://127.0.0.1:8000";

const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;

export const API_ENDPOINTS = {
  chat: `${BASE_URL}/api/chat`,
  topic: `${BASE_URL}/api/topic`,
  trending: `${BASE_URL}/api/trending`,
  reset: `${BASE_URL}/api/reset`,
};
```

### Firebase Configuration

The Firebase configuration is in `src/firebase.js`. The API keys are safe to be public — Firebase security is enforced through Authentication Rules, Firestore Security Rules, and Firebase App Check (recommended for production).

To use your own Firebase project:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication
3. Copy your Firebase config
4. Update `src/firebase.js` with your credentials

---

## Available Scripts

### `npm start`

Runs the app in development mode at `http://localhost:3000` with hot-reloading.

### `npm run build`

Builds the app for production to the `build` folder. Optimizes, bundles, and minifies code for deployment.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run eject`

**Warning: This is a one-way operation.** Ejects from Create React App, giving full control over configuration files.

---

## Backend Integration

### Required Backend Endpoints

The frontend expects the following API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/topic` | POST | Fetch and analyze news articles for a topic |
| `/api/chat` | POST | Send a chat message and receive an AI response |
| `/api/trending` | GET | Get current trending news topics |
| `/api/reset` | POST | Reset user session and chat history |
| `/healthz` | GET | Health check endpoint |

### API Request Formats

**Topic Request:**
```json
{
  "topic": "artificial intelligence",
  "user_id": "user_abc123"
}
```

**Chat Request:**
```json
{
  "message": "What are the key developments?",
  "user_id": "user_abc123",
  "chat_history": [
    {"role": "assistant", "content": "Previous AI response"},
    {"role": "user", "content": "Previous user message"}
  ]
}
```

### Backend Repository

The link to the public backend repository will be available soon. For local development, see the `seven_bit_news_digital_ocean_backend` directory.

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Module Not Found Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

```bash
npm cache clean --force
rm -rf node_modules build
npm install
npm run build
```

### API Connection Issues

- Verify the backend is running on `http://localhost:8000`
- Check `src/config.js` for the correct API URL
- Check the browser console for CORS errors
- Verify backend CORS configuration allows `http://localhost:3000`

### Firebase Authentication Issues

- Verify Firebase project configuration in `.env`
- Check that Google Sign-In is enabled in Firebase Console
- Verify authorized domains in Firebase Console
- Check the browser console for Firebase errors

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### Coding Standards

- Use functional React components with hooks
- Follow the existing ESLint configuration
- Write meaningful commit messages
- Test your changes before committing

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Roadmap

- [ ] Dark mode support
- [ ] User preferences and settings
- [ ] Additional visualization types
- [ ] Real-time notifications for trending topics
- [ ] Export data functionality
- [ ] Advanced filtering and search
- [ ] Multi-language support

---

<div align="center">

**Built with React and modern web technologies**

</div>
