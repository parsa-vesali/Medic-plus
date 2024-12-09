"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";
import AppointmentForm from "./forms/AppointmentForm";

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
}: {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
}) => {
  const [open, setOpen] = useState(false);

  const content = {
    schedule: {
      title: "برنامه‌ریزی نوبت",
      description: "لطفاً جزئیات زیر را برای برنامه‌ریزی تأیید کنید.",
    },
    cancel: {
      title: "لغو نوبت",
      description: "آیا مطمئن هستید که می‌خواهید نوبت خود را لغو کنید؟",
    },
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-sky-500"}`}
        >
          {type === "schedule" ? "برنامه‌ریزی" : "لغو"}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader dir="rtl" className="mb-4 space-y-3 dialog-header">
          <DialogTitle >{content[type].title}</DialogTitle>
          <DialogDescription>{content[type].description}</DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
