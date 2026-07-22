export const QUESTIONS = [
  {
    id: 1,
    question:
      "Do you use tobacco, vape, consume alcohol, or use recreational drugs?",
    type: "radio",
  },
  {
    id: 2,
    question: "How many hours of sleep do you get per night?",
    type: "input",
  },
  { id: 3, question: "Do you have anyother allergies?", type: "input" },
  {
    id: 4,
    question: "How are you feeling emotionally/mentally?",
    type: "input",
  },
  {
    id: 5,
    question: "What is the reason for todays visit?",
    type: "input",
  },
];

export const RADIO_ANSWERS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const healthQuestionFormData = {
  questions: [
    {
      type: "radio",
      questionId: 1,
      answerId: "no",
    },
    {
      type: "input",
      questionId: 2,
      answerId: "8 hours of sleep",
    },
    {
      type: "input",
      questionId: 3,
      answerId: "None known so far",
    },
    {
      type: "input",
      questionId: 4,
      answerId: "good mostly",
    },
    {
      type: "input",
      questionId: 5,
      answerId: "Wellness checkup",
    },
  ],
  selfRating: 8,
  healthChoices: ["Regular exercise (3+ times per week)"],
};
