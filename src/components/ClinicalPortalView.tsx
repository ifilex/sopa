import React, { useState } from 'react';
import {
  PatientProfile,
  SessionRecord,
} from '../types';
import {
  Stethoscope,
  Download,
  FileText,
  User,
  Calendar,
  Activity,
  CheckCircle,
  Save,
  BrainCircuit,
  MessageSquare,
} from 'lucide-react';
import { exportClinicalReportPDF } from '../utils/pdfExport';

interface ClinicalPortalViewProps {
  patient: PatientProfile;
  onUpdatePatient: (updated: PatientProfile) => void;
  sessions: SessionRecord[];
}

export const ClinicalPortalView: React.FC<ClinicalPortalViewProps> = ({
  patient,
  onUpdatePatient,
  sessions,
}) => {
  const [editingPatient, setEditingPatient] = useState<PatientProfile>(patient);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePatient(editingPatient);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDownloadPDF = () => {
    exportClinicalReportPDF(editingPatient, sessions);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 py-2 space-y-4 text-left">
      {/* Top Clinical Header */}
      <div className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Portal Terapéutico & Neuro-Rehabilitación
            </h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Seguimiento clínico para Logopedas y Neuropsicólogos
            </p>
          </div>
        </div>

        <button
          id="btn_export_pdf_report"
          onClick={handleDownloadPDF}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition-all active:scale-95 whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Informe PDF</span>
        </button>
      </div>

      {/* Patient Record Form */}
      <form
        onSubmit={handleSave}
        className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
            <User className="w-4 h-4 text-teal-500" />
            Ficha Clínica del Paciente
          </h3>
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> ¡Guardado!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              value={editingPatient.name}
              onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-800 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
              ID Clínico / Historia Médica
            </label>
            <input
              type="text"
              value={editingPatient.medicalId}
              onChange={(e) => setEditingPatient({ ...editingPatient, medicalId: e.target.value })}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-800 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
              Diagnóstico / Afección
            </label>
            <input
              type="text"
              value={editingPatient.diagnosis}
              onChange={(e) => setEditingPatient({ ...editingPatient, diagnosis: e.target.value })}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-800 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
              Objetivo de Rehabilitación
            </label>
            <input
              type="text"
              value={editingPatient.rehabGoal}
              onChange={(e) => setEditingPatient({ ...editingPatient, rehabGoal: e.target.value })}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-800 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
            Observaciones Clínicas del Especialista & Prescripción
          </label>
          <textarea
            rows={3}
            value={editingPatient.therapistNotes}
            onChange={(e) => setEditingPatient({ ...editingPatient, therapistNotes: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-800 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-teal-500 outline-none resize-none"
            placeholder="Indicaciones sobre anomia, estimulación del hemisferio izquierdo, ejercicios articulatorios..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 dark:bg-neutral-700 hover:bg-slate-900 dark:hover:bg-neutral-600 text-white text-xs font-bold transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar Ficha</span>
          </button>
        </div>
      </form>

      {/* Clinical Session Records Table */}
      <div className="p-4 rounded-3xl bg-white dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-teal-500" />
          Registro Histórico de Sesiones ({sessions.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-neutral-700 text-[10px] text-slate-400 uppercase tracking-wider">
                <th className="py-2 px-2">Fecha</th>
                <th className="py-2 px-2">Idioma / Enfoque</th>
                <th className="py-2 px-2">Dificultad</th>
                <th className="py-2 px-2">Aciertos</th>
                <th className="py-2 px-2">T. Promedio</th>
                <th className="py-2 px-2">Puntaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-neutral-700/60">
              {sessions.map((sess) => (
                <tr key={sess.id} className="hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="py-2 px-2 font-mono text-slate-600 dark:text-neutral-300">
                    {new Date(sess.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="py-2 px-2 font-semibold text-slate-800 dark:text-slate-200">
                    <span className="uppercase">{sess.language}</span> • {sess.rehabFocus}
                  </td>
                  <td className="py-2 px-2 capitalize text-slate-600 dark:text-neutral-400">
                    {sess.difficulty}
                  </td>
                  <td className="py-2 px-2 font-medium text-slate-700 dark:text-neutral-300">
                    {sess.wordsFound}/{sess.wordsTotal}
                  </td>
                  <td className="py-2 px-2 font-mono text-slate-600 dark:text-neutral-400">
                    {Math.round(sess.avgTimePerWord)}s
                  </td>
                  <td className="py-2 px-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {sess.cognitiveScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
