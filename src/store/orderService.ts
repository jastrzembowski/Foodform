import agent from "../api/agent";
import { Product } from "../models/model";

export const createDish = async (data: Product) => {
  return await agent.post("", data);
};
