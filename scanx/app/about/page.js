"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  FaRegGem, 
  FaInstagram, 
  FaGithub, 
  FaEnvelope, 
  FaFacebook, 
  FaLinkedin, 
  FaXTwitter, 
  FaDribbble 
} from "react-icons/fa";

// Navbar Component
function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-4 left-0 right-0 flex justify-center z-50">
      <div className="bg-black bg-opacity-75 rounded-3xl px-8 py-3 shadow-2xl">
        <div className="flex items-center space-x-20">
          <Link href="/features" className="text-white hover:text-gray-300">
            Features
          </Link>
          <Link href="/solution" className="text-white hover:text-gray-300">
            Solution
          </Link>
          <Link href="/">
            <Image
              src={"/scanx-logo.png"}
              alt="ScanX Logo"
              width={60}
              height={60}
            />
          </Link>
          <Link href="/pricing" className="text-white hover:text-gray-300">
            Pricing
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Animated Background Component

function AnimatedBackground() {
  const topWords = [
    "Creative Design",
    "UI/UX",
    "Web Design",
    "Marketing",
    "Motion",
    "Framer",
    "WordPress",
    "Pixel Perfect Design",
    "Mobile App Design",
  ];
  const bottomWords = [
    "Next.js",
    "Tailwindcss",
    "Bootstrap",
    "LangChain",
    "MongoDB",
    "Python",
    "MySql",
    "React",
    "JavaScript",
    "Php",
    "Flutter",
    "Scss",
    "Artificial Intelligence",
  ];

  return (
    <div className="top-0 left-0 right-0 z--10 pointer-events-none overflow-hidden">
      {/* Top Angled Bar */}
      <div
        className="absolute top-20 right-full w-full h-12 bg-black transform rotate-[25deg] origin-top-left"
        style={{
          transform: "rotate(25deg) translateX(100%)",
          transformOrigin: "top right",
        }}
      >
        <div className="text-white animate-slide-left whitespace-nowrap flex items-center">
          {[...topWords].map((word, index) => (
            <div key={index} className="flex items-center">
              <span className="px-4 text-3xl">{word}</span>
              {index < topWords.length - 1 && (
                <FaRegGem className="text-yellow-400 text-lg mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Angled Bar */}
      <div
        className="absolute top-64 right-full w-full h-12 bg-slate-100 transform -rotate-[15deg] origin-top-right"
        style={{
          transform: "rotate(-15deg) translateX(100%)",
          transformOrigin: "top right",
        }}
      >
        <div className="text-black animate-slide-right whitespace-nowrap flex items-center">
          {[...bottomWords].map((word, index) => (
            <div key={index} className="flex items-center">
              <span className="px-4 text-3xl">{word}</span>
              {index < topWords.length - 1 && (
                <FaRegGem className="text-blue-400 text-lg mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Central Text Section */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-right z-20 pb-96 pl-96">
        <div className="text-6xl font-bold mb-12">
          <span className="text-black">Brand.</span>
          <span className="text-red-500">Design.</span>
          <span className="text-blue-500">Product.</span>
        </div>
        <div className="text-4xl text-gray-700">
          In-Hours Development. &More
        </div>
      </div>
    </div>
  );
}

// Creators Section Component




function CreatorsSection() {
  const creators = [
    // {
    //   name: "Ayushi Thumar",
    //   role: "UI/UX Designer & Developer",
    //   image: "/Ayushi.png",
    //   gradient: "from-pink-200 to-white",
    //   linkedin: "https://www.linkedin.com/in/ayushi-thumar-b07309251",
    //   instagram: "https://www.instagram.com/ayushi_thumar",
    //   github: "https://github.com/AThumar",
    //   gmail: "mailto:ayushideveloper7030@gmail.com",
    //   skills: [
    //     "Passionate about creating user-friendly and visually appealing interfaces",
    //     "Proficient in wireframing, prototyping, and front-end development",
    //     "Strong understanding of design principles and user psychology",
    //     "Dedicated to enhancing digital experiences through innovation",
    //   ],
    // },
    {
      name: "Naman Gundaniya",
      role: "UI/UX Designer & Developer",
      image: "/Naman.png",
      gradient: "from-blue-200 to-white",
      linkedin: "https://www.linkedin.com/in/naman-gundaniya-087621209",
      instagram: "https://www.instagram.com/ig_radiation",
      github: "https://github.com/NamanPatel7030",
      gmail: "mailto:namandeveloper7030@gmail.com",
      skills: [
        "Skilled in crafting intuitive and engaging user interfaces",
        "Proficient in modern design tools and front-end technologies",
        "Focused on delivering seamless user experiences through creative solutions",
        "Passionate about blending aesthetics with functionality",
      ],
    },
    // {
    //   name: "Harshal Rupala",
    //   role: "Marketing Executive",
    //   image: "/harshal.png",
    //   gradient: "from-teal-200 to-white",
    //   linkedin: "https://www.linkedin.com/in/harshalrupala516",
    //   instagram: "https://www.instagram.com/harshalrupala516",
    //   github: "https://github.com/harshalrupala516",
    //   gmail: "mailto:harshalrupala516@gmail.com",
    //   skills: [
    //     "Expert in brand strategy and digital marketing",
    //     "Specializes in market research and customer engagement",
    //     "Skilled in crafting compelling user interaction strategies",
    //     "Focused on growing and promoting brands with innovative strategies",
    //   ],
    // },
  ];

  return (
    <div className="container px-4 py-16 mt-96">
      <h2 className="text-4xl font-normal text-center mb-12 text-start">Meet Our Creators</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {creators.map((creator) => (
          <div
            key={creator.name}
            onClick={() => window.open(creator.linkedin, "_blank")}
            className={`cursor-pointer block bg-gradient-to-br ${creator.gradient} rounded-lg p-6 shadow-md relative transform transition-transform hover:scale-105`}
          >
            <div className="flex flex-col items-center">
              <div className="w-55 h-64 mb-4">
                <Image
                  src={creator.image}
                  alt={creator.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{creator.name}</h3>
              <p className="text-gray-600 mb-4">{creator.role}</p>

              {/* Skills List (Aligned Left) */}
              <ul className="text-left text-sm mb-4">
                {creator.skills.map((skill, index) => (
                  <li key={index} className="mb-2 flex items-center">
                    <span className="text-lg mr-2">•</span> {skill}
                  </li>
                ))}
              </ul>

              {/* Social Media Buttons */}
              <div className="flex space-x-4">
                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Stops event propagation
                >
                  <FaInstagram className="text-pink-500 text-2xl hover:text-pink-700" />
                </a>
                <a
                  href={creator.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Stops event propagation
                >
                  <FaGithub className="text-gray-800 text-2xl hover:text-gray-600" />
                </a>
                <a
                  href={creator.gmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Stops event propagation
                >
                  <FaEnvelope className="text-red-500 text-2xl hover:text-red-700" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





// Main About Page Component
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-100 relative overflow-hidden">
      <Navbar />
      <AnimatedBackground />
      <CreatorsSection />

      {/* Footer */}
      <footer className="bg-gray-200 py-8 rounded-full ">
      <div className="container mx-auto px-4 z-50">
        {/* Top Navigation Links */}
        <div className="flex justify-center space-x-20 text-gray-700 font-medium">
          <Link href="/about" className="hover:text-gray-600">About Us</Link>
          <Link href="/contact" className="hover:text-gray-600">Contact</Link>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
          <Link href="/portfolio" className="hover:text-gray-600">Portfolio</Link>
          <Link href="/case-study" className="hover:text-gray-600">Case Study</Link>
          <Link href="/services" className="hover:text-gray-600">Services</Link>
          <Link href="/pricing" className="hover:text-gray-600">Pricing</Link>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-center items-center text-gray-600 text-sm">
          <div>© 2025 ScanX - All Rights Reserved</div>
          <div className="flex space-x-16 md:ml-8 mr-8">
            <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600">Terms of Use</Link>
          </div>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-600"><FaFacebook /></Link>
            <Link href="#" className="hover:text-gray-600"><FaLinkedin /></Link>
            {/* <Link href="#" className="hover:text-gray-600"><FaXTwitter /></Link> */}
            <Link href="#" className="hover:text-gray-600"><FaInstagram /></Link>
            <Link href="#" className="hover:text-gray-600"><FaDribbble /></Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
