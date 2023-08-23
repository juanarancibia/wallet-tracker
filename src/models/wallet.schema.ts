"use client";

import * as z from "zod";

export const WalletSchema = z.object({
  alias: z.string().min(2).max(50),
  network: z.string().min(3).max(24),
  address: z.string().min(24),
});
