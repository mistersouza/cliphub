import React from "react";
import { aboutAndContactLinks, cliphubForGoodLinks, helpAndGuidelinesLinks } from "../utils/constants";

const List = ({ list }) => (
  <div className='flex flex-wrap gap-1'>
    {list.map((item) => (
      <p
        key={item}
        className="text-sm text-gray-800 cursor-pointer hover:underline"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="hidden xl:flex xl:flex-col gap-2 py-3">
      <List list={aboutAndContactLinks} />
      <List list={cliphubForGoodLinks} />
      <List list={helpAndGuidelinesLinks} />
      <p className='text-sm text-gray-800 font-semibold text-center'>ClipHub™ 2024</p>
    </div>
  );
};

export default Footer;