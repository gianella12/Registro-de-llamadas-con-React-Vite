export const Tarjeta = ({ children }) => {
    return (
      <>
        <div className="hidden min-[1100px]:block">
          <div
            className="bg-[#f3e8ff] border border-[#c78ce9] rounded-2xl p-4 max-w-sm w-full sm:w-80
            shadow-lg fixed bottom-6 right-6 z-50
            transition-all duration-300 ease-in-out
            hover:shadow-[0_0_25px_10px_rgba(140,140,233,0.4)] hover:ring-2 hover:ring-[#c78ce9] hover:ring-opacity-50"
          >
            {children}
          </div>
        </div>
  
       
        <div className="block min-[1100px]:hidden">
          <div
            className="bg-[#f3e8ff] border border-[#c78ce9] rounded-2xl p-4 max-w-sm w-full sm:w-80 
            shadow-lg mx-auto my-4
            transition-all duration-300 ease-in-out
            hover:shadow-[0_0_25px_10px_rgba(199,140,233,0.5)] hover:ring-2 hover:ring-[#c78ce9] hover:ring-opacity-50"
          >
            {children}
          </div>
        </div>
      </>
    );
  };
  