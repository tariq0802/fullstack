import Modal from "@/app/components/Modal";
import Button from "@/app/components/buttons/Button";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import slugify from "slugify";

interface UserEditProps {
  category: Category;
}

const EditCategory: React.FC<UserEditProps> = ({ category }) => {
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
      name: category.name,
      slug: category.slug,
      image: category.image,
      description: category.description,
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
    const formData = { ...data, image: imageUrl };
    axios
      .put(`/api/categories/${category.id}`, formData)
      .then(() => {
        toast.success("Category Updated successfully!!!");
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
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-2">
                <ImageUpload
                  imageUrl={imageUrl}
                  uploadUrl={uploadUrl}
                  onChange={handleFileChange}
                />
              </div>
              <textarea
                id="description"
                rows={5}
                {...register("description")}
                placeholder="Description"
                className=" border-2 rounded-md p-2 w-full focus:border-gray-500 col-span-3"
              ></textarea>
            </div>
            <Button fullWidth type="submit">
              Edit
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};
export default EditCategory;
