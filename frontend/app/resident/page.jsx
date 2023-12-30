"use client";
// import PhoneAuth from "@/components/phoneAuth";
import { Button } from "@nextui-org/button";
// import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/react";
import Cookies from "js-cookie";

export default function Home() {
  const [data, setData] = useState({
    apartment: "",
    floor: "",
    number: "",
  });

  const router = useRouter();
  const apartments = ["101", "102", "103", "104"];
  const items = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
  ];
  const [numbers, setNumbers] = useState(["01", "02", "03", "04", "05", "06"]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const frameworkTypeChecker = () => {
      if (
        data.apartment === "102" ||
        data.apartment === "103" ||
        data.apartment === "104"
      ) {
        setNumbers(["01", "02", "03", "04"]);
      } else if (data.apartment === "101") {
        setNumbers(["01", "02", "03", "04", "05", "06"]);
      }
    };
    frameworkTypeChecker();
  }, [data]);
  return (
    <div className="w-full h-screen flex justify-center box-border">
      <div className="w-2/4 h-screen flex items-center justify-center flex-col">
        <p>Байрныхаа орц, давхар, тоотны дугаарыг хийнэ үү.</p>
        <p>Жишээ: 101|01|01</p>
        <Separator className="my-4" />
        <div className="col text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Cookies.set("apartment", data.apartment);
              Cookies.set("floor", data.floor);
              Cookies.set("number", data.number);
              router.push("/selector");
            }}
          >
            <div className="flex flex-row gap-3 h-24 w-[350px]">
              <Select
                label="Байр"
                value={data.apartment}
                onChange={(e) => {
                  setData({ ...data, apartment: e.target.value });
                }}
                className="max-w-xs"
              >
                {apartments.map((apartment) => (
                  <SelectItem key={apartment}>{apartment}</SelectItem>
                ))}
              </Select>
              <Select
                label="Давхар"
                value={data.floor}
                onChange={(e) => {
                  setData({ ...data, floor: e.target.value });
                }}
                className="max-w-xs"
              >
                {items.map((item) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>
              <Select
                label="Тоот"
                value={data.number}
                onChange={(e) => {
                  setData({ ...data, number: e.target.value });
                }}
                className="max-w-xs"
              >
                {numbers.map((number) => (
                  <SelectItem key={number}>{number}</SelectItem>
                ))}
              </Select>
            </div>

            {/* <p>Code Entered - {code}</p> */}

            <Button
              className="btn btn-primary"
              onClick={() => {
                Cookies.set("apartment", data.apartment);
                Cookies.set("floor", data.floor);
                Cookies.set("number", data.number);
                router.push("/selector");
              }}
            >
              Цааш явах
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
