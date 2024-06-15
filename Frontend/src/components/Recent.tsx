import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard";

const Recent = ({ data }: any) => {
  const [carData, setCarData] = useState({
    newCar: [],
    newCarsPrice: "",
    usedCar: [],
    usedCarsPrice: "",
    cpoCar: [],
    cpoCarsPrice: "",
  });

  useEffect(() => {
    const totalNewCars = data.filter((car) => car.condition === "new");
    const totalNewCarsPrice = totalNewCars.reduce((acc, curr) => {
      const price = parseFloat(curr.price.replace(/[^0-9.-]+/g, ""));
      return acc + price;
    }, 0);

    const totalUsedCars = data.filter((car) => car.condition === "used");
    const totalUsedCarsPrice = totalUsedCars.reduce((acc, curr) => {
      const price = parseFloat(curr.price.replace(/[^0-9.-]+/g, ""));
      return acc + price;
    }, 0);

    const totalCpoCars = data.filter((car) => car.condition === "cpo");
    const totalCpoCarsPrice = totalCpoCars.reduce((acc, curr) => {
      const price = parseFloat(curr.price.replace(/[^0-9.-]+/g, ""));
      return acc + price;
    }, 0);

    setCarData({
      newCar: totalNewCars,
      newCarsPrice: totalNewCarsPrice,
      usedCar: totalUsedCars,
      usedCarsPrice: totalUsedCarsPrice,
      cpoCar: totalCpoCars,
      cpoCarsPrice: totalCpoCarsPrice,
    });
  }, [data]);

  return (
    <div className="flex flex-col gap-[30px]">
      <p className="font-[600] text-[16px] text-black leading-[23px] tracking-[0.17px]">
        Recent Gathered Data{" "}
        {`${new Date().getDate()}/${new Date().getMonth()}/${new Date()
          .getFullYear()
          .toString()
          .substring(2)}`}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4">
        <SmallCard
          title="# New Units"
          value={carData.newCar.length.toString()}
        />
        <SmallCard title="New MSRP" value={`$ ${carData.newCarsPrice}`} />
        <SmallCard
          title="New Avg. MSRP"
          value={`$ ${(
            parseInt(carData.newCarsPrice) / carData.newCar.length
          ).toFixed(2)}`}
        />
        <SmallCard
          title="# Used Units"
          value={carData.usedCar.length.toString()}
        />
        <SmallCard title="Used MSRP" value={`$ ${carData.usedCarsPrice}`} />
        <SmallCard
          title="Used Avg. MSRP"
          value={`$ ${(
            parseInt(carData.usedCarsPrice) / carData.usedCar.length
          ).toFixed(2)}`}
        />
        <SmallCard
          title="# CPO Units"
          value={carData.cpoCar.length.toString()}
        />
        <SmallCard title="CPO MSRP" value={`$ ${carData.cpoCarsPrice}`} />
      </div>
    </div>
  );
};

export default Recent;
