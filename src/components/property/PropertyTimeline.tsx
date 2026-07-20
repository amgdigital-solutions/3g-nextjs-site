"use client";

import { CheckCircle2, Circle, HardHat, Home, KeyRound } from "lucide-react";

interface PropertyTimelineProps {
  status?: string | null;
  handoverDate?: string | null;
}

const stages = [
  { key: "planning", label: "Planning", icon: Home, description: "Project design & approvals" },
  { key: "construction", label: "Construction", icon: HardHat, description: "Building in progress" },
  { key: "handover", label: "Handover", icon: KeyRound, description: "Ready for move-in" },
];

export function PropertyTimeline({ status = "off-plan", handoverDate = "Q4 2026" }: PropertyTimelineProps) {
  // Map admin project_status to timeline stage: 0=planning, 1=construction, 2=handover
  const statusMap: Record<string, number> = {
    "off-plan": 0,
    "under-construction": 1,
    "ready": 2,
    "sold": 2,
  };
  const currentStage = statusMap[status ?? "off-plan"] ?? 0;

  return (
    <div className="mb-8">
      <h2 className="font-serif text-xl text-navy-950 mb-4">Project Status</h2>
      <div className="p-5 bg-gray-50 rounded-xl">
        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-[16%] right-[16%] h-0.5 bg-gray-200">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stages */}
          <div className="relative flex justify-between">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isCompleted = i <= currentStage;
              const isCurrent = i === currentStage;

              return (
                <div key={stage.key} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all z-10 ${
                      isCompleted
                        ? "bg-gold border-gold text-navy-900"
                        : isCurrent
                        ? "bg-white border-gold text-gold"
                        : "bg-white border-gray-200 text-gray-300"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="mt-2">
                    <div className={`text-sm font-medium ${isCompleted || isCurrent ? "text-navy-950" : "text-gray-400"}`}>
                      {stage.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{stage.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Handover date */}
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <span className="text-xs text-gray-400">Expected Handover</span>
          <div className="text-sm font-semibold text-navy-950">{handoverDate}</div>
        </div>
      </div>
    </div>
  );
}
