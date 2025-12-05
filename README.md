# Simple To-Do List (React)

This repository contains a **Simple To-Do List** application built using **React** (Vite) as part of the **Xamaxis internship evaluation task**.  
The app demonstrates full CRUD operations, React state management with hooks, completion status handling, and task filtering, all implemented mainly inside a single React component file: `src/App.jsx`.

---

## ✅ Features

- **Add Tasks** – Create new tasks using the input field and “+” button.
- **Edit Tasks** – Update an existing task using the **Edit → Save / Cancel** flow.
- **Delete Tasks** – Permanently remove tasks from the list.
- **Mark as Completed** – Check/Uncheck a task to toggle its completion status.
- **Filter Tasks** – View tasks using three filters:
  - `All`
  - `Active`
  - `Completed`
- **Task Counters** – Shows total tasks and how many are completed.
- **LocalStorage Persistence** – Tasks are saved in `localStorage` so they remain after refresh.
- **Single-file UI Logic** – All application logic and UI are inside `src/App.jsx` (other files are only for bootstrapping via Vite/React).

---

## 🧰 Tech Stack

- **React** (with hooks: `useState`, `useEffect`)
- **Vite** as the build tool
- **JavaScript (ES6+)**
- **HTML5 & CSS3**
- **Browser LocalStorage** for persistence

---

## 🧩 Project Structure

```text
react-todo-app/
│
├─ public/                # Static assets (handled by Vite)
├─ src/
│  ├─ App.jsx             # Main React component – all To-Do logic & UI
│  ├─ main.jsx            # Entry point – renders <App /> into the DOM
│  ├─ index.css           # Global styles (base layout / resets)
│  └─ ...                 # (Auto-generated Vite/React config files)
│
├─ index.html             # Root HTML file used by Vite
├─ package.json           # Project metadata, scripts & dependencies
├─ vite.config.js         # Vite configuration
└─ README.md              # Project documentation (this file)
