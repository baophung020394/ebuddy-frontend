"use client";
import { login } from "@/store/actions";
import { setError } from "@/store/reducers";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error } = useSelector((state: RootState) => state.user);

  const handleLogin = async () => {
    dispatch(setError(null));
    await dispatch<any>(login(email, password));
    router.push("/users");
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
          Login
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
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={!email || !password || isLoading}
          sx={{
            marginTop: 3,
            padding: 1,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2, textAlign: "center" }}>
          Nếu chưa có account, <a href="/signup">click signup</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm;
