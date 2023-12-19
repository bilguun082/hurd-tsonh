"use client";

import { Button } from "@nextui-org/react";
import WindowType from "@/components/windowType";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/react";
import DatePicker from "@/components/date";
import Cookies from "js-cookie";
import FileUploadSection from "@/components/uploadImage";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [date, setDate] = useState();
  const router = useRouter();
  const [data, setData] = useState({
    firstPhoneNumber: "",
    secondPhoneNumber: "",
    email: "",
    comment: "",
    possibilityTime: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  const createComplaint = async () => {
    try {
      const apartment = Cookies.get("apartment");
      const floor = Cookies.get("floor");
      const number = Cookies.get("number");
      const res = await axios.post(
        `https://hurd-tsonh.vercel.app/complaint/create`,
        {
          apartmentCode: apartment + floor + number,
          firstPhoneNumber: data.firstPhoneNumber,
          secondPhoneNumber: data.secondPhoneNumber,
          email: data.email,
          windowType: value,
          comment: data.comment,
          picture: downloadUrls,
          date: date,
          possibilityTime: data.possibilityTime,
        }
      );
      toast.success("Хүсэлт амжилттай илгээгдлээ");
      setIsLoading(false);
      console.log(res);
      router.push("/");
    } catch (error) {
      toast.error("Хүсэлт илгээхэд алдаа гарлаа");
      console.log(error.message);
    }
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center mt-[50px] pl-5 pr-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="mt-5 mb-5">Дугаараа бичнэ үү.</p>
        <Input
          placeholder="Утасны дугаар..."
          className="w-100 mb-5"
          type="number"
          value={data.firstPhoneNumber}
          onChange={(e) => {
            setData({ ...data, firstPhoneNumber: e.target.value });
          }}
        />
        <Input
          placeholder="Утасны дугаар..."
          className="w-100"
          type="number"
          value={data.secondPhoneNumber}
          onChange={(e) => {
            setData({ ...data, secondPhoneNumber: e.target.value });
          }}
        />
        <p className="mt-5 mb-5">
          Цахим хаягаа бичнэ үү. Бид таны цонхонд засвар үйлчилгээ хийсэний
          дараа танд майл явуулах болно.
        </p>
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
        <WindowType value={value} onChange={(newValue) => setValue(newValue)} />
        <div>
          <p className="mt-5 mb-5">Яаж янзлуулахаа тодорхой бичнэ үү.</p>

          <Textarea
            value={data.comment}
            onChange={(e) => {
              setData({ ...data, comment: e.target.value });
            }}
            labelPlacement="outside"
            placeholder="Энд бичнэ үү."
            className="max-w-xs mt-5"
          />
        </div>
        <p className="mt-5 mb-5">Зураг оруулна уу.</p>
        <FileUploadSection
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          downloadUrls={downloadUrls}
          setDownloadUrls={setDownloadUrls}
        />
        <p className="mt-5 mb-5">Засвар хийлгэх боломжтой өдрөө сонгоно уу.</p>
        <DatePicker selectedDate={date} onSelect={setDate} />
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
            setIsLoading(true);
          }}
          isLoading={isLoading}
        >
          Илгээх
        </Button>
      </form>
      <Toaster richColors />
    </div>
  );
}
