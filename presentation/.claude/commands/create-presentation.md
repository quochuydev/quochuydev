# Create Technical Presentation

Research and create a Slidev presentation on the given topic.

## Topic
$ARGUMENTS

## Instructions

1. **Research Phase**
   - Use WebSearch to research the topic thoroughly
   - Focus on: core concepts, best practices, common pitfalls, real-world examples
   - Gather technical details, statistics, and authoritative sources

2. **Structure the Presentation**
   Create a Slidev markdown file with this structure:
   - **Title slide**: Topic name, presenter context
   - **Agenda**: Overview of what will be covered (3-5 main points)
   - **Introduction**: Why this topic matters, problem statement
   - **Core concepts**: 2-4 slides explaining key concepts with visuals/diagrams
   - **Deep dive**: Technical details, how it works under the hood
   - **Demo section**: If applicable, include code examples or demo steps
   - **Best practices**: Do's and don'ts, common mistakes
   - **Summary**: Key takeaways
   - **Q&A**: Final slide

3. **Slidev Features to Use**
   - Use `---` to separate slides
   - Use frontmatter for slide configuration (layout, class, transition)
   - Include Mermaid diagrams where helpful (```` ```mermaid ````)
   - Use code blocks with syntax highlighting
   - Use slide layouts: `cover`, `two-cols`, `image-right`, `section`
   - Add speaker notes with `<!-- Notes: -->` comments

4. **Output**
   - Create the presentation file at: `./slides/[topic-slug].md`
   - Create demo files at: `./demo/[topic-slug]/` if needed
   - Use clear, concise bullet points (not paragraphs)
   - Include practical examples and code snippets
   - Add demo instructions if applicable

5. **Review**
   - After creating, summarize what was created
   - List the slides and their purposes
   - Suggest any demo setup needed

## Example Frontmatter
```yaml
---
theme: seriph
background: https://cover.sli.dev
title: [Topic Title]
info: |
  Technical presentation about [topic]
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---
```

Now research "$ARGUMENTS" and create a comprehensive technical presentation.
