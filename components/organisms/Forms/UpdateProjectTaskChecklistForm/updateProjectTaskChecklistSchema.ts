import zod from "zod";

export const updateProjectTaskChecklistSchema = zod.object({
  items: zod.array(
    zod.object({
      id: zod.string().optional(),
      name: zod
        .string({ error: "Item name is required" })
        .min(1, { message: "Item name is required" }),
      isComplete: zod.boolean(),
      order: zod.number(),
    }),
  ),
});
