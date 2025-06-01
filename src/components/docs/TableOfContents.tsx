"use client"

import React from "react"
import { getTranslation, type TranslationKey } from "@/utils/translations"
import type { Language } from "@/hooks/useLanguage"

interface TableOfContentsProps {
  language: Language
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ language }) => {
  const t = (key: TranslationKey) => getTranslation(language, key)

  const sections = [
    { id: "introduction", key: "introduction" as TranslationKey },
    { id: "features", key: "features" as TranslationKey },
    { id: "installation", key: "installation" as TranslationKey },
    { id: "usage-examples", key: "usageExamples" as TranslationKey },
    { id: "advanced-examples", key: "advancedExamples" as TranslationKey },
    { id: "api-reference", key: "apiReference" as TranslationKey },
    { id: "performance", key: "performance" as TranslationKey },
    { id: "best-practices", key: "bestPractices" as TranslationKey },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="sticky top-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {language === "en" ? "Table of Contents" : "Tabla de Contenidos"}
      </h3>
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
          >
            {t(section.key)}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default TableOfContents
