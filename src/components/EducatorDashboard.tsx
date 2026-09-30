import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Award, 
  FileText, 
  Plus, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  UserCheck, 
  Settings, 
  Sliders, 
  HeartHandshake, 
  Activity, 
  ChevronRight,
  Printer
} from 'lucide-react';
import { IEPGoal, BehaviorLogEntry } from '../types';

export const EducatorDashboard: React.FC = () => {
  const { 
    activeStudent, 
    allStudents, 
    setActiveStudent, 
    iepGoals, 
    addIEPProgress, 
    behaviorLogs, 
    addBehaviorLog, 
    playFeedback, 
    settings 
  } = useAccessibility();

  // Active student IEP goals
  const studentGoals = iepGoals.filter(g => g.studentId === activeStudent.id);
  const studentBehaviorLogs = behaviorLogs.filter(b => b.studentId === activeStudent.id);

  // Milestone Update Modal State
  const [selectedGoal, setSelectedGoal] = useState<IEPGoal | null>(null);
  const [newPercentage, setNewPercentage] = useState<number>(75);
  const [newNote, setNewNote] = useState<string>('');

  // New Behavior Log Modal State
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [logState, setLogState] = useState<BehaviorLogEntry['state']>('Calm & Engaged');
  const [logTrigger, setLogTrigger] = useState<string>('');
  const [logSupport, setLogSupport] = useState<string>('');

  const handleOpenMilestoneModal = (goal: IEPGoal) => {
    setSelectedGoal(goal);
    setNewPercentage(goal.currentPercentage);
    setNewNote('');
    playFeedback('tap');
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoal) return;
    addIEPProgress(selectedGoal.id, newPercentage, newNote);
    setSelectedGoal(null);
  };

  const handleSaveBehaviorLog = (e: React.FormEvent) => {
    e.preventDefault();
    addBehaviorLog({
      studentId: activeStudent.id,
      state: logState,
      triggerContext: logTrigger || 'Routine classroom participation',
      supportApplied: logSupport || 'Visual schedule review and verbal check-in',
      loggedBy: 'Lead Special Ed Teacher / SLP'
    });
    setLogTrigger('');
    setLogSupport('');
    setShowLogModal(false);
  };

  const getStatusBadge = (status: IEPGoal['status']) => {
    switch (status) {
      case 'Mastered': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'In Progress': return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300';
      case 'Emerging': return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-6 h-6 text-sky-600" />
            <span>Educator & Specialist IEP Dashboard</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Individualized Education Program milestone logging, accommodation profiles, and sensory tracking.
          </p>
        </div>

        {/* Student Profile Switcher Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {allStudents.map(student => (
            <button
              key={student.id}
              onClick={() => {
                setActiveStudent(student);
                playFeedback('tap');
              }}
              data-switch-target="true"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all whitespace-nowrap ${
                activeStudent.id === student.id
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <img 
                src={student.avatarUrl} 
                alt="" 
                className="w-6 h-6 rounded-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <span>{student.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Student Profile Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={activeStudent.avatarUrl} 
            alt={activeStudent.name} 
            className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-400 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{activeStudent.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                {activeStudent.gradeLevel}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600 dark:text-slate-400">
              <div>Communication: <strong className="text-slate-900 dark:text-slate-200">{activeStudent.primaryCommunicationMode}</strong></div>
              <span>·</span>
              <div>Sensory Style: <strong className="text-slate-900 dark:text-slate-200">{activeStudent.sensoryPreference}</strong></div>
              <span>·</span>
              <div>Weekly Streak: <strong className="text-emerald-600 font-bold">{activeStudent.currentStreakDays} Days</strong></div>
            </div>
          </div>
        </div>

        {/* Accommodation Quick Indicators */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-medium">
            Contrast: {activeStudent.accessibilityPreset.themeMode}
          </span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-medium">
            Font: {activeStudent.accessibilityPreset.fontFamily}
          </span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-medium">
            Switch Access: {activeStudent.accessibilityPreset.switchAccessEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Main Sections: IEP Goals Tracking & Behavioral Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* IEP Goals & Milestone Logging (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" />
              Active IEP Goals & Objectives ({studentGoals.length})
            </h2>
            <button
              onClick={() => window.print()}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print IEP Report</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {studentGoals.map(goal => (
              <div 
                key={goal.id} 
                className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col gap-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-md">
                      {goal.domain}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${getStatusBadge(goal.status)}`}>
                      {goal.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Target Date: {goal.targetDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {goal.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {goal.targetCriteria}
                </p>

                {/* Progress Bar & Mastery Percentage */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Mastery Progress: {goal.currentPercentage}%
                    </span>
                    <span className="text-slate-500">
                      Target: {goal.targetPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        goal.currentPercentage >= goal.targetPercentage ? 'bg-emerald-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${Math.min(goal.currentPercentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Clinical Notes snippet */}
                {goal.notes.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                    <strong className="block text-slate-700 dark:text-slate-200 mb-1">Latest Observation ({goal.lastLoggedDate}):</strong>
                    {goal.notes[0]}
                  </div>
                )}

                {/* Action */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleOpenMilestoneModal(goal)}
                    data-switch-target="true"
                    className="px-4 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-xl flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Log Milestone Progress</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioral & Regulation Observation Log (1 col) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Sensory & Behavior Log
            </h2>
            <button
              onClick={() => {
                playFeedback('tap');
                setShowLogModal(true);
              }}
              data-switch-target="true"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Log Entry</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {studentBehaviorLogs.map(log => (
              <div 
                key={log.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-700 dark:text-teal-300">
                    {log.state}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {log.timestamp}
                  </span>
                </div>
                {log.triggerContext && (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">Context:</strong> {log.triggerContext}
                  </p>
                )}
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Support:</strong> {log.supportApplied}
                </p>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  Logged by: {log.loggedBy}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal: Log Milestone Progress */}
      {selectedGoal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-2">Update IEP Goal Progress</h3>
            <p className="text-xs text-slate-500 mb-4">{selectedGoal.title}</p>

            <form onSubmit={handleSaveMilestone} className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Current Percentage</span>
                  <span className="font-mono text-sky-600">{newPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={newPercentage}
                  onChange={(e) => setNewPercentage(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Clinical / Instructional Notes
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Record trial accuracy, prompts required, or behavioral observations..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedGoal(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-sky-600 text-white rounded-xl hover:bg-sky-700"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Observation Log */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-4">Log Sensory & Behavioral Entry</h3>
            <form onSubmit={handleSaveBehaviorLog} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Observed State
                </label>
                <select
                  value={logState}
                  onChange={(e) => setLogState(e.target.value as BehaviorLogEntry['state'])}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs"
                >
                  <option value="Calm & Engaged">Calm & Engaged</option>
                  <option value="Seeking Sensory Input">Seeking Sensory Input</option>
                  <option value="Mild Overwhelm">Mild Overwhelm</option>
                  <option value="Regulated after Break">Regulated after Break</option>
                  <option value="Active Communication">Active Communication</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Context / Antecedent Trigger
                </label>
                <input
                  type="text"
                  placeholder="e.g. Noise transition / Math worksheet"
                  value={logTrigger}
                  onChange={(e) => setLogTrigger(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Support / Intervention Applied
                </label>
                <input
                  type="text"
                  placeholder="e.g. Calming breathing / Tactile fidget / Quiet corner"
                  value={logSupport}
                  onChange={(e) => setLogSupport(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-sky-600 text-white rounded-xl hover:bg-sky-700"
                >
                  Save Observation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
