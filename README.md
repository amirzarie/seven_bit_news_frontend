# 🌐 Seven Bit News - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-Visualization-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-Data_Visualization-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)

**An intelligent news aggregation and analysis platform with interactive data visualizations**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

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
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About the Project

**Seven Bit News** is a modern web application that aggregates news from multiple sources, analyzes sentiment, identifies trends, and presents data through interactive visualizations. Users can explore news topics through an AI-powered chat interface and gain insights through various data representations including word clouds, sentiment charts, geographic distributions, and network graphs.

### Key Highlights

- 🤖 **AI-Powered Chat Interface**: Conversational news exploration using natural language
- 📊 **Interactive Visualizations**: Word clouds, sentiment analysis, geographic distributions, and network graphs
- 🔥 **Trending News Tracking**: Real-time trending topics and stories
- 🔐 **Firebase Authentication**: Secure user authentication with Google Sign-In
- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX**: Clean, intuitive interface with smooth animations

---

## ✨ Features

### Core Features

- **🗨️ Interactive Chat Interface**
  - Natural language queries about news topics
  - Context-aware responses
  - Chat history management
  - Real-time message streaming

- **📈 Data Visualizations**
  - **Word Cloud**: Visualize key terms and topics
  - **Sentiment Analysis**: Bar charts showing positive/negative sentiment distribution
  - **Source Distribution**: Pie charts showing news source breakdown
  - **Geographic Distribution**: Interactive maps showing news locations
  - **Network Graphs**: Relationship visualization between topics and entities
  - **Article Tables**: Detailed article listings with links and metadata

- **🔥 Trending News**
  - Real-time trending topics
  - Quick access to popular stories
  - Category-based filtering

- **🔐 User Authentication**
  - Google Sign-In integration
  - Personalized user experience
  - Session management

- **📚 Tutorial System**
  - Interactive onboarding
  - Feature explanations
  - Guided user experience

---

## 🛠️ Tech Stack

### Core Technologies

