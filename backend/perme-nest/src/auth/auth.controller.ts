import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Get token',
    content: {
      'application/json': {
        example: {
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiMTAwMDAiLCJzdWIiOjEsImlhdCI6MTY5OTYzMTc2NSwiZXhwIjoxNjk5NzEwOTY1fQ.ILIdeJ2kQSo0bEUJPbMrOwi7fQz9eWKQ7HoQRHK1Ed4"
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        example: {
          "message": "Unauthorized",
          "error": "Unauthorized",
          "statusCode": 401
        }
      },
    },
  })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get authenticated user',
    content: {
      'application/json': {
        example: {
          "id": 1,
          "createdAt": "2023-11-09T11:11:43.788Z",
          "updatedAt": "2023-11-09T11:11:43.788Z",
          "deletedAt": null,
          "name": "João",
          "lastName": "Silva",
          "identifier": "10000",
          "password": "$2a$10$lwpPr2Hd6MmTOqSNxTEKLeURBz4N93efQId7VcnQ08lwkK9wSTwb2",
          "role": "admin"
        }
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        example: {
          "message": "Unauthorized",
          "statusCode": 401
        }
      },
    },
  })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
