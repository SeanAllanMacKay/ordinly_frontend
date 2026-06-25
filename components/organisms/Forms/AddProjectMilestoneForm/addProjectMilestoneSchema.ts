import zod from "zod";

export const addProjectMilestoneSchema = zod.object({
  name: zod
    .string({ error: "validation:nameRequired" })
    .min(1, { error: "validation:nameRequired" }),
  description: zod.string().optional(),
  status: zod.string().optional(),
  priority: zod.string().optional(),
  dueDate: zod.date().optional(),
  approver: zod.string().optional(),
  documents: zod
    .array(
      zod.union([
        zod.object({
          name: zod.string().optional(),
          uri: zod.string(),
          type: zod.string(),
        }),
        zod.instanceof(File),
      ]),
    )
    .optional(),
});
