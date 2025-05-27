"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import InputField from "../InputField";
import { createSubject, } from "@/lib/actions"; 
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";


const SubjectForm = ({
  type,
  data,
  setOpen
}: {
  type: "create" | "update";
  data?: any;
   setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction] = useFormState(
    createSubject,
    {
      success: false,
      error: false,
    }
  );

const onSubmit = handleSubmit((data) => {
  formAction(data);
});

const router = useRouter()

useEffect(() =>
{
  if (state.success)
  {
    toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
    setOpen(false);
    router.refresh();
  }
},[state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
      </div>
      {state.error && <span className="text-red-500">Something went wrong!</span>}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
