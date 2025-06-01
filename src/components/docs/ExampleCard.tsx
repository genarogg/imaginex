import type React from "react"

interface ExampleCardProps {
  title: string
  description: string
  children: React.ReactNode
  code?: string
}

const ExampleCard: React.FC<ExampleCardProps> = ({ title, description, children, code }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">{children}</div>

        {code && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
              View Code
            </summary>
            <div className="mt-2">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          </details>
        )}
      </div>
    </div>
  )
}

export default ExampleCard
