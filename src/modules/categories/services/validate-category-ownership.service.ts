import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../../shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId) {
    const isOwner = await this.categoryRepository.findFirst({
      where: { userId, id: categoryId },
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found');
    }
  }
}
