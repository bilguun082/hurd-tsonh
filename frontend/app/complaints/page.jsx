"use client";

import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/combobox";
import { InputFile } from "@/components/inputFile";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase.config";
import { Calendar as CalendarIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
import Cookies from "js-cookie";
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function Home() {
  const [date, setDate] = useState();
  const router = useRouter();
  const [data, setData] = useState({
    phoneNumber: "",
    email: "",
    possibilityTime: "",
  });
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const handleSelectedFile = (files) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);

      console.log(files[0]);
    } else {
      message.error("File size to large");
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url);
          });
        }
      );
    } else {
      message.error("File not found");
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  const [value, setValue] = useState("");

  const [open, setOpen] = useState(false);

  const createComplaint = async () => {
    try {
      const apartmentCode = Cookies.get("apartmentCode");
      const res = await axios.post(`http://localhost:4000/complaint/create`, {
        apartmentCode: apartmentCode,
        phoneNumber: data.phoneNumber,
        email: data.email,
        windowType: value,
        picture: downloadURL,
        date: date,
        possibilityTime: data.possibilityTime,
      });
      console.log(res);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-screen h-3/4 flex flex-col justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // createComplaint();
          // router.push("/");
        }}
      >
        <p className="mt-5 mb-5">Дугаараа бичнэ үү.</p>
        <Input
          placeholder="Утасны дугаар..."
          className="w-100"
          type="number"
          value={data.phoneNumber}
          onChange={(e) => {
            setData({ ...data, phoneNumber: e.target.value });
          }}
        />
        <p className="mt-5 mb-5">Цахим хаягаа бичнэ үү.</p>
        <Input
          placeholder="Email хаяг..."
          className="w-100"
          type="email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <p className="mt-5 mb-5">Янзлуулах цонхоо сонгоно уу.</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Янзлуулах цонх"}
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
                    key={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <p className="mt-5 mb-5">Зураг оруулна уу.</p>

        <div>
          <Input
            type="file"
            placeholder="Select file to upload"
            accept="image/png"
            onChange={(files) => handleSelectedFile(files.target.files)}
          />

          <div>
            {imageFile && (
              <>
                <div
                  extra={[
                    <Button
                      key="btnRemoveFile"
                      onClick={handleRemoveFile}
                      type="text"
                      icon={<i className="fas fa-times"></i>}
                    />,
                  ]}
                >
                  <div
                    title={imageFile.name}
                    description={`Size: ${imageFile.size}`}
                  />
                </div>
                <Progress value={progressUpload} />

                <div className="text-right mt-3">
                  <Button
                    loading={isUploading}
                    type="primary"
                    onClick={handleUploadFile}
                  >
                    Upload
                  </Button>
                </div>
              </>
            )}

            {downloadURL && (
              <>
                <img
                  src={downloadURL}
                  alt={downloadURL}
                  style={{ width: 200, height: 200, objectFit: "cover" }}
                />
                {/* <p className="mt-5 mb-5">{downloadURL}</p> */}
              </>
            )}
          </div>
        </div>
        <p className="mt-5 mb-5">Засвар хийлгэх боломжтой өдрөө сонгоно уу.</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p className="mt-5 mb-5">Янзлуулах боломжтой цагаа хэлнэ үү.</p>
        <Input
          placeholder="Боломжит цаг..."
          className="w-100 mb-5"
          value={data.possibilityTime}
          onChange={(e) => {
            setData({ ...data, possibilityTime: e.target.value });
          }}
        />
        <Button
          onClick={() => {
            createComplaint();
          }}
        >
          Илгээх
        </Button>
      </form>
    </div>
  );
}
