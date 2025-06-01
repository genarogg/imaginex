# 🖼️ Imaginex

[![npm version](https://badge.fury.io/js/imaginex.svg)](https://www.npmjs.com/package/imaginex)
[![npm downloads](https://img.shields.io/npm/dm/imaginex.svg)](https://www.npmjs.com/package/imaginex)
[![GitHub license](https://img.shields.io/github/license/genarogg/imaginex.svg)](https://github.com/genarogg/imaginex/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/genarogg/imaginex.svg)](https://github.com/genarogg/imaginex/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/genarogg/imaginex.svg)](https://github.com/genarogg/imaginex/issues)

A powerful and flexible image component for Next.js with automatic optimization, blur placeholders, and responsive design.

## 🌟 Features

- 🎨 **Automatic blur placeholders** - Generate beautiful blur effects automatically
- ⚡ **Lazy loading support** - Optimize performance with smart loading
- 📱 **Responsive design** - Adapt to any screen size seamlessly
- 🖼️ **Multiple image types** - Support for local, remote, and background images
- 🛡️ **Error handling** - Graceful fallbacks for failed image loads
- 📝 **TypeScript support** - Full type safety and IntelliSense
- 🚀 **Performance optimized** - Built for speed and efficiency
- ♿ **Accessibility compliant** - WCAG guidelines compliance

## 📚 Documentation

For complete documentation, examples, and API reference, visit our official website:

**🌐 [Official Documentation](https://imaginex2.netlify.app/)**

## 🚀 Quick Start

### Installation

```bash
npm install imaginex
```

```bash
yarn add imaginex
```

```bash
pnpm add imaginex
```

### Next.js Configuration

Configure your `next.config.js` or `next.config.ts`:

```javascript
// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "example.com",
      // Add your image domains here
    ],
  },
};

export default withPlaiceholder(config);
```

### Basic Usage

```tsx
import Img from "imaginex";

// Local image
import localImage from "./path/to/image.jpg";

function MyComponent() {
  return (
    <div>
      {/* Local Image */}
      <Img src={localImage} alt="Local image" width={400} height={225} />

      {/* Remote Image */}
      <Img
        type="remote"
        src="https://example.com/image.jpg"
        alt="Remote image"
        width={400}
        height={225}
      />

      {/* Background Image */}
      <Img type="bg" src={localImage} alt="Background" width={800} height={400}>
        <div className="overlay-content">
          <h1>Your Content Here</h1>
        </div>
      </Img>
    </div>
  );
}
```

## 🎯 Image Types

### Local Images

Perfect for images bundled with your application:

```tsx
import heroImage from "./hero.jpg";

<Img
  src={heroImage}
  alt="Hero image"
  width={800}
  height={450}
  priority={true}
/>;
```

### Remote Images

Automatically generates blur placeholders for external images:

```tsx
<Img
  type="remote"
  src="https://images.unsplash.com/photo-example"
  alt="Remote image"
  width={600}
  height={400}
  blurDataURL="data:image/..." // Optional custom blur
/>
```

### Background Images

Use images as backgrounds with overlay content:

```tsx
<Img
  type="bg"
  src={backgroundImage}
  alt="Hero background"
  width={1200}
  height={600}
  backgroundSize="cover"
  backgroundPosition="center"
>
  <div className="hero-content">
    <h1>Welcome to Our Site</h1>
    <p>Beautiful background with overlay content</p>
  </div>
</Img>
```

## ⚙️ API Reference

### Base Props (All Components)

| Prop        | Type                          | Default   | Required | Description                        |
| ----------- | ----------------------------- | --------- | -------- | ---------------------------------- |
| `src`       | `string \| StaticImageData`   | -         | ✅       | Image source URL or imported image |
| `alt`       | `string`                      | -         | ✅       | Alternative text for accessibility |
| `type`      | `'remote' \| 'local' \| 'bg'` | `'local'` | ❌       | Type of image component            |
| `width`     | `number \| string`            | `960`     | ❌       | Image width in pixels              |
| `height`    | `number \| string`            | `540`     | ❌       | Image height in pixels             |
| `className` | `string`                      | `''`      | ❌       | CSS classes to apply               |
| `priority`  | `boolean`                     | `false`   | ❌       | Load image with high priority      |
| `loading`   | `'eager' \| 'lazy'`           | `'lazy'`  | ❌       | Loading behavior                   |
| `quality`   | `number`                      | `75`      | ❌       | Image quality (1-100)              |

### Remote Image Props

| Prop                 | Type                     | Default | Description                           |
| -------------------- | ------------------------ | ------- | ------------------------------------- |
| `transitionDuration` | `number`                 | `1000`  | Transition duration in milliseconds   |
| `fetchTimeout`       | `number`                 | `5000`  | Timeout for fetching blur placeholder |
| `onLoadStart`        | `() => void`             | -       | Callback when image starts loading    |
| `onLoadComplete`     | `() => void`             | -       | Callback when image finishes loading  |
| `onError`            | `(error: Error) => void` | -       | Callback when image fails to load     |

### Background Image Props

| Prop                   | Type                             | Default    | Description              |
| ---------------------- | -------------------------------- | ---------- | ------------------------ |
| `backgroundSize`       | `string`                         | `'cover'`  | Background size behavior |
| `backgroundPosition`   | `string`                         | `'center'` | Background position      |
| `backgroundAttachment` | `'fixed' \| 'scroll' \| 'local'` | `'fixed'`  | Background attachment    |
| `children`             | `React.ReactNode`                | -          | Overlay content          |

## 🎨 Advanced Examples

### Responsive Images

```tsx
<Img
  type="remote"
  src="https://example.com/image.jpg"
  alt="Responsive image"
  width={800}
  height={450}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

### Error Handling

```tsx
<Img
  type="remote"
  src="https://example.com/might-fail.jpg"
  alt="Image with error handling"
  width={400}
  height={300}
  onError={(error) => {
    console.error("Image failed to load:", error);
    // Handle error (show fallback, notify user, etc.)
  }}
  onLoadStart={() => console.log("Loading started")}
  onLoadComplete={() => console.log("Loading completed")}
/>
```

### TypeScript Usage

```tsx
import Img from "imaginex";
import type { ImgRemoteProps, ImgBGProps } from "imaginex";

const RemoteImageComponent: React.FC = () => {
  const handleLoadStart = () => console.log("Loading started");
  const handleLoadComplete = () => console.log("Loading completed");
  const handleError = (error: Error) => console.error("Load error:", error);

  return (
    <Img
      type="remote"
      src="https://example.com/image.jpg"
      alt="Remote image"
      onLoadStart={handleLoadStart}
      onLoadComplete={handleLoadComplete}
      onError={handleError}
      transitionDuration={800}
      fetchTimeout={3000}
    />
  );
};
```

## 🏆 Best Practices

### ✅ Do's

- **Always provide alt text** - Essential for accessibility and SEO
- **Use appropriate dimensions** - Set width and height to prevent layout shift
- **Configure domains for remote images** - Add external domains to your Next.js config
- **Use priority for above-the-fold images** - Improves Core Web Vitals scores
- **Optimize image quality** - Balance between file size and visual quality

### ❌ Don'ts

- Don't skip alt text for decorative images (use empty string instead)
- Don't use oversized images for small displays
- Don't forget to configure external domains in Next.js config
- Don't use priority for all images (only above-the-fold)

## 🚀 Performance Tips

1. **Use appropriate image sizes** - Don't load 4K images for thumbnails
2. **Implement lazy loading** - For images below the fold
3. **Use blur placeholders** - Improves perceived performance
4. **Configure proper caching** - Set appropriate cache headers
5. **Use modern formats** - WebP for modern browsers with fallbacks

## 🛠️ Development

### Prerequisites

- Node.js 16+
- Next.js 13+
- React 18+

### Local Development

```bash
# Clone the repository
git clone https://github.com/genarogg/imaginex.git

# Navigate to the project directory
cd imaginex

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building

```bash
# Build the project
npm run build

# Run tests
npm test
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/genarogg/imaginex/blob/main/CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

See [CHANGELOG.md](https://github.com/genarogg/imaginex/blob/main/CHANGELOG.md) for a detailed history of changes.

## 🐛 Issues

Found a bug? Have a feature request? Please check our [issues page](https://github.com/genarogg/imaginex/issues) or create a new issue.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/genarogg/imaginex/blob/main/LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Plaiceholder](https://plaiceholder.co/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

- 📖 **Documentation**: [https://imaginex2.netlify.app/](https://imaginex2.netlify.app/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/genarogg/imaginex/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/genarogg/imaginex/discussions)
- 📦 **NPM Package**: [https://www.npmjs.com/package/imaginex](https://www.npmjs.com/package/imaginex)

## 🌟 Show Your Support

If this project helped you, please consider giving it a ⭐ on [GitHub](https://github.com/genarogg/imaginex)!

---

<div align="center">
  <p>Made with ❤️ by the Imaginex team</p>
  <p>
    <a href="https://imaginex2.netlify.app/">Website</a> •
    <a href="https://github.com/genarogg/imaginex">GitHub</a> •
    <a href="https://www.npmjs.com/package/imaginex">NPM</a>
  </p>
</div>
```

I've created a comprehensive README.md file that includes:

## 🎯 **Key Features:**

1. **Professional badges** - npm version, downloads, license, stars, issues
2. **Complete documentation** - Installation, usage, API reference
3. **Multiple examples** - Basic usage, advanced examples, TypeScript
4. **All three links** - Official website, GitHub repo, and npm package
5. **Best practices** - Do's and don'ts for optimal usage
6. **Performance tips** - Optimization recommendations
7. **Contributing guidelines** - How to contribute to the project
8. **Support section** - Where to get help

## 📋 **Sections Included:**

- ✅ Feature highlights with emojis
- ✅ Quick start guide
- ✅ Installation instructions
- ✅ Configuration examples
- ✅ Usage examples for all image types
- ✅ Complete API reference tables
- ✅ Advanced examples
- ✅ TypeScript usage
- ✅ Best practices
- ✅ Performance optimization tips
- ✅ Development setup
- ✅ Contributing guidelines
- ✅ Links to all resources

## 🔗 **Links Integration:**

- **Official Website**: https://imaginex2.netlify.app/
- **GitHub Repository**: https://github.com/genarogg/imaginex
- **NPM Package**: https://www.npmjs.com/package/imaginex

This README is perfect for both GitHub and NPM, providing users with everything they need to get started and make the most of the Imaginex component!
