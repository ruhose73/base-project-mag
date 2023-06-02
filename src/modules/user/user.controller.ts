import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTPayload } from '../auth/interfaces';
import { ExtractUserFromRequest, Roles } from 'src/common/decorators';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UserDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { UserRole } from 'src/enums';

@ApiTags(`Пользователь`)
@Controller(`user`)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: `Получение пользователя` })
  @ApiHeader({
    name: 'Authorization',
    description: ' Bearer auth token',
    required: true,
  })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 401, description: `UNAUTHORIZED` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @ApiBearerAuth()
  @Get()
  @Roles(UserRole.User, UserRole.Manager,  UserRole.Admin)
  async getUserInfo(@ExtractUserFromRequest() user: JWTPayload):Promise<UserDto | null> {
    return await this.userService.getUserInfoById(user.id)
  }
}