- **[React](https://reactjs.org/)** (v18.3.1) - Frontend framework
- **[React Router](https://reactrouter.com/)** (v7.0.1) - Client-side routing
- **[Firebase](https://firebase.google.com/)** (v11.0.2) - Authentication & Analytics

### Data Visualization Libraries

- **[Chart.js](https://www.chartjs.org/)** (v4.4.7) - Chart components
- **[React-Chartjs-2](https://react-chartjs-2.js.org/)** (v5.3.0) - React wrapper for Chart.js
- **[D3.js](https://d3js.org/)** (v7.9.0) - Data-driven visualizations
- **[D3-Cloud](https://github.com/jasondavies/d3-cloud)** (v1.2.7) - Word cloud generation
- **[Recharts](https://recharts.org/)** (v2.15.1) - Declarative charts
- **[React Force Graph](https://github.com/vasturiano/react-force-graph)** (v1.27.0) - Network graphs
- **[React Simple Maps](https://www.react-simple-maps.io/)** (v3.0.0) - Geographic visualizations
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** (v8.17.10) - 3D graphics (Three.js)

### UI/UX Libraries

- **[React Helmet](https://github.com/nfl/react-helmet)** (v6.1.0) - Document head management
- **[React Tooltip](https://github.com/wwayne/react-tooltip)** (v4.2.21) - Tooltip components

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

You'll also need:

- A **Firebase project** with Google Authentication enabled
- The **Seven Bit News Backend** running (see Backend Setup section)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/seven_bit_news_frontend.git
cd seven_bit_news_frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Update Browser Compatibility Data (Optional)

If you see a browserslist warning, update it:

```bash
npx update-browserslist-db@latest
```

---

## 🏃 Running Locally

### Prerequisites: Backend Must Be Running

> ⚠️ **IMPORTANT**: The frontend requires the **Seven Bit News Backend** to be running for full functionality. Without the backend, the application will not be able to fetch news data or process chat queries.

**Backend Setup Instructions:**
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
- Enable hot-reloading (automatic refresh on code changes)

### Development vs Production Mode

The application automatically detects the environment:

- **Development**: Uses `http://127.0.0.1:8000` for API calls (local backend)
- **Production**: Uses `https://seven-bit-news-api.com` (production backend)

This is configured in `src/config.js`:

```javascript
const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;
```

---

## 🚢 Deployment

### Option 1: Google Cloud Platform (App Engine)

The project includes an `app.yaml` configuration for GCP deployment.

#### Prerequisites

- Google Cloud SDK installed - [Install Guide](https://cloud.google.com/sdk/docs/install)
- GCP project created
- Billing enabled

#### Deployment Steps

```bash
# 1. Login to Google Cloud
gcloud auth login

# 2. Set your project
gcloud config set project YOUR_PROJECT_ID

# 3. Build the production bundle
npm run build

# 4. Deploy to App Engine
gcloud app deploy
```

The application will be deployed to: `https://YOUR_PROJECT_ID.appspot.com`

---

### Option 2: Vercel (Recommended for React Apps)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Quick Deploy

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel
```

#### GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect React and configure build settings
6. Click "Deploy"

**Environment Variables in Vercel:**
- No environment variables needed for the frontend (Firebase config is public)
- Update `src/config.js` production URL to match your backend deployment

---

### Option 3: Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

#### Quick Deploy

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the project
npm run build

# 3. Deploy
netlify deploy --prod --dir=build
```

#### GitHub Integration

1. Push your code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Click "Deploy site"

---

### Option 4: Docker Deployment

Create a `Dockerfile` in the project root:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Build and run:

```bash
docker build -t seven-bit-news-frontend .
docker run -p 3000:80 seven-bit-news-frontend
```

---

## 📁 Project Structure

```
seven_bit_news_frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── assets/                 # Static assets (images, media)
│   │   └── media/
│   │       └── canada-flag.png
│   ├── components/             # React components
│   │   ├── ArticleTable.js     # Article list display
│   │   ├── Footer.js           # Footer component
│   │   ├── LocationChart.js    # Geographic visualization
│   │   ├── MessageForm.js      # Chat input form
│   │   ├── NetworkGraph.js     # Network relationship graph
│   │   ├── SentimentBarChart.js # Sentiment analysis chart
│   │   ├── SignIn.js           # Authentication - Sign in
│   │   ├── SignOut.js          # Authentication - Sign out
│   │   ├── SourcesPieChart.js  # News sources distribution
│   │   ├── TrendingNews.js     # Trending topics display
│   │   ├── TrendingNewsMenu.js # Trending news navigation
│   │   ├── TutorialContent.js  # Tutorial content
│   │   ├── TutorialMenu.js     # Tutorial navigation
│   │   └── WordCloud.js        # Word frequency visualization
│   ├── App.js                  # Main application component
│   ├── App.css                 # Application styles
│   ├── config.js               # API configuration
│   ├── firebase.js             # Firebase configuration
│   └── index.js                # Application entry point
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

---

## ⚙️ Environment Configuration

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

The Firebase configuration is in `src/firebase.js`. The API keys shown are **safe to be public** as Firebase security is handled through:

- Firebase Authentication rules
- Firestore Security Rules
- Firebase App Check (recommended for production)

If you want to use your own Firebase project:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication
3. Copy your Firebase config
4. Update `src/firebase.js` with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};
```

---

## 📜 Available Scripts

### `npm start`

Runs the app in development mode.
- Opens browser to `http://localhost:3000`
- Hot-reloading enabled
- Development mode optimizations

### `npm run build`

Builds the app for production to the `build` folder.
- Optimizes React for best performance
- Bundles and minifies code
- Hashes filenames for caching
- Ready for deployment

### `npm test`

Launches the test runner in interactive watch mode.
- Runs Jest tests
- Interactive test mode

### `npm run eject`

**⚠️ Warning: This is a one-way operation!**

Ejects from Create React App, giving you full control over configuration files.

---

## 🔗 Backend Integration

### Required Backend Endpoints

The frontend expects the following API endpoints from the backend:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send chat messages and receive AI responses |
| `/api/topic` | POST | Fetch news articles for a specific topic |
| `/api/trending` | GET | Get current trending news topics |
| `/api/reset` | POST | Reset user session and chat history |
| `/healthz` | GET | Health check endpoint |

### API Request Format

**Chat Request:**
```json
{
  "message": "Tell me about climate change",
  "chat_history": [
    {"type": "human", "content": "Previous question"},
    {"type": "ai", "content": "Previous response"}
  ]
}
```

**Topic Request:**
```json
{
  "topic": "artificial intelligence"
}
```

### Backend Repository

**Backend Location**: `seven_bit_news_digital_ocean_backend`

Follow the backend README for:
- Backend installation
- Database setup (MongoDB)
- API key configuration
- Deployment instructions

---

## 🐛 Troubleshooting

### Common Issues

#### Port 3000 Already in Use

```bash
# Kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

#### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Fails

```bash
# Clear cache and rebuild
npm cache clean --force
rm -rf node_modules build
npm install
npm run build
```

#### API Connection Issues

- Verify backend is running on `http://localhost:8000`
- Check `src/config.js` for correct API URL
- Check browser console for CORS errors
- Verify backend CORS configuration allows `http://localhost:3000`

#### Firebase Authentication Issues

- Verify Firebase project configuration
- Check that Google Sign-In is enabled in Firebase Console
- Verify authorized domains in Firebase Console
- Check browser console for Firebase errors

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use functional React components with hooks
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before committing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) - React application framework
- [Firebase](https://firebase.google.com/) - Authentication and analytics
- [Chart.js](https://www.chartjs.org/) - Charting library
- [D3.js](https://d3js.org/) - Data visualization
- [React Router](https://reactrouter.com/) - Client-side routing
- All the amazing open-source libraries used in this project

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [Issues](https://github.com/yourusername/seven_bit_news_frontend/issues)
3. Open a new issue with detailed information

---

## 🗺️ Roadmap

- [ ] Add dark mode support
- [ ] Implement user preferences/settings
- [ ] Add more visualization types
- [ ] Mobile app version (React Native)
- [ ] Real-time notifications for trending topics
- [ ] Export data functionality
- [ ] Advanced filtering and search
- [ ] Multi-language support

---

<div align="center">

**Built with ❤️ using React and modern web technologies**

⭐ Star this repo if you find it helpful!

</div>
