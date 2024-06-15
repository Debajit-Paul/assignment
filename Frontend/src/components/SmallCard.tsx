import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface smallCardProp {
  title: string;
  value: string;
}

const SmallCard = ({ title, value }: smallCardProp) => {
  return (
    <Card className="p-6 flex flex-col justify-center gap-2 drop-shadow-md">
      <CardTitle className="font-[500] text-black text-[24px] leading-[28px]">
        {value}
      </CardTitle>
      <CardDescription className="text-[#FF9926] font-[500] text-[14px] leading-[18.75px]">
        {title}
      </CardDescription>
    </Card>
  );
};

export default SmallCard;
