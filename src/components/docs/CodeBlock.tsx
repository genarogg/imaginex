"use client"

import type React from "react"
import { useState } from "react"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "typescript", title }) => {
  console.log(language)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="relative">
      {title && (
        <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-gray-700">
          {title}
        </div>
      )}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors z-10"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-green-400">{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock
