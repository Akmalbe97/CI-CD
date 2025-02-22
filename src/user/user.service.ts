import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  verificationCodeService: any;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //// Register
  async register(email: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 12);
    const createUser = this.userRepository.create({ email, password: hash });
    if (createUser) {
      throw new Error('User already exsist');
    }
    return await this.userRepository.save(createUser);
  }

  //// Login
  async login(email: string, password: string): Promise<{token: string}> {
    const user = await this.userRepository.findOne({where: {email}});
    if(!user) {
      throw new Error("user not found")
    }
    const checkPassword = await bcrypt.compare(password, user.password) 
    const payload = {email: user.email, userId: user.id}
    const token = this.jwtService.sign(payload)
    return {token}
  }

  //// parolni tiklash
  async forgotPassword(email: string): Promise<string> {
    return this.verificationCodeService.createVerificationCode(email);
  }
  ///// parolni tiklash uchun codeni tekshirish
  async verifyCode(email: string, code: string): Promise<boolean> {
    return this.verificationCodeService.verifyCode(email, code)
  }

  //// 
  findOneUser(id: number) {
    const data = this.userRepository.findOne({ where: { id } });

    if (data) {
      return data;
    }
    throw new NotFoundException('user not found');
  }

  async getCurrentUser(token: string): Promise<User> {
    const payload = this.jwtService.verify(token);
    if (!payload) {
      throw new Error('Invalid token');
    }
    const user = await this.userRepository.findOne(payload.userId);
    return user;
  }
 
}
