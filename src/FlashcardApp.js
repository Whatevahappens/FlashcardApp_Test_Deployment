import React, { useState } from 'react';

export default function FlashcardApp() {
  const [cards, setCards] = useState([
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { id: 2, question: "What is a component?", answer: "A reusable piece of UI that can have its own logic and appearance" },
    { id: 3, question: "What is JSX?", answer: "A syntax extension that allows writing HTML-like code in JavaScript" },
    { id: 4, question: "What are props?", answer: "Arguments passed into React components, similar to function parameters" },
    { id: 5, question: "What is state?", answer: "Data that changes over time and affects component rendering" }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddCard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newCard = {
        id: Math.max(...cards.map(c => c.id), 0) + 1,
        question: newQuestion,
        answer: newAnswer
      };
      setCards([...cards, newCard]);
      setNewQuestion('');
      setNewAnswer('');
      setShowAddForm(false);
    }
  };

  const handleDeleteCard = () => {
    if (cards.length > 1) {
      const newCards = cards.filter((_, index) => index !== currentIndex);
      setCards(newCards);
      if (currentIndex >= newCards.length) {
        setCurrentIndex(newCards.length - 1);
      }
      setIsFlipped(false);
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 Flashcard Study App</h1>
          <p className="text-gray-600">Click the card to flip and reveal the answer</p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Card {currentIndex + 1} of {cards.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <span className="text-lg">+</span>
              Add Card
            </button>
            {cards.length > 1 && (
              <button
                onClick={handleDeleteCard}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <span className="text-lg">🗑️</span>
              </button>
            )}
          </div>
        </div>

        {showAddForm && (
          <div className="mb-6 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Flashcard</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter your question"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Enter the answer"
                  rows="3"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddCard}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div 
          className="relative h-80 mb-8 cursor-pointer"
          onClick={handleFlip}
          style={{ perspective: '1000px' }}
        >
          <div 
            className="absolute w-full h-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            <div 
              className="absolute w-full h-full rounded-xl shadow-2xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 flex flex-col items-center justify-center text-white">
                <div className="text-sm uppercase tracking-wide mb-4 opacity-80">Question</div>
                <div className="text-2xl md:text-3xl font-semibold text-center">{currentCard.question}</div>
                <div className="mt-8 flex items-center gap-2 text-sm opacity-80">
                  <span>🔄</span>
                  Click to reveal answer
                </div>
              </div>
            </div>

            <div 
              className="absolute w-full h-full rounded-xl shadow-2xl"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="h-full bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-8 flex flex-col items-center justify-center text-white">
                <div className="text-sm uppercase tracking-wide mb-4 opacity-80">Answer</div>
                <div className="text-2xl md:text-3xl font-semibold text-center">{currentCard.answer}</div>
                <div className="mt-8 flex items-center gap-2 text-sm opacity-80">
                  <span>🔄</span>
                  Click to see question
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <span>←</span>
            Previous
          </button>

          <div className="flex gap-2">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentIndex === cards.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            Next
            <span>→</span>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Use the Previous/Next buttons to navigate through cards</p>
        </div>
      </div>
    </div>
  );
}