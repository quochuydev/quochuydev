"use client";
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Event Storming element types with colors from docs.md
const eventStormingElements = [
  { type: 'actor', label: 'Actor', color: '#fee750' },
  { type: 'event', label: 'Event', color: '#feae57' },
  { type: 'command', label: 'Command', color: '#a7c5fc' },
  { type: 'policy', label: 'Policy', color: '#da99e6' },
  { type: 'reaction_policy', label: 'Reaction Policy', color: '#fef5b2' },
  { type: 'external_system', label: 'External System', color: '#ffb3c5' },
  { type: 'read_models', label: 'Read Models', color: '#b0deb3' },
];

const initialNodes: Node[] = [
  {
    id: "1",
    type: "default",
    position: { x: 250, y: 25 },
    data: { label: "Event", color: "#feae57" },
    style: { backgroundColor: "#feae57" },
  },
  {
    id: "2",
    type: "default",
    position: { x: 100, y: 125 },
    data: { label: "Actor", color: "#fee750" },
    style: { backgroundColor: "#fee750" },
  },
  {
    id: "3",
    type: "default",
    position: { x: 400, y: 125 },
    data: { label: "Command", color: "#a7c5fc" },
    style: { backgroundColor: "#a7c5fc" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
];

const nodeTypes = {
  // You can add custom node types here if needed
};

export default function ReactFlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const elementData = eventStormingElements.find(el => el.type === type);
      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: "default",
        position,
        data: {
          label: elementData?.label || type,
          color: elementData?.color || "#ffffff"
        },
        style: {
          backgroundColor: elementData?.color || "#ffffff"
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, eventStormingElements]
  );

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();

      // Create a new node at the click position
      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: "default",
        position,
        data: {
          label: "Event",
          color: "#feae57"
        },
        style: {
          backgroundColor: "#feae57"
        },
      };

      // Create new edges
      const newEdges: Edge[] = [
        {
          id: `edge_${edge.source}_${newNode.id}`,
          source: edge.source,
          target: newNode.id,
        },
        {
          id: `edge_${newNode.id}_${edge.target}`,
          source: newNode.id,
          target: edge.target,
        },
      ];

      // Update nodes and edges
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.filter((e) => e.id !== edge.id).concat(newEdges));
    },
    [reactFlowInstance, setNodes, setEdges]
  );

  const onInit = useCallback((rfi: any) => {
    setReactFlowInstance(rfi);
  }, []);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-full h-[500px] relative">
      {/* Legend Panel */}
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-3 shadow-lg">
        <h3 className="text-sm font-semibold mb-2">Event Storming Elements</h3>
        <div className="space-y-1">
          {eventStormingElements.map((element) => (
            <div
              key={element.type}
              className="flex items-center gap-2 text-xs"
            >
              <div
                className="w-3 h-3 rounded border border-gray-400"
                style={{ backgroundColor: element.color }}
              />
              <span>{element.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Draggable Elements */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 shadow-lg">
          <h4 className="text-xs font-semibold mb-2">Drag to add:</h4>
          <div className="space-y-1">
            {eventStormingElements.map((element) => (
              <div
                key={element.type}
                className="flex items-center gap-2 cursor-move text-xs p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                draggable
                onDragStart={(event) => onDragStart(event, element.type)}
              >
                <div
                  className="w-3 h-3 rounded border border-gray-400 flex-shrink-0"
                  style={{ backgroundColor: element.color }}
                />
                <span>{element.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onEdgeContextMenu={onEdgeContextMenu}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
