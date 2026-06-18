import zod from "zod";

export const addProjectTaskSchema = zod.object({
  name: zod
    .string({ error: "Name is required" })
    .min(1, { error: "Name is required" }),
  description: zod.string().optional(),
  status: zod.string().optional(),
  priority: zod.string().optional(),
  startDate: zod.date().optional(),
  dueDate: zod.date().optional(),
  checklist: zod
    .array(
      zod.object({
        value: zod.string({ error: "Item value is required" }),
      }),
    )
    .optional(),
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
