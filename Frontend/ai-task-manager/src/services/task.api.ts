import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "../types/taskTypes";
import api from "../services/api";

// ✅ CREATE TASK (uses token via api instance)
export const createTask = createAsyncThunk(
  "tasks/create",
  async (task: Omit<Task, "id">, { rejectWithValue }) => {
    try {
      const res = await api.post("/tasks", task);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data || "Create task failed"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

// ✅ FETCH TASKS (ALSO use api, not axios)
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/tasks");
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data || "Fetch failed"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);
// ✅ UPDATE TASK (PUT)
export const updateTask = createAsyncThunk(
  "tasks/update",
  async (
    task: Task,
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, task);
      return res.data;
    } catch {
      return rejectWithValue("Update task failed");
    }
  }
);
// DELETE TASK
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id; // 🔥 return id to remove from store
    } catch {
      return rejectWithValue("Delete task failed");
    }
  }
);