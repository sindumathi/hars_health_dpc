"use client";
import { BsClipboardHeartFill } from "react-icons/bs";
import { useState } from "react";
import Button from "@/src/components/Button";
export default function WelcomePage() {
  const [consent, setConsent] = useState(false);
  const handleDeclineClick = () => {};
  const handleAcceptClick = () => {};
  return (
    <div className="w-full flex flex-col md:w-3/4 mx-auto px-4">
      <div className="w-full flex items-center justify-center ">
        <BsClipboardHeartFill className="  size-20 text-sky-800  text-center  font-bold" />
      </div>
      <div className=" w-full flex flex-col items-center">
        <h1 className="header-font">Patient questionnaire</h1>

        <p className="mx-auto text-center">
          Help us give you the best possible care by completing this short
          questionnaire before your appointment. It takes about 5 minutes.
        </p>

        <div className="info-card">
          <h3 className="sub-header-font">How we use your information?</h3>
          <p className="mx-auto text-center">
            Your answers are shared only with your care team and stored securely
            in line with NHS data protection guidelines. You may request
            deletion at any time by contacting the records office.
          </p>
        </div>
        <div className="flex flex-row items-start">
          <input
            className="mt-1.5 mx-5"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent((prev) => !prev)}
          />
          <span>
            I have read the privacy notice and consent to my information being
            used for my care.
          </span>
        </div>
        <div className="w-full flex flex-row justify-between px-60 mt-10">
          <Button warning onClick={handleDeclineClick}>
            Decline
          </Button>
          <Button primary onClick={handleAcceptClick}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
