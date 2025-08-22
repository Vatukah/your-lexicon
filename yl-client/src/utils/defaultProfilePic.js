function createDefaultLexiconAvatar(letter = "A", color = "#6366f1") {
  return `
  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="16" fill="${color}" />
    <text x="50%" y="50%" 
          dominant-baseline="middle" 
          text-anchor="middle" 
          font-size="48" 
          font-weight="700" 
          font-family="Inter, sans-serif" 
          fill="white">
      ${letter.toUpperCase()}
    </text>
  </svg>
  `;
}

export default createDefaultLexiconAvatar;