"use client";

import { Category, Tag } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import EditCategory from "./EditCategory";

interface TagsClientProps {
  categories: Category[];
}

const TagsClient: React.FC<TagsClientProps> = ({ categories }) => {
  const router = useRouter();

  const onDelete = useCallback(
    (categoryId: string) => {
      axios
        .delete(`/api/categories/${categoryId}`)
        .then(() => {
          toast.success("Category deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    },
    [router]
  );

  return (
    <table className="w-full border-2">
      <thead className=" text-base text-neutral-700">
        <tr className="border-b-2 bg-slate-100 text-left">
          <th className="px-3 py-2">Photo</th>
          <th className="px-3 py-2">Name</th>
          <th className="text-center">Articles</th>
          <th className="text-right px-3">Manage</th>
        </tr>
      </thead>
      <tbody className=" font-medium">
        {categories &&
          categories.map((item) => (
            <tr key={item.id} className="border-2">
              <td className="px-3 py-2">
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt="Photo"
                  height={30}
                  width={30}
                  style={{objectFit: 'cover', overflow: 'hidden'}}
                />
              </td>
              <td className="px-3 py-2">{item.name}</td>
              <td className="text-center">0</td>

              <td className="flex gap-6 pt-2 items-center justify-end px-3">
                <EditCategory category={item} />
                <MdDeleteForever
                  onClick={() => onDelete(item.id)}
                  className="text-rose-500 cursor-pointer"
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default TagsClient;
