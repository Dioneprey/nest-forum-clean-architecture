import {
  Controller,
  Post,
  UsePipes,
  Body,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";

import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const authenticateBodyBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodyBodySchema = z.infer<typeof authenticateBodyBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodyBodySchema))
  async handle(@Body() body: AuthenticateBodyBodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User credentials do not match.");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("User credentials do not match.");
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    return { access_token: accessToken };
  }
}
