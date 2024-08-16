import axios from "axios";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { procedure, router } from "@/server/trpc";
import { Prisma } from "@prisma/client";
import { prisma } from "@/server/prisma";

/* const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
  image: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  company: true,
  transporter: true,
  password: false,
  phone: true,
  location: true,
  special_request: true,
}); */

export const userRouter = router({
  register: procedure
    .input(
      z.object({
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string(),
        email: z.string(),
        company: z.string(),
        role: z.string(),
        special_request: z.string(),
        phone: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (!input.username) return;

      const user = await prisma.user.create({
        data: {
          username: input.username,
          firstName: input.firstName,
          lastName: input.lastName,
          password: input.password,
          email: input.email,
          role: input.role,
          location: input.location,
          phone: input.phone,
          special_request: input.special_request,
          company: input.company,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `users.register not found`,
        });
      }
      return user;
    }),
  list: procedure.query(async () => {
    try {
      let response = await prisma.user.findMany();

      return {
        response: response.length > 0 ? response : null,
      };
    } catch (error) {
      return {
        error: error,
        message: "Internal Server Error check connection",
      };
    }
  }),
  user: procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (!input.email) return;

      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          username: true,
          image: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          company: true,
          transporter: {
            select: {
              id: true,
              name: true,
              address: true,
              registrationNumber: true,
              taxId: true,
              description: true,
              email: true,
              pictures: true,
              phone: true,
            },
          },
          password: false,
          phone: true,
          location: true,
          special_request: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `user.user not found`,
        });
      }
      return user;
    }),
  update: procedure
    .input(
      z.object({
        id: z.string(),
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string(),
        email: z.string(),
        company: z.string(),
        role: z.string(),
        special_request: z.string(),
        phone: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.firstName === "") return;
      const user = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          username: input.username,
          firstName: input.firstName,
          lastName: input.lastName,
          password: input.password,
          email: input.email,
          role: input.role,
          location: input.location,
          phone: input.phone,
          special_request: input.special_request,
          company: input.company,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `user.create not found`,
        });
      }

      return user;
    }),
  delete: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id === "") return;
      const user = await prisma.user.delete({
        where: {
          id: `${input.id}`,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `user.delete not found`,
        });
      }

      return user;
    }),
  get: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.id === "") return;
      const user = await prisma.user.findFirst({
        where: {
          id: `${input.id}`,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `user.get not found`,
        });
      }

      return user;
    }),
});
