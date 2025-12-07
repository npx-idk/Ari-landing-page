"use client";

import { Button } from "@ari/ui/components/button";
import { Badge } from "@ari/ui/components/badge";
import {
    Mail,
    BarChart3,
    MousePointer2,
    Clock,
    ArrowRight,
    Zap,
    Target
} from "lucide-react";

export function EmailCampaignSection() {
    return (
        <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content Side */}
                    <div className="order-2 lg:order-1">
                        <Badge variant="outline" className="mb-6 font-body text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300">
                            New Feature
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Smart Email Campaigns that <span className="text-purple-600">Convert</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-body mb-8 leading-relaxed">
                            Boost your returning customers with our intelligent email module. Set up campaigns for new launches or nudge previous buyers with similar product recommendations—all automated.
                        </p>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                                    <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Targeted Use Cases</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Choose from pre-built templates for specific goals like "New Arrival" or "We Miss You".</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Detailed Analytics</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Track opens, clicks, and conversions directly from your dashboard to optimize performance.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Fully Automated</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Our internal cron engine handles the scheduling and delivery, so you can focus on your business.</p>
                                </div>
                            </div>
                        </div>

                        {/* <Button size="lg" className="group text-lg">
                            Start Your First Campaign
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button> */}
                    </div>

                    {/* Visual Side */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="relative rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-2 border border-gray-200 dark:border-gray-700 shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
                            <div className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-inner">
                                {/* Mock Dashboard UI */}
                                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">Campaign Manager</div>
                                </div>

                                <div className="p-8">
                                    <div className="flex justify-between items-end mb-8">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Total Revenue Generated</p>
                                            <h4 className="text-4xl font-bold text-gray-900 dark:text-white">$12,450.00</h4>
                                        </div>
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">+24.5%</Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center text-gray-500 mb-2">
                                                <Mail className="w-4 h-4 mr-2" />
                                                <span className="text-sm">Sent</span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">15,234</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center text-gray-500 mb-2">
                                                <MousePointer2 className="w-4 h-4 mr-2" />
                                                <span className="text-sm">Clicks</span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">4,890</p>
                                        </div>
                                    </div>

                                    {/* Campaign List Mock */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Summer Sale Nudge</span>
                                            </div>
                                            <span className="text-sm text-gray-500">2 min ago</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Welcome Series</span>
                                            </div>
                                            <span className="text-sm text-gray-500">1 hour ago</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Win-back Campaign</span>
                                            </div>
                                            <span className="text-sm text-gray-500">Scheduled</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background blur */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
