import Script from "next/script";
import Navbar from "@/components/sarafu/landing/Navbar";
import HeroSection from "@/components/sarafu/landing/HeroSection";
import HowItWorks from "@/components/sarafu/landing/HowItWorks";
import CurrencyGrid from "@/components/sarafu/landing/CurrencyGrid";
import FeeTable from "@/components/sarafu/landing/FeeTable";
import PrivacySection from "@/components/sarafu/landing/PrivacySection";
import CtaSection from "@/components/sarafu/landing/CtaSection";
import Footer from "@/components/sarafu/landing/Footer";

export default function Home() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <Script
        src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
        strategy="beforeInteractive"
      />
      <Script id="tailwind-config" strategy="beforeInteractive">
        {`tailwind.config={darkMode:"class",theme:{extend:{colors:{"secondary-fixed-dim":"#e9c400","primary":"#ffe2ab","tertiary-fixed-dim":"#00d9fc","surface-container-high":"#2a2a2a","tertiary-fixed":"#aaedff","outline":"#9c8f78","surface-variant":"#353534","error-container":"#93000a","secondary-container":"#ffdb3c","surface-container-highest":"#353534","secondary-fixed":"#ffe16d","on-tertiary-fixed":"#001f26","on-primary-fixed-variant":"#5c4300","on-surface-variant":"#d4c5ab","inverse-surface":"#e5e2e1","surface-container-lowest":"#0e0e0e","surface-container-low":"#1c1b1b","on-background":"#e5e2e1","on-primary-container":"#6d5000","background":"#131313","error":"#ffb4ab","surface":"#131313","surface-tint":"#fbbc00","surface-bright":"#3a3939","on-tertiary":"#003640","on-error-container":"#ffdad6","on-secondary-fixed-variant":"#544600","on-secondary-fixed":"#221b00","on-tertiary-fixed-variant":"#004e5c","on-surface":"#e5e2e1","on-error":"#690005","outline-variant":"#504532","tertiary":"#b4efff","on-primary-fixed":"#261a00","surface-container":"#201f1f","primary-fixed-dim":"#fbbc00","on-secondary-container":"#725f00","tertiary-container":"#04dcff","on-primary":"#402d00","on-tertiary-container":"#005d6d","inverse-on-surface":"#313030","primary-fixed":"#ffdfa0","primary-container":"#ffbf00","surface-dim":"#131313","secondary":"#fff9ef","inverse-primary":"#795900","on-secondary":"#3a3000"},fontFamily:{"headline":["Manrope"],"body":["Inter"],"label":["Inter"]},borderRadius:{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"}}}}`}
      </Script>
      <style
        dangerouslySetInnerHTML={{
          __html: `.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr}body{background-color:#131313;color:#e5e2e1;font-family:'Inter',sans-serif}.font-headline{font-family:'Manrope',sans-serif}.glass-panel{background:rgba(28,27,27,0.6);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}.gold-gradient{background:linear-gradient(135deg,#ffe2ab 0%,#ffbf00 100%)}.glow-subtle{box-shadow:0 0 40px rgba(255,191,0,0.08)}`,
        }}
      />
      <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <Navbar />
        <main className="pt-32">
          <HeroSection />
          <HowItWorks />
          <CurrencyGrid />
          <FeeTable />
          <PrivacySection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
