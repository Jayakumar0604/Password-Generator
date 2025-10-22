import React, { useState } from "react";
import { MdCopyAll } from "react-icons/md";

const Pass = () => {
  const [pass, setPass] = useState("");
  const [length, setLength] = useState(0);
  const [inUpper, setInUpper] = useState(true);
  const [inLower, setInLower] = useState(true);
  const [inNumber, setInNumber] = useState(true);
  const [inSymbol, setInSymbol] = useState(true);

  const GenPass = () => {
    let char = "";
    if (inUpper) char += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (inLower) char += "abcdefghijklmnopqrstuvwxyz";
    if (inNumber) char += "1234567890";
    if (inSymbol) char += "!@#$%^&*()_+";
    console.log(char);

    let Gpass = "";

    for (let i = 0; i < length; i++) {
      const RIndex = Math.floor(Math.random() * char.length);
      Gpass += char[RIndex];
      console.log(Gpass);
    }
    setPass(Gpass);
  };
  const copyTo = ()=>{
    navigator.clipboard.writeText(pass);
    alert("Copied Sucessfully")
  }

  return (
    <div className="bg-white w-80 md:w-100 p-5 rounded-xl flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className=" text-[25px] md:text-[32px] font-bold text-blue-600 ">
          Secure Password
        </h1>
        <h1 className="text-[12px] md:text-[15px]">
          Genereate strong, secure passwords instantly
        </h1>
      </div>
      <div className="w-60 md:w-80 py-[10px] mt-5 flex justify-between text-white rounded-md bg-gradient-to-r from-[#3ebbfe] to-[#1BDAFE]">
        <h1 className=" pl-3 text-[15px] md:text-[18px]">{pass}</h1>
        <button className="bg-[#667eea] px-[5px] font-semibold flex items-center hover:bg-[#3a58dc] rounded-md text-[15px] mr-3 ">
          <MdCopyAll className="text-[18px] px-[1px]" /><span onClick={copyTo}> Copy</span>
        </button>
      </div>
      <div className="w-60 md:w-80 mt-5">
        <label htmlFor="length" className="text-[15px] font-semibold">
          Password Length
        </label>
        <input
          id="length"
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full border px-3 border-sky-400 rounded-md outline-none py-2"
        />
      </div>
      <div className="grid grid-cols-2 w-60 md:w-80 mt-3 ">
        <div>
          <input
            type="checkbox"
            id="Up"
            checked={inUpper}
            onChange={(e) => setInUpper(e.target.checked)}
          />
          <label htmlFor="Up" className=" text-[14px] md:text-[16px]">
            Uppercase (A-Z)
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Lo"
            checked={inLower}
            onChange={(e) => setInLower(e.target.checked)}
          />
          <label htmlFor="Lo" className=" text-[14px] md:text-[16px]">
            Lowercase (a-z)
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="num"
            checked={inNumber}
            onChange={(e) => setInNumber(e.target.checked)}
          />
          <label htmlFor="num" className=" text-[14px] md:text-[16px]">
            Numbers (0-9)
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="sym"
            checked={inSymbol}
            onChange={(e) => setInSymbol(e.target.checked)}
          />
          <label htmlFor="sym" className=" text-[14px] md:text-[16px]">
            Symbols (!@#$..)
          </label>
        </div>
      </div>
      <button
        onClick={GenPass}
        className="bg-gradient-to-r from-[#6974dc] to-[#7452ac] text-[10px] md:text-[16px] px-20 py-2 text-white uppercase font-bold mt-5 rounded-md"
      >
        Generate Password
      </button>
    </div>
  );
};

export default Pass;
