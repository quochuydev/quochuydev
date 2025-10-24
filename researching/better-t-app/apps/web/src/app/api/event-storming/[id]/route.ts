import { NextRequest, NextResponse } from "next/server";
import * as yaml from "js-yaml";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Read the Event Storming YAML file
    const yamlPath = path.join(process.cwd(), "public", "event-storming.yaml");

    if (!fs.existsSync(yamlPath)) {
      return NextResponse.json(
        { error: "Event storming YAML file not found" },
        { status: 404 }
      );
    }

    const yamlContent = fs.readFileSync(yamlPath, "utf8");
    const eventData = yaml.load(yamlContent) as any;

    // Return raw Event Storming data
    return NextResponse.json(eventData);
  } catch (error) {
    console.error("Error reading event storming YAML:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await request.json();

    // In a real implementation, you would save this to a database
    // For now, we'll just return the data as confirmation
    return NextResponse.json({
      message: `Event storming data '${id}' saved successfully`,
      data: body,
    });
  } catch (error) {
    console.error("Error saving event storming data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
