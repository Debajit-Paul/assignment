import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inventoryFilteredItems } from "../redux/feature/carSlice";
import { setInventoryFilterCondition } from "../redux/feature/carSlice";
import { buttonConfi } from "../config.ts";
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

const Inventory = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Inventory Count",
        data: [],
        backgroundColor: "orange",
      },
    ],
  });
  const [activeBtn, setActiveBtn] = useState("new");
  const dispatch = useDispatch();
  const filteredItems = useSelector(inventoryFilteredItems);

  useEffect(() => {
    const inventoryByDate = filteredItems.reduce((acc, item) => {
      const date = new Date(item.timestamp.split(" ")[0]).toLocaleDateString(
        "en-US"
      );
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    const dates = Object.keys(inventoryByDate);
    dates.sort((a, b) => new Date(a) - new Date(b));
    const inventoryCounts = Object.values(inventoryByDate);
    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Inventory Count",
          data: inventoryCounts,
          backgroundColor: "orange",
        },
      ],
    });
  }, [filteredItems]);

  console.log(chartData);

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex items-center gap-4">
        <p className="font-[600] text-[16px] text-black leading-[23px] tracking-[0.17px]">
          Inventory Count
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
              dispatch(setInventoryFilterCondition(button.action));
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

export default Inventory;
