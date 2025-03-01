import React from "react";

const MobileApp = () => {
  return (
    <div className="app-download text-center py-20 sm:py-40" id="app-download">
      <div className="app-download-platforms">
        <h2 className="text-xl sm:text-4xl font-bold text-gray-500">For a Better Experience, Download the <br /> <span className="text-purple-600">Dineo Application</span></h2>
        <p className="text-gray-500 mt-3 sm:text-base text-sm">Enjoy seamless browsing, faster ordering, and exclusive app-only deals.</p>
        {/* App Store Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" className="text-white px-2 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition duration-300 hover:scale-110" >
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="text-white px-2 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition duration-300 hover:scale-110" >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="h-10" />
          </a>
        </div>
      </div>
    </div >
  );
};

export default MobileApp;
