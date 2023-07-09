import UserClient from "./UserClient";
import prisma from "@/app/libs/prismadb";

const UsersPage = async () => {
  const users = await prisma?.user.findMany({
    orderBy: {
      role: "desc",
    },
  });
  return (
    <div>
      <UserClient users={users} />
    </div>
  );
};

export default UsersPage;
