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
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [company, setCompany] = useState("");
  const [complaint, setComplaint] = useState({});
  const router = useRouter();

  const sendPostToCompanies = async () => {
    // console.log(complaintId);
    try {
      const res = await axios.put(
        `https://hurd-backend.onrender.com/complaint/send/${company}`,
        {
          complaintId: params._id,
        }
      );
      toast.success("Таны хүсэлт амжилттай илгээгдлээ.");
      console.log(res);
    } catch (error) {
      toast.error("Таны хүсэлтийг илгээхэд алдаа гарлаа.");
      console.log(error);
    }
  };

  const sendEmail = async () => {
    try {
      const res = await axios.post(
        "https://hurd-tsonh.vercel.app/complaint/sendmail",
        {
          text: `https://hurd-tsonh.vercel.app/dashboard${params._id}`,
          user: "dulamerdenet@gmail.com",
          sender: "bilguune060829@gmail.com",
        }
      );
      toast.success("Таны хүсэлт амжилттай илгээгдлээ.");
      console.log(res);
    } catch (error) {
      toast.error("Таны хүсэлтийг илгээхэд алдаа гарлаа.");
      console.log(error);
    }
  };

  const setAsDone = async () => {
    try {
      const res = await axios.put(
        `https://hurd-tsonh.vercel.app/complaint/send/process/${params._id}`,
        {
          process: "done",
        }
      );
      const response = await axios.post(
        "https://hurd-tsonh.vercel.app/complaint/sendmail",
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
        />
        <p>Боломжтой цаг: {complaint?.possibilityTime}</p>
        <p> Янзлуулах цонх:{complaint?.windowType}</p>
        <p>Үйл явц: {complaint?.process}</p>
        {role === "admin" ? (
          <div>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
            >
              Явуулах
            </Button>
          </div>
        ) : (
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
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Явуулах</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {value
                            ? frameworks.find(
                                (framework) => framework.value === value
                              )?.label
                            : "Компани сонгох"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="сонгох..." />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.label}
                                onSelect={() => {
                                  setValue(
                                    framework.value === value
                                      ? ""
                                      : framework.value
                                  );
                                  setCompany(
                                    framework.label === company
                                      ? ""
                                      : framework.label
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    value === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {framework.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Хаах
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setValue("");
                        sendPostToCompanies();
                        sendEmail();
                      }}
                    >
                      Явуулах
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ComplaintDetails;
