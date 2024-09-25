import React from "react";
import { Home } from "../utils/constant";

interface HomeProps {
  home: Home,
  onClickEdit: (home: Home) => void;
}


// card component show the details of the house
const HomeCard: React.FC<HomeProps> = ({home, onClickEdit}) => {
  return (
    <div className="px-3 py-4 md:p-6 border border-3 bg-white border-white rounded-3x rounded-xl w-full shadow-lg">
      <div className="flex flex-col justify-start gap-3">
        <div className="flex justify-start items-center mb-2">
          <h3 className="text-[24px] font-semibold text-start">
            {home?.street_address}
          </h3>
        </div>
        <div className="flex justify-start items-center">
          <p className="text-gray-900 text-sm font-medium block">
            List price:
          </p>
          <p className="text-700 text-sm ml-3 overflow-hidden text-ellipsis">
            {home?.price}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <p className="text-gray-900 text-sm font-medium block">
            State:
          </p>
          <p className="text-700 text-sm ml-3 overflow-hidden text-ellipsis">
            {home?.state}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <p className="text-gray-900 text-sm font-medium block">
            Zip:
          </p>
          <p className="text-700 text-sm ml-3 overflow-hidden text-ellipsis">
            {home?.zip_code}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <p className="text-gray-900 text-sm font-medium block">
            Bed Room:
          </p>
          <p className="text-700 text-sm ml-3 overflow-hidden text-ellipsis">
            {home?.num_bedrooms}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <p className="text-gray-900 text-sm font-medium block">
            Bath Rooms:
          </p>
          <p className="text-700 text-sm ml-3 overflow-hidden text-ellipsis">
            {home?.num_bathrooms}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center mt-3">
        <button onClick={() => {
          onClickEdit(home);
        }} className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-6 transition duration-300 border-white border">Edit User</button>
      </div>
    </div>
  );
};

export default HomeCard;
