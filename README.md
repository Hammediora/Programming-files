# 🎧 AI DJ - Intelligent Music Mixer

## 📌 Project Overview

AI DJ is an advanced music mixing application that uses AI to analyze, fetch, and manage music tracks from various publicly available sources. It enables real-time track analysis, music fetching from APIs, and seamless user interaction with an intuitive UI.

## 🚀 Features

- **🎵 Fetch & Download Tracks** - Retrieve music from **Freesound, Jamendo, and Internet Archive**.
- **🛠 Analyze Music** - Extract BPM, key, and energy levels from tracks.
- **💾 Save & Retrieve Tracks** - Store tracks in a **PostgreSQL database** for easy access.
- **🔊 Interactive UI** - Smooth, interactive front-end using **React.js & Material UI**.
- **🎚 AI-powered Mixing** - (Future feature) Advanced AI-powered track blending.

## 🏗 Tech Stack

### Backend:

- **Node.js** & **Express.js** - Server-side framework.
- **PostgreSQL & Prisma ORM** - Database & ORM for managing tracks.
- **Axios** - Handling API requests.
- **Freesound API, Jamendo API, Internet Archive API** - Music sources.

### Frontend:

- **React.js** - UI development.
- **Material UI** - Modern UI components.
- **Axios** - Fetching data from the backend.

### AI & ML:

- **Python** - Machine learning engine for music processing.
- **TensorFlow/PyTorch** - AI models for track analysis and mixing.
- **Librosa** - Audio feature extraction.

## 📂 Project Structure

```
├── server/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Controller logic
│   │   ├── services/       # API & database service logic
│   │   ├── routes/         # Express routes
│   │   ├── utils/          # Utility functions
│   │   ├── prisma/         # Prisma database schema
│   │   ├── downloads/      # Local storage for downloaded tracks
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│
├── client/                 # Frontend React App
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page views
│   │   ├── services/       # API calls to backend
│   ├── public/             # Static files
│   ├── package.json        # Frontend dependencies
│
├── audio-engine/           # Music processing engine
│   ├── feature-extraction/ # AI-based track analysis
│   ├── mixing-algorithms/  # AI DJ mixing logic
│
├── ml-engine/              # AI model training & inference
│   ├── models/             # Pretrained models
│   ├── scripts/            # Training & evaluation scripts
│
├── docs/                   # Documentation
│
├── public/                 # Public assets
│
├── scripts/                # Utility scripts
│
├── tests/                  # Test cases for API & ML models
│
├── README.md               # Project documentation
```

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Hammediora/Programming-files.git
cd ai-dj
```

### 2️⃣ Setup Backend

1. Navigate to the backend folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure:
   ```sh
   DATABASE_URL=postgresql://user:password@localhost:5432/ai_dj_db
   FREESOUND_API_KEY=your_freesound_api_key
   JAMENDO_API_KEY=your_jamendo_api_key
   S3_BUCKET_URL=your_internet_archive_s3_url
   ```
4. Run database migration:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the backend server:
   ```sh
   npm run dev
   ```

### 3️⃣ Setup Frontend

1. Open a new terminal, go to the frontend folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## 🎬 Usage

### 1️⃣ Fetch & Download Music

- Use the **search bar** to query music from APIs.
- Downloaded tracks will be stored in the **database and local storage**.

### 2️⃣ Analyze Tracks

- Paste a **track URL** and click **Analyze**.
- View **BPM, Key, and Energy level** of the track.

### 3️⃣ Load Saved Tracks

- Click **Load Saved Tracks** to fetch previously downloaded music.

## 🛠 API Endpoints

### 🎵 Music Routes

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| `GET`  | `/api/music/fetch?query=` | Fetch music from APIs |
| `POST` | `/api/music/analyze`      | Analyze a music track |
| `GET`  | `/api/music/saved`        | Get saved tracks      |

## 🛡 Environment Variables

| Variable            | Description                           |
| ------------------- | ------------------------------------- |
| `DATABASE_URL`      | PostgreSQL database connection string |
| `FREESOUND_API_KEY` | API Key for Freesound                 |
| `JAMENDO_API_KEY`   | API Key for Jamendo                   |
| `S3_BUCKET_URL`     | Internet Archive S3 URL               |

## 📌 Future Improvements

- 🔥 **Real-time AI Mixing** - Implement smart transitions & beat matching.
- 🎨 **Better UI/UX** - Improve design for better music visualization.
- 📱 **Mobile Compatibility** - Make the app fully responsive.
- 🎧 **More APIs** - Integrate more music sources.

## 🤝 Contributing

1. **Fork** the repo.
2. **Create a feature branch**: `git checkout -b feature-name`
3. **Commit changes**: `git commit -m "Added new feature"`
4. **Push to GitHub**: `git push origin feature-name`
5. **Open a Pull Request** 🚀

## 📜 License

This project is licensed under the **MIT License**.

## 🌟 Acknowledgments

- [Freesound](https://freesound.org)
- [Jamendo](https://www.jamendo.com)
- [Internet Archive](https://archive.org)

---

**Made with ❤️ for AI-powered music mixing!** 🎧

