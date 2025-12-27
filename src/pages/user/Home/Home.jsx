import { Outlet } from "react-router-dom";
import Banner from "@components/user/Banner";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MovieList from "../Movie/_components/MovieList.jsx";
import { getCinemaSystem } from "@store/cinema/cinemaApi.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cinema from "../Movie/_components/Cinema.jsx";
import MovieReviewSection from "./_components/MovieReviewSection.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("NOW SHOWING");
  const [searchKey, setSearchKey] = useState("");
  const buttons = ["NOW SHOWING", "COMING SOON", "2D / 3D", "KIDS CINEMA"];

  const handleChange = (event) => {
    setSearchKey(event.target.value);
  };

  useEffect(() => {
    dispatch(getCinemaSystem());
  }, []);
  console.log("Home Rendered");

  return (
    <div>
      <Banner />
      <div className="flex flex-col  lg:flex-row justify-between items-center mx-18 mt-4">
        <div className="flex flex-nowrap gap-8 items-center">
          {buttons.map((item) => (
            <p
              key={item}
              className={`cursor-pointer flex justify-center items-center text-sm md:text-md lg:text-md  hover:text-[#38923c] ${
                item === activeTab
                  ? "text-[#CDA566] border-b-2 border-red-800"
                  : "text-white"
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </p>
          ))}
        </div>
        <div>
          <div className="flex flex-row justify-center items-center gap-2 mt-4">
            <SearchIcon className="text-white" fontSize="medium" />
            <input
              className="border-2 border-[#CDA566] bg-white h-8 px-5 pr-42 rounded-lg text-sm focus:outline-none"
              type="text"
              value={searchKey}
              onChange={handleChange}
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <div className="mx-12">
        <MovieList searchKey={searchKey} filter={activeTab} />
      </div>
      <div className="flex items-center justify-center ">
        <h1 className="text-2xl font-semibold text-[#CDA566] border-b border-white">
          CINEMA SYSTEM
        </h1>
      </div>
      <Cinema />
      <MovieReviewSection />
      <Outlet />
    </div>
  );
}
