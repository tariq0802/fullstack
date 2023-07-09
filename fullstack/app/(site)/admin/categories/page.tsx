import Container from "@/app/components/Container";
import prisma from "@/app/libs/prismadb";
import CreateCategory from "./CreateCategory";
import CategoriesClient from "./CategoriesClient";

const CategoryPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <Container>
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold border-l-8 border-orange-500 text-neutral-600 pl-2 my-6">
          Total categories: <span className="text-blue-500">{categories.length}</span>
        </div>
        <CreateCategory />
      </div>
      <CategoriesClient categories={categories} />
    </Container>
  );
};

export default CategoryPage;
