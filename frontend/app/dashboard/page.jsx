"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation"; // Correct import
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const frameworks = [
  {
    value: "Содон санаа ххк",
    label: "Sodon-Sanaa",
  },
  {
    value: "Мастер виндөв ххк",
    label: "Master-Window",
  },
  {
    value: "Ёвропласт ххк",
    label: "Europlast",
  },
];

export default function Home() {
  const { role, userData } = useAuth();
  const [info, setInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [company, setCompany] = useState("");
  const [complaintId, setComplaintId] = useState("");

  const sendEmail = async () => {
    try {
      const res = await axios.post(
        "https://hurd-backend.onrender.com/complaint/sendmail",
        {
          text: `https://hurd-tsonh.vercel.app/dashboard`,
          user: "dulamerdenet@gmail.com",
          sender: "bilguune060829@gmail.com",
        }
      );
      console.log(res);
      toast.success("Таны хүсэлт амжилттай илгээгдлээ.");
    } catch (error) {
      toast.error("Таны хүсэлтийг илгээхэд алдаа гарлаа.");
      console.log(error);
    }
  };

  const sendPostToCompanies = async () => {
    console.log(company);
    console.log(complaintId);
    try {
      const res = await axios.put(
        `https://hurd-backend.onrender.com/complaint/send/${company}`,
        {
          complaintId: complaintId,
        }
      );
      console.log(res);
      toast.success("Таны хүсэлт амжилттай илгээгдлээ.");
    } catch (error) {
      toast.error("Таны хүсэлтийг илгээхэд алдаа гарлаа.");
      console.log(error);
    }
  };
  console.log(role);
  console.log(userData);
  const router = useRouter();

  useEffect(() => {
    if (role === null) {
      toast.error("Та эхлээд нэвтэрнэ үү!.");
      router.push("/organization");
      return;
    }
    const getComplaints = async () => {
      try {
        const { data } = await axios.get(
          "https://hurd-backend.onrender.com/complaint/"
        );
        setInfo(data);
      } catch (error) {
        console.log(error, "asdfasdf");
      }
    };
    const getComplaintByUser = async () => {
      try {
        const { data } = await axios.get(
          `https://hurd-backend.onrender.com/complaint/company/${userData}`
        );
        setInfo(data.complaints);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (role === "admin") {
      getComplaints();
    } else {
      getComplaintByUser();
    }
  }, []);

  return (
    <div>
      <Toaster richColors />
      {role === "admin" ? (
        <div className="max-screen h-full flex flex-row justify-center md:justify-normal flex-wrap gap-10 pl-20 pt-10 pr-20">
          {info?.map((e, index) => (
            <div
              key={index}
              className="block w-[20rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
            >
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat w-full h-[15rem]"
                onClick={() => router.push(`/dashboard/${e._id}`)}
              >
                <img
                  className="rounded-t-lg"
                  src={e?.picture}
                  alt="Complaint"
                  fill={true}
                />
              </div>
              <div className="p-6 flex flex-row justify-between">
                <div onClick={() => router.push(`/dashboard/${e._id}`)}>
                  <h1>Тайлбар</h1>
                  <p>{e?.company}</p>
                  <p>{e?.windowType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-screen h-full flex flex-row justify-center md:justify-normal flex-wrap gap-10 pl-20 pt-10 pr-20">
          {info?.map((e, index) => (
            <div
              key={index}
              className="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
            >
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                onClick={() => router.push(`/dashboard/${e._id}`)}
              >
                <img
                  className="rounded-t-lg"
                  src={e?.picture}
                  alt="Complaint"
                />
              </div>
              <div className="p-6 flex flex-row justify-between">
                <div onClick={() => router.push(`/dashboard/${e._id}`)}>
                  <h1>Title</h1>
                  <p>{e?.company}</p>
                  <p>{e?.windowType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
