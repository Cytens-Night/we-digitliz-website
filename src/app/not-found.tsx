import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
        <h1 className="text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-xl font-medium text-white/80 mb-8">
          The page could not be found.
        </h2>
        
        <p className="text-white/60 mb-8 text-sm leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-black bg-white rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
