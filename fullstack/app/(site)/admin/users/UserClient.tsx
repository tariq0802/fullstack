"use client";

import Container from "@/app/components/Container";
import { User } from "@prisma/client";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import UserEdit from "./UserEdit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useCallback } from "react";

interface PageClientProps {
  users: User[] | undefined;
}

const UserClient: React.FC<PageClientProps> = ({ users }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const onDelete = useCallback(
    (userId: string) => {
      axios
        .delete(`/api/users/${userId}`)
        .then(() => {
          toast.success("User deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    },
    [router]
  );

  return (
    <Container>
      {session?.user.role === "ADMIN" ? (
        <div>
          <div className="text-xl font-bold border-l-8 border-orange-500 text-neutral-600 pl-2 my-6">
            Total users: <span className="text-blue-500">{users?.length}</span>
          </div>
          <div>
            <table className="w-full border-2">
              <thead className=" text-base text-neutral-700">
                <tr className="border-b-2 bg-slate-100 text-left">
                  <th className="px-3 py-2">Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody className=" font-medium">
                {users &&
                  users.map((item) => (
                    <tr key={item.id} className="border-2">
                      <td className="px-3 py-2">
                        <Image
                          src={item.image || "/images/placeholder.jpg"}
                          alt="Photo"
                          height={30}
                          width={30}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      {item.role === "ADMIN" ? (
                        <td className="text-rose-500">{item.role}</td>
                      ) : (
                        <td>{item.role}</td>
                      )}
                      <td className="flex gap-4 pt-4">
                        <UserEdit user={item} />
                        <MdDeleteForever
                          onClick={() => onDelete(item.id)}
                          className="text-rose-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold w-full flex items-center justify-center h-[70vh]">
          You are not permitted to access this page
        </div>
      )}
    </Container>
  );
};
export default UserClient;
