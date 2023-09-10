import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        type="file"
        placeholder="Select file to upload"
        accept="image/*"
        multiple
      />
    </div>
  );
}
