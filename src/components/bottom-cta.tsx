import { Button } from "@ari/ui/components/button";
import { ArrowRight, Zap } from "lucide-react";

export function BottomCTA() {
  return (
    <div className="text-center mt-24 mb-24">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-12 lg:p-16 border border-green-200 dark:border-gray-600">
        <div className="flex items-center justify-center mb-6">
          <Zap className="w-8 h-8 text-green-500 mr-3" />
          <span className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-heading">
            Ready to get started?
          </span>
        </div>
        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-4xl mx-auto leading-relaxed">
          Join thousands of Shopify store owners who are already using Ari to
          provide better customer experiences and increase sales.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <Button
            size="lg"
            cta={true}
            className="px-8 py-4"
            onClick={() => {
              window.open(process.env.NEXT_PUBLIC_WAITLIST_URL, "_blank");
            }}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <p className="text-base text-gray-500 dark:text-gray-400">
          No credit card required • Setup in under 10 minutes • 14-day free
          trial
        </p>
      </div>
    </div>
  );
}
