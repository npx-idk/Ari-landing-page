"use client";

import { useState, useEffect } from "react";
import { Button } from "@ari/ui/components/button";
import { Icons } from "@ari/ui/components/icons";
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  User,
  Building,
  Clock,
  MapPin,
  Star,
  Heart,
  Zap,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@ari/ui/lib/utils";
import Link from "next/link";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "idkbyhari@gmail.com",
    description: "Send us an email anytime",
    action: "mailto:idkbyhari@gmail.com",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7337772308",
    description: "Call us for immediate support",
    action: "tel:+917337772308",
    color: "from-green-400 to-green-600",
  },
  {
    icon: MessageSquare,
    label: "Demo",
    value: "Try Ari Live",
    description: "Experience Ari in action",
    action: "/#demo",
    color: "from-purple-400 to-purple-600",
  },
];

const faqs = [
  {
    question: "How quickly can I set up Ari?",
    answer:
      "Most stores are up and running with Ari in under 30 minutes. Our simple integration process requires just adding one script to your store.",
  },
  {
    question: "Do you offer custom training?",
    answer:
      "Yes! We can train Ari specifically on your products, brand voice, and customer service protocols for the most personalized experience.",
  },
  {
    question: "What platforms do you support?",
    answer:
      "Ari works with Shopify, WooCommerce, Magento, and most other e-commerce platforms. We also offer custom integrations.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Absolutely! We offer a 14-day free trial with no credit card required. You can experience the full power of Ari risk-free.",
  },
];

const reasons = [
  {
    icon: Zap,
    title: "Lightning Fast Setup",
    description: "Get Ari running in your store in under 30 minutes",
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "We treat every merchant like family",
  },
  {
    icon: Star,
    title: "Proven Results",
    description: "Average 300% increase in customer satisfaction",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);

    // Create mailto link with form data
    const subject = `Contact from ${formData.name} - ${formData.company}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:idkbyhari@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="w-8 h-8" />
            </Link> */}
            <Link href="/">
              <Button variant="default" cta size={"sm"}>
                <ArrowLeft className="w-4 h-4" />
                <Icons.logo className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary border border-gray-200 dark:border-gray-700 rounded-2xl mb-8 mx-auto border-primary-foreground ">
            <MessageSquare className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-gray-900 dark:text-white mb-6">
            Let's Talk!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your e-commerce experience? We'd love to hear
            from you.
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {" "}
              Let's build something amazing together!
            </span>
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => {
            const MethodIcon = method.icon;
            const isHovered = hoveredMethod === index;

            return (
              <a
                key={index}
                href={method.action}
                className={cn(
                  "group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm transition-all duration-500 transform block text-center",
                  isHovered
                    ? "scale-105 shadow-2xl"
                    : "hover:scale-102 hover:shadow-lg"
                )}
                onMouseEnter={() => setHoveredMethod(index)}
                onMouseLeave={() => setHoveredMethod(null)}
              >
                <div
                  className={cn(
                    "w-16 h-16 mx-auto mb-6 rounded-xl  border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-500 text-black shadow-lg",
                    method.color,
                    isHovered ? "scale-110 rotate-12" : "group-hover:scale-105"
                  )}
                >
                  <MethodIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {method.label}
                </h3>
                <p
                  className={cn(
                    "text-lg font-mono mb-3 transition-colors duration-300",
                    isHovered
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {method.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {method.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
