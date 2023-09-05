import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-3/4 flex items-center justify-center flex-col">
      <p>Бидний ажлыг үнэлнэ үү.</p>
      <div className="flex flex-row">
        <p>Сайн</p>
        <input type="checkbox" />
      </div>
      <div className="flex flex-row">
        <p>Дунд</p>
        <input type="checkbox" />
      </div>
      <div className="flex flex-row">
        <p>Муу</p>
        <input type="checkbox" />
      </div>
    </div>
  );
}
