"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Workflow,
  Database,
  Wrench,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Activity,
  Zap,
} from "lucide-react";

interface PipelineNode {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  badge: string;
  telemetry: {
    label: string;
    value: string;
    detail: string;
  };
}

const nodes: PipelineNode[] = [
  {
    id: "user",
    name: "User Intent",
    role: "Natural query & multimodal prompt",
    icon: MessageSquare,
    badge: "INPUT",
    telemetry: {
      label: "Streaming Ingestion",
      value: "Duplex Token Stream",
      detail: "Chunked tokenizer with zero-latency buffer",
    },
  },
  {
    id: "agent",
    name: "Agent Orchestrator",
    role: "State machine & cyclic planner",
    icon: Workflow,
    badge: "LANGGRAPH",
    telemetry: {
      label: "Decision Cycle",
      value: "ReAct Loop #1",
      detail: "Dynamic plan decomposition with fallback checks",
    },
  },
  {
    id: "retrieval",
    name: "Hybrid Retrieval",
    role: "Dense vector + Knowledge Graph",
    icon: Database,
    badge: "RAG & Neo4j",
    telemetry: {
      label: "Vector Similarity",
      value: "Cosine 0.948 (top-k=5)",
      detail: "Reciprocal Rank Fusion with graph sub-entities",
    },
  },
  {
    id: "tools",
    name: "Tool Calling",
    role: "Deterministic schema & MCP execution",
    icon: Wrench,
    badge: "EXECUTION",
    telemetry: {
      label: "API Execution",
      value: "db_lookup() -> 18ms",
      detail: "Pydantic validated sandbox payload",
    },
  },
  {
    id: "llm",
    name: "LLM Reasoning",
    role: "Transformer context & generation",
    icon: Cpu,
    badge: "INFERENCE",
    telemetry: {
      label: "Throughput",
      value: "84 tokens/sec",
      detail: "Speculative decoding with strict JSON grammar",
    },
  },
  {
    id: "response",
    name: "Verified Output",
    role: "Guardrails & citation attribution",
    icon: CheckCircle2,
    badge: "RESPONSE",
    telemetry: {
      label: "Faithfulness Score",
      value: "99.4% Validated",
      detail: "Zero hallucination detected against source context",
    },
  },
];

export default function HeroVisual() {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-cycle through the pipeline nodes to illustrate autonomous data flow
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % nodes.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeNode = nodes[activeNodeIndex];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto rounded-3xl bg-white/90 border border-zinc-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] p-4 sm:p-7 backdrop-blur-sm overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-ai-grid opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Strip with Live Architecture Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-zinc-100 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2572B]/60 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2572B]"></span>
          </span>
          <span className="font-semibold text-zinc-800 tracking-tight">
            LIVE AI PIPELINE VISUALIZATION
          </span>
          <span className="hidden sm:inline text-zinc-300">|</span>
          <span className="hidden sm:inline text-zinc-400">
            AUTONOMOUS AGENT RUNTIME
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer text-[11px]"
            title={isAutoPlaying ? "Pause flow cycle" : "Resume auto flow cycle"}
          >
            <Activity className="w-3 h-3 text-[#F2572B]" />
            <span>{isAutoPlaying ? "SIMULATING" : "PAUSED"}</span>
          </button>
          <span className="text-[11px] text-zinc-600 hidden md:inline">
            Interactive: Click any node
          </span>
        </div>
      </div>

      {/* Interactive Pipeline Node Grid / Flow */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = index === activeNodeIndex;
          const isPassed = index < activeNodeIndex;

          return (
            <button
              key={node.id}
              onClick={() => {
                setActiveNodeIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`group relative text-left p-3.5 rounded-2xl transition-all duration-300 cursor-pointer border ${
                isActive
                  ? "bg-zinc-900 text-white border-zinc-900 shadow-md scale-[1.03] z-20"
                  : isPassed
                  ? "bg-blue-50/50 hover:bg-blue-50/80 border-blue-200/60 text-zinc-800"
                  : "bg-white hover:bg-zinc-50 border-zinc-200/70 text-zinc-700"
              }`}
            >
              {/* Node Sequence Number & Badge */}
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className={`text-[10px] font-mono font-medium ${
                    isActive ? "text-zinc-400" : "text-zinc-400"
                  }`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200"
                  }`}
                >
                  {node.badge}
                </span>
              </div>

              {/* Node Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                  isActive
                    ? "bg-[#F2572B] text-[#FCF6F5]"
                    : isPassed
                    ? "bg-[#F2572B]/10 text-[#F2572B]"
                    : "bg-zinc-100 text-zinc-600 group-hover:text-zinc-900"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Title & Role */}
              <h4
                className={`text-xs font-semibold tracking-tight leading-snug line-clamp-1 ${
                  isActive ? "text-white" : "text-zinc-900"
                }`}
              >
                {node.name}
              </h4>
              <p
                className={`text-[11px] leading-relaxed mt-1 line-clamp-2 ${
                  isActive ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                {node.role}
              </p>

              {/* Connecting arrow indicator for mobile/grid */}
              {index < nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 pointer-events-none">
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                      isPassed ? "text-[#F2572B] font-bold" : "text-zinc-300"
                    }`}
                  >
                    →
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Live Active Node Telemetry & Deep State Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 mt-5 p-4 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-inner"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#F2572B]/30 text-[#FCF6F5]">
                <Zap className="w-4 h-4 text-[#F2572B]" />
              </div>
              <div>
                <div className="text-zinc-400 text-[11px]">
                  ACTIVE STAGE 0{activeNodeIndex + 1}
                </div>
                <div className="font-semibold text-white tracking-wide">
                  {activeNode.name} · {activeNode.telemetry.label}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  SYSTEM VALUE
                </span>
                <span className="font-semibold text-emerald-400 text-xs">
                  {activeNode.telemetry.value}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2.5 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-300">
            <span className="text-[11px] leading-relaxed">
              <span className="text-zinc-400 font-mono">SPEC: </span>
              {activeNode.telemetry.detail}
            </span>
            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              LATENCY OPTIMIZED
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer Metrics Banner */}
      <div className="relative z-10 mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-zinc-600">
        <div className="flex items-center gap-4">
          <span>
            <strong className="text-zinc-800 font-semibold">FLOW:</strong> User → Agent → RAG → Tools → LLM → Output
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#F2572B] font-medium">
            <Sparkles className="w-3 h-3" />
            Deterministic Tool Execution
          </span>
        </div>
      </div>
    </div>
  );
}
