"use client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import ReactFlowCanvas from "@/components/react-flow-canvas";

export default function Home() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  return (
    <div className="container mx-auto max-w-6xl px-4 py-2">
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                healthCheck.data ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-muted-foreground">
              {healthCheck.isLoading
                ? "Checking..."
                : healthCheck.data
                ? "Connected"
                : "Disconnected"}
            </span>
          </div>
        </section>
        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-medium">
            Event Storming Canvas with Metadata
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            <strong>Drag & Drop:</strong> Drag elements from the right panel to create nodes with metadata.
            <br />
            <strong>Click Nodes:</strong> Click any node to edit its properties (validation notes, data objects, tags, custom properties).
            <br />
            <strong>Right-click edges:</strong> Insert Event nodes between connected elements.
            <br />
            <strong>Expand Details:</strong> Click "Show Details" on any node to view its metadata inline.
            <br />
            <strong>Connect nodes:</strong> Drag from node handles to create relationships.
          </p>
          <ReactFlowCanvas />
        </section>
      </div>
    </div>
  );
}
