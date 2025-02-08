import { users, type User, type InsertUser } from "@shared/schema";
import { metalPrices, alloyCompositions, type MetalPrice, type AlloyComposition, type InsertMetalPrice, type InsertAlloyComposition } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Metal prices
  getLatestPrices(): Promise<MetalPrice[]>;
  addMetalPrice(price: InsertMetalPrice): Promise<MetalPrice>;

  // Alloy compositions
  saveComposition(composition: InsertAlloyComposition): Promise<AlloyComposition>;
  getRecentCompositions(limit?: number): Promise<AlloyComposition[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getLatestPrices(): Promise<MetalPrice[]> {
    throw new Error("Method not implemented.");
  }
  async addMetalPrice(price: InsertMetalPrice): Promise<MetalPrice> {
    throw new Error("Method not implemented.");
  }
  async saveComposition(composition: InsertAlloyComposition): Promise<AlloyComposition> {
    throw new Error("Method not implemented.");
  }
  async getRecentCompositions(limit?: number): Promise<AlloyComposition[]> {
    throw new Error("Method not implemented.");
  }
}

export class DatabaseStorage implements IStorage {
  async getLatestPrices(): Promise<MetalPrice[]> {
    return await db.select()
      .from(metalPrices)
      .orderBy(desc(metalPrices.timestamp))
      .limit(3);
  }

  async addMetalPrice(price: InsertMetalPrice): Promise<MetalPrice> {
    const [newPrice] = await db
      .insert(metalPrices)
      .values({
        ...price,
        price: price.price.toString(),  // Conversione del tipo `number` a `string`
      })
      .returning();
    return newPrice;
  }

  async saveComposition(composition: InsertAlloyComposition): Promise<AlloyComposition> {
    const [newComposition] = await db
      .insert(alloyCompositions)
      .values(composition)
      .returning();
    return newComposition;
  }

  async getRecentCompositions(limit: number = 10): Promise<AlloyComposition[]> {
    return await db.select()
      .from(alloyCompositions)
      .orderBy(desc(alloyCompositions.timestamp))
      .limit(limit);
  }
  async getUser(id: number): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async createUser(user: InsertUser): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

export const storage = new DatabaseStorage();
