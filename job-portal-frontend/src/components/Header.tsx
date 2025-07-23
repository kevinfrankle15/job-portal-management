interface HeaderProps {
  onCreateJobClick: () => void;
}

export const Header = ({ onCreateJobClick }: HeaderProps) => {
  return (
    <header className="sticky top-4 z-50 w-full flex justify-center">
      <div className="bg-white shadow-md rounded-full px-8 py-3 w-[90%] max-w-6xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm">
          <a href="#" className="text-black hover:font-semibold transition">Home</a>
          <a href="#" className="text-gray-600 hover:text-black transition">Find Jobs</a>
          <a href="#" className="text-gray-600 hover:text-black transition">Find Talents</a>
          <a href="#" className="text-gray-600 hover:text-black transition">About us</a>
          <a href="#" className="text-gray-600 hover:text-black transition">Testimonials</a>
        </nav>

        {/* Create Jobs Button */}
        <button
          onClick={onCreateJobClick}
          className="bg-[#921FEC] text-white text-sm px-6 py-2 rounded-full cursor-pointer"
        >
          Create Jobs
        </button>
      </div>
    </header>
  );
};
