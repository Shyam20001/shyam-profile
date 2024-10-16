// src/components/Contact.jsx
function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-300 to-gray-200">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center mb-12">Contact Me</h3>
        <div className="max-w-lg mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        </div>
      </div>
    </section>
  );
}

export default Contact;
