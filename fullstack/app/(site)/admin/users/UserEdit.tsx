import Modal from "@/app/components/Modal";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdManageAccounts } from "react-icons/md";

interface UserEditProps {
  user: User;
}

const UserEdit: React.FC<UserEditProps> = ({ user }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { name: "ADMIN" },
    { name: "MEMBER" },
    { name: "AUTHOR" },
    { name: "USER" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      role: user.role,
    },
  });

  const role = watch("role");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .put(`/api/users/${user.id}`, data)
      .then(() => {
        toast.success("User managed successfully!!!");
        router.refresh();
        setIsOpen(false);
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <MdManageAccounts
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-500 cursor-pointer"
      />
      <div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Manage User"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Select
              disabled={isLoading}
              label="Role"
              options={roles.map((item: any) => ({
                value: item.name,
                label: item.name,
              }))}
              onChange={(value) =>
                setValue("role", value.value, {
                  shouldValidate: true,
                })
              }
              isMulti={false}
              value={role?.value}
              defaultValue={{
                value: user.role,
                label: user.role,
              }}
            />
            <Button fullWidth type="submit">
              Manage
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};
export default UserEdit;
