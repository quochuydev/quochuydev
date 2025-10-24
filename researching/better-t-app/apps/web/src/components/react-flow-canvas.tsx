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

const initialNodes: Node[] = [
  {
    id: "1",
    type: "default",
    position: { x: 250, y: 25 },
    data: { label: "Node 1" },
  },
  {
    id: "2",
    type: "default",
    position: { x: 100, y: 125 },
    data: { label: "Node 2" },
  },
  {
    id: "3",
    type: "default",
    position: { x: 400, y: 125 },
    data: { label: "Node 3" },
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
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
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
        data: { label: "New Node" },
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
    <div className="w-full h-96 relative">
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 cursor-move text-sm"
          draggable
          onDragStart={(event) => onDragStart(event, "default")}
        >
          Drag to add node
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
