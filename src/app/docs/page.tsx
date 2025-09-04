"use client"

import React, { useState } from 'react';
import { FileText, MessageSquare, Smartphone, Globe, Code, Zap } from 'lucide-react';
import Header from '../header/page';

const SuperappDocs = () => {
  const [activeSection, setActiveSection] = useState('wapal-app-feature');

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
            {/* Wapal App Feature Section */}
            <section id="wapal-app-feature" className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Wapal App Feature</h1>
              <p className="text-gray-600 mb-6">
                This page describes individual app elements and features in detail. See also:
              </p>
              
              <ul className="text-blue-600 mb-6 space-y-1">
                <li>• <a href="#" className="hover:underline">Express Bot Engine Overview</a></li>
                <li>• <a href="#" className="hover:underline">App Development for Developers</a></li>
              </ul>

              {/* Input Section */}
              <div id="input" className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Input</h2>
                <p className="text-gray-600 mb-4">
                  Users can send messages of all types to bots, including text, files, locations, stickers, voice messages and
                  more. Your app offers lively, loving, friendly, however, Telegram bots offer many other tools for building flexible
                  interfaces tailored to your specific needs:
                </p>
                
                <ul className="text-blue-600 mb-4 space-y-1">
                  <li>• <a href="#" className="hover:underline">Commands that are highlighted in messages and can be selected from a list after typing "/"</a></li>
                  <li>• <a href="#" className="hover:underline">Keyboards that replace the user's keyboard with predefined answer options</a></li>
                  <li>• <a href="#" className="hover:underline">Buttons that are shown right in messages from the bot</a></li>
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
                    <strong>Note:</strong> Wapal App can support multiple languages that adapt to the users' language settings in the app.
                  </p>
                </div>
              </div>

              {/* Mini Apps Section */}
              <div id="mini-apps" className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mini Apps</h2>
                <p className="text-gray-600 mb-4">
                  Mini Apps allow developers to create infinitely flexible interfaces that can be launched right inside Telegram.
                  Apps are being seamlessly with the app and receiving app webhooks.
                </p>
                
                <p className="text-gray-600 mb-4">
                  If your bot is a mini app, you can add a persistent Launch app button as well as menu, videos and
                  screenshots to help users understand what your Mini App does. You can customize this via the BotFather Mini App.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    Mini Apps are covered in detail in our dedicated guide - you should read it carefully to learn the wide
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
                  If you develop a mini app, be sure to follow our design guidelines – you'll want your custom interface
                  to seamlessly integrate into the app to provide users the best possible experience.
                </p>
              </div>

              {/* Language Support Section */}
              <div id="language-support" className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Language Support</h2>
                <p className="text-gray-600 mb-4">
                  Bots can take user experience to support multiple languages – updating inputs and information on the fly. A
                  user's language code is included in every relevant update as an IETF language tag, allowing bots to adapt
                  accordingly.
                </p>
                
                <p className="text-gray-600 mb-6">
                  We recommend that you follow our guidelines to provide the best user experience:
                </p>

                <ul className="text-blue-600 mb-6 space-y-2">
                  <li>• <a href="#" className="hover:underline">Your interfaces, texts and inline results should adapt seamlessly to the language_code, without user intervention.</a></li>
                  <li>• <a href="#" className="hover:underline">If multiple languages are needed that match the user's language_code in your HTML page should account for a longer in the language.</a></li>
                  <li>• <a href="#" className="hover:underline">HTML5 Canvas can detect language information if you specify it as a URL parameter. You can generate this parameter from the language_code field in the User object server with the Telegram CallbackQuery.</a></li>
                  <li>• <a href="#" className="hover:underline">Your interfaces, texts and inline results should adapt seamlessly to the language_code, without user intervention.</a></li>
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
                    or English (en) the device when the field is missing (or a specific one).
                  </p>
                </div>
              </div>



              {/* App Testing Section */}
            
            </section>
          </div>

          {/* Static Sidebar */}
          <div className="w-64 flex-shrink-0 sticky top-8 h-fit">
            <nav className="space-y-1">
              <button 
                onClick={() => scrollToSection('wapal-app-feature')}
                className={`flex items-center text-purple-600 hover:text-purple-800 text-sm py-2 font-bold relative w-full text-left ${
                  activeSection === 'wapal-app-feature' ? '' : 'ml-4'
                }`}
              >
                {activeSection === 'wapal-app-feature' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
                )}
                <span className={activeSection === 'wapal-app-feature' ? 'ml-4' : ''}>Wapal App Feature</span>
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
              <button 
                onClick={() => scrollToSection('what-features')}
                className={`text-purple-600 hover:text-purple-800 text-sm py-2 font-bold w-full text-left ${
                  activeSection === 'what-features' ? 'relative' : 'ml-4'
                }`}
              >
                {activeSection === 'what-features' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
                )}
                <span className={activeSection === 'what-features' ? 'ml-4' : ''}>What Features do bots...</span>
              </button>
              <button 
                onClick={() => scrollToSection('html-games')}
                className={`text-purple-600 hover:text-purple-800 text-sm py-2 font-bold w-full text-left ${
                  activeSection === 'html-games' ? 'relative' : 'ml-4'
                }`}
              >
                {activeSection === 'html-games' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
                )}
                <span className={activeSection === 'html-games' ? 'ml-4' : ''}>HTML Games</span>
              </button>
              <button 
                onClick={() => scrollToSection('app-testing')}
                className={`text-purple-600 hover:text-purple-800 text-sm py-2 font-bold w-full text-left ${
                  activeSection === 'app-testing' ? 'relative' : 'ml-4'
                }`}
              >
                {activeSection === 'app-testing' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
                )}
                <span className={activeSection === 'app-testing' ? 'ml-4' : ''}>App Testing</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperappDocs;