import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  errorFormat: "pretty",
});

export default prisma;
