import React from "react";
import { NotificationSVG } from "../../assets/NotificationSVG";
import { NotificationsData } from "../../dataHelpers/MainDataHelper";

export const Notification = () => {
  return (
    <section className="flex flex-col gap-4">
      {NotificationsData.map((item) => (
        <div
          key={item.id}
          className="bg-[#F7F9FCE5] flex place-items-center gap-[10px] py-[12px] px-[16px] rounded-[12px]"
        >
          <div className="bg-[#9CADE914] bg-opacity-5 text-xl w-fit p-5 rounded-[12px] border-[#5977E51A] border-2">
            <NotificationSVG />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[14px] font-[500] text-[#192038]">
                {item.title}
              </h1>
              <p className="text-[#666E7F] text-[10px]">{item.time}</p>
            </div>
            <p className="text-[#8F9BB3] text-[12px] break-words">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
