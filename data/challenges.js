const TOK_CHALLENGES = [
  {
    level: "Bronze", icon: "🥉", colour: "#b87333", enabled: true,
    instruction: "Explain one clear way the object connects to the selected prompt.",
    inspirations: [
      "Start with the object itself: what knowledge is being produced, shared, stored, challenged or represented? Then connect that directly to a key word in the prompt.",
      "Try the sentence stem: ‘This object is useful for exploring the prompt because…’ Then explain the knowledge issue rather than describing the object.",
      "Ask: what would be different about the knowledge if this object did not exist? That difference may reveal your connection to the prompt.",
      "Identify one person or group who uses this object. What do they claim to know because of it, and how does that relate to the prompt?"
    ]
  },
  {
    level: "Silver", icon: "🥈", colour: "#8893a2", enabled: true,
    instruction: "Explain the problem about knowledge that the object helps us investigate.",
    inspirations: [
      "Turn the connection into a tension: reliability versus usefulness, expertise versus accessibility, certainty versus uncertainty, or evidence versus interpretation.",
      "Ask what could go wrong when someone uses this object as a source of knowledge. The weakness may reveal the deeper knowledge problem.",
      "Look for a disagreement. Why might two informed people use the same object yet reach different conclusions?",
      "Consider whether the object helps us acquire knowledge, communicate it, justify it, or challenge it. Where does that process become difficult?"
    ]
  },
  {
    level: "Gold", icon: "🥇", colour: "#e2ad18", enabled: true,
    instruction: "Identify an assumption underlying your explanation and challenge it.",
    inspirations: [
      "Find something your argument quietly assumes is true. For example: experts are trustworthy, measurements are objective, photographs are evidence, or more information produces better knowledge.",
      "Try: ‘My argument only works if we accept that…’ Then ask whether that assumption is always justified.",
      "Imagine a sceptic interrupting your explanation with ‘Why should I accept that?’ What hidden assumption would you need to defend?",
      "Reverse one part of your reasoning. If the opposite were true, would the object still connect convincingly to the prompt?"
    ]
  },
  {
    level: "Platinum", icon: "💎", colour: "#16a6a1", enabled: true,
    instruction: "Develop a plausible alternative interpretation of the object.",
    inspirations: [
      "Change the knower: how might an expert, a member of the public and someone personally affected by the object understand it differently?",
      "Change the context. Would the meaning or knowledge value of this object shift in another culture, time period or institution?",
      "If your first interpretation treats the object as reliable evidence, deliberately construct the strongest case for treating it as limited or misleading.",
      "Look through another TOK lens: authority, values, language, technology, evidence, perspective or certainty. Does that produce a different reading?"
    ]
  },
  {
    level: "Nightmare", icon: "🔥", colour: "#be3a55", enabled: true,
    instruction: "Explain why two competing interpretations could both be reasonable without saying that everyone has different opinions.",
    inspirations: [
      "Give each interpretation a different but defensible criterion for judging knowledge, such as accuracy, usefulness, explanatory power, ethical consequences or reliability.",
      "Ask what evidence would make interpretation A reasonable, then what different evidence or purpose could make interpretation B reasonable.",
      "Avoid ‘it depends on opinion’. Instead identify the assumptions, methods, values or purposes that make each position rational.",
      "Try to define the boundary: under what conditions is interpretation A stronger, and under what conditions does interpretation B become stronger?"
    ]
  }
];
