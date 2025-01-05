import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService:AuthService
    ) {}

    @Post('signup')
    @ApiOperation({summary:"Register New User"})
    @ApiResponse({
        status:201,
        description:"it will return user in response"
    })
    async signup(@Body() userDTO: CreateUserDto): Promise<User> {
        return this.userService.create(userDTO);
    }

    @Post("login")
    @ApiOperation({summary:"Login User"})
    @ApiResponse({
        status:200,
        description:"It Will give you the access_token in the response"
    })
    async login(
        @Body() loginDTO: LoginDTO
    ){
        return this.authService.login(loginDTO);
    }

    @Get("enable-2fa")
    @UseGuards(JwtAuthGuard)
    enable2FA(
        @Request()
        req,
    ):Promise<Enable2FAType>{
        console.log(req.user);
        return this.authService.enable2FA(req.user.userId);
    }

    @Post("validate-2fa")
    @UseGuards(JwtAuthGuard)
    vlidate2FA(
        @Request()
        req,
        @Body()
        validateTokenDTO:ValidateTokenDTO,
    ):Promise<{verified:boolean}>{
        return this.authService.validate2FAToken(
            req.user.userId,
            validateTokenDTO.token
        )
    }

    @Get("disable-2fa")
    @UseGuards(JwtAuthGuard)
    disable2FA(
        @Request()
        req,
    ):Promise<UpdateResult>{
        const userId = req.user.userId;
        return this.authService.disable2FA(userId);
    }

    @Get("profile")
    @UseGuards(AuthGuard("bearer"))
    getProfile(
        @Request()
        req,
    ){
        delete req.user.password;
        return{
            msg:"authenticated with api key",
            user:req.user
        }
    }

    @Get("test")
    testEnvVariable(){
        return this.authService.getEnvVariable();
    }
}
