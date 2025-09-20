"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import Logo from "./logo";
import { AnimatedGroup } from "./motion/animated-group";
import { TextEffect } from "./motion/text-effect";

// Types
interface LinkItem {
	readonly title: string;
	readonly href: string;
}

interface LinkGroup {
	readonly group: string;
	readonly items: readonly LinkItem[];
}

interface SocialLink {
	readonly href: string;
	readonly label: string;
	readonly icon: string;
}

// Constants
const NAVIGATION_LINKS: readonly LinkGroup[] = [
	{
		group: "Product",
		items: [
			{ title: "Features", href: "#features" },
			{ title: "Pricing", href: "#pricing" },
			{ title: "Help", href: "/contact" },
		],
	},
	{
		group: "Company",
		items: [
			{ title: "About", href: "/about" },
			{ title: "Blog", href: "/blog" },
			{ title: "Contact", href: "/contact" },
		],
	},
] as const;

const SOCIAL_LINKS: readonly SocialLink[] = [
	{
		href: "https://x.com/hi_ariai",
		label: "X/Twitter",
		icon: "M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z",
	},
	{
		href: "https://www.linkedin.com/company/hi-ari/",
		label: "LinkedIn",
		icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z",
	},
	{
		href: "https://www.instagram.com/hi_ariai/",
		label: "Instagram",
		icon: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3",
	},
] as const;

// Consolidated styles
const STYLES = {
	footer: "py-8 sm:py-12",
	mainContent: "mx-auto max-w-7xl px-4 sm:px-6",
	grid: "grid gap-8 sm:gap-12 md:grid-cols-4",
	brand: "space-y-4 md:col-span-1",
	brandText: "text-muted-foreground text-sm leading-6",
	group: "space-y-3 sm:space-y-4 text-sm md:justify-self-end",
	groupTitle: "block font-medium text-sm sm:text-base",
	linkItem:
		"text-muted-foreground dark:hover:text-primary hover:text-[#008A5B] block duration-150 transition-colors text-sm",
	socialRow: "flex items-center gap-4",
	socialLink:
		"text-muted-foreground dark:hover:text-primary hover:text-[#008A5B] block transition-colors duration-150",
	socialIcon: "size-5 sm:size-6",
	divider: "my-8 sm:my-10 border-t",
	bottom: "py-6 flex flex-col sm:flex-row items-center justify-between gap-4",
	copyright:
		"text-muted-foreground block text-center sm:text-left text-xs sm:text-sm",
	statusBadge: cn(
		"inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs shadow-sm",
		"text-muted-foreground",
	),
	statusDot: "size-2 rounded-full bg-emerald-500",
} as const;

// Memoized components
const SocialIcon = memo<{ link: SocialLink }>(({ link }) => (
	<Link
		href={link.href}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={link.label}
		className={STYLES.socialLink}
	>
		<svg
			className={STYLES.socialIcon}
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
		>
			<path fill="currentColor" d={link.icon} />
		</svg>
	</Link>
));
SocialIcon.displayName = "SocialIcon";

const LinkGroupComponent = memo<{ linkGroup: LinkGroup }>(({ linkGroup }) => (
	<div className={STYLES.group}>
		<span className={STYLES.groupTitle}>{linkGroup.group}</span>
		{linkGroup.items.map((item) => (
			<Link key={item.title} href={item.href} className={STYLES.linkItem}>
				<span>{item.title}</span>
			</Link>
		))}
	</div>
));
LinkGroupComponent.displayName = "LinkGroupComponent";

// Main component
const Footer = () => {
	return (
		<footer className={STYLES.footer}>
			<div className={STYLES.mainContent}>
				<div className={STYLES.grid}>
					{/* Brand */}
					<AnimatedGroup
						preset="blur-slide"
						viewportBehavior="once"
						className={STYLES.brand}
					>
						<Link href="/" aria-label="go home" className="block size-fit">
							<Logo />
						</Link>
						<p className={STYLES.brandText}>
							Your intelligent AI shopping assistant. Transforming e-commerce
							with personalized customer experiences and 24/7 support.
						</p>
					</AnimatedGroup>

					{/* Links */}
					<AnimatedGroup
						preset="slide"
						viewportBehavior="once"
						className="grid grid-cols-2 md:justify-items-end gap-6 md:col-span-2"
					>
						{NAVIGATION_LINKS.map((group) => (
							<LinkGroupComponent key={group.group} linkGroup={group} />
						))}
					</AnimatedGroup>

					{/* Community */}
					<AnimatedGroup
						preset="scale"
						viewportBehavior="once"
						className={STYLES.group}
					>
						<span className={STYLES.groupTitle}>Socials</span>
						<div className={STYLES.socialRow}>
							{SOCIAL_LINKS.map((link, index) => (
								<SocialIcon key={index} link={link} />
							))}
						</div>
					</AnimatedGroup>
				</div>

				<div className={STYLES.divider} />

				{/* Bottom bar */}
				<div className={STYLES.bottom}>
					<AnimatedGroup preset="blur-slide" viewportBehavior="once">
						<TextEffect
							as="small"
							per="word"
							className={STYLES.copyright}
							preset="fade"
							viewportBehavior="once"
						>
							{`© ${new Date().getFullYear()} Ari AI, All rights reserved.`}
						</TextEffect>
					</AnimatedGroup>

					<AnimatedGroup preset="scale" viewportBehavior="once">
						<div className={STYLES.statusBadge} aria-live="polite">
							<span className={STYLES.statusDot} />
							<span>All Systems Normal</span>
						</div>
					</AnimatedGroup>
				</div>
			</div>
		</footer>
	);
};

Footer.displayName = "Footer";

export default memo(Footer);
