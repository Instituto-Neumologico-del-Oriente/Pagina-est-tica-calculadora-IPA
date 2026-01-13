"use client"

import { useState } from "react"
import { Calculator, Cigarette, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PackYearCalculator() {
  const [cigarettesPerDay, setCigarettesPerDay] = useState<string>("")
  const [yearsSmoked, setYearsSmoked] = useState<string>("")
  const [result, setResult] = useState<number | null>(null)

  const calculatePackYears = () => {
    const cigs = Number.parseFloat(cigarettesPerDay)
    const years = Number.parseFloat(yearsSmoked)

    if (!isNaN(cigs) && !isNaN(years) && cigs >= 0 && years >= 0) {
      // Formula: (cigarrillos por día / 20) × años fumados
      const packYears = (cigs / 20) * years
      setResult(Math.round(packYears * 10) / 10)
    } else {
      setResult(null)
    }
  }

  const getRiskLevel = (packYears: number) => {
    if (packYears < 10) {
      return {
        level: "Bajo",
        color: "text-emerald-600",
        description: "Riesgo relativamente bajo de enfermedades relacionadas con el tabaco.",
      }
    } else if (packYears < 20) {
      return {
        level: "Moderado",
        color: "text-amber-600",
        description: "Riesgo moderado. Se recomienda dejar de fumar y realizar chequeos regulares.",
      }
    } else if (packYears < 30) {
      return {
        level: "Alto",
        color: "text-orange-600",
        description: "Riesgo alto. Consulte con su médico sobre programas para dejar de fumar.",
      }
    } else {
      return {
        level: "Muy Alto",
        color: "text-rose-600",
        description: "Riesgo muy alto. Se recomienda atención médica y evaluación de detección de cáncer de pulmón.",
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Calculadora de Paquetes-Año</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Herramienta médica para calcular la exposición acumulada al tabaco
          </p>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-lg border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Cigarette className="w-6 h-6" />
              Ingrese sus datos
            </CardTitle>
            <CardDescription>Complete los campos para calcular sus paquetes-año</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cigarettes" className="text-base font-medium">
                  Cigarrillos por día
                </Label>
                <Input
                  id="cigarettes"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="20"
                  value={cigarettesPerDay}
                  onChange= {(e) => {
                    setCigarettesPerDay(e.target.value)
                    calculatePackYears()
                  }}
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years" className="text-base font-medium">
                  Años fumando
                </Label>
                <Input
                  id="years"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="10"
                  value={yearsSmoked}
                  onChange={(e) => {
                    setYearsSmoked(e.target.value)
                    calculatePackYears()
                  }}
                  className="text-lg h-12"
                />
              </div>
            </div>

            {/* Result Display */}
            {result !== null && (
              <div className="mt-8 p-6 rounded-xl bg-primary/5 border-2 border-primary/20">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Calculator className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Su resultado</p>
                    <p className="text-5xl md:text-6xl font-bold text-primary">{result}</p>
                    <p className="text-lg text-muted-foreground mt-2">paquetes-año</p>
                  </div>

                  {/* Risk Level */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Nivel de riesgo</p>
                    <p className={`text-2xl font-bold ${getRiskLevel(result).color}`}>{getRiskLevel(result).level}</p>
                    <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto text-pretty">
                      {getRiskLevel(result).description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5" />
                ¿Qué son los paquetes-año?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Los paquetes-año son una medida médica estándar que cuantifica la exposición acumulada al tabaco a lo
                largo del tiempo.
              </p>
              <p>
                <strong className="text-foreground">Fórmula:</strong> (Cigarrillos por día ÷ 20) × Años fumados
              </p>
              <p>
                Un paquete estándar contiene 20 cigarrillos. Esta medida ayuda a los profesionales de la salud a evaluar
                el riesgo de enfermedades relacionadas con el tabaco.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Importancia clínica
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Los paquetes-año se utilizan para:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Evaluar el riesgo de cáncer de pulmón</li>
                <li>Determinar la necesidad de pruebas de detección</li>
                <li>Calcular el riesgo de EPOC</li>
                <li>Planificar estrategias de cesación tabáquica</li>
              </ul>
              <p className="pt-2 text-xs italic">
                Nota: Esta calculadora es solo para fines educativos. Consulte a un profesional de la salud para una
                evaluación médica completa.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Alert className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Aviso importante:</strong> Esta herramienta es solo para fines informativos y educativos. No
            sustituye el consejo médico profesional. Si tiene preocupaciones sobre su salud relacionadas con el
            tabaquismo, consulte con su médico.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
