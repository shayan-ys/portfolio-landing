# Shayan Yousefian - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, showcasing professional experience, skills, and projects with a stunning design and exceptional performance.

## ✨ Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Stunning UI**: Shadcn/ui components with Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Seamless theme switching with next-themes
- **Performance Optimized**: Speed Insights, image optimization, and efficient animations
- **SEO Optimized**: Comprehensive meta tags, sitemap, and structured data
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Smooth Animations**: Intersection Observer and CSS transitions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/shayan-ys/portfolio-landing.git
cd portfolio-landing

# Install dependencies
pnpm install
# or
npm install
# or  
yarn install

# Run the development server
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🛠️ Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Shadcn/ui** - High-quality component library
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful icons
- **next-themes** - Dark/light mode support

### Performance & Analytics
- **@vercel/speed-insights** - Real-time performance monitoring
- **SWC** - Fast TypeScript/JavaScript compiler
- **Image Optimization** - Next.js Image component with AVIF/WebP

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
portfolio-landing/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── hero-section.tsx  # Hero section
│   ├── about-section.tsx # About section
│   ├── navigation.tsx    # Navigation bar
│   └── ...               # Other sections
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
└── hooks/                # Custom React hooks
```

## 🎨 Design System

### Colors
- **Primary**: Blue to Purple gradient
- **Background**: Light/Dark mode adaptive
- **Text**: Semantic color tokens
- **Interactive**: Focus states and hover effects

### Typography
- **Font**: System font stack for optimal performance
- **Scale**: Responsive typography with proper hierarchy
- **Spacing**: Consistent spacing scale

### Components
- **Cards**: Elevation and hover effects
- **Buttons**: Multiple variants with proper states
- **Navigation**: Smooth scrolling and mobile-friendly
- **Forms**: Accessible form components

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Optional: Contact form
NEXT_PUBLIC_CONTACT_FORM_URL=your-form-url
```

### Customization

1. **Content**: Update personal information in component files
2. **Styling**: Modify Tailwind config and CSS variables
3. **Components**: Add/remove sections as needed
4. **SEO**: Update metadata in `app/layout.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Custom domain setup available

### Other Platforms

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📊 Performance

- **Lighthouse Score**: 100/100 across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Minimal with tree-shaking
- **Image Optimization**: Automatic AVIF/WebP conversion

## ♿ Accessibility

- **WCAG 2.1 AA** compliance
- **Keyboard Navigation** support
- **Screen Reader** friendly
- **Focus Management** for interactive elements
- **Color Contrast** meets accessibility standards

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: [info@shayanys.com](mailto:info@shayanys.com)
- **LinkedIn**: [linkedin.com/in/shayanys](https://linkedin.com/in/shayanys)
- **GitHub**: [github.com/shayan-ys](https://github.com/shayan-ys)

---

Built with ❤️ by Shayan Yousefian
