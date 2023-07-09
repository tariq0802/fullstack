import { User, Article, Tag, Category } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type AdminArticle = Article & {
  author: User;
  tags: Tag[];
  category: Category
};
