import React, { useState } from "react";


const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

   
    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-blue-700 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We're here to help! Reach out to us for any inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Office</h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>123 Health St, Med City, Country</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+1 (800) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>support@shipager.kz</p>
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                <p>Sat-Sun: Closed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                  />
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

       
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">
            Find Us on the Map
          </h2>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.051636211941!2d76.92149181526896!3d43.238876979136444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836eb66c1433b5%3A0xd89997b828e3c36b!2sTole%20Bi%20St%2059%2C%20Almaty%20050000%2C%20Kazakhstan!5e0!3m2!1sen!2skz!4v1712668055536!5m2!1sen!2skz"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Contact;
