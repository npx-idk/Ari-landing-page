"use client";

import { Button } from "@ari/ui/components/button";
import { Separator } from "@ari/ui/components/separator";
import { Icons } from "@ari/ui/components/icons";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Globe,
  Phone,
  MapPin
} from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Integrations", href: "#integrations" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ],
};

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/ari_ai",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "https://github.com/ari-ai",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/ari-ai",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:hello@ari.ai",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Icons.logo className="w-8 h-8" />
              
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm font-body">
              Your intelligent AI shopping assistant. 
              Transforming e-commerce with personalized customer experiences and 24/7 support.
            </p>

            {/* Social Links */}
            {/* <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div> */}
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 font-heading">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-body"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0 font-body">
            © 2025 Ari. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 font-body">
            <span>Made with ❤️ for e-commerce</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>AI systems online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 