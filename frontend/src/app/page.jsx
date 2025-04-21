import React from 'react'

const Home = () => {
  return (
    <div>
      <>
        {/* Header/Navigation */}
        <header className="bg-gradient-to-r from-ai-blue to-ai-purple text-white fixed w-full z-50 shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-file-code text-3xl mr-2" />
              <span className="text-2xl font-bold">AutoDocs</span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a href="#features" className="hover:text-blue-200 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-blue-200 transition">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-blue-200 transition">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-200 transition">
                    Contact
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#aboutus" className="hover:text-blue-200 transition">
                    About Us
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex space-x-4">
              <a
                href="loginpage.html"
                className="px-4 py-2 text-ai-purple bg-white rounded-md font-medium hover:bg-gray-100 transition"
              >
                Login
              </a>
              <a
                href="signuppage.html"
                className="px-4 py-2 bg-ai-dark rounded-md font-medium hover:bg-gray-800 transition"
              >
                Sign Up
              </a>
            </div>
            <button className="md:hidden text-white">
              <i className="fas fa-bars text-xl" />
            </button>
          </div>
        </header>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-5"
              style={{ backgroundImage: 'url("data:image/svg+xml' }}
            />
            <h1 className="text-4xl md:text-5xl font-bold text-ai-dark mb-6">
              AI-Powered Documentation Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Automatically create, structure, and maintain well-organized
              documentation for your software projects. Save time and improve
              consistency with AI assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a
                href="#"
                className="px-8 py-3 bg-gradient-to-r from-ai-blue to-ai-purple text-white rounded-md font-semibold hover:opacity-90 transition transform hover:-translate-y-1 shadow-lg"
              >
                Get Started
              </a>
              <a
                href="#"
                className="px-8 py-3 border-2 border-ai-purple text-ai-purple rounded-md font-semibold hover:bg-purple-50 transition"
              >
                Watch Demo
              </a>
            </div>
            <img
              src="https://cdn.prod.website-files.com/62fcfcf2e1a4c21ed18b80e6/66aaa3e3ead42bbebe16eda3_cc1f58f7-282f-4746-a9d6-f631c87b8c6a.png"
              alt="AutoDocs Platform Preview"
              className="max-w-4xl mx-auto mt-16 rounded-lg shadow-xl border border-gray-200"
            />
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ai-blue to-ai-purple">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                AutoDocs combines AI technology with modern web development to
                streamline your documentation process.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                <div className="text-ai-blue text-4xl mb-4">
                  <i className="fas fa-robot" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Generation</h3>
                <p className="text-gray-600">
                  Leverage artificial intelligence to automatically generate clear and
                  concise documentation from your code comments and definitions.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                <div className="text-ai-blue text-4xl mb-4">
                  <i className="fas fa-code" />
                </div>
                <h3 className="text-xl font-bold mb-3">Source Code Analysis</h3>
                <p className="text-gray-600">
                  Analyze code in popular programming languages like JavaScript,
                  Python, and Java to extract relevant information.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                <div className="text-ai-blue text-4xl mb-4">
                  <i className="fas fa-file-export" />
                </div>
                <h3 className="text-xl font-bold mb-3">Multiple Export Formats</h3>
                <p className="text-gray-600">
                  Export your documentation in various formats including PDF,
                  Markdown, and more for easy sharing.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                <div className="text-ai-blue text-4xl mb-4">
                  <i className="fas fa-history" />
                </div>
                <h3 className="text-xl font-bold mb-3">Version Control</h3>
                <p className="text-gray-600">
                  Track changes to documentation with our History Manager module,
                  allowing you to view and revert to previous versions.
                </p>
              </div>
              {/* Feature 5 */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                <div className="text-ai-blue text-4xl mb-4">
                  <i className="fas fa-users" />
                </div>
                <h3 className="text-xl font-bold mb-3">Team Collaboration</h3>
                <p className="text-gray-600">
                  Enable role-based access and permissions for seamless collaboration
                  among team members.
                </p>
              </div>
              {/* Feature 6 */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                <div className="text-ai-blue text-4xl mb-4">
                  <i className="fas fa-paint-brush" />
                </div>
                <h3 className="text-xl font-bold mb-3">Theme Customization</h3>
                <p className="text-gray-600">
                  Personalize documentation styles to match your brand identity and
                  enhance user experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-b from-blue-50 to-indigo-50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ai-blue to-ai-purple">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                Creating professional documentation has never been easier. AutoDocs
                streamlines the entire process.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              {/* Step 1 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-ai-blue to-ai-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Upload Source Code</h3>
                <p className="text-gray-600">
                  Upload or paste your source code through our user-friendly
                  interface.
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-ai-blue to-ai-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
                <p className="text-gray-600">
                  Our AI analyzes your code and generates structured documentation
                  automatically.
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-ai-blue to-ai-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Edit &amp; Customize</h3>
                <p className="text-gray-600">
                  Refine the generated documentation using our live markdown editor
                  and theme customizer.
                </p>
              </div>
              {/* Step 4 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-ai-blue to-ai-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3">Export &amp; Share</h3>
                <p className="text-gray-600">
                  Export your documentation in various formats and share with your
                  team or clients.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ai-blue to-ai-purple">
                Why Choose AutoDocs?
              </h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                AutoDocs offers significant advantages over traditional documentation
                methods.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPYsn1645fCNe55DBlwpOKtd5wYsAdvG44yvRNv-SROXh-PV8ZJDzsIk0Xadzr_gqKIQ&usqp=CAU"
                  alt="AutoDocs Benefits"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <i className="fas fa-check-circle text-ai-blue text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Time Efficiency</h3>
                      <p className="text-gray-600">
                        Reduce documentation time by up to 70% with AI-powered
                        automation.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <i className="fas fa-check-circle text-ai-blue text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Consistency &amp; Quality
                      </h3>
                      <p className="text-gray-600">
                        Maintain consistent structure and formatting across all
                        documentation.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <i className="fas fa-check-circle text-ai-blue text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Up-to-Date Documentation
                      </h3>
                      <p className="text-gray-600">
                        Automatically detect code changes and update documentation
                        accordingly.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <i className="fas fa-check-circle text-ai-blue text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Team Productivity
                      </h3>
                      <p className="text-gray-600">
                        Improve collaboration and reduce miscommunication within
                        development teams.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-ai-blue via-ai-indigo to-ai-purple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Documentation Process?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of developers and teams who are saving time and improving
              documentation quality with AutoDocs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#"
                className="px-8 py-3 bg-white text-ai-purple rounded-md font-semibold hover:bg-gray-100 transition shadow-lg"
              >
                Start Free Trial
              </a>
              <a
                href="#"
                className="px-8 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-indigo-700 transition"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer id="contact" className="bg-ai-dark text-white pt-16 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center mb-4">
                  <i className="fas fa-file-code text-2xl mr-2 text-blue-400" />
                  <span className="text-xl font-bold">AutoDocs</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Revolutionizing software documentation with AI-powered solutions.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <i className="fab fa-github" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <i className="fab fa-facebook" />
                  </a>
                </div>
              </div>
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#benefits"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      Benefits
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">
                  Contact Us
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-envelope text-blue-400 mr-3 mt-1" />
                    <span className="text-gray-400">support@autodocs.com</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-phone text-blue-400 mr-3 mt-1" />
                    <span className="text-gray-400">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-blue-400 mr-3 mt-1" />
                    <span className="text-gray-400">
                      123 Documentation St, Tech City, 94123
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400">
              <p>© 2025 AutoDocs. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </>

    </div>
  )
}

export default Home
