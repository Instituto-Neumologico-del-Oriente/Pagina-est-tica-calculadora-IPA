/**
 * Calculadora de Paquetes-Año
 * Calcula la exposición acumulada al tabaco
 */

// Configuración de niveles de riesgo
const RISK_LEVELS = {
    LOW: {
        threshold: 10,
        label: 'Bajo',
        className: 'text-2xl font-bold text-emerald-600',
        description: 'Riesgo relativamente bajo de enfermedades relacionadas con el tabaco.'
    },
    MODERATE: {
        threshold: 20,
        label: 'Moderado',
        className: 'text-2xl font-bold text-amber-600',
        description: 'Riesgo moderado. Se recomienda dejar de fumar y realizar chequeos regulares.'
    },
    HIGH: {
        threshold: 30,
        label: 'Alto',
        className: 'text-2xl font-bold text-orange-600',
        description: 'Riesgo alto. Consulte con su médico sobre programas para dejar de fumar.'
    },
    VERY_HIGH: {
        threshold: Infinity,
        label: 'Muy Alto',
        className: 'text-2xl font-bold text-rose-600',
        description: 'Riesgo muy alto. Se recomienda atención médica y evaluación de detección de cáncer de pulmón.'
    }
};

/**
 * Calcula los paquetes-año basándose en cigarrillos por día y años fumando
 * @param {number} cigarettesPerDay - Número de cigarrillos fumados por día
 * @param {number} years - Años fumando
 * @returns {number} Paquetes-año calculados
 */
function calculatePackYearsValue(cigarettesPerDay, years) {
    // Fórmula: (cigarrillos por día / 20) × años fumados
    const CIGARETTES_PER_PACK = 20;
    const packYears = (cigarettesPerDay / CIGARETTES_PER_PACK) * years;
    
    // Redondear a un decimal
    return Math.round(packYears * 10) / 10;
}

/**
 * Determina el nivel de riesgo basado en los paquetes-año
 * @param {number} packYears - Paquetes-año calculados
 * @returns {Object} Objeto con información del nivel de riesgo
 */
function determineRiskLevel(packYears) {
    if (packYears < RISK_LEVELS.LOW.threshold) {
        return RISK_LEVELS.LOW;
    } else if (packYears < RISK_LEVELS.MODERATE.threshold) {
        return RISK_LEVELS.MODERATE;
    } else if (packYears < RISK_LEVELS.HIGH.threshold) {
        return RISK_LEVELS.HIGH;
    } else {
        return RISK_LEVELS.VERY_HIGH;
    }
}

/**
 * Actualiza la interfaz con los resultados del cálculo
 * @param {number} packYears - Paquetes-año calculados
 */
function updateResultDisplay(packYears) {
    const resultDiv = document.getElementById('result');
    const resultValue = document.getElementById('resultValue');
    const riskLevelEl = document.getElementById('riskLevel');
    const riskDescEl = document.getElementById('riskDescription');
    
    // Mostrar resultado
    resultValue.textContent = packYears;
    resultDiv.classList.remove('hidden');
    
    // Determinar y mostrar nivel de riesgo
    const riskLevel = determineRiskLevel(packYears);
    riskLevelEl.textContent = riskLevel.label;
    riskLevelEl.className = riskLevel.className;
    riskDescEl.textContent = riskLevel.description;
}

/**
 * Oculta el panel de resultados
 */
function hideResultDisplay() {
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('hidden');
}

/**
 * Valida que los valores de entrada sean válidos
 * @param {number} cigarettes - Número de cigarrillos
 * @param {number} years - Años fumando
 * @returns {boolean} True si los valores son válidos
 */
function validateInputs(cigarettes, years) {
    return !isNaN(cigarettes) && 
           !isNaN(years) && 
           cigarettes >= 0 && 
           years >= 0;
}

/**
 * Función principal que calcula y muestra los paquetes-año
 * Se ejecuta cada vez que el usuario modifica los campos de entrada
 */
function calculatePackYears() {
    // Obtener valores de los campos de entrada
    const cigarettesInput = document.getElementById('cigarettes');
    const yearsInput = document.getElementById('years');
    
    const cigarettes = parseFloat(cigarettesInput.value);
    const years = parseFloat(yearsInput.value);
    
    // Validar entradas
    if (validateInputs(cigarettes, years)) {
        // Calcular paquetes-año
        const packYears = calculatePackYearsValue(cigarettes, years);
        
        // Actualizar la interfaz
        updateResultDisplay(packYears);
    } else {
        // Ocultar resultados si las entradas no son válidas
        hideResultDisplay();
    }
}

/**
 * Inicialización cuando se carga el DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculadora de Paquetes-Año inicializada');
    
    // Agregar listeners a los campos de entrada
    const cigarettesInput = document.getElementById('cigarettes');
    const yearsInput = document.getElementById('years');
    
    if (cigarettesInput && yearsInput) {
        cigarettesInput.addEventListener('input', calculatePackYears);
        yearsInput.addEventListener('input', calculatePackYears);
    }
});

// Exponer funciones globales necesarias
window.calculatePackYears = calculatePackYears;