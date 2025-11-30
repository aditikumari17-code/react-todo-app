// src/App.jsx
import { useState, useEffect } from "react";

const STORAGE_KEY = "xam_todo_tasks_v1";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load from localStorage on first render
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch (e) {
      console.error("Could not load tasks:", e);
    }
  }, []);

  // Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  function addTask(e) {
    e?.preventDefault?.();
    const value = text.trim();
    if (!value) return alert("Please type a task.");
    const newTask = {
      id: Date.now(),
      text: value,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setText("");
  }

  // Toggle completed
  function toggleCompleted(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  // Delete task
  function deleteTask(id) {
    if (!confirm("Delete this task permanently?")) return;
    setTasks(tasks.filter(t => t.id !== id));
  }

  // Start editing
  function startEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  // Save edit
  function saveEdit(id) {
    const trimmed = editText.trim();
    if (!trimmed) return alert("Task cannot be empty.");
    setTasks(tasks.map(t => t.id === id ? { ...t, text: trimmed } : t));
    setEditingId(null);
    setEditText("");
  }

  // Cancel edit
  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  // Filter tasks
  const visibleTasks = tasks.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div>
            <p style={styles.badge}>My Day</p>
            <h1 style={styles.title}>Simple To-Do List</h1>
            <p style={styles.subtitle}>Organise your tasks for today.</p>
          </div>
          <div style={styles.counterBox}>
            <span style={styles.counterNumber}>{done}</span>
            <span style={styles.counterLabel}>Done</span>
          </div>
        </div>

        <form onSubmit={addTask} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Add a new task and press Enter..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button style={styles.addBtn} type="submit">
            +
          </button>
        </form>

        <div style={styles.filtersRow}>
          <span style={styles.filtersLabel}>Show:</span>
          <button
            onClick={() => setFilter("all")}
            style={filter === "all" ? styles.activeFilter : styles.filterBtn}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            style={filter === "active" ? styles.activeFilter : styles.filterBtn}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            style={filter === "completed" ? styles.activeFilter : styles.filterBtn}
          >
            Completed
          </button>
        </div>

        <div style={styles.list}>
          {visibleTasks.length === 0 && (
            <div style={styles.empty}>No tasks to show. Add something above ✨</div>
          )}

          {visibleTasks.map((task) => (
            <div key={task.id} style={styles.taskRow}>
              <div style={styles.leftPart}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task.id)}
                  style={styles.checkbox}
                />

                {editingId === task.id ? (
                  <input
                    style={styles.editInput}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <div
                    style={{
                      ...styles.taskText,
                      ...(task.completed ? styles.completedText : {}),
                    }}
                  >
                    {task.text}
                  </div>
                )}
              </div>

              <div style={styles.actionButtons}>
                {editingId === task.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(task.id)}
                      style={styles.saveBtn}
                    >
                      Save
                    </button>
                    <button onClick={cancelEdit} style={styles.cancelBtn}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(task)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.footer}>
          <span>{total} total</span>
          <span>{done} completed</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    margin: 0,
    background:
      "linear-gradient(135deg, #0f172a, #1d4ed8, #22c55e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    width: 720,
    maxWidth: "100%",
    background: "rgba(15,23,42,0.96)",
    color: "#e5e7eb",
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 24px 60px rgba(15,23,42,0.7)",
    border: "1px solid rgba(148,163,184,0.5)",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  badge: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 999,
    fontSize: 12,
    background: "rgba(59,130,246,0.15)",
    color: "#93c5fd",
    margin: 0,
    marginBottom: 6,
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 600,
    letterSpacing: 0.3,
  },
  subtitle: {
    margin: 0,
    marginTop: 4,
    fontSize: 13,
    color: "#9ca3af",
  },
  counterBox: {
    minWidth: 70,
    textAlign: "right",
    padding: "8px 10px",
    borderRadius: 14,
    background: "rgba(15,118,110,0.18)",
    border: "1px solid rgba(45,212,191,0.5)",
  },
  counterNumber: {
    display: "block",
    fontSize: 20,
    fontWeight: 600,
    color: "#5eead4",
    lineHeight: 1.1,
  },
  counterLabel: {
    fontSize: 11,
    color: "#a5b4fc",
  },
  form: {
    display: "flex",
    gap: 10,
    marginBottom: 16,
    marginTop: 8,
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #374151",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 14,
    outline: "none",
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#020617",
    fontSize: 22,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(34,197,94,0.5)",
  },
  filtersRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  filtersLabel: {
    fontSize: 13,
    color: "#9ca3af",
  },
  filterBtn: {
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid transparent",
    background: "rgba(15,23,42,0.8)",
    color: "#e5e7eb",
    fontSize: 12,
    cursor: "pointer",
  },
  activeFilter: {
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid rgba(191,219,254,0.9)",
    background:
      "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#eff6ff",
    fontSize: 12,
    cursor: "pointer",
    boxShadow: "0 0 0 1px rgba(15,23,42,0.4)",
  },
  list: {
    marginTop: 6,
    maxHeight: 360,
    overflowY: "auto",
    paddingRight: 4,
  },
  empty: {
    padding: 14,
    fontSize: 13,
    color: "#9ca3af",
    borderRadius: 12,
    background: "rgba(15,23,42,0.7)",
    border: "1px dashed rgba(75,85,99,0.8)",
  },
  taskRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 12px",
    marginBottom: 8,
    borderRadius: 12,
    background: "rgba(15,23,42,0.85)",
    border: "1px solid rgba(55,65,81,0.8)",
  },
  leftPart: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  checkbox: {
    width: 18,
    height: 18,
    cursor: "pointer",
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    color: "#e5e7eb",
    wordBreak: "break-word",
  },
  completedText: {
    textDecoration: "line-through",
    color: "#64748b",
  },
  actionButtons: {
    display: "flex",
    gap: 6,
  },
  editBtn: {
    padding: "4px 10px",
    borderRadius: 999,
    border: "none",
    fontSize: 12,
    cursor: "pointer",
    background: "rgba(59,130,246,0.15)",
    color: "#bfdbfe",
  },
  deleteBtn: {
    padding: "4px 10px",
    borderRadius: 999,
    border: "none",
    fontSize: 12,
    cursor: "pointer",
    background: "rgba(248,113,113,0.18)",
    color: "#fecaca",
  },
  editInput: {
    flex: 1,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #4b5563",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 14,
  },
  saveBtn: {
    padding: "4px 10px",
    borderRadius: 999,
    border: "none",
    fontSize: 12,
    cursor: "pointer",
    background: "rgba(34,197,94,0.2)",
    color: "#bbf7d0",
  },
  cancelBtn: {
    padding: "4px 10px",
    borderRadius: 999,
    border: "none",
    fontSize: 12,
    cursor: "pointer",
    background: "rgba(148,163,184,0.3)",
    color: "#e5e7eb",
  },
  footer: {
    marginTop: 12,
    paddingTop: 10,
    borderTop: "1px solid rgba(51,65,85,0.9)",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#9ca3af",
  },
};

export default App;
