import Modal from "@/app/components/Modal";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import { Tag } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import slugify from "slugify";

interface UserEditProps {
  tag: Tag;
}

const EditTag: React.FC<UserEditProps> = ({ tag }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: tag.name,
      slug: tag.slug,
    },
  });

  const name = watch("name");

  useEffect(() => {
    const slugifiedName = slugify(name, { lower: true });
    setValue("slug", slugifiedName);
  }, [name, setValue]);


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .put(`/api/tags/${tag.id}`, data)
      .then(() => {
        toast.success("Tag Update successfully!!!");
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
      <AiOutlineEdit
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-500 cursor-pointer"
      />
      <div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Manage Tag"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <input type="hidden" {...register("slug")} />
            <Button fullWidth type="submit">
              Edit
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};
export default EditTag;
