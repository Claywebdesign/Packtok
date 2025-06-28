import { Card, CardContent, CardHeader, CardTitle } from "@packtok/ui/components/card";
import { ReactNode } from "react";

type ContactCardProps = {
  icon: ReactNode;
  title: string;
  content: string;
};

export default function ContactCard({
  icon,
  title,
  content,
}: ContactCardProps) {
  return (
    <Card className="md:w-[33%] w-full bg-gray-100 p-4 border-none">
      <div className="flex flex-col justify-center m-auto items-center text-center">
        <CardHeader>{icon}</CardHeader>
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <CardContent className="text-gray-500">{content}</CardContent>
        </div>
      </div>
    </Card>
  );
}
