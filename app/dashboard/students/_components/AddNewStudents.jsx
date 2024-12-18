"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function AddNewStudents() {
  const [open, setOpen] = useState(false);
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
              <div className="grid gap-4 py-4 text-black font-bold">
                <label>Full Name</label>
                <Input placeholder="Enter Full Name" />
              </div>

              <div className="flex gap-2 flex-col">
                <label>Select Grade</label>
                <select className="p-2 border rounded-lg font-bold">
                  <option value={"5th"}>5th</option>
                  <option value={"6th"}>6th</option>
                  <option value={"7th"}>7th</option>
                  <option value={"8th"}>8th</option>
                </select>
              </div>
              <div className="grid gap-4 py-4 text-black font-bold">
                <label>Contact Number</label>
                <Input placeholder="Enter Contact Number" />
              </div>
              <div className="grid gap-4 py-4 text-black font-bold">
                <label>Address</label>
                <Input placeholder="Enter Address" />
              </div>

              <div className="flex justify-end gap-3 items-center mt-4">
                <Button
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                  onClick={() => setOpen(false)}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                  onClick={() => console.log("Save")}
                >
                  Save
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudents;
