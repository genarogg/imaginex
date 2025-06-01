import type React from "react"
import { getTranslation, type TranslationKey } from "@/utils/translations"
import type { Language } from "@/hooks/useLanguage"

interface FeatureGridProps {
  language: Language
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ language }) => {
  const t = (key: TranslationKey) => getTranslation(language, key)

  const features = [
    { key: "feature1" as TranslationKey, icon: "🎨" },
    { key: "feature2" as TranslationKey, icon: "⚡" },
    { key: "feature3" as TranslationKey, icon: "📱" },
    { key: "feature4" as TranslationKey, icon: "🖼️" },
    { key: "feature5" as TranslationKey, icon: "🛡️" },
    { key: "feature6" as TranslationKey, icon: "📝" },
    { key: "feature7" as TranslationKey, icon: "🚀" },
    { key: "feature8" as TranslationKey, icon: "♿" },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => (
        <div
          key={feature.key}
          className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
        >
          <div className="text-2xl mr-3">{feature.icon}</div>
          <span className="text-gray-700 text-sm font-medium">{t(feature.key)}</span>
        </div>
      ))}
    </div>
  )
}

export default FeatureGrid
