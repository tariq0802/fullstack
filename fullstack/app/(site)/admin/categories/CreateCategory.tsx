"use client";

import Modal from "@/app/components/Modal";
import Button from "@/app/components/buttons/Button";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import slugify from "slugify";

interface CreateCategoryProps {}

const CreateCategory: React.FC<CreateCategoryProps> = ({}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const imageUrl =
    "https://career-guidance-space.s3.ap-south-1.amazonaws.com/" + uploadUrl;

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
      description: "",
    },
  });

  const name = watch("name");

  useEffect(() => {
    const slugifiedName = slugify(name, { lower: true });
    setValue("slug", slugifiedName);
  }, [name, setValue]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setUploadUrl(data.fileName);
      } catch (error) {
        toast.error("Problem in image upload");
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {...data, image: imageUrl}
    axios
      .post(`/api/categories`, formData)
      .then(() => {
        toast.success("Tag Created successfully!!!");
        setIsOpen(false);
        router.refresh();
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
        title="Create Category"
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
          <ImageUpload
            imageUrl={imageUrl}
            uploadUrl={uploadUrl}
            onChange={handleFileChange}
          />
          <textarea
            id="description"
            rows={5}
            {...register("description")}
            placeholder="Description"
            className=" border-2 rounded-md p-2 w-full focus:border-gray-500 col-span-3"
          ></textarea>
          <Button fullWidth type="submit">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default CreateCategory;
