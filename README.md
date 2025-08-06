# 🗨️ Realtime Chat App (v1.0.0)

A realtime chat application built with modern web technologies. Users can join rooms, send and receive messages instantly, and manage rooms using a smooth and intuitive interface.

---

## ✨ Features

- 🔒 JWT-based user authentication
- 💬 Realtime messaging using native WebSockets
- 🏠 Room-based chat system
- 🧾 Message persistence with PostgreSQL (via Prisma)
- 🎨 Clean, responsive UI with TailwindCSS
- 🔌 Express backend for API endpoints
- 🔧 Modular and scalable project structure

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TailwindCSS** for styling
- **React Hooks** for state and effects

### Backend
- **Node.js** with **Express**
- **WebSocket** (`ws`) for realtime communication
- **Prisma** ORM
- **PostgreSQL** for persistent storage

---

## 📂 Project Structure

```bash
apps/
  frontend/             # Frontend app (Next.js)
  http-server/          # Backend server (Server)
  ws-server/            # Backend WebSocket
packages/
  db/               # Prisma schema and database client
  common/           # Shared files/code
