export default function Footer() {
  return (
    <footer className="mt-20 border-t border-copper-900/20 bg-black/40">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-copper-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-copper-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-copper-600"></div>
          </div>
          
          {/* Brand */}
          <p className="text-2xl font-playfair text-copper-400">
            Mute.
          </p>
          
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mute Restaurant. Tüm hakları saklıdır.
          </p>
          
          {/* Tagline */}
          <p className="text-xs text-copper-600 italic">
            Közün sıcaklığı, lezzetin zarafeti
          </p>
        </div>
      </div>
    </footer>
  )
}

