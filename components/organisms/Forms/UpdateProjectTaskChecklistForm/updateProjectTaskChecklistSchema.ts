import zod from "zod";

export const updateProjectTaskChecklistSchema = zod.object({
  items: zod.array(
    zod.object({
      id: zod.string().optional(),
      name: zod
        .string({ error: "validation:itemNameRequired" })
        .min(1, { message: "validation:itemNameRequired" }),
      isComplete: zod.boolean(),
      order: zod.number(),
    }),
  ),
});
