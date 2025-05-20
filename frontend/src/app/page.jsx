'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function AutoDocsPreview() {
  const [destination, setDestination] = React.useState('/login');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setDestination(token ? '/user/uploadCode' : '/login');
  }, []);

  return (
    <>
    <Navbar/>
      <div className="bg-[#0a192f] font-sans text-gray-100">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1d4ed8]">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            >
              AI-Powered Documentation Generator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto mb-8 text-gray-300"
            >
              Automatically create, structure, and maintain well-organized documentation for your software projects. Save time and improve consistency with AI assistance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <Link
                href={destination}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                href="/demo"
                className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-md font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Watch Demo
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mt-16 rounded-lg shadow-2xl border border-gray-700 bg-[#112240] p-4 max-w-4xl hover:shadow-blue-500/20 duration-300transform hover:scale-105 transition duration-300 cyber-border scanner flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden"
            >
              <img src="/autodocs.png" alt="AutoDocs Platform Preview" className="w-full rounded" />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
                AutoDocs combines AI technology with modern web development to streamline your documentation process.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🤖",
                  title: "AI-Powered Generation",
                  description: "Leverage artificial intelligence to automatically generate clear and concise documentation from your code comments and definitions."
                },
                {
                  icon: "💻",
                  title: "Source Code Analysis",
                  description: "Analyze code in popular programming languages like JavaScript, Python, and Java to extract relevant information."
                },
                {
                  icon: "📤",
                  title: "Multiple Export Formats",
                  description: "Export your documentation in various formats including PDF, Markdown, and more for easy sharing."
                },
                {
                  icon: "🕒",
                  title: "Version Control",
                  description: "Track changes to documentation with our History Manager module, allowing you to view and revert to previous versions."
                },
                {
                  icon: "👥",
                  title: "Team Collaboration",
                  description: "Enable role-based access and permissions for seamless collaboration among team members."
                },
                {
                  icon: "🎨",
                  title: "Theme Customization",
                  description: "Personalize documentation styles to match your brand identity and enhance user experience."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#0a192f] p-8 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-gray-800 hover:border-blue-500/50"
                >
                  <div className="text-blue-400 text-4xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-[#0a192f] to-[#112240]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-4">How It Works</h2>
              <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
                Creating professional documentation has never been easier. AutoDocs streamlines the entire process.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              {[
                {
                  number: "1",
                  title: "Upload Source Code",
                  description: "Upload or paste your source code through our user-friendly interface."
                },
                {
                  number: "2",
                  title: "AI Analysis",
                  description: "Our AI analyzes your code and generates structured documentation automatically."
                },
                {
                  number: "3",
                  title: "Edit & Customize",
                  description: "Refine the generated documentation using our live markdown editor and theme customizer."
                },
                {
                  number: "4",
                  title: "Export & Share",
                  description: "Export your documentation in various formats and share with your team or clients."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-1 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/20">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-4">Why Choose AutoDocs?</h2>
              <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
                AutoDocs offers significant advantages over traditional documentation methods.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="autodocs2.png"
                  alt="AutoDocs Benefits"
                  className="rounded-lg shadow-xl h-full w-full object-cover transform hover:scale-105 transition-all duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ul className="space-y-6">
                  {[
                    {
                      title: "Time Efficiency",
                      description: "Reduce documentation time by up to 70% with AI-powered automation."
                    },
                    {
                      title: "Consistency & Quality",
                      description: "Maintain consistent structure and formatting across all documentation."
                    },
                    {
                      title: "Up-to-Date Documentation",
                      description: "Automatically detect code changes and update documentation accordingly."
                    },
                    {
                      title: "Team Productivity",
                      description: "Improve collaboration and reduce miscommunication within development teams."
                    }
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start group"
                    >
                      <div className="flex-shrink-0 mr-4 mt-1 text-blue-400 group-hover:text-blue-300 transition-colors">
                        ✓
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-blue-300 transition-colors">{benefit.title}</h3>
                        <p className="text-gray-400">{benefit.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6 text-white"
            >
              Ready to Transform Your Documentation Process?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl max-w-2xl mx-auto mb-8 text-gray-100"
            >
              Join thousands of developers and teams who are saving time and improving documentation quality with AutoDocs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                href="/signup"
                className="px-8 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact-us"
                className="px-8 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300"
              >
                Schedule Demo
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-[#0a192f] text-white pt-16 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2 text-blue-400">📄</span>
                  <span className="text-xl font-bold">AutoDocs</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Revolutionizing software documentation with AI-powered solutions.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">🐦</a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">🔗</a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">🐙</a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">📘</a>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Home</Link></li>
                  <li><a href="#features" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Features</a></li>
                  <li><a href="#how-it-works" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">How It Works</a></li>
                  <li><a href="#benefits" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Benefits</a></li>
                  <li><Link href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Pricing</Link></li>
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Tutorials</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Support</a></li>
                </ul>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">✉️</span>
                    <a href='mailto:ks9520125@gmail.com' className="text-gray-400 hover:text-blue-400 transition-colors duration-300">ks9520125@gmail.com</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">📞</span>
                    <a href='tel:9026872887' className="text-gray-400 hover:text-blue-400 transition-colors duration-300">9026872887</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">📍</span>
                    <span className="text-gray-400">Lucknow,UttarPradesh</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; 2025 AutoDocs. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}