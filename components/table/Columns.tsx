"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Appointment } from "@/types/appwrite.types"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"
import { Doctors } from "@/constant"
import { AppointmentModal } from "../AppointmentModal"


export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'شماره',
    cell: ({ row }) => <p className="text-14-regular">{row.index + 1}</p>
  },
  {
    accessorKey: "patient",
    header: 'نام بیمار',
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patient?.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    }
  },
  {
    accessorKey: "schedule",
    header: "قرار ملاقات",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    }
  },
  {
    accessorKey: "primaryPhysician",
    header: "دکتر",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">دکتر. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">عملیات</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patient?.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
          />
          <AppointmentModal
            patientId={appointment.patient?.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
          />
        </div>
      );
    },
  },
]
