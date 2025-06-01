"use client"
import React from "react"
import Img from "@/components"
import imgLocal from "../../public/nanify.webp"

const DocumentationPage: React.FC = () => {
  const remoteImageUrl =
    "https://images.unsplash.com/photo-1560707303-4e980ce876ad?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNvdXJjZXxlbnwwfHwwfHx8MA%3D%3D"
  const base64Placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGN48H9K03L3M6/rGmZ4MDDwM/jnm07bmzJ5VRoAqwgL1RTPjO0AAAAASUVORK5CYII="

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Img Component</h1>
          <p className="mt-2 text-lg text-gray-600">
            A powerful and flexible image component for Next.js with automatic optimization and blur placeholders
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://github.com/genarogg/next-img"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </a>
            <span className="text-sm text-gray-500">⭐ Star us on GitHub</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              The Img component is a versatile image solution that supports local images, remote images, and background
              images with automatic blur placeholders, lazy loading, and responsive design.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Automatic blur placeholders</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Lazy loading support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Responsive design</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Multiple image types</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Error handling</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">TypeScript support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Installation</h2>
            <p className="text-gray-700 mb-4">
              Make sure to configure your <code className="bg-gray-100 px-2 py-1 rounded text-sm">next.config.ts</code>{" "}
              file:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                {`// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
    ],
  },
};

export default withPlaiceholder(config);`}
              </pre>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Usage Examples</h2>

          {/* Remote Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Remote Images</h3>
            <p className="text-gray-700 mb-6">
              Display images from external URLs with automatic blur placeholder generation.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Without Blur Placeholder</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <Img
                    type="remote"
                    src={remoteImageUrl}
                    alt="Remote image example"
                    width={400}
                    height={225}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">With Blur Placeholder</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <Img
                    type="remote"
                    src={remoteImageUrl}
                    alt="Remote image with blur"
                    blurDataURL={base64Placeholder}
                    width={400}
                    height={225}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                {`<Img 
  type="remote" 
  src="https://example.com/image.jpg" 
  alt="Remote image" 
  width={400} 
  height={225}
  blurDataURL="data:image/..." // Optional
/>`}
              </pre>
            </div>
          </div>

          {/* Local Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Images</h3>
            <p className="text-gray-700 mb-6">Display local images with automatic blur placeholder extraction.</p>

            <div className="grid lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Standard Display</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <Img
                    type="local"
                    src={imgLocal}
                    alt="Local image example"
                    width={400}
                    height={225}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Background Mode</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <Img
                    type="bg"
                    src={imgLocal}
                    alt="Background image"
                    width={400}
                    height={225}
                    className="rounded-lg flex items-center justify-center"
                  >
                    <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-900">Overlay Content</h4>
                    </div>
                  </Img>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                {`import imgLocal from "./path/to/image.jpg";

<Img 
  type="local" 
  src={imgLocal} 
  alt="Local image" 
  width={400} 
  height={225}
/>`}
              </pre>
            </div>
          </div>

          {/* Background Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Images</h3>
            <p className="text-gray-700 mb-6">Use images as backgrounds with overlay content support.</p>

            <div className="mb-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <Img
                  type="bg"
                  src={imgLocal}
                  alt="Background example"
                  width={800}
                  height={300}
                  className="rounded-lg flex items-center justify-center text-white"
                  style={{
                    backgroundAttachment: "scroll",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg">
                    <h2 className="text-3xl font-bold mb-2">Hero Section</h2>
                    <p className="text-lg">Perfect for hero sections and banners</p>
                  </div>
                </Img>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                {`<Img 
  type="bg" 
  src={backgroundImage} 
  alt="Hero background" 
  width={800} 
  height={300}
>
  <div className="hero-content">
    <h1>Your Content Here</h1>
  </div>
</Img>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Props Documentation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">API Reference</h2>

          {/* Base Props */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Base Props (All Components)</h3>
            <p className="text-gray-700 mb-6">These props are available for all image component types.</p>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">src</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string | StaticImageData</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Image source URL or imported image</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">alt</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Alternative text for accessibility</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">type</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'remote' | 'local' | 'bg'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Type of image component to render</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">id</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Unique identifier for the component</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">width</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number | string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">960</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Image width in pixels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">height</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number | string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">540</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Image height in pixels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">className</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">""</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">CSS classes to apply</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">style</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">React.CSSProperties</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Inline styles to apply</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">children</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">React.ReactNode</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Child elements (only for 'bg' type)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">placeholder</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'blur' | 'empty'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'blur'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Placeholder behavior while loading</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">blurDataURL</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Base64 blur placeholder image</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">priority</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Load image with high priority</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">loading</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'eager' | 'lazy'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'lazy'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Loading behavior</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">quality</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">90</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Image quality (1-100)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">sizes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Responsive image sizes</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">objectFit</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'cover'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">How image should fit container</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">maintainAspectRatio</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">true</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Maintain original aspect ratio</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">visible</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">true</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Control visibility</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Remote Image Props */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Remote Image Props</h3>
            <p className="text-gray-700 mb-6">
              Additional props available when{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">type="remote"</code>.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">transitionDuration</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1000</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Transition duration in milliseconds</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">fetchTimeout</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5000</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Timeout for fetching blur placeholder (ms)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">onLoadStart</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">() =&gt; void</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Callback when image starts loading</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">onLoadComplete</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">() => void</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Callback when image finishes loading</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">onError</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(error: Error) => void</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Callback when image fails to load</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Remote Image Features</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Automatic blur placeholder generation from remote URLs</li>
                <li>• Configurable fetch timeout for placeholder generation</li>
                <li>• Graceful fallback when placeholder generation fails</li>
                <li>• Event callbacks for loading states</li>
              </ul>
            </div>
          </div>

          {/* Background Image Props */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Image Props</h3>
            <p className="text-gray-700 mb-6">
              Additional props available when <code className="bg-gray-100 px-2 py-1 rounded text-sm">type="bg"</code>.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      backgroundAttachment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'fixed' | 'scroll' | 'local'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'fixed'</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Background attachment behavior</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">backgroundSize</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      'cover' | 'contain' | 'auto' | string
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'cover'</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Background size behavior</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">backgroundPosition</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'center'</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Background position</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">transitionDuration</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Transition duration in milliseconds</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">removeDelay</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1500</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Delay before removing hidden image element (ms)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 mb-2">Background Image Features</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Support for overlay content via children prop</li>
                <li>• Automatic aspect ratio calculation for containers</li>
                <li>• Configurable background CSS properties</li>
                <li>• Smooth transitions between placeholder and final image</li>
              </ul>
            </div>
          </div>

          {/* Type Examples */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">TypeScript Usage</h3>
            <p className="text-gray-700 mb-6">Import the appropriate types for better TypeScript support.</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm">
                {`import Img from '@/components/Img';
import type { ImgRemoteProps, ImgBGProps } from '@/components/utils/ImgProps';

// For remote images with callbacks
const RemoteImageComponent: React.FC = () => {
  const handleLoadStart = () => console.log('Loading started');
  const handleLoadComplete = () => console.log('Loading completed');
  const handleError = (error: Error) => console.error('Load error:', error);

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

// For background images with overlay
const BackgroundImageComponent: React.FC = () => (
  <Img
    type="bg"
    src={backgroundImage}
    alt="Hero background"
    backgroundSize="cover"
    backgroundPosition="center top"
    backgroundAttachment="scroll"
  >
    <div className="hero-content">
      <h1>Overlay Content</h1>
    </div>
  </Img>
);`}
              </pre>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Always provide alt text</h4>
                  <p className="text-sm text-gray-600">Essential for accessibility and SEO</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Use appropriate dimensions</h4>
                  <p className="text-sm text-gray-600">Set width and height to prevent layout shift</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Configure domains for remote images</h4>
                  <p className="text-sm text-gray-600">Add external domains to your Next.js config</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Use priority for above-the-fold images</h4>
                  <p className="text-sm text-gray-600">Improves Core Web Vitals scores</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

export default DocumentationPage
