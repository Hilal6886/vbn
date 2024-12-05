import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import img from "/public/img/hero.png";
import { DentalServices, Services } from ".";

const Counter = ({ value, label, duration, icon }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const increment = value / (duration * 1000 / 50);
    let currentCount = 0;

    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(currentCount));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <div className="flex  flex-col items-center justify-center p-4 rounded-md bg-white border border-gray-200">
      <div className="flex items-center gap-2 text-xl font-semibold text-[#283300]">
        {icon}
        {count}+
      </div>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  );
};

export const Whome = () => {
  return (
    <div className="bg-whte  mt-[3rem]">
      <div>
      <div className="contain bg-[#Cf0] mx-auto px-6 lg:px-12 mt- rounded-lg py-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="space-y-6 mt-[3rem] text-center lg:text-left">
          <h1 className="text-4xl lg:text-8xl m italic  font-extrabold text-gray-900 leading-tight">
            Transform Your Smile at{" "}
            <span className="text-blue-600">Dental Clinic</span>
          </h1>
          <p className="text-base text-[#141900]  italic leading-relaxed">
            Experience unparalleled dental services designed to prioritize your
            comfort and confidence. At Dentelo, we blend advanced technology
            with personalized care to create radiant, healthy smiles you’ll
            love. Experience unparalleled dental services designed to prioritize your
            comfort and confidence. At Dentelo, we blend advanced technology
            with personalized care to create radiant, healthy smiles you’ll
            love.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="/appointments"
              className="flex items-center gap-2 px-6 py-2 bg-[#000000] text-white font-medium rounded-lg hover:bg-teal-700 transition"
            >
              < FaCalendarAlt className="h-5 w-5" />
              Book Appointment
            </a>
            <a
              href="/services"
              className="px-6 py-2 bg-white border border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-100 transition"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative">
          {/* Full Width and Height Image */}
          <img
            src={img}
            alt="Dental care"
            className="w-full h-auto object-cover mt-[-3rem] rounded-lg"
          />

          {/* Counters Below */}
          <div className="grid grid-cols-3 gap-4 lg:mt-[-9rem]">
            <Counter
              value={300}
              label="Happy Clients"
              duration={2}
              icon={< FaCalendarAlt className="h-6 w-6 text-teal-600" />}
            />
            <Counter
              value={1200}
              label="Procedures Done"
              duration={3}
              icon={< FaCalendarAlt className="h-6 w-6 text-teal-600" />}
            />
            <Counter
              value={10}
              label="Years of Experience"
              duration={1.5}
              icon={< FaCalendarAlt className="h-6 w-6 text-teal-600" />}
            />
          </div>
        </div>
      </div>
      </div>
     
      <section className="cantainer">

        <DentalServices/>
      </section>
    </div>
    
  );
};

export default Whome;
