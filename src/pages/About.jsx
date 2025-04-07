import React from "react";
import aboutImage from "../assets/about_image.png"; 


const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-6 sm:px-12 cursor-pointer">
      <div className="max-w-7xl mx-auto text-center">
        {}
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6">About Us</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10">
          We are on a mission to revolutionize healthcare accessibility and provide the best medical care to all.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {}
          <div className="text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-lg">
              At Shipager, we aim to create an easy-to-use platform for seamless access to healthcare services. We provide
              online appointment bookings, doctor consultations, home visits, and more to ensure healthcare is easily
              accessible to everyone.
            </p>
            <p className="text-lg">
              We are committed to breaking down barriers in healthcare, making it simple, fast, and convenient for all.
              Our goal is to create a healthier world, where everyone has the support they need to live a longer, better life.
            </p>

            {}
            <h3 className="text-xl font-semibold text-blue-600 mt-10">Why Choose Us?</h3>
            <ul className="list-disc pl-6 space-y-3 text-lg text-gray-600">
              <li>Convenient online appointment booking</li>
              <li>Access to a variety of trusted healthcare professionals</li>
              <li>Comprehensive health monitoring tools</li>
              <li>Personalized care and support</li>
            </ul>
          </div>

          {}
          <div className="relative">
            <img
              src={aboutImage}
              alt="About Shipager"
              className="rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>

        {}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-6 text-center">
            Our Vision for the Future
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-8 rounded-xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Healthcare for All</h3>
              <p className="text-gray-700">
                We envision a world where everyone, regardless of location, has access to the best medical care available.
              </p>
            </div>
            <div className="bg-blue-100 p-8 rounded-xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Technology for Better Care</h3>
              <p className="text-gray-700">
                By leveraging technology, we aim to make healthcare services more efficient and patient-centric.
              </p>
            </div>
            <div className="bg-blue-100 p-8 rounded-xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Personalized Health Plans</h3>
              <p className="text-gray-700">
                Tailored recommendations and health tracking tools to keep you informed and healthy.
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-6 text-center">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Feel free to reach out for any inquiries or feedback. We are always here to help!
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:support@shipager.kz"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Email Us
            </a>
            <a
              href="tel:+1234567890"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      
      
    </div>
  );
};

export default About;
