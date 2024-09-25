import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: number, page: number) {
    try {
      const pageSize = 50;
      const homes = await this.prisma.home.findMany({
        where: {
          home_users: {
            some: {
              user: {
                id: userId,
              },
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const count = await this.prisma.home.count({
        where: {
          home_users: {
            some: {
              user: {
                id: userId,
              },
            },
          },
        },
      });

      return { success: true, status: 200, totalPages: Math.ceil(count/50), homes };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUsers(homeId: number, userIds: number[]) {
    try {
      await this.prisma.home_users.deleteMany({
        where: {
          home_id: homeId,
        },
      });
      const newHomeUsers = userIds.map((userId) => ({
        user_id: userId,
        home_id: homeId,
      }));
      const homeUsers = await this.prisma.home_users.createMany({
        data: newHomeUsers,
      });

      return { success: true, status: 200, homeUsers };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
