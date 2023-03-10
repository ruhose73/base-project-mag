import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto, TokenDto } from './dto';
import { JWTPayload } from './interfaces';
import { ExtractUserFromRequest } from 'src/common/decorators';
import { RefreshTokenGuard, RegisterGuard, LoginGuard } from './guards';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { confirmMessage } from '../mail/templates';

@ApiTags(`Авторизация`)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: `Авторизация` })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post('/login')
  @UseGuards(LoginGuard)
  async login(@ExtractUserFromRequest() user: JWTPayload): Promise<TokenDto> {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: `Регистрация` })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, type: TokenDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post('/register')
  @UseGuards(RegisterGuard)
  async register(
    @ExtractUserFromRequest() user: RegisterDto,
  ): Promise<TokenDto> {
    return this.authService.register(user);
  }

  @ApiOperation({ summary: `Обновление токенов` })
  @ApiHeader({
    name: 'Authorization',
    description: ' Bearer auth token',
    required: true,
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 401, description: `UNAUTHORIZED` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @ApiBearerAuth()
  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@ExtractUserFromRequest() user: JWTPayload): Promise<TokenDto> {
    return this.authService.refresh(user);
  }

  @Get('/activate/:link')
  async activate(@Param('link', ParseUUIDPipe) link: string) {
    return this.authService.activate(link);
  }
}
