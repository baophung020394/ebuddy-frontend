"use client";
import { createUser, fetchUsers, updateUser } from "@/store/actions";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.user,
  );
  const [userCount, setUserCount] = useState(1);
  const [editNames, setEditNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch<any>(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = () => {
    const newUser = `User ${userCount}`;
    dispatch<any>(createUser(newUser));
    setUserCount(userCount + 1);
  };

  const handleUpdateUser = (userId: string) => {
    const currentName = editNames[userId] || "";
    const updatedName = currentName + " Updated";
    setEditNames((prev) => ({ ...prev, [userId]: updatedName }));
    dispatch<any>(updateUser(userId, updatedName));
  };

  const handleNameChange = (userId: string, name: string) => {
    setEditNames((prev) => ({ ...prev, [userId]: name }));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length > 0 ? (
              users?.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <TextField
                      value={editNames[user.id] || user.name}
                      onChange={(e) =>
                        handleNameChange(user.id, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUpdateUser(user.id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateUser}
        sx={{ marginTop: 2 }}
      >
        Create User
      </Button>
    </Box>
  );
};

export default UserList;
