import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export function SocialSidebar() {
  const socials = [
    { icon: Github, href: "https://github.com/Mischio95" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/michele-trombone-470458233?trk=people-guest_people_search-card&originalSubdomain=it",
    },
    { icon: Instagram, href: "https://www.instagram.com/michele_trombone/" },
  ];

  return (
    <div className="fixed bottom-0 left-10 hidden xl:block">
      <div className="flex flex-col items-center gap-6">
        {socials.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors hover:text-[#64FFDA]"
            whileHover={{ color: "#64FFDA", scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <social.icon className="h-5 w-5" />
          </motion.a>
        ))}
        <div className="mt-4 h-24 w-[1px] bg-slate-400" />
      </div>
    </div>
  );
}
