"use client"

import { useState } from "react"
import { Shield, Code, Database, Terminal, Calendar, CheckCircle, X, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Vulnerability {
  id: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  date: string
  description: string
}

const vulnerabilitiesData = {
  2024: {
    Diciembre: [
      {
        id: "cve-2024-0001",
        title: "CVE-2024-0001: Buffer Overflow en OpenSSL",
        severity: "critical" as const,
        date: "Diciembre 2024",
        description: "Desbordamiento de buffer en la implementación de cifrado que permite ejecución remota de código.",
      },
      {
        id: "cve-2024-0002",
        title: "CVE-2024-0002: XSS Reflejado en WordPress",
        severity: "high" as const,
        date: "Diciembre 2024",
        description: "Cross-Site Scripting reflejado en el panel de administración de WordPress.",
      },
    ],
    Noviembre: [
      {
        id: "cve-2024-0003",
        title: "CVE-2024-0003: Inyección LDAP en Active Directory",
        severity: "critical" as const,
        date: "Noviembre 2024",
        description: "Inyección LDAP que permite escalada de privilegios en entornos de Active Directory.",
      },
    ],
  },
  2023: {
    Diciembre: [
      {
        id: "cve-2023-0001",
        title: "CVE-2023-0001: RCE en Apache Struts",
        severity: "critical" as const,
        date: "Diciembre 2023",
        description: "Ejecución remota de código en Apache Struts 2.x que permite control total del servidor.",
      },
    ],
    Noviembre: [
      {
        id: "cve-2023-0002",
        title: "CVE-2023-0002: SQL Injection en Drupal",
        severity: "high" as const,
        date: "Noviembre 2023",
        description: "Inyección SQL en el módulo de usuarios de Drupal que expone información sensible.",
      },
    ],
    Octubre: [
      {
        id: "cve-2023-0003",
        title: "CVE-2023-0003: Path Traversal en Nginx",
        severity: "medium" as const,
        date: "Octubre 2023",
        description: "Vulnerabilidad de path traversal que permite acceso a archivos del sistema.",
      },
    ],
  },
}

export default function Vulnerabilities() {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set())
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set())

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears)
    if (newExpanded.has(year)) {
      newExpanded.delete(year)
      // Also collapse all months of this year
      Object.keys(vulnerabilitiesData[year as unknown as keyof typeof vulnerabilitiesData] || {}).forEach((month) => {
        const monthKey = `${year}-${month}`
        const newExpandedMonths = new Set(expandedMonths)
        newExpandedMonths.delete(monthKey)
        setExpandedMonths(newExpandedMonths)
      })
    } else {
      newExpanded.add(year)
    }
    setExpandedYears(newExpanded)
  }

  const toggleMonth = (year: string, month: string) => {
    const monthKey = `${year}-${month}`
    const newExpanded = new Set(expandedMonths)
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey)
    } else {
      newExpanded.add(monthKey)
    }
    setExpandedMonths(newExpanded)
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-900/30 text-red-400"
      case "high":
        return "bg-yellow-900/30 text-yellow-400"
      case "medium":
        return "bg-blue-900/30 text-blue-400"
      case "low":
        return "bg-green-900/30 text-green-400"
      default:
        return "bg-gray-900/30 text-gray-400"
    }
  }

  return (
    <section className="min-h-screen text-white p-4 md:p-8 font-sans" style={{ backgroundColor: "#0a1419" }}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="my-8 md:my-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-center" style={{ color: "#4aedc4" }}>
            Vulnerabilidades Mensuales
          </h1>
          <p className="text-center max-w-4xl mx-auto text-lg" style={{ color: "#d1d5db" }}>
            Repositorio de vulnerabilidades de ciberseguridad donde publicamos mensualmente las últimas amenazas y
            soluciones para mantener tus sistemas protegidos.
          </p>
        </header>

        {/* Main Description */}
        <section className="mb-16">
          <Card
            className="border-0 rounded-xl overflow-hidden"
            style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
          >
            <CardContent className="p-6 md:p-8">
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-center"
                style={{ color: "#4aedc4" }}
              >
                Sobre este repositorio
              </h2>
              <p className="text-center mb-8 text-lg" style={{ color: "#d1d5db" }}>
                Un espacio dedicado a compartir información detallada sobre vulnerabilidades de seguridad, con análisis
                técnicos y recomendaciones para mitigar riesgos.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Feature 1 */}
                <div
                  className="rounded-lg p-6 text-center border"
                  style={{ backgroundColor: "#0a1419", borderColor: "#1a3039" }}
                >
                  <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: "#4aedc4" }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#4aedc4" }}>
                    Análisis Detallado
                  </h3>
                  <p style={{ color: "#d1d5db" }}>
                    Examinamos a fondo cada vulnerabilidad, su impacto potencial y vectores de ataque.
                  </p>
                </div>

                {/* Feature 2 */}
                <div
                  className="rounded-lg p-6 text-center border"
                  style={{ backgroundColor: "#0a1419", borderColor: "#1a3039" }}
                >
                  <Code className="w-12 h-12 mx-auto mb-4" style={{ color: "#4aedc4" }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#4aedc4" }}>
                    Pruebas de Concepto
                  </h3>
                  <p style={{ color: "#d1d5db" }}>
                    Incluimos PoCs éticos para demostrar el funcionamiento de las vulnerabilidades.
                  </p>
                </div>

                {/* Feature 3 */}
                <div
                  className="rounded-lg p-6 text-center border"
                  style={{ backgroundColor: "#0a1419", borderColor: "#1a3039" }}
                >
                  <Database className="w-12 h-12 mx-auto mb-4" style={{ color: "#4aedc4" }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#4aedc4" }}>
                    Recursos Técnicos
                  </h3>
                  <p style={{ color: "#d1d5db" }}>
                    Ofrecemos herramientas y guías para verificar y mitigar las vulnerabilidades.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Terminal Information */}
        <section className="mb-16">
          <Card
            className="border-0 rounded-xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
          >
            {/* Terminal Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ backgroundColor: "#0a1419", borderColor: "#1a3039" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <Terminal className="w-4 h-4" style={{ color: "#4aedc4" }} />
                <span className="font-mono text-sm font-medium" style={{ color: "#d1d5db" }}>
                  vulnerabilidades-info.sh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#4aedc4" }}></div>
                <span className="text-xs font-mono" style={{ color: "#4aedc4" }}>
                  ONLINE
                </span>
              </div>
            </div>

            {/* Terminal Content */}
            <CardContent className="p-0">
              <div className="p-6 font-mono text-sm space-y-4">
                {/* Command Line */}
                <div className="flex items-center gap-2 mb-6">
                  <span style={{ color: "#4aedc4" }}>┌──(</span>
                  <span style={{ color: "#d1d5db" }}>security</span>
                  <span style={{ color: "#4aedc4" }}>@</span>
                  <span style={{ color: "#d1d5db" }}>vuln-repo</span>
                  <span style={{ color: "#4aedc4" }}>)-[</span>
                  <span style={{ color: "#d1d5db" }}>~/vulnerabilidades</span>
                  <span style={{ color: "#4aedc4" }}>]</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: "#4aedc4" }}>└─$</span>
                  <span style={{ color: "#d1d5db" }}>./vulnerabilidades --info</span>
                  <div className="w-2 h-4 ml-1 animate-pulse" style={{ backgroundColor: "#4aedc4" }}></div>
                </div>

                {/* Output */}
                <div className="space-y-3 pl-4 border-l-2" style={{ borderColor: "#1a3039" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4aedc4" }}></div>
                    <span style={{ color: "#4aedc4" }}>📅 Actualización:</span>
                    <span style={{ color: "#d1d5db" }}>Mensual (1er día de cada mes)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4aedc4" }}></div>
                    <span style={{ color: "#4aedc4" }}>🎯 Categorías:</span>
                    <div className="flex flex-wrap gap-2">
                      {["Web", "Redes", "Sistemas", "Mobile", "IoT"].map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ backgroundColor: "#1a3039", color: "#d1d5db" }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4aedc4" }}></div>
                    <span style={{ color: "#4aedc4" }}>📋 Formato:</span>
                    <span style={{ color: "#d1d5db" }}>Análisis técnico + PoC + Mitigación</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4aedc4" }}></div>
                    <span style={{ color: "#4aedc4" }}>🔓 Acceso:</span>
                    <span style={{ color: "#d1d5db" }}>Público para consulta</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4aedc4" }}></div>
                    <span style={{ color: "#4aedc4" }}>⚡ Estado:</span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span style={{ color: "#d1d5db" }}>Sistema operativo</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4aedc4" }}></div>
                    <span style={{ color: "#4aedc4" }}>📊 Total CVEs:</span>
                    <span style={{ color: "#d1d5db" }}>1,247 vulnerabilidades documentadas</span>
                  </div>
                </div>

                {/* Command prompt ready */}
                <div className="flex items-center gap-2 mt-6 pt-4 border-t" style={{ borderColor: "#1a3039" }}>
                  <span style={{ color: "#4aedc4" }}>└─$</span>
                  <div className="w-2 h-4 animate-pulse" style={{ backgroundColor: "#4aedc4" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Vulnerabilities */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8 text-center" style={{ color: "#4aedc4" }}>
            Vulnerabilidades Recientes
          </h2>

          <div className="space-y-4">
            {Object.entries(vulnerabilitiesData).map(([year, months]) => (
              <div key={year}>
                {/* Year Header */}
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
                >
                  <h3 className="text-2xl font-bold" style={{ color: "#4aedc4" }}>
                    {year}
                  </h3>
                  {expandedYears.has(year) ? (
                    <ChevronDown className="w-6 h-6" style={{ color: "#4aedc4" }} />
                  ) : (
                    <ChevronRight className="w-6 h-6" style={{ color: "#4aedc4" }} />
                  )}
                </button>

                {/* Year Content */}
                {expandedYears.has(year) && (
                  <div className="mt-4 ml-4 space-y-3">
                    {Object.entries(months).map(([month, vulnerabilities]) => (
                      <div key={`${year}-${month}`}>
                        {/* Month Header */}
                        <button
                          onClick={() => toggleMonth(year, month)}
                          className="w-full flex items-center justify-between p-3 rounded-lg border transition-colors hover:opacity-80"
                          style={{ backgroundColor: "#0a1419", borderColor: "#1a3039" }}
                        >
                          <h4 className="text-lg font-semibold" style={{ color: "#4aedc4" }}>
                            {month}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm px-2 py-1 rounded"
                              style={{ backgroundColor: "#1a3039", color: "#d1d5db" }}
                            >
                              {vulnerabilities.length} vulnerabilidades
                            </span>
                            {expandedMonths.has(`${year}-${month}`) ? (
                              <ChevronDown className="w-5 h-5" style={{ color: "#4aedc4" }} />
                            ) : (
                              <ChevronRight className="w-5 h-5" style={{ color: "#4aedc4" }} />
                            )}
                          </div>
                        </button>

                        {/* Month Content */}
                        {expandedMonths.has(`${year}-${month}`) && (
                          <div className="mt-3 ml-4 grid gap-4 md:grid-cols-2">
                            {vulnerabilities.map((vuln:Vulnerability) => (
                              <Card
                                key={vuln.id}
                                className="border-0 rounded-xl"
                                style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
                              >
                                <CardContent className="p-6">
                                  <div className="flex justify-between items-start mb-4">
                                    <h5 className="text-lg font-bold flex-1" style={{ color: "#4aedc4" }}>
                                      {vuln.title}
                                    </h5>
                                    <span
                                      className={`ml-4 px-2 py-1 text-xs font-semibold rounded ${getSeverityBadge(vuln.severity)}`}
                                    >
                                      {vuln.severity === "critical"
                                        ? "Crítica"
                                        : vuln.severity === "high"
                                          ? "Alta"
                                          : vuln.severity === "medium"
                                            ? "Media"
                                            : "Baja"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm mb-4">
                                    <Calendar className="w-5 h-5" style={{ color: "#4aedc4" }} />
                                    <span style={{ color: "#d1d5db" }}>{vuln.date}</span>
                                  </div>
                                  <p className="mb-4" style={{ color: "#d1d5db" }}>
                                    {vuln.description}
                                  </p>
                                  <Button
                                    variant="outline"
                                    className="transition-colors"
                                    style={{
                                      borderColor: "#4aedc4",
                                      color: "#4aedc4",
                                      backgroundColor: "#0a1419",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = "#4aedc4"
                                      e.currentTarget.style.color = "#0a1419"
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = "#0a1419"
                                      e.currentTarget.style.color = "#4aedc4"
                                    }}
                                  >
                                    Ver detalles
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              className="px-6 transition-colors"
              style={{
                borderColor: "#4aedc4",
                color: "#4aedc4",
                backgroundColor: "#0a1419",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#4aedc4"
                e.currentTarget.style.color = "#0a1419"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0a1419"
                e.currentTarget.style.color = "#4aedc4"
              }}
            >
              Ver archivo completo
            </Button>
          </div>
        </section>

        {/* Rules and Guidelines */}
        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Publication Rules */}
            <Card className="border-0 rounded-xl" style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}>
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold mb-6" style={{ color: "#4aedc4" }}>
                  Normas de publicación
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#4aedc4" }} />
                    <span style={{ color: "#d1d5db" }}>
                      Divulgación responsable: Todas las vulnerabilidades han sido reportadas previamente a los
                      fabricantes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#4aedc4" }} />
                    <span style={{ color: "#d1d5db" }}>
                      Verificación técnica: Cada vulnerabilidad ha sido verificada y documentada con precisión.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#4aedc4" }} />
                    <span style={{ color: "#d1d5db" }}>
                      Información completa: Incluimos detalles técnicos, impacto y métodos de mitigación.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#4aedc4" }} />
                    <span style={{ color: "#d1d5db" }}>
                      Actualización periódica: Nuevas vulnerabilidades son publicadas el primer día de cada mes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#4aedc4" }} />
                    <span style={{ color: "#d1d5db" }}>
                      Uso ético: La información se proporciona con fines educativos y de protección.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Important Warnings */}
            <Card className="border-0 rounded-xl" style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}>
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold mb-6" style={{ color: "#4aedc4" }}>
                  Advertencias importantes
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" />
                    <span style={{ color: "#d1d5db" }}>
                      Está prohibido utilizar esta información para actividades maliciosas o ilegales.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" />
                    <span style={{ color: "#d1d5db" }}>
                      No nos hacemos responsables del mal uso de la información proporcionada.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" />
                    <span style={{ color: "#d1d5db" }}>
                      No se permite la redistribución comercial sin autorización expresa.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" />
                    <span style={{ color: "#d1d5db" }}>
                      Está prohibido el uso de exploits en sistemas sin autorización explícita.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" />
                    <span style={{ color: "#d1d5db" }}>
                      No se debe compartir información sensible en los comentarios.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  )
}
