// SignupForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/firebase/config";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignup}
        disabled={!email || !password || loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Nếu đã có account, <a href="/login">click login</a>
      </Typography>
    </Box>
  );
};

export default SignupForm;
