"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadButtonProps {
  inputId: string;
}

export function FileUploadButton({ inputId }: FileUploadButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      type="button"
      onClick={() => document.getElementById(inputId)?.click()}
    >
      <Upload className="h-4 w-4" />
      Browse Files
    </Button>
  );
}
