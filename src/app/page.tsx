"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "./footer/page";
import Header from "./header/page";
import Image from "next/image";
import Head from "next/head";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
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
              
              <div className="relative z-10 mb-4">
                <Image src="images/hero.svg" alt="heroimage"
                  height={400}
                  width={438}/>
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-4">
              <p className="md:text-6xl lg:text-4xl font-semibold  text-[#02022e] mb-4 font-['Inter'] tracking-[-0.05em]">
                The Web3 Super App.
              </p>
              <p className="text-xs text-[#5E5E5E] font-semibold max-w-2xl mx-auto font-['Inter'] tracking-[-0.04em]">
                Trade. Earn. Connect. All in one mobile-first experience.
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-50"> {/* Much higher z-index */}
              <Button
                onClick={() => router.push('/register')}
                className="rounded-[3px] px-12 sm:px-16 md:px-20 lg:px-16 py-6"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
        
        <Footer/>
      </div>
    </>
  );
}