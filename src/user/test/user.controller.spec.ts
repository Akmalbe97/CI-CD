import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import {LoginDto} from '../dto/login.dto'

const mockUserService = () => ({
  register: jest.fn(),
  login: jest.fn(),
  findOneUser: jest.fn(),
  getCurrentUser: jest.fn(),
});

describe('UserController', () => {
  let userController: UserController;
  let userService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useFactory: mockUserService }],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('UserController mavjud bo‘lishi kerak', () => {
    expect(userController).toBeDefined();
  });

  describe('register', () => {
    it('foydalanuvchini ro‘yxatdan o‘tkazishi kerak', async () => {
      const dto: CreateUserDto = { name: 'Test User', email: 'test@example.com', password: 'password123' };

      const result = { id: 1, ...dto };

      userService.register.mockResolvedValue(result);
      expect(await userController.register(dto)).toEqual(result);
      expect(userService.register).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });

  describe('login', () => {
    it('foydalanuvchini tizimga kiritishi kerak', async () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'password123' };
      const result = { token: 'test-token' };

      userService.login.mockResolvedValue(result);
      expect(await userController.login(dto)).toEqual(result);
      expect(userService.login).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });

  describe('getCurrentUser', () => {
    it('Token orqali foydalanuvchini qaytarishi kerak', async () => {
      const result = { id: 1, email: 'test@example.com' };

      userService.getCurrentUser.mockResolvedValue(result);
      expect(await userController.getCurrentUser('Bearer test-token')).toEqual(result);
      expect(userService.getCurrentUser).toHaveBeenCalledWith('test-token');
    });

    it('Agar token bo‘lmasa, xatolik qaytarishi kerak', async () => {
      await expect(userController.getCurrentUser('')).rejects.toThrow('Token required');
    });
  });
});
