import { createChromaService } from "../memory/chroma";

async function cleanChroma() {
  try {
    const chromaService = createChromaService(process.env.CHROMA_API_KEY);
    await chromaService.deleteDocs();
    console.log("✅ Chroma cleaned successfully.");
  } catch (error) {
    console.error("❌ Error cleaning Chroma:", error);
  }
}

cleanChroma();
