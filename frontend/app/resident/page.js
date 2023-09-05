"use client";
// import PhoneAuth from "@/components/phoneAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const [code, setCode] = useState("");
  const router = useRouter();
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-2/4 h-screen flex items-center justify-center flex-col">
        <p>Байрныхаа орц, давхар, тоотны дугаарыг хийнэ үү.</p>
        <p>Exapmple: 101|01|01</p>
        <Separator className="my-4" />
        <div className="col text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Cookies.set("apartmentCode", code);
              router.push("/selector");
            }}
          >
            <div className="flex flex-row h-16">
              <Input
                type="text"
                // name="code"
                required
                maxLength="7"
                onChange={(e) => setCode(e.target.value)}
                // onFocus={(e) => e.target.select()}
              />
            </div>

            <p>Code Entered - {code}</p>
            <p>
              <Button
                className="btn btn-secondary mr-2"
                onClick={(e) => setCode()}
              >
                Цэвэрлэх
              </Button>
              <Button className="btn btn-primary">Цааш явах</Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
