const brands = [
  { name: "GOOD NATURE", logo: "🌿" },
  { name: "GOLDEN GALLERY", logo: "✨" },
  { name: "Sparker & Co.", logo: "⚡" },
  { name: "The Modern", logo: "🏛️" },
  { name: "Selena Gomez", logo: "💫" },
  { name: "Design Studio", logo: "🎨" },
]

const BrandLogosBar = () => (
  <div className="bg-slate-900 py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <p className="text-center text-slate-400 text-sm font-medium mb-8 uppercase tracking-wider">
        Trusted by Leading Brands
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center justify-center p-4 rounded-lg hover:bg-slate-800 transition-all duration-300 cursor-pointer"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{brand.logo}</div>
            <span className="text-slate-300 text-xs font-medium text-center group-hover:text-white transition-colors duration-300">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default BrandLogosBar
