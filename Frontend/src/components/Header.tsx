import React from "react";

const Header = () => {
  return (
    <div className="w-screen bg-[#404041] h-[70px] py-[10px] px-[35px] flex item-center justify-between z-20">
      <div className="flex items-center gap-3">
        <img src="./FF Icon.png" alt="logo" className="" />
        <p className="text-white font-[500] text-[19px]">Admin Console</p>
        <div className="bg-white rounded-full flex items-center text-[12px] font-[500] px-[10px] py-[5px]">
          ADMIN VIEW
        </div>
      </div>
      <div className="flex items-center gap-5 cursor-pointer">
        <div className="flex items-center gap-2">
          <img src="./support.png" alt="support" />
          <p className="text-white font-[400] text-[16px]">Support</p>
        </div>
        <div className="flex items-center justify-evenly gap-4 py-[0.5rem] px-[0.7rem] bg-[#242424] rounded-[0.35rem] cursor-pointer">
          <div className="p-[0.9rem] rounded-full bg-[#D9D9D9]"></div>
          <p className="font-[500] text-[17px] text-white">Jane</p>
          <img src="./orange-dropdown.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
