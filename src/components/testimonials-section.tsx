"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ari/ui/components/avatar";
import { Badge } from "@ari/ui/components/badge";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow",
    avatar: "/avatars/sarah.jpg",
    content: "This platform transformed how our team builds products. The developer experience is incredible, and our time-to-market has improved by 300%.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager",
    company: "InnovateNow",
    avatar: "/avatars/marcus.jpg",
    content: "The collaboration features are game-changing. Our distributed team now works seamlessly together, and the results speak for themselves.",
    rating: 5
  },
  {
    name: "Emily Zhang",
    role: "Lead Designer",
    company: "DesignFirst",
    avatar: "/avatars/emily.jpg",
    content: "Beautiful, intuitive design system that makes our products look professional. The customization options are endless.",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Founder",
    company: "StartupX",
    avatar: "/avatars/david.jpg",
    content: "From prototype to production in record time. This platform gave us the competitive edge we needed to succeed.",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Engineering Manager",
    company: "ScaleUp",
    avatar: "/avatars/lisa.jpg",
    content: "The security features and scalability are exactly what we needed for our enterprise clients. Highly recommended.",
    rating: 5
  },
  {
    name: "Alex Johnson",
    role: "CEO",
    company: "FutureApp",
    avatar: "/avatars/alex.jpg",
    content: "Outstanding platform that grows with your business. The support team is incredibly responsive and helpful.",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="outline" className="mb-4 font-body">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-5xl font-heading font-normal text-gray-900 dark:text-white mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              thousands
            </span>{" "}
            of teams
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-body">
            Don't just take our word for it. Here's what real users have to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-5 w-5 text-yellow-400 fill-current" 
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-body">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="font-body">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white font-heading">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-body">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-heading font-normal text-gray-900 dark:text-white mb-2">
              10K+
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-body">
              Happy Customers
            </div>
          </div>
          
          <div>
            <div className="text-3xl md:text-4xl font-heading font-normal text-gray-900 dark:text-white mb-2">
              99.9%
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-body">
              Uptime
            </div>
          </div>
          
          <div>
            <div className="text-3xl md:text-4xl font-heading font-normal text-gray-900 dark:text-white mb-2">
              50M+
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-body">
              API Requests
            </div>
          </div>
          
          <div>
            <div className="text-3xl md:text-4xl font-heading font-normal text-gray-900 dark:text-white mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-body">
              Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 