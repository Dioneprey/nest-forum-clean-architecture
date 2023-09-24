import { Controller, Post, UsePipes, Body } from "@nestjs/common";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";

import { z } from "zod";
import { AuthenticateStudentUseCase } from "src/domain/forum/application/use-cases/authenticate-student";

const authenticateBodyBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodyBodySchema = z.infer<typeof authenticateBodyBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodyBodySchema))
  async handle(@Body() body: AuthenticateBodyBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      throw new Error();
    }

    const { accessToken } = result.value;

    return { access_token: accessToken };
  }
}
