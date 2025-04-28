'use client';   
import { useState } from 'react';
import { Users, Target, File, Award, ChevronDown, ChevronUp, Mail } from 'lucide-react';

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState('mission');
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const toggleCard = (cardId) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
    }
  };

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Maya Johnson",
      role: "Founder & CEO",
      bio: "Former software engineer with a PhD in Computer Science. Maya founded AutoDocs after experiencing firsthand the frustrations of documentation management in tech companies."
    },
    {
      id: 2,
      name: "Alex Rivera",
      role: "CTO",
      bio: "AI specialist with 15 years of experience at leading tech firms. Alex leads our technical innovation and AI development efforts."
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "Head of Product",
      bio: "Product management expert who previously led teams at major SaaS companies. Sarah ensures AutoDocs meets real user needs."
    },
    {
      id: 4,
      name: "Jamal Brooks",
      role: "Customer Success Lead",
      bio: "With a background in technical documentation and customer support, Jamal leads our efforts to ensure clients maximize value from AutoDocs."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">About AutoDocs</h1>
          <p className="text-xl mb-8">Revolutionizing technical documentation through the power of AI</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => toggleSection('mission')}
              className={`py-2 px-4 rounded-full transition-all ${activeSection === 'mission' ? 'bg-white text-blue-600 font-medium' : 'bg-blue-700 hover:bg-blue-800'}`}
            >
              Our Mission
            </button>
            <button 
              onClick={() => toggleSection('team')}
              className={`py-2 px-4 rounded-full transition-all ${activeSection === 'team' ? 'bg-white text-blue-600 font-medium' : 'bg-blue-700 hover:bg-blue-800'}`}
            >
              Our Team
            </button>
            <button 
              onClick={() => toggleSection('values')}
              className={`py-2 px-4 rounded-full transition-all ${activeSection === 'values' ? 'bg-white text-blue-600 font-medium' : 'bg-blue-700 hover:bg-blue-800'}`}
            >
              Our Values
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Mission Section */}
        {activeSection === 'mission' && (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-8">
              <Target size={32} className="text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            
            <p className="text-lg text-gray-700 mb-6">
              At AutoDocs, we're on a mission to transform how technical documentation is created, maintained, and utilized. We believe that great documentation is the backbone of successful software, and that no developer should waste precious time struggling with outdated or unclear documentation.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">The Documentation Challenge</h3>
              <p className="text-gray-700">
                Documentation has long been the neglected aspect of software development - often outdated, incomplete, or difficult to navigate. This leads to countless wasted hours, increased onboarding time, and frustration for developers worldwide.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Our Solution</h3>
              <p className="text-gray-700">
                AutoDocs leverages cutting-edge AI to automatically generate, update, and enhance technical documentation. Our platform integrates seamlessly with your codebase, analyzes changes in real-time, and maintains documentation that is always accurate, comprehensive, and accessible.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Promise</h3>
              <p className="text-blue-800">
                We're committed to saving developers thousands of hours worldwide, accelerating software development, and making knowledge sharing effortless. With AutoDocs, documentation is no longer a burden—it's an asset.
              </p>
            </div>
          </div>
        )}

        {/* Team Section */}
        {activeSection === 'team' && (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-8">
              <Users size={32} className="text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Team</h2>
            </div>
            
            <p className="text-lg text-gray-700 mb-8">
              AutoDocs is built by a passionate team of engineers, AI specialists, and documentation experts who understand the challenges of technical documentation firsthand.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map(member => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all"
                  onClick={() => toggleCard(member.id)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                      {expandedCard === member.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    
                    {expandedCard === member.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                        <p className="text-gray-700">{member.bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Join Our Team</h3>
              <p className="text-gray-700 mb-4">
                We're always looking for talented individuals who are passionate about documentation, AI, and creating tools that developers love.
              </p>
              <a href="#careers" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
                View Open Positions
              </a>
            </div>
          </div>
        )}

        {/* Values Section */}
        {activeSection === 'values' && (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-8">
              <Award size={32} className="text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Values</h2>
            </div>
            
            <p className="text-lg text-gray-700 mb-8">
              These core principles guide everything we do at AutoDocs, from product development to customer interactions.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Developer-First</h3>
                <p className="text-gray-700">
                  We build every feature with developers in mind, ensuring our solutions solve real problems and integrate seamlessly into existing workflows.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Continuous Innovation</h3>
                <p className="text-gray-700">
                  We're constantly pushing the boundaries of what's possible with AI and documentation technology, staying ahead of industry trends.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Knowledge Accessibility</h3>
                <p className="text-gray-700">
                  We believe information should be accessible to everyone, regardless of their experience level or background in software development.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-600">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Success</h3>
                <p className="text-gray-700">
                  Your success is our success. We're committed to providing exceptional support and ensuring you get maximum value from AutoDocs.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8 flex flex-col items-center text-center">
              <File size={48} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Documentation Manifesto</h3>
              <p className="text-lg text-gray-700 mb-6">
                We believe documentation should be a living, breathing asset that evolves with your code—not an afterthought or burden.
              </p>
              <a href="#manifesto" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
                Read Our Full Manifesto
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions About AutoDocs?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Our team is ready to help you revolutionize your documentation workflow.
          </p>
          <div className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors">
            <Mail size={20} className="mr-2" />
            Contact Us Today
          </div>
        </div>
      </div>
    </div>
  );
}