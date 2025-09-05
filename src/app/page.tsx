"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "./footer/page";
import Header from "./header/page";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col center-fade-bg">
      <style jsx>{`
        .center-fade-bg {
          background: radial-gradient(circle, #EEF2FB 0%, rgba(238, 242, 251, 0.8) 20%, rgba(238, 242, 251, 0.5) 40%, rgba(238, 242, 251, 0.2) 60%, rgba(238, 242, 251, 0.1) 80%, transparent 100%);
        }
      `}</style>
      
      <Header/>
      
      <div className="flex-1 flex justify-center px-4 py-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Three Phones Image with Blue Glow */}
          <div className="relative flex items-center justify-center mb-1">
            {/* Central blue radial glow - pushed way down */}
            <div className="absolute inset-0 flex items-center justify-center translate-y-32">
              <div className="w-[800px] h-[500px] bg-gradient-to-t from-blue-300/30 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
            </div>
            {/* Bottom-up fading glow - pushed way down */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-24 w-full h-[800px] pointer-events-none">
              <div className="w-full h-full bg-gradient-to-t to-transparent blur-3xl"></div>
            </div>
                         
            <div className="relative z-10 hover:scale-105 transition-all duration-300">
              <Image src="images/hero.svg" alt="heroimage"
                  height={400} 
                   width={438}/>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-10">
            <p className=" md:text-6xl  lg:text-4xl font-semibold text-gray-950 mb-6 ">
              The Web3 Super App.
            </p>
            <p className="text-xs  text-gray-600 max-w-2xl mx-auto">
              Trade. Earn. Connect. All in one mobile-first experience.
            </p>
          </div>

          {/* CTA Button */}
          <div className="relative z-50"> {/* Much higher z-index */}
            <Button 
               onClick={() => router.push('/register')}
              className="bg-[#8759FF] hover:bg-purple-700 text-white font-semibold py-2 px-8 text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative z-50"
            >
              Join
            </Button>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}