"use client"
import type React from "react"
import Img from "@/components/Img"
import imgLocal from "../../public/nanify.webp"
// import "../styles/globals.css";
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
      "dominio.com",
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Props</h2>
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
                      Required
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">type</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'remote' | 'local' | 'bg'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Type of image component</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">src</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string | StaticImageData</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Image source URL or imported image</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">alt</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Alternative text for accessibility</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">width</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Image width in pixels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">height</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Image height in pixels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">blurDataURL</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Base64 blur placeholder (remote images)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">priority</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Load image with high priority</td>
                  </tr>
                </tbody>
              </table>
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