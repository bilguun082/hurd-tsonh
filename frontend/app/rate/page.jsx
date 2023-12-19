"use client";
import { useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { setSeconds } from "date-fns";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [secondChecked, setSecondChecked] = useState(false);
  const [thirdChecked, setThirdChecked] = useState(false);
  const [fourthChecked, setFourthChecked] = useState(false);
  const [fifthChecked, setFifthChecked] = useState(false);
  const [sixthChecked, setSixthChecked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const createRate = async () => {
    try {
      const res = axios.post("https://hurd-tsonh.vercel.app/rate/", {
        rateForWindow: first,
        rateForService: second,
        feedback,
      });
      setFeedback("");
      toast.success("Таны хүсэлт амжилттай илгээгдлээ.");
      setIsChecked(false);
      setSecondChecked(false);
      setThirdChecked(false);
      setFourthChecked(false);
      setFifthChecked(false);
      setSixthChecked(false);
      console.log(res);
    } catch (error) {
      toast.error("Таны хүсэлтийг илгээхэд алдаа гарлаа!.");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center p-10 justify-start flex-col">
      <Toaster richColors />
      <div className="w-[400px] h-full flex flex-col gap-5 items-start">
        <p>Бидний угсарсан цонхны ажилд үнэлгээ өгнө үү.</p>
        <div className="w-[300px] flex justify-between">
          <Checkbox
            size="md"
            isSelected={isChecked}
            onValueChange={setIsChecked}
            onClick={() => {
              setFirst("сайн");
            }}
          >
            Сайн
          </Checkbox>
          <Checkbox
            size="md"
            isSelected={secondChecked}
            onValueChange={setSecondChecked}
            onClick={() => {
              setFirst("дунд");
            }}
          >
            Дунд
          </Checkbox>
          <Checkbox
            size="md"
            isSelected={thirdChecked}
            onValueChange={setThirdChecked}
            onClick={() => {
              setFirst("муу");
            }}
          >
            Муу
          </Checkbox>
        </div>
        <p>Бидний хийсэн засвар үйлчилгээнд сэтгэл хангалуун байна уу?</p>
        <div className="w-[300px] flex justify-between">
          <Checkbox
            size="md"
            isSelected={fourthChecked}
            onValueChange={setFourthChecked}
            onClick={() => {
              setSecond("сайн");
            }}
          >
            Сайн
          </Checkbox>
          <Checkbox
            size="md"
            isSelected={fifthChecked}
            onValueChange={setFifthChecked}
            onClick={() => {
              setSecond("дунд");
            }}
          >
            Дунд
          </Checkbox>
          <Checkbox
            size="md"
            isSelected={sixthChecked}
            onValueChange={setSixthChecked}
            onClick={() => {
              setSecond("муу");
            }}
          >
            Муу
          </Checkbox>
        </div>
        <p>Өөр зүйл хэлэх хүсэлтэй байвал доор бичиж үлдээнэ үү.</p>
        <Textarea
          labelPlacement="outside"
          placeholder="Энд бичнэ үү."
          className="max-w-xs"
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            console.log(feedback);
          }}
        />
        <Button
          className="btn btn-primary"
          onClick={() => {
            createRate();
          }}
        >
          send
        </Button>
      </div>
    </div>
  );
}
