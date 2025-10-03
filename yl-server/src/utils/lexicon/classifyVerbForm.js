const irregularVerbs = [
  { base: "be", past: "was/were", pastParticiple: "been" },
  { base: "begin", past: "began", pastParticiple: "begun" },
  { base: "break", past: "broke", pastParticiple: "broken" },
  { base: "bring", past: "brought", pastParticiple: "brought" },
  { base: "build", past: "built", pastParticiple: "built" },
  { base: "buy", past: "bought", pastParticiple: "bought" },
  { base: "choose", past: "chose", pastParticiple: "chosen" },
  { base: "come", past: "came", pastParticiple: "come" },
  { base: "do", past: "did", pastParticiple: "done" },
  { base: "drink", past: "drank", pastParticiple: "drunk" },
  { base: "drive", past: "drove", pastParticiple: "driven" },
  { base: "eat", past: "ate", pastParticiple: "eaten" },
  { base: "fall", past: "fell", pastParticiple: "fallen" },
  { base: "find", past: "found", pastParticiple: "found" },
  { base: "fly", past: "flew", pastParticiple: "flown" },
  { base: "forget", past: "forgot", pastParticiple: "forgotten" },
  { base: "get", past: "got", pastParticiple: "got/gotten" },
  { base: "give", past: "gave", pastParticiple: "given" },
  { base: "go", past: "went", pastParticiple: "gone" },
  { base: "grow", past: "grew", pastParticiple: "grown" },
  { base: "have", past: "had", pastParticiple: "had" },
  { base: "hear", past: "heard", pastParticiple: "heard" },
  { base: "keep", past: "kept", pastParticiple: "kept" },
  { base: "know", past: "knew", pastParticiple: "known" },
  { base: "leave", past: "left", pastParticiple: "left" },
  { base: "lose", past: "lost", pastParticiple: "lost" },
  { base: "make", past: "made", pastParticiple: "made" },
  { base: "read", past: "read", pastParticiple: "read" },
  { base: "run", past: "ran", pastParticiple: "run" },
  { base: "say", past: "said", pastParticiple: "said" },
  { base: "see", past: "saw", pastParticiple: "seen" },
  { base: "sing", past: "sang", pastParticiple: "sung" },
  { base: "speak", past: "spoke", pastParticiple: "spoken" },
  { base: "swim", past: "swam", pastParticiple: "swum" },
  { base: "take", past: "took", pastParticiple: "taken" },
  { base: "teach", past: "taught", pastParticiple: "taught" },
  { base: "tell", past: "told", pastParticiple: "told" },
  { base: "think", past: "thought", pastParticiple: "thought" },
  { base: "write", past: "wrote", pastParticiple: "written" }
];



function classifyVerbForm(word) {
  // Check irregular verbs first
  const irregular = irregularVerbs.find(v => 
    v.pastParticiple.split("/").includes(word) || v.past === word
  );
  if (irregular) {
    if (irregular.pastParticiple.split("/").includes(word)) {
      return "Verb (Past Participle, irregular)";
    }
    if (irregular.past === word) {
      return "Verb (Past Tense, irregular)";
    }
  }

  // Regular rules
  if (word.endsWith("ing")) return "Verb (Gerund / Present Participle)";
  if (word.endsWith("ed")) return "Verb (Past Tense / Past Participle)";
  if (word.endsWith("en") || word.endsWith("t")) return "Verb (Past Participle Candidate)";

  return "Verb (Base or Other Form)";
}

