import React, { useEffect, useState } from "react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import Filter from "./Filter";
import Recent from "./Recent";
import Inventory from "./Inventory";
import MSRP from "./MSRP";
import History from "./History";
import { useDispatch } from "react-redux";
import { populateData } from "../redux/feature/carSlice";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/api/inventory");
      const result = await response.json();

      //   combine all array into one
      const combinedData = result.data.flat();
      setData(combinedData);
      dispatch(populateData(combinedData));
    };
    getData();
  }, []);

  return (
    <div className="mx-auto max-w-[1440px] flex flex-col gap-[30px] px-[20px]">
      <Sheet>
        <div className=" pt-[60px] pb-[30px] border-b border-[#D2D2D2]">
          <div className="flex items-center justify-between ">
            <p className="font-[500] text-black text-[34px] leading-[40px]">
              Inventory
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <p className="font-[600] text-[16px] leading-[23px] tracking-[0.17px] text-black">
                  Select Dealer
                </p>
                <div className="w-[320px] h-[40px] rounded-[6px] border border-[#ff9926] p-3 flex items-center justify-between bg-white">
                  <p className="text-black text-[14px] font-[500] leading-[24px] tracking-[0.15px]">
                    AAA MITSUBISHI DEALER
                  </p>
                  <img
                    src="./grey-dropdown.png"
                    alt=""
                    className="rotate-180"
                  />
                </div>
              </div>
              <SheetTrigger>
                <div className="bg-white w-[175px] h-[44px] flex items-center p-4 gap-2 rounded-[6px]">
                  <img src="./filter.png" alt="filter" />
                  <p className="text-[14px] font-[500] leading-[36px] text-black tracking-[1.25px]">
                    FILTER DATA BY
                  </p>
                </div>
              </SheetTrigger>
            </div>
          </div>
        </div>
        <Filter />
      </Sheet>

      {/* small cards */}
      <Recent data={data} />

      {/* Inventory Count */}
      <Inventory />

      {/* Average MSRP in USD */}
      <MSRP />

      {/* History Log*/}
      <History />
    </div>
  );
};

export default Dashboard;
