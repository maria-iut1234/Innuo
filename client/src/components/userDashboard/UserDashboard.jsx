import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import CardContainer from "./components/CardContainer.jsx";
import ProfileSideBar from "./components/ProfileSideBar.jsx";
import PageHeader from "../achievements/components/PageHeader";
import AnimatedAstronautDashboard from "./assets/astronautDashboard.json";
import getCurrentUser from "../../utils/getCurrentUser";
import newRequest from "../../utils/newRequest";

export const UserDashboard = () => {
  const currentUser = getCurrentUser();
  const [error, setError] = useState(null);

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {

    const setUserExp = async () => {
      try {
        // console.log(currentUser.difficulty);
        const resExp = await newRequest.post(
          "/quiz/exp",
          { difficulty: currentUser.difficulty },
          config_header
        );
        // console.log("User experience set: " + resExp.data.correctPoints);
        localStorage.setItem("exp", JSON.stringify(resExp.data));
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during login.");
          console.log(err);
        }
      }
    };

    setUserExp();
  }, []);

  return (
    <div>
      <Sidebar activePage={"Home"} />
      <div>
        <div className=" h-full grid place-items-center left-[270px] right-[280px]">
          <PageHeader
            title={"Lessons"}
            lottieAnimationData={AnimatedAstronautDashboard}
            isLooped={true}
            width={"w-[23em]"}
            titleMargin={"-mt-6"}
            titleColor={"#000"}
          />
          <CardContainer />
        </div>
        <div>
          <ProfileSideBar />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
