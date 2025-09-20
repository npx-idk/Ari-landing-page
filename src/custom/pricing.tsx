"use client";

import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import React, { memo, useCallback, useMemo, useState } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import { TextEffect } from "./motion/text-effect";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

// Types
interface PlanPrice {
	readonly monthly: number | string;
	readonly yearly: number | string;
}

interface Plan {
	readonly id: string;
	readonly name: string;
	readonly price: PlanPrice;
	readonly description: string;
	readonly features: readonly string[];
	readonly cta: string;
	readonly popular?: boolean;
}

type BillingFrequency = "monthly" | "yearly";

// Constants - moved to top level for better tree-shaking
const PLANS: readonly Plan[] = [
	{
		id: "free",
		name: "Free",
		price: { monthly: 0, yearly: 0 },
		description:
			"The perfect starting place for your web app or personal project.",
		features: ["300 Messages", "No AI Audio Call", "No Support Available"],
		cta: "Get started for free",
	},
	{
		id: "plus",
		name: "Plus",
		price: { monthly: 20, yearly: 216 },
		description: "Everything you need to build and scale your business.",
		features: ["1200 Messages", "No AI Audio Call", "Standard Support"],
		cta: "Subscribe to Plus",
		popular: true,
	},
	{
		id: "pro",
		name: "Pro",
		price: { monthly: 50, yearly: 480 },
		description: "Everything you need to build and scale your business.",
		features: ["2000 Messages", "AI Audio Call", "Priority 24/7 Support"],
		cta: "Subscribe to Pro",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		price: { monthly: "Let's talk", yearly: "Let's talk" },
		description: "Critical security, performance, observability and support.",
		features: ["2000 Messages", "AI Audio Call", "Priority 24/7 Support"],
		cta: "Contact us",
	},
] as const;

// Consolidated styles with CSS custom properties for better performance
const STYLES = {
	section:
		"not-prose flex flex-col gap-12 sm:gap-16 px-4 sm:px-6 lg:px-8 text-center  py-12 sm:py-16 md:py-20 overflow-hidden",
	header: "flex flex-col items-center justify-center gap-6 sm:gap-8",
	title:
		"text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-700 dark:text-white/90",
	subtitle:
		"mt-4 text-sm sm:text-base text-gray-500 dark:text-white/70 max-w-2xl mx-auto",
	grid: "mt-6 sm:mt-8 grid w-full gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
	card: {
		base: "relative w-full max-w-full h-full text-left bg-white border border-gray-200/60 shadow-lg shadow-gray-100/50 dark:bg-[#1A2E25] dark:shadow-2xl dark:shadow-primary/10 dark:bg-gradient-to-br dark:from-card dark:via-card dark:to-primary/5 dark:border-gray-700/50",
		popular:
			"ring-2 ring-primary/30 border-primary/30 dark:ring-primary/30 dark:border-primary/30",
	},
	tabs: {
		container: "bg-muted rounded-full pb-2.5 max-w-xs mx-auto",
		list: "bg-transparent grid w-full grid-cols-2 gap-1",
		trigger:
			"data-[state=active]:bg-white dark:data-[state=active]:bg-[#011e2b] data-[state=active]:shadow-sm text-muted-foreground data-[state=active]:text-foreground font-medium rounded-full cursor-pointer text-sm px-3 py-2",
	},
	badge: {
		popular:
			"-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full px-4 py-1.5 text-xs shadow-lg font-semibold h-8 uppercase tracking-wider backdrop-blur-md border bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:shadow-md dark:bg-green-600/20 dark:hover:bg-green-600/30 dark:text-white dark:border-green-500/30 dark:hover:shadow-xl dark:hover:shadow-green-500/25",
		discount:
			"ml-2 bg-primary/75 text-[#011e2b] border border-primary/20 text-xs px-2 py-0.5 rounded-full",
	},
	price: {
		container: "flex items-baseline gap-1",
		number: "font-bold text-3xl text-foreground",
		text: "text-gray-600 font-medium dark:text-white/80",
		string: "font-bold text-4xl text-foreground",
	},
	feature: {
		container:
			"flex items-center gap-3 text-sm text-gray-600 dark:text-white/80",
		icon: "h-4 w-4 flex-shrink-0 text-green-600 dark:text-primary/50",
	},
	button: {
		base: "w-full font-semibold h-10 text-sm uppercase tracking-wider backdrop-blur-md border bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 shadow-md hover:shadow-lg hover:shadow-green-600/25 dark:bg-green-600/20 dark:hover:bg-green-600/30 dark:text-white dark:border-green-500/30 dark:hover:shadow-xl dark:hover:shadow-green-500/25 cursor-pointer rounded-full",
		popular: "shadow-lg hover:shadow-xl",
	},
} as const;

