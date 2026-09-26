"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { Toaster, toast } from "sonner";

const PlanContext = createContext(null);
const initialState = { plan: [], saved: [], ready: false };

function reducer(state, action) {
  if (action.type === "load") return { ...action.value, ready: true };
  if (action.type === "add") {
    if (state[action.list].some((item) => item.id === action.workout.id))
      return state;
    if (
      action.list === "plan" &&
      state.plan.filter((item) => !item.done).length >= 5
    )
      return state;
    return {
      ...state,
      [action.list]: [
        ...state[action.list],
        { ...action.workout, done: false },
      ],
    };
  }
  if (action.type === "remove")
    return {
      ...state,
      [action.list]: state[action.list].filter((item) => item.id !== action.id),
    };
  if (action.type === "done")
    return {
      ...state,
      plan: state.plan.map((item) =>
        item.id === action.id ? { ...item, done: true } : item,
      ),
    };
  return state;
}

export default function PlanProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("fitlog") || "{}");
      // Ignore damaged browser data instead of breaking the page.
      const clean = (list) =>
        Array.isArray(list)
          ? list.filter(
              (item) =>
                Number.isInteger(item?.id) &&
                typeof item.name === "string" &&
                Number.isFinite(item.duration) &&
                Number.isFinite(item.caloriesBurned),
            )
          : [];
      dispatch({
        type: "load",
        value: { plan: clean(stored.plan), saved: clean(stored.saved) },
      });
    } catch {
      dispatch({ type: "load", value: { plan: [], saved: [] } });
    }
  }, []);
  useEffect(() => {
    if (!state.ready) return;
    try {
      localStorage.setItem(
        "fitlog",
        JSON.stringify({ plan: state.plan, saved: state.saved }),
      );
    } catch {
      toast.error(
        "Browser storage is unavailable. Keep this tab open to keep your plan.",
      );
    }
  }, [state]);

  function add(workout, list) {
    if (!state.ready) return;
    if (state[list].some((item) => item.id === workout.id))
      return toast.info(
        "This workout is already in your " +
          (list === "plan" ? "plan." : "saved list."),
      );
    if (list === "plan" && state.plan.filter((item) => !item.done).length >= 5)
      return toast.error("Finish a lift or remove one before adding more.");
    dispatch({ type: "add", workout, list });
    toast.success(
      list === "plan" ? "Added to today's plan" : "Saved for later",
    );
  }
  function remove(id, list) {
    dispatch({ type: "remove", id, list });
    toast.success("Workout removed");
  }
  function markDone(id) {
    dispatch({ type: "done", id });
    toast.success("Workout completed. Nice work!");
  }

  return (
    <PlanContext.Provider value={{ ...state, add, remove, markDone }}>
      {children}
      <Toaster theme="dark" richColors position="bottom-right" closeButton />
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
