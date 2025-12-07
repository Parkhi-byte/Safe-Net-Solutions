# SafeNet Solutions 🛡️

**Enterprise-Grade Cybersecurity Made Simple.**

SafeNet Solutions is a comprehensive cybersecurity platform designed for Small and Medium Enterprises (SMEs). It combines essential security tools into a single, intuitive interface, providing robust protection for digital assets, secure communications, and sensitive data.

![SafeNet Solutions Banner](https://via.placeholder.com/1200x400?text=SafeNet+Solutions+Dashboard)

## 🚀 Key Features

### 🔐 Password Manager
A secure vault for all your credentials.
- **Zero-Knowledge Architecture**: Your passwords are encrypted before they leave your device.
- **Password Generator**: Create strong, unique passwords instantly.
- **Auto-Fill & Organization**: Seamlessly manage accounts with varied categories.

### 📂 Secure File Sharing
Share sensitive documents with confidence.
- **End-to-End Encryption**: Files are encrypted during upload and storage.
- **Granular Access Controls**: Set permissions (view, download, edit) and expiration dates for share links.
- **Audit Logs**: Track who accessed your files and when.

### 🔍 Vulnerability Scanner
Proactively identify weaknesses in your digital infrastructure.
- **Automated Scanning**: Regular checks for known vulnerabilities (CVEs).
- **Detailed Reports**: Actionable insights to patch security gaps.
- **Real-time Alerts**: Get notified immediately about critical threats.

### 💬 Secure Chat (Beta)
*Note: Currently in beta testing.*
- **Encrypted Messaging**: Private, tamper-proof team communication.
- **Self-Destructing Messages**: ephemeral conversations for sensitive topics.

## 🛠️ Technology Stack

**Frontend:**
- **React.js** (Vite build tool)
- **Tailwind CSS** (for modern, responsive styling)
- **Lucide React** (Beautiful, consistent icons)
- **Glassmorphism Design System**

**Backend:**
- **Node.js & Express**
- **MongoDB** (Data persistence)
- **Socket.io** (Real-time updates)
- **JWT** (Secure authentication)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/Satyam-xD/Safenet

```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file based on .env.example (ensure MONGO_URI is set)
npm run dev
```
The backend server will start on port `5000` (or your configured port).

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The application will launch in your browser at `http://localhost:5173`.

## 📸 Screenshots

| Dashboard | Password Vault |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/400x250?text=Dashboard+UI) | ![Vault](https://via.placeholder.com/400x250?text=Password+Vault) |

| File Sharing | Vulnerability Scanner |
|:---:|:---:|
| ![Files](https://via.placeholder.com/400x250?text=Secure+Files) | ![Scanner](https://via.placeholder.com/400x250?text=Scanner+Report) |

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
© 2025 SafeNet Solutions. All rights reserved.
