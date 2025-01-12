import { z } from "zod";

export const configureUnitSchema = z.string().min(1).max(120);
