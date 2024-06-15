import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";

const History = () => {
  const { items } = useSelector((state) => state.car);
  const [tableRow, setTableRow] = useState(5);
  const [sortInc, setSortInc] = useState(true);

  //   cleaning items1 date
  const data = items.map((item) => ({
    condition: item.condition,
    price: parseFloat(item.price.replace(" USD", "")),
    date: new Date(item.timestamp).toLocaleDateString("en-US"),
  }));

  //   group by date table columns
  const groupData = data.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = {
        condition: {
          new: {
            sum: 0,
            count: 0,
          },
          used: {
            sum: 0,
            count: 0,
          },
          cpo: {
            sum: 0,
            count: 0,
          },
        },
      };
    }
    if (item.condition === "new") {
      acc[item.date].condition.new.sum += item.price;
      acc[item.date].condition.new.count += 1;
    }
    if (item.condition === "used") {
      acc[item.date].condition.used.sum += item.price;
      acc[item.date].condition.used.count += 1;
    }
    if (item.condition === "cpo") {
      acc[item.date].condition.cpo.sum += item.price;
      acc[item.date].condition.cpo.count += 1;
    }
    return acc;
  }, {});

  //   added averagePrice to each items
  const tableData = Object.keys(groupData).map((item) => ({
    date: item,
    condition: {
      new: {
        sum: groupData[item].condition.new.sum,
        count: groupData[item].condition.new.count,
        averagePrice: (
          groupData[item].condition.new.sum /
          groupData[item].condition.new.count
        ).toFixed(2),
      },
      used: {
        sum: groupData[item].condition.used.sum,
        count: groupData[item].condition.used.count,
        averagePrice: (
          groupData[item].condition.used.sum /
          groupData[item].condition.used.count
        ).toFixed(2),
      },
      cpo: {
        sum: groupData[item].condition.cpo.sum,
        count: groupData[item].condition.cpo.count,
        averagePrice: (
          groupData[item].condition.cpo.sum /
          groupData[item].condition.cpo.count
        ).toFixed(2),
      },
    },
  }));

  tableData.sort((a, b) =>
    sortInc
      ? new Date(a.date) - new Date(b.date)
      : new Date(a.date) + new Date(b.date)
  );
  console.log(tableData);

  return (
    <div className="flex flex-col gap-[30px] mb-[80px]">
      <div className="flex items-center gap-4">
        <p className="font-[600] text-[16px] text-black leading-[23px] tracking-[0.17px]">
          History Log
        </p>
      </div>
      <Card className="w-[100%]  flex flex-col items-center justify-center p-5 px-8 drop-shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-[12px] text-black leading-[17px] tracking-[0.17px] font-[500] gap-2 flex items-center cursor-pointer"
                onClick={() => setSortInc(!sortInc)}
              >
                <img
                  src="./Vector.png"
                  alt=""
                  className={` ${sortInc ? "rotate-0" : "rotate-180"}`}
                />
                DATE
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                NEW INVENTORY
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                NEW TOTAL MSRP
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                NEW AVERAGE MSRP
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                USED INVENTORY
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                USED TOTAL MSRP
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                USED AVERAGE MSRP
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                CPO INVENTORY
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                CPO TOTAL MSRP
              </TableHead>
              <TableHead className="text-[11.5px] text-black leading-[17px] tracking-[0.17px] font-[500]">
                CPO AVERAGE MSRP
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.slice(0, tableRow).map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-black text-[14px]">
                  {item.date}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  {item.condition.new.count}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  $ {item.condition.new.sum}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  ${" "}
                  {item.condition.new.averagePrice === "NaN"
                    ? "0.00"
                    : item.condition.new.averagePrice}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  {item.condition.used.count}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  $ {item.condition.used.sum}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  ${" "}
                  {item.condition.used.averagePrice === "NaN"
                    ? "0.00"
                    : item.condition.used.averagePrice}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  {item.condition.cpo.count}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  $ {item.condition.cpo.sum}
                </TableCell>
                <TableCell className="text-black text-[14px]">
                  ${" "}
                  {item.condition.cpo.averagePrice === "NaN"
                    ? "0.00"
                    : item.condition.cpo.averagePrice}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end w-full items-center gap-6">
          {" "}
          <div className="flex justify-end w-full items-center gap-3">
            <p className="text-[13px] text-slate-600 tracking-[0.4px]">
              Rows per page:
            </p>
            <Select onValueChange={(value) => setTableRow(Number(value))}>
              <SelectTrigger className="w-[45px] px-[0.35rem] h-[2rem]">
                <SelectValue placeholder={tableRow} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[100px]">
            <span className="flex items-center">
              1-{tableRow} of {Math.floor(tableData.length / tableRow)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <img
              src="./arrow.png"
              alt=""
              className="rotate-180 cursor-pointer"
            />
            <img src="./arrow.png" alt="" className=" cursor-pointer" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default History;
