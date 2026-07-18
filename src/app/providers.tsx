// src/app/providers.tsx
"use client";

import React from "react";
import { store } from "../features/redux/store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Wrap your context providers around the {children}
    <Provider store={store}>{children}</Provider>
  );
}
