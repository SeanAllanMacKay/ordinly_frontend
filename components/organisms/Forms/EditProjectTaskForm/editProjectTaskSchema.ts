import zod from "zod";

export const editProjectTaskSchema = zod.object({
  name: zod
    .string({ error: "validation:nameRequired" })
    .min(1, { error: "validation:nameRequired" }),
  description: zod.string().optional(),
  status: zod.string().optional(),
  priority: zod.string().optional(),
  startDate: zod.date().optional(),
  dueDate: zod.date().optional(),
  checklist: zod
    .array(
      zod.object({
        value: zod.string({ error: "validation:itemValueRequired" }),
      }),
    )
    .optional(),
});
