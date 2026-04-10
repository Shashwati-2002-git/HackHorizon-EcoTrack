# 🌿 EcoTrack – Carbon Footprint Tracker

EcoTrack is a web-based application that helps users **measure, understand, and reduce their carbon footprint** based on their daily activities.

---

## 🚀 Features

- 📊 **Carbon Footprint Calculation**
  - Based on food, transport, shopping, and appliance usage

- 🤖 **AI-Powered Analysis**
  - Uses Groq API to generate:
    - Carbon footprint breakdown
    - Personalized eco-friendly recommendations

- 📈 **Dashboard**
  - Visual representation of carbon footprint trends using charts

- 🕒 **History Page**
  - Stores previous carbon footprint results (hardcoded/local storage)

- 👥 **Community Page**
  - Explore and join eco-friendly initiatives

- 🔐 **Authentication**
  - Login / Create Account (Firebase-based)

---

## 🧱 Tech Stack

### Frontend
- HTML5
- CSS3 (Glassmorphism Dark Theme)
- JavaScript (Vanilla)
- Chart.js

### Backend
- Node.js
- Express.js

### APIs & Tools
- Groq API (AI response generation)
- Firebase (Authentication)

---

## 📂 Project Structure
EcoTrack/
│
├── backend/
│ └── server.js
│
├── frontend/
│ ├── pages/
│ │ ├── index.html
│ │ ├── input.html
│ │ ├── result.html
│ │ ├── dashboard.html
│ │ ├── history.html
│ │ ├── community.html
│ │ ├── login.html
│ │ ├── createAccount.html
│ │ └── forgotPassword.html
│ │
│ ├── css/
│ │ └── style.css
│ │
│ └── js/
│ ├── dashboard.js
│ └── firebase.js
│
└── README.md


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ecotrack.git
cd ecotrack

2. Install dependencies
npm install

3. Create .env file
GROQ_API_KEY=your_api_key_here

4. Run the server
node server.js

5. Open in browser
http://localhost:5000