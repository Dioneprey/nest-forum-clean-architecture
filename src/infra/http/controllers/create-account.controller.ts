import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common";
import { hash } from "bcryptjs";
import { z } from "zod";

import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";

const createBodyAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateBodyAccountBodySchema = z.infer<typeof createBodyAccountBodySchema>;
@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createBodyAccountBodySchema))
  async handle(@Body() body: CreateBodyAccountBodySchema) {
    const { name, email, password } = createBodyAccountBodySchema.parse(body);
  }
}
