"use client";

import { Button } from "@ari/ui/components/button";
import { Badge } from "@ari/ui/components/badge";
import { ArrowRight, Check } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 font-body">
            🎉 Limited Time Offer
          </Badge>
          
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-normal mb-6">
            Ready to{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              transform
            </span>{" "}
            your workflow?
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-body">
            Join thousands of teams who've already revolutionized their development process. 
            Start your free trial today.
          </p>
          
          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center md:justify-start">
              <Check className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
              <span className="text-blue-100 font-body">14-day free trial</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Check className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
              <span className="text-blue-100 font-body">No credit card required</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Check className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
              <span className="text-blue-100 font-body">Cancel anytime</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group px-8 py-6 text-lg font-semibold font-body bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 hover:translate-y-0 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-8 py-6 text-lg font-semibold font-body border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200 hover:translate-y-0 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
            >
              Talk to Sales
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-blue-200 text-sm mb-6 font-body">
              Trusted by leading companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {/* Placeholder for company logos */}
              <div className="px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <span className="text-white font-semibold font-body">TechCorp</span>
              </div>
              <div className="px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <span className="text-white font-semibold font-body">InnovateNow</span>
              </div>
              <div className="px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <span className="text-white font-semibold font-body">ScaleUp</span>
              </div>
              <div className="px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <span className="text-white font-semibold font-body">FutureApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 