export interface FlashcardData {
  question: string;
  answer: string;
}

export interface CardsMemoryData {
  card1: string;
  card2: string;
}

export interface PlayRelationData {
  item1: string;
  item2: string;
}

export interface QuestionData {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

export interface QuestionOpenData {
  question: string;
  answer: string;
}

export interface QuizData {
  questions: QuestionData[];
  questionsOpen?: QuestionOpenData[];
}

export interface AIGeneratedData {
  flashcards?: FlashcardData[];
  cardsMemory?: CardsMemoryData[];
  playRelations?: PlayRelationData[];
  quiz?: QuizData;
}

export interface ActivityWithEnrollment {
  id: string;
  title: string;
  description: string;
  enrollment: {
    course: {
      name: string;
    };
  };
}
