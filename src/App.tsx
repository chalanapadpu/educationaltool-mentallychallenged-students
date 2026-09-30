/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Navbar } from './components/Navbar';
import { AccessibilityDrawer } from './components/AccessibilityDrawer';
import { ReadingRuler } from './components/ReadingRuler';
import { StudentRoom } from './components/StudentRoom';
import { GamifiedTaskCanvas } from './components/GamifiedTaskCanvas';
import { VisualSchedule } from './components/VisualSchedule';
import { SensoryCalmZone } from './components/SensoryCalmZone';
import { EducatorDashboard } from './components/EducatorDashboard';
import { ParentPortal } from './components/ParentPortal';
import { CBLTLearningLab } from './components/CBLTLearningLab';

function MainAppContent() {
  const [currentTab, setCurrentTab] = useState<string>('student');
  const [isAccessDrawerOpen, setIsAccessDrawerOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col transition-colors selection:bg-sky-200 dark:selection:bg-sky-900">
      
      {/* Universal Reading Focus Ruler */}
      <ReadingRuler />

      {/* Accessible Top Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSettings={() => setIsAccessDrawerOpen(true)}
      />

      {/* Accessibility & Sensory Deck Drawer */}
      <AccessibilityDrawer
        isOpen={isAccessDrawerOpen}
        onClose={() => setIsAccessDrawerOpen(false)}
      />

      {/* Main View Port */}
      <main className="flex-1 w-full pb-16">
        {currentTab === 'student' && (
          <div className="flex flex-col gap-6">
            <StudentRoom onNavigate={setCurrentTab} />
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <GamifiedTaskCanvas />
            </div>
          </div>
        )}

        {currentTab === 'schedule' && <VisualSchedule />}

        {currentTab === 'learning-lab' && <CBLTLearningLab />}

        {currentTab === 'calm' && <SensoryCalmZone />}

        {currentTab === 'educator' && <EducatorDashboard />}

        {currentTab === 'caregiver' && <ParentPortal />}
      </main>

      {/* Accessible Footer with quiet metadata */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">AuraAble</span>
            <span aria-hidden="true">·</span>
            <span>Inclusive Special Education Learning & AAC Platform</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>WCAG 2.1 AAA Ready</span>
            <span aria-hidden="true">·</span>
            <span>Switch-Access Compatible</span>
            <span aria-hidden="true">·</span>
            <span>Sensory-Friendly Certified</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <MainAppContent />
    </AccessibilityProvider>
  );
}
