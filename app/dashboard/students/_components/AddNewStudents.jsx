"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

function AddNewStudents() {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((resp) => {
      setGrades(resp.data);
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    GlobalApi.CreateNewStudent(data).then((resp) => {
      //ini adalah untuk useStatenya
      console.log("---", resp);
      if (resp.data) {
        reset();
        setOpen(false);
        toast("New Student Added!", { position: "top-center" });
      }
      setIsLoading(false);
    });
  };
  return (
    <div>
      <Button
        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
        onClick={() => setOpen(true)}
      >
        {" "}
        Add New Student
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4 text-black font-bold">
                  <label>Full Name</label>

                  <Input
                    placeholder="Enter Full Name"
                    {...register("name", { required: true })}
                  />
                </div>

                <div className="flex gap-2 flex-col">
                  <label>Select Grade</label>
                  <select
                    className="p-2 border rounded-lg font-bold"
                    {...register("grade", { required: true })}
                  >
                    {grades.map((item, index) => (
                      <option key={index} value={item.grade}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-4 py-4 text-black font-bold">
                  <label>Contact Number</label>

                  <Input
                    placeholder="Enter Contact Number"
                    type="number"
                    {...register("contact")}
                  />
                </div>
                <div className="grid gap-4 py-4 text-black font-bold">
                  <label>Address</label>
                  <Input
                    placeholder="Enter Address"
                    {...register("address", { required: true })}
                  />
                </div>

                <div className="flex justify-end gap-3 items-center mt-4">
                  <Button
                    type="button"
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                    onClick={() => setOpen(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                    type="submit"
                    disable={isLoading}
                  >
                    {isLoading ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudents;
