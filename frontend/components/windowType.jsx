"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
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

let frameworks = [];

export const WindowType = ({ value, handleChange }) => {
  useEffect(() => {
    const frameworkTypeChecker = () => {
      const apartment = Cookies.get("apartment");
      const floor = Cookies.get("floor");
      const number = Cookies.get("number");
      if (apartment === "101") {
        if (
          number === "01" ||
          number === "02" ||
          number === "05" ||
          number === "06"
        ) {
          frameworks = [
            {
              value: "Жижиг цонх - 1",
              label: "Жижиг цонх - 1",
            },
            {
              value: "Жижиг цонх - 2",
              label: "Жижиг цонх - 2",
            },
            {
              value: "Зочны өрөөний том цонх",
              label: "Зочны өрөөний том цонх",
            },
            {
              value: "Тагтны хаалга",
              label: "Тагтны хаалга",
            },
            {
              value: "Унтлагын өрөөний цонх",
              label: "Унтлагын өрөөний цонх",
            },
          ];
        } else if (number === "3" || number === "4") {
          frameworks = [
            {
              value: "Зочны өрөөний том цонх",
              label: "Зочны өрөөний том цонх",
            },
            {
              value: "Тагтны хаалга",
              label: "Тагтны хаалга",
            },
            {
              value: "Унтлагын өрөөний цонх",
              label: "Унтлагын өрөөний цонх",
            },
          ];
        }
      } else if (apartment === "102") {
        if (number === "01" || number === "04") {
          frameworks = [
            {
              value: "Зочны өрөөний том цонх",
              label: "Зочны өрөөний том цонх",
            },
            {
              value: "Тагтны хаалга",
              label: "Тагтны хаалга",
            },
            {
              value: "Унтлагын өрөөний 1",
              label: "Унтлагын өрөөний 1",
            },
            {
              value: "Унтлагын өрөөний 2",
              label: "Унтлагын өрөөний 2",
            },
          ];
        } else if (number === "02" || number === "03") {
          frameworks = [
            {
              value: "Зочны өрөөний том цонх",
              label: "Зочны өрөөний том цонх",
            },
            {
              value: "Тагтны хаалга",
              label: "Тагтны хаалга",
            },
            {
              value: "Жижиг цонх",
              label: "Жижиг цонх",
            },
            {
              value: "Унтлагын өрөөний цонх 1",
              label: "Унтлагын өрөөний цонх 1",
            },
            {
              value: "Унтлагын өрөөний цонх 2",
              label: "Унтлагын өрөөний цонх 2",
            },
          ];
        }
      } else if (apartment === "103" || apartment === "104") {
        frameworks = [
          {
            value: "Тагтны хаалга",
            label: "Тагтны хаалга",
          },
          {
            value: "Зочны өрөөний том цонх",
            label: "Зочны өрөөний том цонх",
          },
          {
            value: "Жижиг цонх",
            label: "Жижиг цонх",
          },
          {
            value: "Унтлагын өрөөний цонх ",
            label: "Унтлагын өрөөний цонх ",
          },
          {
            value: "Мастер унтлагын өрөөний цонх ",
            label: "Мастер унтлагын өрөөний цонх ",
          },
        ];
      }
    };
    frameworkTypeChecker();
  }, []);
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Янзлуулах цонх"}
          {/* The rest of your button content */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={() => {
                  let name = framework.value === value ? "" : framework.value;
                  handleChange("windowType")(name); // Update the 'windowType' field value using handleChange
                  setOpen(false);
                }}
              >
                <Check
                  className={
                    value === framework.value
                      ? "mr-2 h-4 w-4 opacity-100"
                      : "mr-2 h-4 w-4 opacity-0"
                  }
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WindowType;
