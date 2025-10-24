export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-copper-900/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          {/* Logo */}
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gradient glow-copper tracking-wide">
            Mute.
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm md:text-base text-copper-400 font-light tracking-widest uppercase">
            Yeni Nesil Ocakbaşı & Meyhane
          </p>
          
          {/* Decorative Line */}
          <div className="flex items-center gap-2 mt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-copper-600"></div>
            <div className="w-1 h-1 rounded-full bg-copper-500"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-copper-600"></div>
          </div>
        </div>
      </div>
    </header>
  )
}

