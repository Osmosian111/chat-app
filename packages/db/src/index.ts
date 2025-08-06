import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

export const prismaClient = new PrismaClient();

export type Rooms = Prisma.UserGetPayload<{
  include: {
    Room_JoinedRooms: true;
  };
  omit: {
    password: true;
  };
}>;

export type Chats = Prisma.ChatGetPayload<{
  include: {
    user: {
      omit: {
        email: true;
        password: true;
      };
    };
  };
  omit: {
    id: true;
  };
}>;
