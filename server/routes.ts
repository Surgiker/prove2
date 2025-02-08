import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAlloyCompositionSchema, insertMetalPriceSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Metal prices routes
  app.get("/api/prices", async (req, res) => {
    try {
      const prices = await storage.getLatestPrices();
      res.json(prices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prices" });
    }
  });

  app.post("/api/prices", async (req, res) => {
    try {
      const price = insertMetalPriceSchema.parse(req.body);
      const newPrice = await storage.addMetalPrice(price);
      res.status(201).json(newPrice);
    } catch (error) {
      res.status(400).json({ error: "Invalid price data" });
    }
  });

  // Alloy compositions routes
  app.post("/api/compositions", async (req, res) => {
    try {
      const composition = insertAlloyCompositionSchema.parse(req.body);
      const newComposition = await storage.saveComposition(composition);
      res.status(201).json(newComposition);
    } catch (error) {
      res.status(400).json({ error: "Invalid composition data" });
    }
  });

  app.get("/api/compositions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const compositions = await storage.getRecentCompositions(limit);
      res.json(compositions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch compositions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}