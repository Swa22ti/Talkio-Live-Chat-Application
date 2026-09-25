import React, { useState } from "react";
import API from "../services/api";
import styles from "./Auth.module.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
        <h3 style={{ color: "#1e293b" }}>Account created!</h3>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          You can now login with your credentials.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <h2 className={styles.formTitle}>Create account</h2>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.field}>
        <label className={styles.label}>Username</label>
        <input
          placeholder="Choose a username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={styles.input}
          required
        />
      </div>

      <button type="submit" disabled={loading} className={styles.btn}>
        {loading ? "Creating account..." : "Create Account →"}
      </button>
    </form>
  );
}

