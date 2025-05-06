'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1d4ed8]">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            About AutoDocs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-8 text-gray-300"
          >
            Revolutionizing software documentation with AI-powered solutions. Our mission is to make documentation effortless and efficient for developers worldwide.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-[#112240]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Our Story</h2>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
              Born from the frustration of manual documentation, AutoDocs was created to transform how developers document their code.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: "2023",
                title: "The Beginning",
                description: "Founded with a vision to automate documentation processes using AI technology."
              },
              {
                year: "2024",
                title: "First Release",
                description: "Launched our MVP with core features for automated documentation generation."
              },
              {
                year: "2025",
                title: "Growth",
                description: "Expanded our platform with advanced features and a growing user base."
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a192f] p-8 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-gray-800 hover:border-blue-500/50"
              >
                <div className="text-blue-400 text-2xl font-bold mb-4">{milestone.year}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{milestone.title}</h3>
                <p className="text-gray-400">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-[#0a192f] to-[#112240]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Our Team</h2>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
              A passionate team of developers, designers, and AI experts working together to revolutionize documentation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Kshitij Singh",
                role: "Founder & CEO",
                image: "https://avatars.githubusercontent.com/u/12345678?v=4",
                social: {
                  github: "#",
                  linkedin: "#",
                  twitter: "#"
                }
              },
              {
                name: "Jane Smith",
                role: "Lead Developer",
                image: "https://avatars.githubusercontent.com/u/87654321?v=4",
                social: {
                  github: "#",
                  linkedin: "#",
                  twitter: "#"
                }
              },
              {
                name: "Mike Johnson",
                role: "AI Engineer",
                image: "https://avatars.githubusercontent.com/u/98765432?v=4",
                social: {
                  github: "#",
                  linkedin: "#",
                  twitter: "#"
                }
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#112240] rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-gray-800 hover:border-blue-500/50"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 mb-4">{member.role}</p>
                  <div className="flex space-x-4">
                    {Object.entries(member.social).map(([platform, link], i) => (
                      <motion.a
                        key={i}
                        href={link}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      >
                        {platform === 'github' ? '🐙' : platform === 'linkedin' ? '🔗' : '🐦'}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#112240]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
              The principles that guide everything we do at AutoDocs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🚀",
                title: "Innovation",
                description: "Constantly pushing boundaries to create better solutions for developers."
              },
              {
                icon: "💡",
                title: "Simplicity",
                description: "Making complex processes simple and accessible to everyone."
              },
              {
                icon: "🤝",
                title: "Collaboration",
                description: "Working together to build the best possible product."
              },
              {
                icon: "🎯",
                title: "Excellence",
                description: "Striving for the highest quality in everything we do."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a192f] p-8 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-gray-800 hover:border-blue-500/50"
              >
                <div className="text-blue-400 text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-white"
          >
            Join Our Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl max-w-2xl mx-auto mb-8 text-gray-100"
          >
            Be part of the revolution in software documentation.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link 
              href="/careers" 
              className="px-8 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Join Our Team
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}