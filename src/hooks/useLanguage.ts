"use client"

import { useState, useCallback } from "react"

export type Language = "en" | "es"

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>("es")

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }, [])

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang)
  }, [])

  return {
    language,
    toggleLanguage,
    changeLanguage,
    isEnglish: language === "en",
    isSpanish: language === "es",
  }
}
