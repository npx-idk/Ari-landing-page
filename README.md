# Shopkeeper Landing Page

A modern, responsive landing page template built with Next.js 15, TypeScript, and shadcn/ui components. This template features a beautiful design system with engaging animations and a professional layout.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient accents and engaging animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark Mode Ready**: Built-in dark mode support with system preference detection
- **Performance Optimized**: Built with Next.js 15 and modern web standards
- **Accessible**: WCAG compliant with proper semantic HTML and ARIA labels
- **SEO Optimized**: Comprehensive metadata and OpenGraph tags
- **Component-Based**: Modular architecture with reusable components

## 📦 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 🎨 Components

### Layout Components
- **Header**: Sticky navigation with mobile menu and branding
- **Footer**: Comprehensive footer with links, social media, and company info

### Page Sections
- **Hero Section**: Eye-catching hero with gradient background and CTAs
- **Features Section**: Grid layout showcasing key features with icons
- **Testimonials Section**: Customer reviews with avatars and ratings
- **CTA Section**: Final call-to-action with gradient background

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- pnpm (package manager)

### Installation

1. Navigate to the landing page directory:
   ```bash
   cd apps/landing-page
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎯 Customization

### Colors & Branding
Update the color scheme and branding in:
- `src/components/header.tsx` - Logo and brand name
- `src/components/footer.tsx` - Company information
- Tailwind classes throughout components

### Content
Customize the content in each section:
- `src/components/hero-section.tsx` - Main heading and description
- `src/components/features-section.tsx` - Feature list and descriptions
- `src/components/testimonials-section.tsx` - Customer testimonials
- `src/components/cta-section.tsx` - Final call-to-action

### Styling
The project uses Tailwind CSS with custom gradients and animations. Key design elements:
- Gradient backgrounds for hero and CTA sections
- Hover animations with translate effects
- Shadow effects for depth and interactivity
- Responsive grid layouts

## 📱 Responsive Design

The template is built mobile-first with breakpoints:
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

## 🎨 Design System

### Typography
- Primary font: Geist Sans
- Monospace font: Geist Mono
- Responsive text sizing with `text-*` classes

### Colors
- Primary: Blue to Purple gradients
- Secondary: Gray scale for text and backgrounds
- Accent: Green for success states, Yellow/Orange for highlights

### Spacing
- Consistent spacing using Tailwind's spacing scale
- Section padding: `py-24` for desktop, responsive adjustments for mobile

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Deploy automatically on every push to main

### Manual Deployment
1. Build the project:
   ```bash
   pnpm build
   ```
2. Deploy the `out` directory to your hosting provider

## 📄 License

This project is part of the Shopkeeper workspace and follows the main project's licensing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please reach out to the development team or create an issue in the main repository.

---

Built with ❤️ by the Shopkeeper team