// Number formatting configuration
const NUMBER_FORMAT_CONFIG = {
	style: "currency" as const,
	currency: "USD" as const,
	currencyDisplay: "narrowSymbol" as const,
	maximumFractionDigits: 0,
};

// Memoized components for better performance
const PriceDisplay = memo<{ price: PlanPrice; frequency: BillingFrequency }>(
	({ price, frequency }) => {
		const currentPrice = price[frequency];

		if (typeof currentPrice === "number") {
			return (
				<div className={STYLES.price.container}>
					<NumberFlow
						className={STYLES.price.number}
						format={NUMBER_FORMAT_CONFIG}
						value={currentPrice}
					/>
					<span className={STYLES.price.text}>/ {frequency}</span>
				</div>
			);
		}

		return <span className={STYLES.price.string}>{currentPrice}</span>;
	},
);
PriceDisplay.displayName = "PriceDisplay";

const FeatureList = memo<{ features: readonly string[] }>(({ features }) => (
	<CardContent className="grid gap-3 pb-2 h-full">
		{features.map((feature) => (
			<div key={feature} className={STYLES.feature.container}>
				<BadgeCheck className={STYLES.feature.icon} />
				{feature}
			</div>
		))}
	</CardContent>
));
FeatureList.displayName = "FeatureList";

const PlanCard = memo<{ plan: Plan; frequency: BillingFrequency }>(
	({ plan, frequency }) => (
		<Card className={cn(STYLES.card.base, plan.popular && STYLES.card.popular)}>
			{plan.popular && (
				<Badge className={cn(STYLES.badge.popular, "z-10")}>Popular</Badge>
			)}

			<CardHeader className="pb-2">
				<CardTitle className="font-semibold text-xl text-card-foreground">
					{plan.name}
				</CardTitle>
				<CardDescription className="text-gray-600 dark:text-white/80">
					<p className="mb-4">{plan.description}</p>
					<PriceDisplay price={plan.price} frequency={frequency} />
				</CardDescription>
			</CardHeader>

			<FeatureList features={plan.features} />

			<CardFooter>
				<Link href={"https://apps.shopify.com/ari-2"} className="w-full">
					<Button
						className={cn(
							STYLES.button.base,
							plan.popular && STYLES.button.popular,
						)}
					>
						{plan.cta}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</Link>
			</CardFooter>
		</Card>
	),
);
PlanCard.displayName = "PlanCard";

const PricingTabs = memo<{
	frequency: BillingFrequency;
	onFrequencyChange: (value: string) => void;
}>(({ frequency, onFrequencyChange }) => (
	<Tabs
		defaultValue={frequency ?? "monthly"}
		onValueChange={onFrequencyChange}
		className={STYLES.tabs.container}
		aria-label="Billing frequency tabs"
	>
		<TabsList
			className={STYLES.tabs.list}
			aria-label="Choose your billing frequency"
		>
			<TabsTrigger value="monthly" className={STYLES.tabs.trigger}>
				Monthly
			</TabsTrigger>
			<TabsTrigger value="yearly" className={STYLES.tabs.trigger}>
				Yearly
				<Badge className={STYLES.badge.discount}>20% off</Badge>
			</TabsTrigger>
		</TabsList>
	</Tabs>
));
PricingTabs.displayName = "PricingTabs";

