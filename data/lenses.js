// Object concepts refer to these lens ids.
const TOK_LENSES = [
  { id: "evidence", name: "Evidence", icon: "🔍", question: "What knowledge could this object be used as evidence for?", followUp: "What assumptions must be accepted before it counts as convincing evidence?", enabled: true },
  { id: "perspective", name: "Perspective", icon: "👁", question: "Who might interpret the knowledge connected to this object differently?", followUp: "What explains the difference without reducing it to personal opinion?", enabled: true },
  { id: "values", name: "Values", icon: "⚖️", question: "Which values influenced the production, selection or use of this object?", followUp: "Could those values strengthen the knowledge rather than simply bias it?", enabled: true },
  { id: "authority", name: "Authority", icon: "🏛️", question: "Who is treated as an authority in relation to this object?", followUp: "What justifies that authority, and when should it be challenged?", enabled: true },
  { id: "certainty", name: "Certainty", icon: "🎯", question: "How certain can we reasonably be about the knowledge connected to this object?", followUp: "What level of uncertainty would make the knowledge unusable?", enabled: true },
  { id: "culture", name: "Culture", icon: "🌍", question: "How might cultural context change the meaning or status of this object?", followUp: "Is any interpretation independent of culture?", enabled: true },
  { id: "language", name: "Language", icon: "🗣️", question: "How does language shape the knowledge communicated through this object?", followUp: "What is lost, gained or distorted by the chosen wording or representation?", enabled: true },
  { id: "interpretation", name: "Interpretation", icon: "🧠", question: "Where does interpretation enter into the production or use of this object?", followUp: "Could two conflicting interpretations both be well justified?", enabled: true },
  { id: "technology", name: "Technology", icon: "💻", question: "How does technology enable or restrict the knowledge associated with this object?", followUp: "Does the tool merely transmit knowledge, or does it shape what can be known?", enabled: true },
  { id: "responsibility", name: "Responsibility", icon: "🧭", question: "Who is responsible for consequences arising from the knowledge connected to this object?", followUp: "Does possessing knowledge create an obligation to act?", enabled: true },
  { id: "change", name: "Change", icon: "⏳", question: "How has the knowledge represented by this object changed over time?", followUp: "Does change make the knowledge less trustworthy or demonstrate its strength?", enabled: true },
  { id: "limitations", name: "Limitations", icon: "🚧", question: "What can this object not tell us?", followUp: "Are those limitations accidental, or are they unavoidable for this kind of knowledge?", enabled: true },
  { id: "models", name: "Models", icon: "🧩", question: "What has been simplified or omitted in this representation?", followUp: "When does a useful simplification become misleading?", enabled: true }
];
