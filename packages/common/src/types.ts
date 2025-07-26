import z from "zod";

export const CreateUserSchema = z.object({
  email: z.string().min(1).max(150).email(),
  password: z.string().min(8).max(150),
  name: z.string().min(3).max(150),
});
export const SigninSchema = z.object({
  email: z.string().min(1).max(150).email(),
  password: z.string().min(8).max(150),
});
export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(150),
});

export type ChatMessage = {
  id: string;
  message: string;
  createdAt: string; // or Date, depending on your usage
  user: {
    id: string;
    name: string;
  };
};
