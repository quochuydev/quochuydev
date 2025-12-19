import { IframeEmbed } from '@/components/iframe-embed'

export default function ColorBrainPage() {
  return (
    <div>
      <h1>Color Brain Game</h1>

      <p>A fun interactive color matching game built with web technologies.</p>

      <IframeEmbed
        src="https://quochuydev.github.io/color-brain/"
        title="Color Brain Game"
        height="700px"
      />

      <h2>About the Game</h2>

      <p>This is a color-based brain training game that challenges your memory and color recognition skills.</p>

      <h2>Technologies Used</h2>

      <ul>
        <li>HTML/CSS/JavaScript</li>
        <li>Deployed on GitHub Pages</li>
      </ul>

      <h2>How to Play</h2>

      <ol>
        <li>The game will present you with colors and patterns</li>
        <li>Match the colors correctly to score points</li>
        <li>Try to beat your high score!</li>
      </ol>

      <hr />

      <p><em>Want to see the source code? Visit the <a href="https://github.com/quochuydev/color-brain" target="_blank" rel="noopener noreferrer">GitHub repository</a></em></p>
    </div>
  )
}
