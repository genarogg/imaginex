"use client"

import React from "react"
import type { Language } from "@/hooks/useLanguage"

interface LanguageToggleProps {
  language: Language
  onLanguageChange: (lang: Language) => void
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
      <button
        onClick={() => onLanguageChange("en")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === "en" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => onLanguageChange("es")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === "es" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        🇪🇸 ES
      </button>
    </div>
  )
}

export default LanguageToggle
