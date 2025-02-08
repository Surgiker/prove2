import { pgTable, text, serial, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const metalPrices = pgTable("metal_prices", {
  id: serial("id").primaryKey(),
  metal: text("metal").notNull(),  // copper, zinc, or nickel
  price: numeric("price").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull()
});

export const alloyCompositions = pgTable("alloy_compositions", {
  id: serial("id").primaryKey(),
  copper: numeric("copper").notNull(),
  zinc: numeric("zinc").notNull(),
  nickel: numeric("nickel").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull()
});

export const insertMetalPriceSchema = createInsertSchema(metalPrices, {
  metal: z.enum(["copper", "zinc", "nickel"]),
  price: z.number().positive()
}).omit({ id: true, timestamp: true });

export const insertAlloyCompositionSchema = createInsertSchema(alloyCompositions).omit({ 
  id: true, 
  timestamp: true 
});

export type InsertMetalPrice = z.infer<typeof insertMetalPriceSchema>;
export type MetalPrice = typeof metalPrices.$inferSelect;
export type InsertAlloyComposition = z.infer<typeof insertAlloyCompositionSchema>;
export type AlloyComposition = typeof alloyCompositions.$inferSelect;