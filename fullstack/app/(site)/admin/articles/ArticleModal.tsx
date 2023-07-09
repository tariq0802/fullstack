"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/buttons/Button";
import Content from "@/app/components/inputs/Content";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { Article, Category, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";

enum STEPS {
  DETAILS = 0,
  CONTENT = 1,
}

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
  article?: Article & { category: Category };
  tags: Tag[];
  categories: Category[];
  link: string;
  values: {};
  method?: string;
  imageLink?: string | null | undefined;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  isOpen,
  onClose,
  modalTitle,
  article,
  tags,
  categories,
  link,
  values,
  method,
  imageLink,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState(imageLink || "");
  const [step, setStep] = useState(STEPS.DETAILS);
  const imageUrl = "https://career-guidance-space.s3.ap-south-1.amazonaws.com/";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: values,
  });

  const articletags = watch("articletags");
  const categoryId = watch("categoryId");
  const content = watch("content");
  const title = watch("title");

  useEffect(() => {
    const slugifiedTitle = slugify(title, { lower: true });
    setValue("slug", slugifiedTitle);
  }, [title, setValue]);

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
        setUploadUrl(imageUrl + data.fileName);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    }
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = { ...data, image: uploadUrl };
    if (step !== STEPS.CONTENT) {
      return onNext();
    }
    if (method === "PUT") {
      axios
        .patch(link, formData)
        .then(() => {
          toast.success("Article edited successfully!");
          reset();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setIsLoading(false);
          window.location.reload()
        });
      } else {
        axios
        .post(link, formData)
        .then(() => {
          toast.success("Article created!");
          reset();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setIsLoading(false);
          window.location.reload()
        });
    }
  };

  let body = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Photo</label>
        <div className="flex justify-between pt-2">
          <ImageUpload
            uploadUrl={uploadUrl}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm font-medium">
        <label htmlFor="featured">Featured?</label>
        <input type="checkbox" id="featured" {...register("featured")} />
      </div>
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <input type="hidden" {...register("slug")} />
      <Select
        disabled={isLoading}
        label="Category"
        options={categories.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
        onChange={(value) =>
          setValue("categoryId", value.value, {
            shouldValidate: true,
          })
        }
        isMulti={false}
        value={categoryId.value}
        defaultValue={{
          value: article?.category?.id,
          label: article?.category?.name,
        }}
      />

      <div>
        <label className=" text-sm font-medium">Description</label>
        <textarea
          id="description"
          rows={5}
          {...register("description")}
          placeholder="Description"
          className=" border-2 rounded-md p-2 mt-2 w-full focus:border-gray-500 col-span-3"
        ></textarea>
      </div>
    </div>
  );

  if (step === STEPS.CONTENT) {
    body = (
      <div className="space-y-6">
        <Select
          disabled={isLoading}
          label="Tags"
          options={tags.map((tag) => ({
            value: tag.id,
            label: tag.name,
          }))}
          onChange={(value) =>
            setValue("articletags", value, {
              shouldValidate: true,
            })
          }
          isMulti={true}
          value={articletags}
        />
        <div>
          <Content
            id="content"
            value={content}
            disabled={isLoading}
            onChange={(value) => {
              setValue("content", value, { shouldValidate: true });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>{body}</div>
          <div className="flex flex-row gap-6">
            {step === STEPS.CONTENT && (
              <Button fullWidth onClick={onBack}>
                Back
              </Button>
            )}
            <Button
              fullWidth
              onClick={step === STEPS.CONTENT ? handleSubmit(onSubmit) : onNext}
            >
              {step === STEPS.CONTENT ? "Continue" : "Next"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default ArticleModal;
