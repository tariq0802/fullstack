import Container from "@/app/components/Container";
import CreateTag from "./CreateTag";
import prisma from "@/app/libs/prismadb";
import TagsClient from "./TagsClient";

const TagPage = async () => {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <Container>
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold border-l-8 border-orange-500 text-neutral-600 pl-2 my-6">
          Total tags: <span className="text-blue-500">{tags.length}</span>
        </div>
        <CreateTag />
      </div>
      <TagsClient tags={tags} />
    </Container>
  );
};

export default TagPage;
