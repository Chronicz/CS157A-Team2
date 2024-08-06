import React from "react";
import Button from "../../components/buttons";

const contact = () => {
  return (
    <div>
      <div className="flex row-wrap flex-end mx-56">
        <div className="font-bold text-xl">CONTACT US</div>
        <div className="grid-container grid grid-cols-2 gap-6">
          <div>NAME</div>
          <div>EMAIL ADDRESS</div>
          <div className="border-black border-2">
            <input placeholder="Enter your name"></input>
          </div>
          <div className="border-black border-2">
            <input placeholder="Your email address"></input>
          </div>
          <div>SUBJECT</div>
          <div>INQUIRY TYPE</div>
          <div className="border-black border-2">
            <input placeholder="Enter subject"></input>
          </div>
          <div className="border-black border-2">
            <input placeholder="Inquiry type"></input>
          </div>
          <div>MESSAGE</div>
          <div></div>
          <div className="w-96 h-60 border-black border-2">
            <input placeholder="Enter your message"></input>
          </div>
        </div>
      </div>
      <div>
        <Button type="button" title="Submit" variant="btn_dark_green"></Button>
      </div>
    </div>
  );
};

export default contact;
