"use client";

import { Button } from "@nextui-org/react";
import WindowType from "@/components/windowType";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/react";
import DatePicker from "@/components/date";
import Cookies from "js-cookie";
import FileUploadSection from "@/components/uploadImage";
import { toast, Toaster } from "sonner";
import { basicSchema } from "@/schemas";

export default function Home() {
  const { values, handleBlur, touched, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues: {
        firstPhoneNumber: "",
        secondPhoneNumber: "",
        email: "",
        windowType: "",
        comment: "",
        possibilityTime: "",
      },
      validationSchema: basicSchema(),
      // onSubmit,
    });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [date, setDate] = useState(null);

  const sendEmail = async () => {
    try {
      const res = await axios.post(
        "https://hurd-backend.onrender.com/complaint/sendmail",
        {
          text: `https://hurd-tsonh.vercel.app/dashboard`,
          user: "bilguunerdenet0829@gmail.com",
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

  const createComplaint = async () => {
    try {
      const apartment = Cookies.get("apartment");
      const floor = Cookies.get("floor");
      const number = Cookies.get("number");
      if (
        Object.keys(errors).length === 0 &&
        downloadUrls !== [] &&
        date !== null
      ) {
        let company = "";
        if (apartment === "101" || apartment === "104") {
          company = "Sodon-Sanaa";
        } else if (apartment === "102") {
          company = "Europlast";
        } else if (apartment === "103") {
          company = "Master-Window";
        }
        const res = await axios.post(
          `https://hurd-backend.onrender.com/complaint/create`,
          {
            apartmentCode: apartment + floor + number,
            firstPhoneNumber: values.firstPhoneNumber,
            secondPhoneNumber: values.secondPhoneNumber,
            email: values.email,
            windowType: values.windowType,
            comment: values.comment,
            picture: downloadUrls,
            date: date,
            possibilityTime: values.possibilityTime,
            company,
          }
        );
        sendEmail();
        toast.success("Хүсэлт амжилттай илгээгдлээ");
        setIsLoading(false);
        setTimeout(() => {
          toast("Бидэнд санал хүсэлтээ үлдээнэ үү.");
          router.push("/rate");
        }, 1000);
      } else {
        toast.error("Мэдээллээ бүрэн бөглөнө үү.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Хүсэлт илгээхэд алдаа гарлаа");
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center mt-[50px] pl-5 pr-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p className="mt-5 mb-5">Дугаараа бичнэ үү.</p>
        <Input
          placeholder="Утасны дугаар..."
          className="w-100 mb-5"
          type="number"
          name="firstPhoneNumber"
          errorMessage={
            errors.firstPhoneNumber && touched.firstPhoneNumber
              ? errors.firstPhoneNumber
              : null
          }
          value={values.firstPhoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          placeholder="Утасны дугаар..."
          className="w-100"
          type="number"
          variant="border"
          name="secondPhoneNumber"
          errorMessage={
            errors.secondPhoneNumber && touched.secondPhoneNumber
              ? errors.secondPhoneNumber
              : null
          }
          value={values.secondPhoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className="mt-5 mb-5">
          Цахим хаягаа бичнэ үү. Бид таны цонхонд засвар үйлчилгээ хийсэний
          дараа танд майл явуулах болно.
        </p>
        <Input
          placeholder="Email хаяг..."
          className="w-100"
          type="email"
          name="email"
          errorMessage={errors.email && touched.email ? errors.email : null}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className="mt-5 mb-5">Янзлуулах цонхоо сонгоно уу.</p>
        <WindowType value={values.windowType} handleChange={handleChange} />

        <div>
          <p className="mt-5 mb-5">Яаж янзлуулахаа тодорхой бичнэ үү.</p>

          <Textarea
            value={values.comment}
            onChange={handleChange}
            name="comment"
            onBlur={handleBlur}
            errorMessage={errors.comment}
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
          name="possibilityTime"
          value={values.possibilityTime}
          onChange={handleChange}
          errorMessage={
            errors.possibilityTime && touched.possibilityTime
              ? errors.possibilityTime
              : null
          }
          onBlur={handleBlur}
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
      <Toaster richColors />
    </div>
  );
}
