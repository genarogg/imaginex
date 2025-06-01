"use client"
import React from "react"
import Img from "@/components"
import imgLocal from "../../public/nanify.webp"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation, type TranslationKey } from "@/utils/translations"
import LanguageToggle from "@/components/docs/LanguageToggle"
import TableOfContents from "@/components/docs/TableOfContents"
import CodeBlock from "@/components/docs/CodeBlock"
import ExampleCard from "@/components/docs/ExampleCard"
import FeatureGrid from "@/components/docs/FeatureGrid"

const DocumentationPage: React.FC = () => {
  const { language, changeLanguage } = useLanguage()
  const t = (key: TranslationKey) => getTranslation(language, key)

  const remoteImageUrl =
    "https://images.unsplash.com/photo-1560707303-4e980ce876ad?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNvdXJjZXxlbnwwfHwwfHx8MA%3D%3D"
  const base64Placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGN48H9K03L3M6/rGmZ4MDDwM/jnm07bmzJ5VRoAqwgL1RTPjO0AAAAASUVORK5CYII="

  const nextConfigCode = `// @ts-check
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

export default withPlaiceholder(config);`

  const basicUsageCode = `<Img 
  type="remote" 
  src="https://example.com/image.jpg" 
  alt="Remote image" 
  width={400} 
  height={225}
  blurDataURL="data:image/..." // Optional
/>`

  const localImageCode = `import imgLocal from "./path/to/image.jpg";

<Img 
  src={imgLocal} 
  alt="Local image" 
  width={400} 
  height={225}
/>`

  const backgroundImageCode = `<Img 
  type="bg" 
  src={backgroundImage} 
  alt="Hero background" 
  width={800} 
  height={300}
>
  <div className="hero-content">
    <h1>Your Content Here</h1>
  </div>
</Img>`

  const responsiveImageCode = `<Img
  type="remote"
  src="https://example.com/image.jpg"
  alt="Responsive image"
  width={800}
  height={450}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>`

  const lazyLoadingCode = `<Img
  type="local"
  src={localImage}
  alt="Lazy loaded image"
  width={600}
  height={400}
  loading="lazy"
  priority={false}
/>`

  const errorHandlingCode = `<Img
  type="remote"
  src="https://example.com/might-fail.jpg"
  alt="Image with error handling"
  width={400}
  height={300}
  onError={(error) => {
    console.error('Image failed to load:', error);
    // Handle error (show fallback, notify user, etc.)
  }}
  onLoadStart={() => console.log('Loading started')}
  onLoadComplete={() => console.log('Loading completed')}
/>`

  const typescriptCode = `import Img from '@/components/Img';
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
);`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("title")}</h1>
              <p className="text-xl text-gray-600 mb-4 max-w-3xl">{t("subtitle")}</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/genarogg/next-img"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("viewOnGithub")}
                </a>
                <span className="text-sm text-gray-500">{t("starOnGithub")}</span>
              </div>
            </div>
            <LanguageToggle language={language} onLanguageChange={changeLanguage} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents language={language} />
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-12">
            {/* Introduction */}
            <section id="introduction">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("introduction")}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{t("introText")}</p>
              </div>
            </section>

            {/* Features */}
            <section id="features">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("featuresTitle")}</h2>
                <FeatureGrid language={language} />
              </div>
            </section>

            {/* Installation */}
            <section id="installation">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("installationTitle")}</h2>
                <p className="text-gray-700 mb-6">
                  {t("installationText")} <code className="bg-gray-100 px-2 py-1 rounded text-sm">next.config.ts</code>{" "}
                  {t("installationNote")}
                </p>
                <CodeBlock code={nextConfigCode} title="next.config.ts" />
              </div>
            </section>

            {/* Usage Examples */}
            <section id="usage-examples">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("usageExamples")}</h2>

              {/* Remote Images */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t("remoteImages")}</h3>
                <p className="text-gray-700 mb-8">{t("remoteImagesDesc")}</p>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <ExampleCard title={t("withoutBlur")} description="" code={basicUsageCode}>
                    <Img
                      type="remote"
                      src={remoteImageUrl}
                      alt="Remote image example"
                      width={400}
                      height={225}
                      className="rounded-lg"
                    />
                  </ExampleCard>

                  <ExampleCard title={t("withBlur")} description="" code={basicUsageCode}>
                    <Img
                      type="remote"
                      src={remoteImageUrl}
                      alt="Remote image with blur"
                      blurDataURL={base64Placeholder}
                      width={400}
                      height={225}
                      className="rounded-lg"
                    />
                  </ExampleCard>
                </div>
              </div>

              {/* Local Images */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t("localImages")}</h3>
                <p className="text-gray-700 mb-8">{t("localImagesDesc")}</p>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <ExampleCard title={t("standardDisplay")} description="" code={localImageCode}>
                    <Img src={imgLocal} alt="Local image example" width={400} height={225} className="rounded-lg" />
                  </ExampleCard>

                  <ExampleCard title={t("backgroundMode")} description="" code={backgroundImageCode}>
                    <Img
                      type="bg"
                      src={imgLocal}
                      alt="Background image"
                      width={400}
                      height={225}
                      className="rounded-lg flex items-center justify-center"
                    >
                      <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900">{t("overlayContent")}</h4>
                      </div>
                    </Img>
                  </ExampleCard>
                </div>
              </div>

              {/* Background Images */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t("backgroundImages")}</h3>
                <p className="text-gray-700 mb-8">{t("backgroundImagesDesc")}</p>

                <ExampleCard title={t("heroSection")} description={t("heroSectionDesc")} code={backgroundImageCode}>
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
                      <h2 className="text-3xl font-bold mb-2">{t("heroSection")}</h2>
                      <p className="text-lg">{t("heroSectionDesc")}</p>
                    </div>
                  </Img>
                </ExampleCard>
              </div>
            </section>

            {/* Advanced Examples */}
            <section id="advanced-examples">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("advancedExamples")}</h2>

              <div className="grid lg:grid-cols-3 gap-8">
                <ExampleCard
                  title={t("responsiveImages")}
                  description={t("responsiveImagesDesc")}
                  code={responsiveImageCode}
                >
                  <Img
                    type="remote"
                    src={remoteImageUrl}
                    alt="Responsive image"
                    width={300}
                    height={200}
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="w-full h-auto rounded-lg"
                  />
                </ExampleCard>

                <ExampleCard title={t("lazyLoading")} description={t("lazyLoadingDesc")} code={lazyLoadingCode}>
                  <Img
                    src={imgLocal}
                    alt="Lazy loaded image"
                    width={300}
                    height={200}
                    loading="lazy"
                    priority={false}
                    className="rounded-lg"
                  />
                </ExampleCard>

                <ExampleCard title={t("errorHandling")} description={t("errorHandlingDesc")} code={errorHandlingCode}>
                  <Img
                    type="remote"
                    src={remoteImageUrl}
                    alt="Image with error handling"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </ExampleCard>
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("apiReference")}</h2>

              {/* Base Props Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t("baseProps")}</h3>
                <p className="text-gray-700 mb-6">{t("basePropsDesc")}</p>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("prop")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("type")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("default")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("required")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("description")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">src</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string | StaticImageData</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          {language === "en" ? "Yes" : "Sí"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{t("srcDesc")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">alt</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          {language === "en" ? "Yes" : "Sí"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{t("altDesc")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">type</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'remote' | 'local' | 'bg'</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          {language === "en" ? "Yes" : "Sí"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{t("typeDesc")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">width</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number | string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">960</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {language === "en" ? "No" : "No"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{t("widthDesc")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">height</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number | string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">540</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {language === "en" ? "No" : "No"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{t("heightDesc")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TypeScript Usage */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t("typescriptUsage")}</h3>
                <p className="text-gray-700 mb-6">{t("typescriptDesc")}</p>
                <CodeBlock code={typescriptCode} title="TypeScript Example" />
              </div>
            </section>

            {/* Performance */}
            <section id="performance">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("performance")}</h2>
                <p className="text-gray-700 mb-6">{t("performanceDesc")}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("performanceTip1")}</h4>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("performanceTip2")}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("performanceTip3")}</h4>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("performanceTip4")}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("bestPracticesTitle")}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("practice1Title")}</h4>
                        <p className="text-sm text-gray-600">{t("practice1Desc")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("practice2Title")}</h4>
                        <p className="text-sm text-gray-600">{t("practice2Desc")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("practice3Title")}</h4>
                        <p className="text-sm text-gray-600">{t("practice3Desc")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("practice4Title")}</h4>
                        <p className="text-sm text-gray-600">{t("practice4Desc")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("practice5Title")}</h4>
                        <p className="text-sm text-gray-600">{t("practice5Desc")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t("practice6Title")}</h4>
                        <p className="text-sm text-gray-600">{t("practice6Desc")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{t("footerText")}</p>
            <div className="flex justify-center space-x-6">
              <a href="https://nextjs.org" className="text-gray-400 hover:text-gray-600">
                Next.js
              </a>
              <a href="https://www.typescriptlang.org" className="text-gray-400 hover:text-gray-600">
                TypeScript
              </a>
              <a href="https://tailwindcss.com" className="text-gray-400 hover:text-gray-600">
                Tailwind CSS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DocumentationPage
