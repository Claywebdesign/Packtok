"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@packtok/ui/dialog";
import { Submission } from "../../../../hooks";
import Image from "next/image";

interface SubmissionDetailsDialogProps {
  submission: Submission | null;
  onClose: () => void;
}

export function SubmissionDetailsDialog({
  submission,
  onClose,
}: SubmissionDetailsDialogProps) {
  if (!submission) return null;

  return (
    <Dialog open={!!submission} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{submission.title}</DialogTitle>
          <DialogDescription>Review submission details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">
              {submission.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-1">Price</h4>
              <p className="text-sm">${submission.price.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Quantity</h4>
              <p className="text-sm">{submission.quantity}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Condition</h4>
              <p className="text-sm">{submission.condition}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Type</h4>
              <p className="text-sm">
                {submission.productType.replace("_", " ")}
              </p>
            </div>
          </div>
          {submission.images && submission.images.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Images</h4>
              <div className="grid grid-cols-3 gap-2">
                {submission.images.map((image, index) => (
                  <Image
                    width={300}
                    height={200}
                    key={index}
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