// Simple Carousel Component
const SimpleCarousel = memo<{
	plans: readonly Plan[];
	frequency: BillingFrequency;
}>(({ plans, frequency }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);
	const [slidesPerView, setSlidesPerView] = useState(1);

	React.useEffect(() => {
		const updateSlidesPerView = () => {
			const width = window.innerWidth;
			setSlidesPerView(width >= 800 && width <= 1000 ? 2 : 1);
		};
		updateSlidesPerView();
		window.addEventListener("resize", updateSlidesPerView);
		return () => window.removeEventListener("resize", updateSlidesPerView);
	}, []);

	const totalPages = Math.ceil(plans.length / slidesPerView);

	React.useEffect(() => {
		const lastPage = Math.max(0, totalPages - 1);
		if (currentIndex > lastPage) setCurrentIndex(lastPage);
	}, [totalPages]);

	const goToPrevious = useCallback(() => {
		setCurrentIndex((prev) => {
			const lastPage = Math.max(0, totalPages - 1);
			return prev === 0 ? lastPage : prev - 1;
		});
	}, [totalPages]);

	const goToNext = useCallback(() => {
		setCurrentIndex((prev) => {
			const lastPage = Math.max(0, totalPages - 1);
			return prev === lastPage ? 0 : prev + 1;
		});
	}, [totalPages]);

	// Auto-scroll functionality
	React.useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			goToNext();
		}, 4000); // Change slide every 4 seconds

		return () => clearInterval(interval);
	}, [goToNext, isAutoPlaying]);

	// Touch handlers for swipe functionality
	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
		setIsAutoPlaying(false); // Pause auto-play on touch
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const minSwipeDistance = 50;

		if (distance > minSwipeDistance) {
			goToNext();
		} else if (distance < -minSwipeDistance) {
			goToPrevious();
		}

		// Resume auto-play after 3 seconds of inactivity
		setTimeout(() => setIsAutoPlaying(true), 3000);
	};

	const handleMouseEnter = () => setIsAutoPlaying(false);
	const handleMouseLeave = () => setIsAutoPlaying(true);

	return (
		<div className="relative w-[90vw] mx-auto">
			{/* Card Container with extra top padding for popular badge */}
			<div
				className="overflow-hidden pt-6 pb-4 px-1"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div
					className="flex transition-transform duration-300 ease-in-out"
					style={{
						transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
					}}
				>
					{plans.map((plan) => (
						<div
							key={plan.id}
							className="flex-shrink-0 px-3"
							style={{ width: `${100 / slidesPerView}%` }}
						>
							<PlanCard plan={plan} frequency={frequency} />
						</div>
					))}
				</div>
			</div>

			{/* Navigation Buttons */}
			<button
				onClick={() => {
					goToPrevious();
					setIsAutoPlaying(false);
					setTimeout(() => setIsAutoPlaying(true), 3000);
				}}
				className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
				aria-label="Previous plan"
			>
				<ArrowLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
			</button>

			<button
				onClick={() => {
					goToNext();
					setIsAutoPlaying(false);
					setTimeout(() => setIsAutoPlaying(true), 3000);
				}}
				className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
				aria-label="Next plan"
			>
				<ArrowRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
			</button>

			{/* Dots Indicator */}
			<div className="flex justify-center space-x-2 mt-4">
				{Array.from({ length: totalPages }).map((_, index) => (
					<button
						key={index}
						onClick={() => {
							setCurrentIndex(index);
							setIsAutoPlaying(false);
							setTimeout(() => setIsAutoPlaying(true), 3000);
						}}
						className={cn(
							"w-2 h-2 rounded-full transition-colors",
							index === currentIndex
								? "bg-primary"
								: "bg-gray-300 dark:bg-gray-600",
						)}
						aria-label={`Go to page ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
});
SimpleCarousel.displayName = "SimpleCarousel";

// Main component
const OptimizedPricing = () => {
	const [frequency, setFrequency] = useState<BillingFrequency>("monthly");

	// Use useCallback to prevent unnecessary re-renders of child components
	const handleFrequencyChange = useCallback((value: string) => {
		setFrequency(value as BillingFrequency);
	}, []);

	// Memoize plan cards - only re-render when frequency changes
	const planCards = useMemo(
		() =>
			PLANS.map((plan) => (
				<PlanCard key={plan.id} plan={plan} frequency={frequency} />
			)),
		[frequency],
	);

	return (
		<section id="pricing" className={STYLES.section}>
			<AnimatedGroup
				preset="blur-slide"
				className={STYLES.header}
				viewportBehavior="once"
			>
				<TextEffect
					as="h2"
					className={STYLES.title}
					preset="fade-in-blur"
					per="word"
					viewportBehavior="once"
				>
					Simple Pricing for Powerful AI
				</TextEffect>

				<TextEffect
					as="p"
					className={STYLES.subtitle}
					preset="slide"
					per="line"
					viewportBehavior="once"
				>
					Choose a pricing plan that works for your business needs. Start with
					our free trial and upgrade as your business grows, no long-term
					contracts, cancel anytime.
				</TextEffect>

				<PricingTabs
					frequency={frequency}
					onFrequencyChange={handleFrequencyChange}
				/>

				{/* Desktop Grid Layout - Hidden on screens smaller than lg */}
				<AnimatedGroup
					preset="scale"
					as="div"
					className={cn(STYLES.grid, "hidden lg:grid")}
					viewportBehavior="once"
				>
					{planCards}
				</AnimatedGroup>

				{/* Mobile/Tablet Carousel Layout - Hidden on lg and larger screens */}
				<div className="lg:hidden w-full px-4 sm:px-6">
					<SimpleCarousel plans={PLANS} frequency={frequency} />
				</div>
			</AnimatedGroup>
		</section>
	);
};

// Add display name for better debugging
OptimizedPricing.displayName = "OptimizedPricing";

export default memo(OptimizedPricing);
