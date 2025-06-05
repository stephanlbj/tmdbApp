"use client";

import { QueryClientProvider as RQProvider } from "@tanstack/react-query";
import { useState } from "react";
import { getQueryClient } from "@/lib/reactQueryClient";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(getQueryClient);
  return <RQProvider client={queryClient}>{children}</RQProvider>;
}
