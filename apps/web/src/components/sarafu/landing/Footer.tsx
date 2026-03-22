import { footerContent } from "@/data/mockData";

interface FooterProps {
  readonly className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-[#131313] w-full py-16 border-t border-[#353534]/30 ${className ?? ""}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <span className="text-xl font-black text-[#fff9ef] mb-4 block font-headline">{footerContent.brand}</span>
          <p className="text-sm text-[#d4c5ab] leading-relaxed">{footerContent.tagline}</p>
        </div>
        {footerContent.columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold text-[#FFBF00] mb-6 uppercase tracking-widest">{col.title}</h4>
            <div className="flex flex-col gap-4">
              {col.links.map((link) => (
                <a
                  key={link.label}
                  className="text-[#d4c5ab] hover:text-[#FFBF00] transition-colors text-sm"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#353534]/30 flex flex-col md:flex-row justify-between items-center gap-6 text-[#d4c5ab] text-sm">
        <p>{footerContent.copyright}</p>
        <div className="flex gap-6">
          {footerContent.socialIcons.map((icon) => (
            <span
              key={icon}
              className="material-symbols-outlined text-xl cursor-pointer hover:text-[#FFBF00] transition-colors"
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
