import loadingAnimation from "/certificate-loader.webm"; // Import the webm file

const Loader = () => {
  return (
    <div className="loader-container flex items-center justify-center flex-col min-h-screen">
      {/* Video element to display the webm file */}
      <video autoPlay loop muted className="loader-video">
        <source src={loadingAnimation} type="video/webm" />
        {/* Fallback text for unsupported browsers */}
        Your browser does not support the video tag.
      </video>
      
      {/* Loading text with animation */}
      <p className="text-green-400 font-bold text-2xl animate-pulse">Loading...</p>
    </div>
  );
};

export default Loader;
