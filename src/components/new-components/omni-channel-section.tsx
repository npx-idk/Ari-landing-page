"use client";

import { Button } from "@ari/ui/components/button";
import { Badge } from "@ari/ui/components/badge";
import {
    MessageCircle,
    Facebook,
    Instagram,
    Smartphone,
    UserPlus,
    ShieldAlert,
    Bot,
    ArrowRight
} from "lucide-react";

export function OmniChannelSection() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Visual Side */}
                    <div className="relative">
                        <div className="relative rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 p-8 z-10">
                            {/* Chat Simulation */}
                            <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
                                <div className="bg-gray-50 dark:bg-black/20 p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 relative">
                                            <Smartphone className="w-5 h-5 text-green-600" />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">WhatsApp Business</h4>
                                            <p className="text-xs text-gray-500">Active • Ari AI responding</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                                        Live
                                    </Badge>
                                </div>

                                <div className="p-4 space-y-4 bg-white dark:bg-gray-950 h-64 overflow-hidden relative">
                                    {/* Chat bubbles */}
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] text-sm text-gray-700 dark:text-gray-300">
                                            Hi, do you have the blue sneakers in size 10?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-blue-600 rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%] text-sm text-white flex items-center">
                                            <Bot className="w-3 h-3 mr-2 opacity-70" />
                                            Yes! We have 3 pairs left in stock. Would you like a direct link to buy?
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] text-sm text-gray-700 dark:text-gray-300">
                                            That would be great, thanks! Also, how long is shipping?
                                        </div>
                                    </div>

                                    {/* Alert Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 flex items-start animate-fade-in-up">
                                        <ShieldAlert className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <h5 className="font-medium text-yellow-800 dark:text-yellow-400 text-sm">Complexity Flagged</h5>
                                            <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-1">
                                                Customer asking detailed shipping questions. Suggested: Human takeover.
                                            </p>
                                            <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-yellow-300 text-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/50">
                                                Intervene Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Platforms */}
                            <div className="flex justify-center space-x-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mb-2">
                                        <Facebook className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 flex items-center justify-center mb-2">
                                        <Instagram className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center mb-2">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background elements */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl -z-10"></div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <Badge variant="secondary" className="mb-6 font-body bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            Coming Soon
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            One Dashboard. <br />
                            <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">Every Conversation.</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-body mb-8 leading-relaxed">
                            Manage WhatsApp, Instagram, and Facebook chats in one place. Ari handles the routine, and flagged conversations bring you in exactly when needed.
                        </p>

                        <ul className="space-y-5 mb-10">
                            <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                                <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                Seamless Human Handoff
                            </li>
                            <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                                <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                    <Bot className="w-5 h-5" />
                                </div>
                                Platform Specific AI Control
                            </li>
                            <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                                <div className="mr-4 p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                                Intelligent Urgency Detection
                            </li>
                        </ul>

                        {/* <Button variant="outline" size="lg" className="group text-lg">
                            Join the Waitlist
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button> */}
                    </div>

                </div>
            </div>
        </section>
    );
}
