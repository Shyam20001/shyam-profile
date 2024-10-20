// src/components/Contact.jsx
import { useState } from "react";
import { submitContactForm } from "../api/contactApi"; // Adjust the import path as needed

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmissionMessage("Contact submitted successfully!");
        // Clear the form
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmissionMessage("Failed to submit contact form."); // Handle other response scenarios
      }
    } catch (error) {
      console.error("Submission error:", error); // Log the error for debugging
      setSubmissionMessage("An error occurred while submitting the form."); // General error message
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-gray-300 to-gray-200"
    >
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center mb-12 text-black">
          Contact Me
        </h3>
        <div className="max-w-lg mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 text-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 text-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-lg text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-white font-semibold"
            >
              Send Message
            </button>
          </form>
          {submissionMessage && (
            <p className="mt-4 text-center text-green-900">
              {submissionMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
