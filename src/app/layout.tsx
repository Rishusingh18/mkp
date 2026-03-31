import type { Metadata } from "next";
import { Inter, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mkppackersmovers.com'),
  title: {
    default: "MKP Packers & Movers | Professional Relocation Services",
    template: "%s | MKP Packers & Movers"
  },
  description: "Top-rated corporate and residential relocation services by MKP Packers & Movers. Get a free quote for local and long-distance moving.",
  keywords: [
    "packers and movers near me", "best packers and movers near me", "local packers and movers near me", "packer and mover near me",
    "movers near me", "moving companies near me", "house shifting company near me", "shifting service near me", "office movers near me", "furniture movers near me",
    "packers and movers", "best packers and movers", "relocation services", "movers and packers", "shifting services", "home shifting services", "house shifting services", "office shifting services",
    "corporate relocation", "residential moving", "MKP packers", "household shifting services", "home relocation services", "door to door shifting services",
    "packing and unpacking services", "loading and unloading services", "car transportation services", "bike transportation services", "vehicle relocation services",
    "warehouse and storage services", "packers and movers charges", "packers and movers rates", "packers and movers price list", "packers and movers charges per km",
    "affordable packers and movers", "cheap packers and movers", "1BHK shifting charges", "2BHK shifting charges", "damage free house shifting", "safe home shifting",
    "goods transport service", "truck transport service", "mini truck rental", "transport company", "cargo transportation", "intercity transport service",
    "how to choose best packers and movers", "tips for safe home shifting", "home shifting checklist", "verified packers and movers with insurance",
    "packer and mover in Agra", "packer and mover in Ahmedabad", "packer and mover in Ajaigarh", "packer and mover in Akbarpur", "packer and mover in Aliganj", "packer and mover in Aligarh", "packer and mover in Amethi", "packer and mover in Amroha", "packer and mover in Anpara", "packer and mover in Anupshahr", "packer and mover in Anūpnagar", "packer and mover in Aonla", "packer and mover in Arrah", "packer and mover in Atrauli", "packer and mover in Atrauliā", "packer and mover in Auraiya", "packer and mover in Ayodhya", "packer and mover in Azamgarh", "packer and mover in Baberu", "packer and mover in Baghpat", "packer and mover in Bah", "packer and mover in Baheri", "packer and mover in Bahraich", "packer and mover in Bajpur", "packer and mover in Balaura", "packer and mover in Ballia", "packer and mover in Balrampur", "packer and mover in Banda", "packer and mover in Bansdih", "packer and mover in Bansgaon", "packer and mover in Bansi", "packer and mover in Banthra Sikander Pur", "packer and mover in Bara Banki", "packer and mover in Baraut", "packer and mover in Bareilly", "packer and mover in Barsana", "packer and mover in Basai", "packer and mover in Baseri", "packer and mover in Basti", "packer and mover in Bayana", "packer and mover in Belanganj", "packer and mover in Bettiah", "packer and mover in Bhabua", "packer and mover in Bhadohi", "packer and mover in Bhagaura", "packer and mover in Bhander", "packer and mover in Bharatpur", "packer and mover in Bharthana", "packer and mover in Bhatauli", "packer and mover in Bheta", "packer and mover in Bhind", "packer and mover in Bhira", "packer and mover in Bhongaon", "packer and mover in Bhīta", "packer and mover in Bidhuna", "packer and mover in Bijnor", "packer and mover in Bikapur", "packer and mover in Bilari", "packer and mover in Bilaspur", "packer and mover in Bilgram", "packer and mover in Bilhaur", "packer and mover in Bina", "packer and mover in Bindki", "packer and mover in Bisalpur", "packer and mover in Bisauli", "packer and mover in Bishunpura", "packer and mover in Biswan", "packer and mover in Budaun", "packer and mover in Budhana", "packer and mover in Bulandshahr", "packer and mover in Buxar", "packer and mover in Chakia", "packer and mover in Chandauli", "packer and mover in Chanderi", "packer and mover in Chapra", "packer and mover in Charkhari", "packer and mover in Chaukhandi", "packer and mover in Chhachharauli", "packer and mover in Chhata", "packer and mover in Chhatarpur", "packer and mover in Chhibramau", "packer and mover in Chinhat", "packer and mover in Chitrakoot", "packer and mover in Chitrakoot Dham", "packer and mover in Chunar", "packer and mover in Chīrgaon", "packer and mover in Dadri", "packer and mover in Dalmau", "packer and mover in Dataganj", "packer and mover in Datia", "packer and mover in Deeg", "packer and mover in Delhi", "packer and mover in Deoband", "packer and mover in Deoria", "packer and mover in Derapur", "packer and mover in Dhampur", "packer and mover in Dhangadhi", "packer and mover in Dhaulpur", "packer and mover in Dibiyapur", "packer and mover in Domriaganj", "packer and mover in Dudhi", "packer and mover in Dārāganj", "packer and mover in Etah", "packer and mover in Etawah", "packer and mover in Etmadpur", "packer and mover in Faizabad", "packer and mover in Faizullah Nagar", "packer and mover in Faridabad", "packer and mover in Faritpur", "packer and mover in Farrukhabad", "packer and mover in Fatehabad", "packer and mover in Fatehpur", "packer and mover in Fatehpur Sikri", "packer and mover in Firozabad", "packer and mover in Gajraula", "packer and mover in Ganaur", "packer and mover in Garautha", "packer and mover in Garhmukteshwar", "packer and mover in Gauriganj", "packer and mover in Gharaunda", "packer and mover in Ghatampur", "packer and mover in Ghaziabad", "packer and mover in Ghazipur", "packer and mover in Ghosi", "packer and mover in Gokul", "packer and mover in Gokulpur", "packer and mover in Gonda", "packer and mover in Gopalganj", "packer and mover in Gorakhpur", "packer and mover in Goshainganj", "packer and mover in Govardhan", "packer and mover in Greater Noida", "packer and mover in Gunnaur", "packer and mover in Gyanpur", "packer and mover in Haidargarh", "packer and mover in Hamirpur", "packer and mover in Handia", "packer and mover in Hapur", "packer and mover in Haraiya", "packer and mover in Hardoi", "packer and mover in Haridwar", "packer and mover in Hasanganj", "packer and mover in Hasanpur", "packer and mover in Hastinapur", "packer and mover in Hata", "packer and mover in Hathras", "packer and mover in Iglas", "packer and mover in Jagadhri", "packer and mover in Jahangirabad", "packer and mover in Jalalabad", "packer and mover in Jalaun", "packer and mover in Jalesar", "packer and mover in Jansath", "packer and mover in Jaspur", "packer and mover in Jasrana", "packer and mover in Jatara", "packer and mover in Jaunpur", "packer and mover in Jaypee Greens", "packer and mover in Jhansi", "packer and mover in Jhusi", "packer and mover in Kaazi Sarai", "packer and mover in Kadipur", "packer and mover in Kagarol", "packer and mover in Kaimganj", "packer and mover in Kairana", "packer and mover in Kaisarganj", "packer and mover in Kakarmatha", "packer and mover in Kalpi", "packer and mover in Kaman", "packer and mover in Kannauj", "packer and mover in Kanpur", "packer and mover in Karchana", "packer and mover in Karera", "packer and mover in Karhal", "packer and mover in Karnal", "packer and mover in Karwi", "packer and mover in Kasganj", "packer and mover in Kashipur", "packer and mover in Khaga", "packer and mover in Khair", "packer and mover in Khairagarh", "packer and mover in Khalilabad", "packer and mover in Khanna", "packer and mover in Khatima", "packer and mover in Khurai", "packer and mover in Khurja", "packer and mover in Khushalipur", "packer and mover in Kichha", "packer and mover in Kirakat", "packer and mover in Kiraoli", "packer and mover in Konch", "packer and mover in Kosi", "packer and mover in Kotdwāra", "packer and mover in Kuchesar", "packer and mover in Kulpahar", "packer and mover in Kumher", "packer and mover in Kunda", "packer and mover in Kushinagar", "packer and mover in Lahar", "packer and mover in Lakhimpur", "packer and mover in Lalitpur", "packer and mover in Lauri", "packer and mover in Lucknow", "packer and mover in Machhlishahr", "packer and mover in Maharajganj", "packer and mover in Mahoba", "packer and mover in Mahrauni", "packer and mover in Mahuan", "packer and mover in Mailani", "packer and mover in Mainpuri", "packer and mover in Malihabad", "packer and mover in Manjhanpur", "packer and mover in Mansurpur", "packer and mover in Mariahu", "packer and mover in Mat", "packer and mover in Mathura", "packer and mover in Mau", "packer and mover in Mau Ranipur", "packer and mover in Maudaha", "packer and mover in Mawana", "packer and mover in Meerut", "packer and mover in Meja", "packer and mover in Milak", "packer and mover in Mirzapur", "packer and mover in Misrikh", "packer and mover in Modinagar", "packer and mover in Mohand", "packer and mover in Mohania", "packer and mover in Mohanlalganj", "packer and mover in Moradabad", "packer and mover in Moth", "packer and mover in Mughal Sarai", "packer and mover in Muhamdi", "packer and mover in Muhammadabad", "packer and mover in Mungaoli", "packer and mover in Muradev", "packer and mover in Muradnagar", "packer and mover in Musafirkhana", "packer and mover in Muzaffarnagar", "packer and mover in Nagina", "packer and mover in Najibabad", "packer and mover in Nakur", "packer and mover in Nanpara", "packer and mover in Naraini", "packer and mover in Naugarh", "packer and mover in Nawabganj", "packer and mover in Nepalgunj", "packer and mover in New Delhi", "packer and mover in Nighasan", "packer and mover in Nivari", "packer and mover in Noida", "packer and mover in Nowgong", "packer and mover in Orai", "packer and mover in Orchha", "packer and mover in Padrauna", "packer and mover in Palia Kalan", "packer and mover in Palwal", "packer and mover in Paonta Sahib", "packer and mover in Patti", "packer and mover in Pawayan", "packer and mover in Pharenda", "packer and mover in Phulpur", "packer and mover in Pichor", "packer and mover in Pilibhit", "packer and mover in Pipraich", "packer and mover in Pratapgarh", "packer and mover in Prayagraj", "packer and mover in Pukhrayan", "packer and mover in Puranpur", "packer and mover in Purwa", "packer and mover in Radha Kund", "packer and mover in Raebareli", "packer and mover in Ramanuj Ganj", "packer and mover in Ramnagar", "packer and mover in Rampur", "packer and mover in Ramsanehighat", "packer and mover in Rasra", "packer and mover in Rath", "packer and mover in Robertsganj", "packer and mover in Roorkee", "packer and mover in Rudrapur", "packer and mover in Rupbas", "packer and mover in Sadabad", "packer and mover in Safipur", "packer and mover in Sagri", "packer and mover in Saharanpur", "packer and mover in Sahaswan", "packer and mover in Saidpur", "packer and mover in Saifai", "packer and mover in Salempur", "packer and mover in Salon", "packer and mover in Samalkha", "packer and mover in Sambhal", "packer and mover in Sandila", "packer and mover in Sardhana", "packer and mover in Sarnath", "packer and mover in Sehmalpur", "packer and mover in Shahabad", "packer and mover in Shahganj", "packer and mover in Shahjahanpur", "packer and mover in Shamli", "packer and mover in Shikohabad", "packer and mover in Shravasti", "packer and mover in Siddharthanagar", "packer and mover in Sidhauli", "packer and mover in Sikandarabad", "packer and mover in Sikandra Rao", "packer and mover in Singrauli", "packer and mover in Sirathu", "packer and mover in Sirmaur", "packer and mover in Sitapur", "packer and mover in Siwan", "packer and mover in Sonauli", "packer and mover in Sonepat", "packer and mover in Soraon", "packer and mover in Suar", "packer and mover in Sultanpur", "packer and mover in Sūbedārganj", "packer and mover in Tanda", "packer and mover in Tarabganj", "packer and mover in Teonthar", "packer and mover in Thakurdwara", "packer and mover in Tikamgarh", "packer and mover in Tilhar", "packer and mover in Unchagaon", "packer and mover in Unnao", "packer and mover in Utraula", "packer and mover in Varanasi", "packer and mover in Vikram Van", "packer and mover in Vindhyachal", "packer and mover in Vrindavan", "packer and mover in Zamania"
  ],
  authors: [{ name: "MKP Packers & Movers" }],
  creator: "MKP Packers & Movers",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MKP Packers & Movers",
    title: "MKP Packers & Movers | Professional Relocation Services",
    description: "Top-rated corporate and residential relocation services by MKP Packers & Movers. Get a free quote for local and long-distance moving.",
    images: [
      {
        url: "/mkp-packers-movers-logo.webp",
        width: 800,
        height: 600,
        alt: "MKP Packers & Movers Professional Relocation Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MKP Packers & Movers | Professional Relocation Services",
    description: "Top-rated corporate and residential relocation services by MKP Packers & Movers. Get a free quote for local and long-distance moving.",
    creator: "@mkppackersmovers",
    images: ["/mkp-packers-movers-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/mkp-packers-movers-logo.webp',
    apple: '/mkp-packers-movers-logo.webp',
  },
};

import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5S3DKXP');`
          }}
        />
        {/* End Google Tag Manager */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5S3DKXP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Toaster position="bottom-right" theme="dark" closeButton richColors />
        <Navbar />
        <Analytics />
        <div className="flex-1 pt-18 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
