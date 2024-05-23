"use client";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/app/utils/supabaseClient"; // Ensure you have configured Supabase client
import { useToast } from "@/components/ui/use-toast"; // Import the useToast hook

export default function AddClientModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    price: "",
    totalSales: "",
    clientSince: "",
  });

  const { toast } = useToast(); // Destructure the toast function from useToast

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      status: value,
    }));
  };

  const handleTotalSalesChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      totalSales: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.from("new_clients").insert([
        {
          name: formData.name,
          status: formData.status,
          price: formData.price,
          total_sales: formData.totalSales,
          member_since: formData.clientSince,
        },
      ]);

      if (error) {
        console.error("Error inserting data: ", error);
        toast({
          title: "Error",
          description: "Failed to add client.",
          variant: "destructive",
        });
      } else {
        console.log("Data inserted successfully: ", data);
        toast({
          title: "Success",
          description: "Client added successfully.",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast({
        title: "Error",
        description: "Failed to add client.",
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
                <Card>
                  <CardHeader>
                    <CardTitle>Add Client</CardTitle>
                    <CardDescription>
                      Please fill in the details for the new client.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="grid gap-6"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={handleStatusChange}>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="text"
                          className="w-full"
                          value={formData.price}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="total-sales">Total Sales</Label>
                        <Select onValueChange={handleTotalSalesChange}>
                          <SelectTrigger
                            id="total-sales"
                            aria-label="Select total sales"
                          >
                            <SelectValue placeholder="Select total sales" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Recurring">Recurring</SelectItem>
                            <SelectItem value="One time">One time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="clientSince">Client Since</Label>
                        <Input
                          id="clientSince"
                          type="date"
                          className="w-full"
                          value={formData.clientSince}
                          onChange={handleChange}
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Client
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
