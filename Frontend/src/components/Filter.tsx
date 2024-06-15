import React, { useState } from "react";
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet";
import { Label } from "@/components/ui/label";
import { setBrandFilterCondition } from "../redux/feature/carSlice";
import { setDurationFilterCondition } from "../redux/feature/carSlice";
import { useSelector, useDispatch } from "react-redux";

const Filter = () => {
  const [brand, setBrand] = useState([]);
  const [duration, setDuration] = useState([]);

  const dispatch = useDispatch();

  const handleBrandCheckbox = (e) => {
    const { id, checked } = e.target;
    setBrand((prevBrand) => {
      if (checked) {
        return [...prevBrand, id];
      } else {
        return prevBrand.filter((brand) => brand !== id);
      }
    });
  };

  const handleDurationCheckbox = (e) => {
    const { id, checked } = e.target;
    setDuration((prevDuration) => {
      if (checked) {
        return [...prevDuration, id];
      } else {
        return prevDuration.filter((duration) => duration !== id);
      }
    });
  };

  console.log(duration);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-[34px] font-[600] text-black flex items-center gap-4 border-b pb-2">
          <SheetClose>
            <img src="./arrow.png" alt="" className="rotate-180" />
          </SheetClose>
          Filter Data By
        </SheetTitle>

        <div className="flex flex-col gap-4 p-5 border-b">
          <p className="font-[500] text-[16px] text-black leading-[36px] tracking-[1.25px]">
            MAKE
          </p>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="Ford"
              checked={brand.includes("Ford")}
              onChange={(e) => handleBrandCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="Ford"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              Ford
            </Label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="Cadillac"
              checked={brand.includes("Cadillac")}
              onChange={(e) => handleBrandCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="Cadillac"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              Cadillac
            </Label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="Jeep"
              checked={brand.includes("Jeep")}
              onChange={(e) => handleBrandCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="Jeep"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              Jeep
            </Label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="GMC"
              checked={brand.includes("GMC")}
              onChange={(e) => handleBrandCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="GMC"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              GMC
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 border-b">
          <p className="font-[500] text-[16px] text-black leading-[36px] tracking-[1.25px]">
            DURATION
          </p>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="Last Month"
              checked={duration.includes("Last Month")}
              onChange={(e) => handleDurationCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="Last Month"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              Last Month
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="This Month"
              checked={duration.includes("This Month")}
              onChange={(e) => handleDurationCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="This Month"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              This Month
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="Last 3 Months"
              checked={duration.includes("Last 3 Months")}
              onChange={(e) => handleDurationCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="Last 3 Months"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              Last 3 Months
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="Last 6 Months"
              checked={duration.includes("Last 6 Months")}
              onChange={(e) => handleDurationCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="Last 6 Months"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              Last 6 Months
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="This Year"
              checked={duration.includes("This Year")}
              onChange={(e) => handleDurationCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="This Year"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              This Year
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="Last Year"
              checked={duration.includes("Last Year")}
              onChange={(e) => handleDurationCheckbox(e)}
              className="h-4 w-4 "
            />
            <Label
              htmlFor="Last Year"
              className="text-[14px] text-black tracking-[0.15px]"
            >
              Last Year
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-items-center gap-3 mt-5">
          <SheetClose className="w-full">
            <div
              className="bg-[#F59322] text-white text-[12px]  tracking-[1.25px] font-[500] rounded-sm flex items-center justify-center leading-[36px] cursor-pointer"
              onClick={() => {
                dispatch(setBrandFilterCondition(brand));
                dispatch(setDurationFilterCondition(duration));
              }}
            >
              APPLY FILTER
            </div>
          </SheetClose>
          <SheetClose className="w-full">
            <div
              className="border-2 border-[#F59322] text-[#F59322] rounded-sm flex items-center justify-center gap-3 text-[12px] tracking-[0.25px] leading-[36px] cursor-pointer"
              onClick={() => {
                setBrand([]);
                setDuration([]);
                dispatch(setBrandFilterCondition([]));
                dispatch(setDurationFilterCondition([]));
              }}
            >
              <img src="./cross.png" alt="" />
              REMOVE ALL FILTERS
            </div>
          </SheetClose>
        </div>
      </SheetHeader>
    </SheetContent>
  );
};

export default Filter;
