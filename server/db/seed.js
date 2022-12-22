const db = require("./db");
const { User, Question } = require("./index");
const questionArray = require("./DataStorage");

const seed = async () => {
  await db.sync({ force: true });
  try {
    // --------------USERS--------------

    console.log("adding users");

    const [shane, dean, olivia] = await Promise.all([
      User.create({
        username: "Shane",
        password: "123",
      }),
      User.create({
        username: "Dean",
        password: "123",
      }),
      User.create({
        username: "Olivia",
        password: "123",
      }),
    ]);

    // --------------QUESTIONS--------------
    console.log("adding questions");

    await Promise.all([
      questionArray.forEach(async (question) => {
        await Question.create({
          category: question.category,
          id: question.id,
          correctAnswer: question.correctAnswer,
          incorrectAnswers: question.incorrectAnswers,
          question: question.question,
          tags: question.tags,
          difficulty: question.difficulty,
        });
      }),
    ]);

    console.log("returning...");
    return {
      users: {
        shane,
        dean,
        olivia,
      },
    };
  } catch (err) {
    console.log("error");
    console.log(err);
  }
};

seed();
