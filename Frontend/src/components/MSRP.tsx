import React, { useEffect, useState } from "react";
import { buttonConfi } from "../config.ts";
import { MSRPFilteredItems } from "../redux/feature/carSlice";
import { setMSRPFilterCondition } from "../redux/feature/carSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "@/components/ui/card";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MSRP = () => {
  const [activeBtn, setActiveBtn] = useState("new");
  const dispatch = useDispatch();
  const filteredItems = useSelector(MSRPFilteredItems);

  //   extract date and price
  const data = filteredItems.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US"),
    price: parseFloat(item.price.replace(" USD", "")),
  }));

  // group by date the total sum and number of items
  const groupData = data.reduce((acc, { date, price }) => {
    if (!acc[date]) acc[date] = { sum: 0, count: 0 };
    acc[date].sum += price;
    acc[date].count += 1;
    return acc;
  }, {});

  const chartDataPrep = Object.keys(groupData).map((date) => ({
    date,
    averagePrice: groupData[date].sum / groupData[date].count,
  }));

  chartDataPrep.sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = {
    labels: chartDataPrep.map((item) => item.date),
    datasets: [
      {
        label: "Average MSRP in USD",
        data: chartDataPrep.map((item) => item.averagePrice),
        backgroundColor: "orange",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex items-center gap-4">
        <p className="font-[600] text-[16px] text-black leading-[23px] tracking-[0.17px]">
          Average MSRP in USD
        </p>
        {buttonConfi.map((button) => (
          <button
            key={button.id}
            className={`w-[65px] h-[44px] rounded-[4px] border border-[#F59322] p-[16px] text-[14px] font-[500] leading-[1.25px] text-center ${
              activeBtn === button.action
                ? `text-white bg-[#F59322]`
                : `text-black`
            }`}
            onClick={() => {
              setActiveBtn(button.action);
              dispatch(setMSRPFilterCondition(button.action));
            }}
          >
            {button.title}
          </button>
        ))}
      </div>
      <Card className="w-[100%] h-[690px] flex items-center justify-center p-2 drop-shadow-md">
        <Bar data={chartData} />
      </Card>
    </div>
  );
};

export default MSRP;
