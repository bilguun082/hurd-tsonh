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
        "https://hurd-tsonh.vercel.app/complaint/sendmail",
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
              className="block max-w-[20rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
            >
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat w-full h-[15rem]"
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
                  <h1>Тайлбар</h1>
                  <p>{e?.apartmentCode}</p>
                  <p>{e?.windowType}</p>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setComplaintId(e._id);
                      setShowModal(true);
                    }}
                  >
                    Send to
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Modal Title</h3>
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
                              : "Явуулах компани"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
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
                        Close
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
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      ) : (
        <div className="max-screen h-full grid grid-cols-3">
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
                  <p>{e?.apartmentCode}</p>
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
