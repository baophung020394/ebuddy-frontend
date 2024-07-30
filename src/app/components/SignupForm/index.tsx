import { auth } from "@/firebase/config";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 3, width: "100%", maxWidth: 400 }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          disabled={!email || !password || loading}
          sx={{
            marginTop: 3,
            padding: 1,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2, textAlign: "center" }}>
          Nếu đã có account, <a href="/login">click login</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupForm;
