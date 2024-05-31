"use client";
import { useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/app/utils/supabaseClient"; // Ensure you have configured Supabase client
import { useToast } from "@/components/ui/use-toast"; // Import the useToast hook

export default function AddEventModal({ open, onClose, onEventAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  const { toast } = useToast(); // Destructure the toast function from useToast

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.from("events").insert([
        {
          title: formData.title,
          description: formData.description,
          start_time: formData.start_time,
          end_time: formData.end_time,
        },
      ]);

      if (error) {
        console.error("Error inserting data: ", error);
        toast({
          title: "Error",
          description: "Failed to add event.",
          variant: "destructive",
        });
      } else {
        console.log("Data inserted successfully: ", data);
        toast({
          title: "Success",
          description: "Event added successfully.",
        });
        onClose();
        onEventAdded(data[0]);
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast({
        title: "Error",
        description: "Failed to add event.",
        variant: "destructive",
      });
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add Event
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please fill in the details for the new event.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <form
                    className="grid gap-6"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid gap-3">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        className="w-full"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        type="text"
                        className="w-full"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="start_time">Start Time</Label>
                      <Input
                        id="start_time"
                        type="datetime-local"
                        className="w-full"
                        value={formData.start_time}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="end_time">End Time</Label>
                      <Input
                        id="end_time"
                        type="datetime-local"
                        className="w-full"
                        value={formData.end_time}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Event
                  </Button>
                  <Button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
