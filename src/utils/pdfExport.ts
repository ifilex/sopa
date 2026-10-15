import jsPDF from 'jspdf';
import { PatientProfile, SessionRecord } from '../types';

export function exportClinicalReportPDF(
  patient: PatientProfile,
  sessions: SessionRecord[]
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header banner
  doc.setFillColor(15, 23, 42); // Dark slate
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('INFORME CLÍNICO DE REHABILITACIÓN COGNITIVA', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(`Clínica: ${patient.clinicName}  •  Terapeuta: ${patient.therapistName}  •  Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 20);

  y = 36;

  // Patient Card Section
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 30, 2, 2, 'FD');

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('DATOS DEL PACIENTE', 18, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Nombre: ${patient.name}`, 18, y + 14);
  doc.text(`ID Clínico: ${patient.medicalId}`, 18, y + 20);
  doc.text(`Diagnóstico: ${patient.diagnosis}`, 18, y + 26);

  doc.text(`Fecha de Inicio: ${patient.joinedDate}`, 110, y + 14);
  doc.text(`Objetivo Principal: ${patient.rehabGoal}`, 110, y + 20);
  doc.text(`Sesiones Registradas: ${sessions.length}`, 110, y + 26);

  y += 38;

  // Aggregate Cognitive Metrics
  const avgAttention = Math.round(sessions.reduce((acc, s) => acc + s.metrics.sustainedAttention, 0) / (sessions.length || 1));
  const avgMemory = Math.round(sessions.reduce((acc, s) => acc + s.metrics.workingMemory, 0) / (sessions.length || 1));
  const avgSpeed = Math.round(sessions.reduce((acc, s) => acc + s.metrics.processingSpeed, 0) / (sessions.length || 1));
  const avgScanning = Math.round(sessions.reduce((acc, s) => acc + s.metrics.visualScanning, 0) / (sessions.length || 1));
  const avgVocab = Math.round(sessions.reduce((acc, s) => acc + s.metrics.vocabularyRetention, 0) / (sessions.length || 1));
  const avgCalm = Math.round(sessions.reduce((acc, s) => acc + s.metrics.emotionalCalm, 0) / (sessions.length || 1));

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('PROMEDIO DE EJES COGNITIVOS EVALUADOS', 14, y);
  y += 6;

  const metricBoxes = [
    { label: 'Atención Sostenida', value: `${avgAttention}%` },
    { label: 'Memoria de Trabajo', value: `${avgMemory}%` },
    { label: 'Velocidad de Proc.', value: `${avgSpeed}%` },
    { label: 'Rastreo Visual', value: `${avgScanning}%` },
    { label: 'Retención Léxica', value: `${avgVocab}%` },
    { label: 'Calma Emocional', value: `${avgCalm}%` },
  ];

  const colWidth = (pageWidth - 28) / 3;
  metricBoxes.forEach((m, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const boxX = 14 + col * colWidth;
    const boxY = y + row * 16;

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(boxX, boxY, colWidth - 4, 13, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, boxX + 4, boxY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(m.value, boxX + 4, boxY + 10.5);
  });

  y += 38;

  // Session Log Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('HISTORIAL DE SESIONES RECIENTES', 14, y);
  y += 5;

  // Table Header
  doc.setFillColor(226, 232, 240);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('Fecha', 16, y + 5);
  doc.text('Idioma / Enfoque', 42, y + 5);
  doc.text('Dificultad', 95, y + 5);
  doc.text('Palabras', 125, y + 5);
  doc.text('T. Promedio', 150, y + 5);
  doc.text('Puntaje', 178, y + 5);
  y += 7;

  // Table Rows (up to 8 sessions)
  sessions.slice(0, 8).forEach((sess, idx) => {
    const isEven = idx % 2 === 0;
    if (isEven) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, pageWidth - 28, 6.5, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);

    const dStr = new Date(sess.date).toLocaleDateString('es-ES');
    doc.text(dStr, 16, y + 4.5);
    doc.text(`${sess.language.toUpperCase()} • ${sess.rehabFocus}`, 42, y + 4.5);
    doc.text(sess.difficulty, 95, y + 4.5);
    doc.text(`${sess.wordsFound}/${sess.wordsTotal}`, 125, y + 4.5);
    doc.text(`${Math.round(sess.avgTimePerWord)}s/pal`, 150, y + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.text(`${sess.cognitiveScore}/100`, 178, y + 4.5);

    y += 6.5;
  });

  y += 8;

  // Therapist Observation & Neuro Insights
  doc.setFillColor(240, 253, 250); // Light teal/emerald
  doc.setDrawColor(204, 251, 241);
  doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 118, 110);
  doc.text('OBSERVACIÓN NEUROPSICOLÓGICA & RECOMENDACIONES DE LOGOPEDIA', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(19, 78, 74);
  const notes = patient.therapistNotes || 'El paciente muestra una progresión favorable en el rastreo visual sistemático y la discriminación léxica. Se recomienda mantener la rutina diaria de 10 minutos con énfasis en activación del hemisferio izquierdo mediante ejercicios de logopedia multilingüe y consolidación fonética.';
  
  const splitNotes = doc.splitTextToSize(notes, pageWidth - 36);
  doc.text(splitNotes, 18, y + 12);

  y += 34;

  // Signatures
  doc.setDrawColor(203, 213, 225);
  doc.line(18, y + 16, 75, y + 16);
  doc.line(125, y + 16, 185, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Firma del Especialista\n${patient.therapistName}`, 18, y + 20);
  doc.text(`Conformidad del Paciente / Tutor\n${patient.name}`, 125, y + 20);

  // Save PDF
  const filename = `Informe_Cognitivo_${patient.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
