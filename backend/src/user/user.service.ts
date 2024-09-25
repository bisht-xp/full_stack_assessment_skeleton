import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return { success: true, status: 200, users };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByHome(homeId: number) {
    try {
      const userHomes = await this.prisma.user.findMany({
        where: {
         home_users: {
          some: {
            home: {
              id: homeId
            }
          }
         }
        },
      });
      return { success: true, status: 200, userHomes };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
