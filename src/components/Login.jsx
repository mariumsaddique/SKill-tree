import React, { useState } from "react";
import { Button, Form, Container, Card, Spinner } from "react-bootstrap";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Login({ switchToSignup, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log("Firebase ID Token:", token);
      onLogin(user, token);
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password.");
      } else {
        setError("Failed to log in. Please try again.");
      }
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <Card className="signup-card">
        <h3 className="text-center mb-4 signup-title">Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button type="submit" className="w-100 mb-3 signup-btn" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Login"}
          </Button>

          <Button variant="link" onClick={switchToSignup} className="w-100 switch-btn">
            Don't have an account? Signup
          </Button>
        </Form>
      </Card>
    </div>
  );
}
