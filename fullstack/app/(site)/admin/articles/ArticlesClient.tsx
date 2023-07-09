"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import { AdminArticle } from "@/app/types";
import EditArticle from "./EditArticle";
import { Category, Tag } from "@prisma/client";
import Button from "@/app/components/buttons/Button";
import Modal from "@/app/components/Modal";
import ArticleModal from "./ArticleModal";

interface TagsClientProps {
  articles: AdminArticle[] | null;
  tags: Tag[];
  categories: Category[];
}

const ArticlesClient: React.FC<TagsClientProps> = ({
  articles,
  tags,
  categories,
}) => {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  console.log(articles);

  const createValues = {
    title: "",
    slug: "",
    description: "",
    categoryId: "",
    articletags: [],
    content: "",
    featured: false,
  };

  const onDelete = useCallback(
    (slug: string) => {
      axios
        .delete(`/api/articles/${slug}`)
        .then(() => {
          toast.success("Article deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    },
    [router]
  );

  return (
    <>
      <div className="flex justify-between items-center pb-3">
        <div className="text-xl font-bold border-l-8 border-orange-500 text-neutral-600 pl-2 my-6">
          Total articles: 
          <span className="text-blue-500"> {articles?.length}</span>
        </div>
        <div>
          <Button onClick={() => setCreateOpen(!createOpen)}>Create</Button>
        </div>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full  border-2">
          <thead className="font-medium text-base text-neutral-700">
            <tr className="border-b-2 bg-slate-100 text-left">
              <th className="px-3 py-2">Photo</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Featured</th>
              <th className="px-3 py-2">Author</th>
              <th className="text-right px-3">Manage</th>
            </tr>
          </thead>
          <tbody className="md:text-base text-sm">
            {articles &&
              articles.map((item) => (
                <tr key={item.id} className="border-2">
                  <td className="px-3 py-2">
                    <div className="relative h-20 w-28">
                      <Image
                        src={item.image || "/images/placeholder.jpg"}
                        alt="Photo"
                        fill
                        style={{ objectFit: "cover", overflow: "hidden" }}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2 ">
                    <div className="w-[35vw] h-[4.9rem] overflow-hidden">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-3 py-2">{item.category.name}</td>
                  <td className="px-3 py-2">
                    {item.featured === true ? "Yes" : "No"}
                  </td>
                  <td className="px-3 py-2">{item.author.name}</td>

                  <td className="flex gap-6 pt-8 items-center justify-end px-3">
                    <EditArticle
                      article={item}
                      tags={tags}
                      categories={categories}
                    />
                    <MdDeleteForever
                      onClick={() => onDelete(item.slug)}
                      className="text-rose-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {createOpen && (
        <ArticleModal
          isOpen={createOpen}
          onClose={() => setCreateOpen(false)}
          modalTitle="Create Article"
          tags={tags}
          categories={categories}
          link="/api/articles"
          values={createValues}
        />
      )}
    </>
  );
};

export default ArticlesClient;
