import { Article, Category, Tag } from "@prisma/client";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import ArticleModal from "./ArticleModal";

interface UserEditProps {
  article: Article & {
    category: Category;
    tags: Tag[];
  };
  tags: Tag[];
  categories: Category[];
}

const EditCategory: React.FC<UserEditProps> = ({
  article,
  tags,
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const values = {
    title: article.title,
    slug: article.slug,
    description: article.description,
    categoryId: article.categoryId,
    articletags: article?.tags?.map((tag: any) => ({
      value: tag.id,
      label: tag.name,
    })),
    content: article.content,
    featured: article.featured,
  };

  return (
    <div>
      <AiOutlineEdit
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-500 cursor-pointer"
      />
      <div>
        {isOpen && (
          <ArticleModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            modalTitle="Edit Article"
            tags={tags}
            categories={categories}
            link={`/api/articles/${article.slug}`}
            values={values}
            imageLink={article.image}
            method="PUT"
            article={article}
          />
        )}
      </div>
    </div>
  );
};
export default EditCategory;
