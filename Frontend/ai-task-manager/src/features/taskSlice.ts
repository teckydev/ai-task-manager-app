import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../types/taskTypes";
import { createTask, fetchTasks,updateTask } from "../services/task.api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasks(state) {
      state.tasks = [];
    },
  },
  extraReducers: builder => {
    builder
      // CREATE TASK
      .addCase(createTask.pending, state => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH TASKS
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

       .addCase(updateTask.pending, state => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;

        const updatedTask = {
          id: action.payload._id,
          title: action.payload.title,
          description: action.payload.description,
          dueDate: action.payload.dueDate,
          aiSuggestion: action.payload.aiSuggestion,
        };

        const index = state.tasks.findIndex(
          task => task.id === updatedTask.id
        );

        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
