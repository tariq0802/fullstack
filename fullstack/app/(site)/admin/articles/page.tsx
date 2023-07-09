import Container from "@/app/components/Container";
import prisma from "@/app/libs/prismadb";
import ArticlesClient from "./ArticlesClient";

const CategoryPage = async () => {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      tags: true,
      category: true,
    },
  });
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <Container>
      <div className="flex justify-between items-center"></div>
      <ArticlesClient articles={articles} tags={tags} categories={categories} />
    </Container>
  );
};

export default CategoryPage;
