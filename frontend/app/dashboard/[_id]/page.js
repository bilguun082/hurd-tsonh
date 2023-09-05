"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
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

const ComplaintDetails = () => {
  const params = useParams();
  const { role } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [company, setCompany] = useState("");
  const [complaint, setComplaint] = useState({}); // Initialize with an empty object

  const sendPostToCompanies = async () => {
    console.log(company);
    // console.log(complaintId);
    try {
      const res = await axios.put(
        `http://localhost:4000/complaint/send/${company}`,
        {
          complaintId: params._id,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/complaint/${params._id}`
        );
        console.log(data.complaint[0]);
        setComplaint(data.complaint[0]); // Update the complaint state with fetched data
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost(); // Call fetchPost only if id is available
  }, []);

  return (
    <div className="h-screen w-screen p-5">
      <div className="h-full w-full flex flex-col align-middle gap-5">
        <h1>Гомдолын тайлбар</h1>
        {/* Display details using the fetched data */}
        <p>Цахим хаяг: {complaint?.email}</p>
        <p>Утасны дугаар: {complaint?.phoneNumber}</p>
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
        ) : null}
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
                            : "Select Framework"}
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
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   try {
//     const { data } = await axios.get(`http://localhost:4000/complaint/${id}`);
//     return {
//       props: {
//         complaint: data,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       notFound: true,
//     };
//   }
// }

export default ComplaintDetails;
