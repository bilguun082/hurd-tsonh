import { ModeToggle } from "@/components/toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-screen h-16 p-10">
      <div className="flex items-center w-full justify-between">
        <div className=" flex items-center ">
          <Link href="/">
            <svg
              width="40"
              height="48"
              viewBox="0 0 121 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_101_10)">
                <path
                  d="M50 148.5V140L110 109L117 114L50 148.5Z"
                  fill="#2381FD"
                />
                <path
                  d="M86 122L78 126V80H50V72H78V25.5L86 29.5V122Z"
                  fill="#2381FD"
                />
                <path
                  d="M50 12V3.5L117 38V114L110 109V80H86V72H110V42L50 12Z"
                  fill="#2381FD"
                />
                <path d="M43 152V0L50 3.5V148.5L43 152Z" fill="#2381FD" />
                <path d="M52 28V25L76 37.5L52 28Z" fill="#2381FD" />
                <path d="M51.5 127.5V123.5L76 115L51.5 127.5Z" fill="#2381FD" />
                <path
                  d="M4 152V0L41 19.5V24L11.5 12V140L41 129V133L4 152Z"
                  fill="#2381FD"
                />
                <circle cx="21.5" cy="76.5" r="5" fill="#2381FD" />
              </g>
              <defs>
                <filter
                  id="filter0_d_101_10"
                  x="0"
                  y="0"
                  width="121"
                  height="160"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_101_10"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_101_10"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </Link>
          <div>
            <p className="font-bold">Хурд цонх</p>
          </div>
        </div>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
