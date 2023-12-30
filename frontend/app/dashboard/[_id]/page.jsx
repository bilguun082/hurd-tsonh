"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
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

const ComplaintDetails = () => {
  const params = useParams();
  const { role } = useAuth();
  const [complaint, setComplaint] = useState({});
  const router = useRouter();

  const setAsDone = async () => {
    try {
      const res = await axios.put(
        `https://hurd-backend.onrender.com/complaint/send/process/${params._id}`,
        {
          process: "done",
        }
      );
      const response = await axios.post(
        "https://hurd-backend.onrender.com/complaint/sendmail",
        {
          text: `https://hurd-tsonh.vercel.app/dashboard${params._id}`,
          user: "dulamsuren.tsa@gmail.com",
          sender: "bilguune060829@gmail.com",
        }
      );
      toast.success("Таны хүсэлт амжилттай илгээгдлээ.");
      console.log(res);
      console.log(response);
    } catch (error) {
      toast.error("Таны хүсэлтийг илгээхэд алдаа гарлаа.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (role === null) {
      router.push("/organization");
      return;
    }
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `https://hurd-backend.onrender.com/complaint/${params._id}`
        );
        // console.log(data.complaint[0]);
        setComplaint(data.complaint[0]); // Update the complaint state with fetched data
      } catch (error) {
        toast.error("Таны хүсэлтийг илгээхэд алдаа гарлаа.");
        console.error(error);
      }
    };
    fetchPost(); // Call fetchPost only if id is available
  }, []);

  return (
    <div className="h-screen w-screen p-10">
      <Toaster richColors />
      <div className="h-full w-full flex flex-col align-middle gap-5">
        <h1>Гомдолын тайлбар</h1>
        {/* Display details using the fetched data */}
        <p>Цахим хаяг: {complaint?.email}</p>
        <p>Утасны дугаар 1: {complaint?.firstPhoneNumber}</p>
        <p>Утасны дугаар 2: {complaint?.secondPhoneNumber}</p>
        <p>Байрны дугаар: {complaint?.apartmentCode}</p>
        <p>Огноо: {complaint?.date}</p>
        <p>Зураг:</p>
        <img
          className="rounded-t-lg"
          src={complaint?.picture}
          alt="Complaint"
          width={400}
          height={400}
        />
        <p>Боломжтой цаг: {complaint?.possibilityTime}</p>
        <p> Янзлуулах цонх:{complaint?.windowType}</p>
        <p>Үйл явц: {complaint?.process}</p>
        {role === "admin" ? null : (
          <div>
            <Button
              onClick={() => {
                setAsDone();
              }}
            >
              Дууссан гэж тэмдэглэх
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetails;
