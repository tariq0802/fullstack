import Container from "@/app/components/Container";
import prisma from "@/app/libs/prismadb";

const UserArticle = async ({ params }: { params: { id: string } }) => {
  const articles = await prisma?.article.findMany({
    where: { authorId: params.id },
    include: { author: true },
  });

  console.log(articles);

  return (
    <Container>
      {articles?.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </Container>
  );
};

export default UserArticle;
