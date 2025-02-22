import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
  verify: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
        {
          provide: JwtService,
          useFactory: mockJwtService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('UserService mavjud bo‘lishi kerak', () => {
    expect(userService).toBeDefined();
  });

  describe('register', () => {
    it('foydalanuvchini ro‘yxatdan o‘tkazishi kerak', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 12);

      jest.spyOn(userRepository, 'create').mockReturnValue({ email, password: hashedPassword } as any);
      jest.spyOn(userRepository, 'save').mockResolvedValue({ email, password: hashedPassword } as any);


      const result = await userService.register(email, password);

      expect(userRepository.create).toHaveBeenCalledWith({ email, password: expect.any(String) });
      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ email, password: hashedPassword });
    });
  });

  describe('login', () => {
    it('foydalanuvchini tizimga kiritishi kerak', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 12);
      const mockUser = { id: 1, email, password: hashedPassword };

      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');

      const result = await userService.login(email, password);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(jwtService.sign).toHaveBeenCalledWith({ email: mockUser.email, userId: mockUser.id });
      expect(result).toEqual({ token: 'test-token' });
    });

    it('notog‘ri email bo‘lsa xatolik qaytarishi kerak', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => { throw new Error('Invalid token'); });
      await expect(userService.login('wrong@example.com', 'password123')).rejects.toThrow('user not found');
    });
  });


    it('Yaroqsiz token bo‘lsa, xatolik qaytarishi kerak', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => { throw new Error('Invalid token'); });
      await expect(userService.getCurrentUser('invalid-token')).rejects.toThrow('Invalid token');
    });
  });
