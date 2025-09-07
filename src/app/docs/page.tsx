"use client"

import React, { useState } from 'react';
import { FileText, MessageSquare, Smartphone, Globe } from 'lucide-react';
import Header from '../header/page';

const SuperappDocs = () => {
  const [activeSection, setActiveSection] = useState('superapp-app-feature');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Superapp App Feature Section */}
            <section id="superapp-app-feature" className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Superapp App Feature</h1>
              <p className="text-gray-600 mb-6">
                This page describes individual app elements and features in detail. See also:
              </p>
              
              <ul className="text-blue-600 mb-6 space-y-1">
                <li>• <a href="#" className="hover:underline">Advanced Interface Development</a></li>
                <li>• <a href="#" className="hover:underline">Tips &amp; Best Practices for Developers</a></li>
              </ul>

              {/* Input Section */}
              <div id="input" className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Input</h2>
                <p className="text-gray-600 mb-4">
                  Superapps let you implement all types of bots, including text, files, locations, stickers, voice messages and
                  more. While Telegram bots support basic interfaces, Superapps give you more options for building flexible
                  experiences that match your exact needs:
                </p>
                
                <ul className="text-blue-600 mb-4 space-y-1">
                  <li>• <a href="#" className="hover:underline">Commands that are registered in messages and can be selected from a list after typing &quot;/&quot;</a></li>
                  <li>• <a href="#" className="hover:underline">Keyboards that replace the input field with predefined answer options</a></li>
                  <li>• <a href="#" className="hover:underline">Buttons that appear inside messages sent by the bot</a></li>
                </ul>
                
                <p className="text-gray-600 mb-6">
                  For even more flexibility, Web Apps support 100% custom interfaces with JavaScript.
                </p>

                {/* Image placeholders for Input section */}
                <div className="flex gap-4 mb-6">
                  <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>
                  <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Mini Apps can support multiple languages that adapt to the users&apos; language settings in the app.
                  </p>
                </div>
              </div>

              {/* Mini Apps Section */}
              <div id="mini-apps" className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mini Apps</h2>
                <p className="text-gray-600 mb-4">
                  Mini Apps allow developers to create infinitely flexible interfaces that can be launched inside Telegram
                  without leaving the app.
                </p>
                
                <p className="text-gray-600 mb-4">
                  You can add a persistent launch button, videos and screenshots to help users understand what your Mini App
                  does. You can configure this via BotFather in the Mini App section.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    Mini apps are covered in detail in our dedicated guide – you should read it carefully to learn the wide
                    variety of features they can offer.
                  </p>
                </div>

                {/* Image placeholder for Mini Apps */}
                <div className="w-80 h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-gray-500" />
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  If you develop a mini app, be sure to follow our design guidelines – you&apos;ll want your custom interface
                  to integrate seamlessly into the app to provide the best possible user experience.
                </p>
              </div>

              {/* Language Support Section */}
              <div id="language-support" className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Language Support</h2>
                <p className="text-gray-600 mb-4">
                  Bots can change their interfaces to support multiple languages – updating inputs and information on the fly.
                  A user&apos;s language code is included in every relevant update as an IETF language tag, allowing bots to adapt
                  accordingly.
                </p>
                
                <p className="text-gray-600 mb-6">
                  We recommend following our guidelines to provide the best user experience:
                </p>

                <ul className="text-blue-600 mb-6 space-y-2">
                  <li>• <a href="#" className="hover:underline">Your interfaces, texts and results should adapt seamlessly to the language_code, without user interaction.</a></li>
                  <li>• <a href="#" className="hover:underline">Commands, keyboards and messages must respect language_code values.</a></li>
                  <li>• <a href="#" className="hover:underline">HTML5 Canvas can pass language_code if specified as a URL parameter, generated from the User object&apos;s language_code.</a></li>
                  <li>• <a href="#" className="hover:underline">Your interfaces, texts and inline results should adapt seamlessly to the language_code, without user interaction.</a></li>
                </ul>

                {/* Image placeholder for Language Support */}
                <div className="w-80 h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                    <Globe className="w-6 h-6 text-gray-500" />
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-blue-800">
                    If you target the general public, your code should always fall back to either the last recorded language tag
                    or English (en) when the field is missing for a specific user.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Static Sidebar */}
          <div className="w-64 flex-shrink-0 sticky top-8 h-fit">
            <nav className="space-y-1">
              <button 
                onClick={() => scrollToSection('superapp-app-feature')}
                className={`flex items-center text-purple-600 hover:text-purple-800 text-sm py-2 font-bold relative w-full text-left ${
                  activeSection === 'superapp-app-feature' ? '' : 'ml-4'
                }`}
              >
                {activeSection === 'superapp-app-feature' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
                )}
                <span className={activeSection === 'superapp-app-feature' ? 'ml-4' : ''}>Superapp App Feature</span>
              </button>
              <button 
                onClick={() => scrollToSection('input')}
                className={`text-purple-600 hover:text-purple-800 text-sm py-2 font-bold w-full text-left ${
                  activeSection === 'input' ? 'relative' : 'ml-4'
                }`}
              >
                {activeSection === 'input' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
                )}
                <span className={activeSection === 'input' ? 'ml-4' : ''}>Input</span>
              </button>
              <button 
                onClick={() => scrollToSection('mini-apps')}
                className={`text-purple-600 hover:text-purple-800 text-sm py-2 font-bold w-full text-left ${
                  activeSection === 'mini-apps' ? 'relative' : 'ml-4'
                }`}
              >
                {activeSection === 'mini-apps' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
                )}
                <span className={activeSection === 'mini-apps' ? 'ml-4' : ''}>Mini Apps</span>
              </button>
              <button 
                onClick={() => scrollToSection('language-support')}
                className={`text-purple-600 hover:text-purple-800 text-sm py-2 font-bold w-full text-left ${
                  activeSection === 'language-support' ? 'relative' : 'ml-4'
                }`}
              >
                {activeSection === 'language-support' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
                )}
                <span className={activeSection === 'language-support' ? 'ml-4' : ''}>Language Support</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperappDocs;