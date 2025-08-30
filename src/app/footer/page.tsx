
    
    export default function Footer() {
    return (
    <footer className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-10 py-6 text-xs sm:text-sm  border-t gap-4 sm:gap-0 text-center sm:text-left text-[#2D2545]">
        <span>Copyright © 2025 Superapp</span>
        <div className="flex gap-4">
        <a href="#" className="text-[#2D2545]">
            All Rights Reserved
          </a>
          <a href="#" className="text-purple-600 underline">
            Terms and Conditions
          </a>
          <a href="#" className="text-purple-600 underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    );

    }