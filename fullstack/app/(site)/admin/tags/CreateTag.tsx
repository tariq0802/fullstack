"use client";

import Modal from "@/app/components/Modal";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import slugify from "slugify";

interface CreateTagProps {}

const CreateTag: React.FC<CreateTagProps> = ({}) => {
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
      name: "",
      slug: "",
    },
  });

  const name = watch("name");

  useEffect(() => {
    const slugifiedName = slugify(name, { lower: true });
    setValue("slug", slugifiedName);
  }, [name, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post(`/api/tags`, data)
      .then(() => {
        toast.success("Tag Created successfully!!!");
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
      <Button onClick={() => setIsOpen(!isOpen)}>Create</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Tag"
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
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default CreateTag;
