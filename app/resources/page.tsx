"use client";

import { useState } from "react";
import {
  Search,
  Terminal,
  FileText,
  Download,
  ChevronRight,
  Calendar,
  Database,
  Shield,
  Code,
  Network,
  Server,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/worker.min.mjs";

const categorias = [
  { nombre: "Herramientas", icono: <Tool />, documentos: 24 },
  { nombre: "Metodologías", icono: <FileText />, documentos: 18 },
  { nombre: "Redes", icono: <Network />, documentos: 15 },
  { nombre: "Seguridad Web", icono: <Lock />, documentos: 22 },
  { nombre: "Análisis Forense", icono: <Search />, documentos: 12 },
  { nombre: "Criptografía", icono: <Shield />, documentos: 9 },
  { nombre: "Sistemas Operativos", icono: <Server />, documentos: 14 },
  { nombre: "Programación", icono: <Code />, documentos: 16 },
];

const documentosDestacados = [
  {
    id: 1,
    titulo: "Nmap: Guía Completa de Uso",
    descripcion:
      "Manual detallado sobre el uso de Nmap para escaneo de redes y descubrimiento de servicios.",
    categoria: "Herramientas",
    paginas: 45,
    tamaño: "3.2 MB",
    descargas: 1245,
    icono: <Tool />,
    pdfUrl: "/El-principito.pdf",
  },
  {
    id: 2,
    titulo: "Metodología OSSTMM",
    descripcion:
      "Open Source Security Testing Methodology Manual: Guía completa para pruebas de seguridad.",
    categoria: "Metodologías",
    paginas: 78,
    tamaño: "5.7 MB",
    descargas: 987,
    icono: <FileText />,
    pdfUrl: "/El-principito.pdf",
  },
  {
    id: 3,
    titulo: "Análisis de Malware",
    descripcion:
      "Técnicas avanzadas para el análisis estático y dinámico de software malicioso.",
    categoria: "Análisis Forense",
    paginas: 62,
    tamaño: "4.1 MB",
    descargas: 756,
    icono: <Search />,
    pdfUrl: "/El-principito.pdf",
  },
  {
    id: 4,
    titulo: "Hardening de Servidores Linux",
    descripcion:
      "Guía paso a paso para fortalecer la seguridad en servidores Linux en entornos de producción.",
    categoria: "Sistemas Operativos",
    paginas: 53,
    tamaño: "2.8 MB",
    descargas: 1102,
    icono: <Server />,
    pdfUrl: "/El-principito.pdf",
  },
];

const documentosRecientes = [
  {
    id: 1,
    titulo: "OWASP Top 10: Vulnerabilidades Web Críticas",
    categoria: "Seguridad Web",
    fecha: "Mayo 2023",
    tamaño: "3.8 MB",
    icono: <FileText />,
    pdfUrl: "/El-principito.pdf",
  },
  {
    id: 2,
    titulo: "Wireshark: Análisis de Tráfico de Red",
    categoria: "Redes",
    fecha: "Abril 2023",
    tamaño: "4.2 MB",
    icono: <Network />,
    pdfUrl: "/El-principito.pdf",
  },
  {
    id: 3,
    titulo: "Criptografía Asimétrica: Fundamentos",
    categoria: "Criptografía",
    fecha: "Abril 2023",
    tamaño: "2.5 MB",
    icono: <Lock />,
    pdfUrl: "/El-principito.pdf",
  },
  {
    id: 4,
    titulo: "Metasploit Framework: Manual Avanzado",
    categoria: "Herramientas",
    fecha: "Marzo 2023",
    tamaño: "6.1 MB",
    icono: <Tool />,
    pdfUrl: "/El-principito.pdf",
  },
  {
    id: 5,
    titulo: "Análisis de Memoria RAM en Forense Digital",
    categoria: "Análisis Forense",
    fecha: "Marzo 2023",
    tamaño: "3.4 MB",
    icono: <Database />,
    pdfUrl: "/El-principito.pdf",
  },
];

// Componente personalizado para el icono de herramientas
function Tool(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Todas las categorías"
  );
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const openPdfViewer = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
    setPageNumber(1);
  };

  return (
    <main
      className="min-h-screen p-4 md:p-8 font-sans"
      style={{ backgroundColor: "#0a1419", color: "#fff" }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="my-8 md:my-16">
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-center"
            style={{ color: "#4aedc4" }}
          >
            Recursos Educativos
          </h1>
          <p
            className="text-center max-w-3xl mx-auto text-lg"
            style={{ color: "#d1d5db" }}
          >
            Biblioteca de documentos técnicos y guías sobre herramientas,
            metodologías y conceptos de ciberseguridad.
          </p>
        </header>

        {/* BUSCADOR */}
        <section className="mb-12">
          <Card
            className="border-0 rounded-xl overflow-hidden shadow-lg"
            style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "#4aedc4" }}
                  />
                  <Input
                    className="pl-10 border-0 h-12 text-base"
                    style={{
                      backgroundColor: "#0a1419",
                      color: "#fff",
                      boxShadow: "none",
                      borderRadius: "0.5rem",
                    }}
                    placeholder="Buscar documentos por título, autor o contenido..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <select
                    className="h-12 px-4 rounded-md border-0 text-base appearance-none cursor-pointer"
                    style={{
                      backgroundColor: "#0a1419",
                      color: "#fff",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234aedc4' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      paddingRight: "2.5rem",
                      minWidth: "200px",
                    }}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option>Todas las categorías</option>
                    {categorias.map((cat) => (
                      <option key={cat.nombre}>{cat.nombre}</option>
                    ))}
                  </select>
                  <Button
                    className="h-12 px-8 font-medium text-base transition-all"
                    style={{
                      backgroundColor: "#4aedc4",
                      color: "#0a1419",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#3ad1ac";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#4aedc4";
                    }}
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* TERMINAL INFO */}
        <section className="mb-12">
          <Card
            className="border-0 rounded-xl overflow-hidden shadow-lg"
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
                <span
                  className="font-mono text-sm font-medium"
                  style={{ color: "#d1d5db" }}
                >
                  recursos-info.sh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#4aedc4" }}
                ></div>
                <span
                  className="text-xs font-mono"
                  style={{ color: "#4aedc4" }}
                >
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
                  <span style={{ color: "#d1d5db" }}>edu-repo</span>
                  <span style={{ color: "#4aedc4" }}>)-[</span>
                  <span style={{ color: "#d1d5db" }}>~/recursos</span>
                  <span style={{ color: "#4aedc4" }}>]</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: "#4aedc4" }}>└─$</span>
                  <span style={{ color: "#d1d5db" }}>./recursos --info</span>
                  <div
                    className="w-2 h-4 ml-1 animate-pulse"
                    style={{ backgroundColor: "#4aedc4" }}
                  ></div>
                </div>

                {/* Output */}
                <div
                  className="space-y-3 pl-4 border-l-2"
                  style={{ borderColor: "#1a3039" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#4aedc4" }}
                    ></div>
                    <span style={{ color: "#4aedc4" }}>
                      📚 Total documentos:
                    </span>
                    <span style={{ color: "#d1d5db" }}>
                      130 archivos disponibles
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#4aedc4" }}
                    ></div>
                    <span style={{ color: "#4aedc4" }}>📄 Formatos:</span>
                    <div className="flex flex-wrap gap-2">
                      {["PDF", "EPUB", "DOCX", "HTML", "MD"].map((format) => (
                        <span
                          key={format}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: "#1a3039",
                            color: "#d1d5db",
                          }}
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#4aedc4" }}
                    ></div>
                    <span style={{ color: "#4aedc4" }}>🔄 Actualización:</span>
                    <span style={{ color: "#d1d5db" }}>
                      Semanal (nuevos recursos cada viernes)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#4aedc4" }}
                    ></div>
                    <span style={{ color: "#4aedc4" }}>🎓 Uso:</span>
                    <span style={{ color: "#d1d5db" }}>
                      Material educativo para fines de investigación y
                      aprendizaje
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#4aedc4" }}
                    ></div>
                    <span style={{ color: "#4aedc4" }}>📊 Estadísticas:</span>
                    <span style={{ color: "#d1d5db" }}>
                      +25,000 descargas totales
                    </span>
                  </div>
                </div>

                {/* Command prompt ready */}
                <div
                  className="flex items-center gap-2 mt-6 pt-4 border-t"
                  style={{ borderColor: "#1a3039" }}
                >
                  <span style={{ color: "#4aedc4" }}>└─$</span>
                  <div
                    className="w-2 h-4 animate-pulse"
                    style={{ backgroundColor: "#4aedc4" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CATEGORÍAS */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#4aedc4" }}>
            Categorías
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categorias.map((categoria) => (
              <Card
                key={categoria.nombre}
                className="border-0 rounded-xl overflow-hidden transition-all hover:scale-105 cursor-pointer"
                style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#0a1419" }}
                  >
                    <div className="w-8 h-8" style={{ color: "#4aedc4" }}>
                      {categoria.icono}
                    </div>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#4aedc4" }}>
                    {categoria.nombre}
                  </h3>
                  <Badge
                    variant="outline"
                    className="bg-opacity-20"
                    style={{
                      backgroundColor: "#1a3039",
                      color: "#d1d5db",
                      borderColor: "#1a3039",
                    }}
                  >
                    {categoria.documentos} documentos
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* DESTACADOS */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold" style={{ color: "#4aedc4" }}>
              Documentos Destacados
            </h2>
            <Button
              variant="link"
              className="flex items-center gap-1"
              style={{ color: "#4aedc4" }}
            >
              Ver todos <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {documentosDestacados.map((doc) => (
              <Card
                key={doc.id}
                className="border-0 rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer"
                style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: "#0a1419" }}
                    >
                      <div className="w-7 h-7" style={{ color: "#4aedc4" }}>
                        {doc.icono}
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: "#4aedc4" }}
                      >
                        {doc.titulo}
                      </h3>
                      <p className="mb-3" style={{ color: "#d1d5db" }}>
                        {doc.descripcion}
                      </p>
                      <div
                        className="flex flex-wrap gap-3 text-xs"
                        style={{ color: "#9ca3af" }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-opacity-20"
                          style={{
                            backgroundColor: "#1a3039",
                            color: "#d1d5db",
                            borderColor: "#1a3039",
                          }}
                        >
                          {doc.categoria}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {doc.paginas} páginas
                        </span>
                        <span className="flex items-center gap-1">
                          <Database className="w-3 h-3" />
                          {doc.tamaño}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {doc.descargas}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* RECIENTES */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#4aedc4" }}>
            Añadidos Recientemente
          </h2>
          <Card
            className="border-0 rounded-xl overflow-hidden shadow-lg"
            style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "#0a1419" }}>
                    <th
                      className="py-4 px-6 text-left font-semibold border-b"
                      style={{ color: "#4aedc4", borderColor: "#1a3039" }}
                    >
                      Documento
                    </th>
                    <th
                      className="py-4 px-6 text-left font-semibold border-b hidden md:table-cell"
                      style={{ color: "#4aedc4", borderColor: "#1a3039" }}
                    >
                      Categoría
                    </th>
                    <th
                      className="py-4 px-6 text-left font-semibold border-b hidden md:table-cell"
                      style={{ color: "#4aedc4", borderColor: "#1a3039" }}
                    >
                      Fecha
                    </th>
                    <th
                      className="py-4 px-6 text-left font-semibold border-b hidden md:table-cell"
                      style={{ color: "#4aedc4", borderColor: "#1a3039" }}
                    >
                      Tamaño
                    </th>
                    <th
                      className="py-4 px-6 text-right font-semibold border-b"
                      style={{ color: "#4aedc4", borderColor: "#1a3039" }}
                    >
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documentosRecientes.map((doc, index) => (
                    <tr
                      key={doc.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#0a141980" : "transparent",
                      }}
                    >
                      <td
                        className="py-4 px-6 border-b"
                        style={{ borderColor: "#1a3039", color: "#d1d5db" }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#0a1419" }}
                          >
                            <div
                              className="w-4 h-4"
                              style={{ color: "#4aedc4" }}
                            >
                              {doc.icono}
                            </div>
                          </div>
                          <div>
                            <a
                              href="#"
                              className="hover:underline"
                              style={{ color: "#4aedc4" }}
                            >
                              {doc.titulo}
                            </a>
                            <p
                              className="text-xs block md:hidden mt-1"
                              style={{ color: "#9ca3af" }}
                            >
                              {doc.fecha}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        className="py-4 px-6 border-b hidden md:table-cell"
                        style={{ borderColor: "#1a3039", color: "#d1d5db" }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-opacity-20"
                          style={{
                            backgroundColor: "#1a3039",
                            color: "#d1d5db",
                            borderColor: "#1a3039",
                          }}
                        >
                          {doc.categoria}
                        </Badge>
                      </td>
                      <td
                        className="py-4 px-6 border-b hidden md:table-cell"
                        style={{ borderColor: "#1a3039", color: "#d1d5db" }}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar
                            className="w-4 h-4"
                            style={{ color: "#4aedc4" }}
                          />
                          {doc.fecha}
                        </div>
                      </td>
                      <td
                        className="py-4 px-6 border-b hidden md:table-cell"
                        style={{ borderColor: "#1a3039", color: "#d1d5db" }}
                      >
                        {doc.tamaño}
                      </td>
                      <td
                        className="py-4 px-6 border-b text-right"
                        style={{ borderColor: "#1a3039" }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 transition-colors"
                          style={{
                            backgroundColor: "#0a1419",
                            color: "#4aedc4",
                            borderColor: "#4aedc4",
                          }}
                          onClick={() => openPdfViewer(doc.pdfUrl)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#4aedc4";
                            e.currentTarget.style.color = "#0a1419";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#0a1419";
                            e.currentTarget.style.color = "#4aedc4";
                          }}
                        >
                          <FileText className="w-4 h-4" /> Ver documento
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {selectedPdf && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(10, 20, 25, 0.95)" }}
          >
            <div
              className="w-full max-w-5xl max-h-full rounded-xl overflow-hidden"
              style={{ backgroundColor: "#0e1e25", borderColor: "#1a3039" }}
            >
              <div
                className="flex items-center justify-between p-4 border-b"
                style={{ backgroundColor: "#0a1419", borderColor: "#1a3039" }}
              >
                <h3 className="text-lg font-bold" style={{ color: "#4aedc4" }}>
                  Visor de Documento
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                      disabled={pageNumber <= 1}
                      style={{
                        backgroundColor: "#0a1419",
                        color: "#4aedc4",
                        borderColor: "#4aedc4",
                      }}
                    >
                      ←
                    </Button>
                    <span className="text-sm" style={{ color: "#d1d5db" }}>
                      {pageNumber} / {numPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPageNumber(Math.min(numPages, pageNumber + 1))
                      }
                      disabled={pageNumber >= numPages}
                      style={{
                        backgroundColor: "#0a1419",
                        color: "#4aedc4",
                        borderColor: "#4aedc4",
                      }}
                    >
                      →
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={closePdfViewer}
                    style={{
                      backgroundColor: "#0a1419",
                      color: "#4aedc4",
                      borderColor: "#4aedc4",
                    }}
                  >
                    ✕ Cerrar
                  </Button>
                </div>
              </div>

              {/* PDF Content */}
              <div className="p-4 max-h-[80vh] overflow-auto flex justify-center">
                <Document
                  file={selectedPdf}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex items-center justify-center p-8">
                      <div
                        className="animate-spin rounded-full h-8 w-8 border-b-2"
                        style={{ borderColor: "#4aedc4" }}
                      ></div>
                      <span className="ml-2" style={{ color: "#d1d5db" }}>
                        Cargando documento...
                      </span>
                    </div>
                  }
                  error={
                    <div className="flex items-center justify-center p-8">
                      <span style={{ color: "#ef4444" }}>
                        Error al cargar el documento
                      </span>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="shadow-lg"
                    width={Math.min(800, window.innerWidth - 100)}
                  />
                </Document>
              </div>
            </div>
          </div>
        )}

        <footer
          className="text-center py-8 border-t"
          style={{ borderColor: "#1a3039", color: "#9ca3af" }}
        >
          <p className="text-sm">
            © 2025 Repositorio de Recursos Educativos de Ciberseguridad
          </p>
          <p className="text-sm mt-2">
            Creado con fines educativos y de investigación
          </p>
        </footer>
      </div>
    </main>
  );
}
