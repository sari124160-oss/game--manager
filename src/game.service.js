const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function joinGame(userId, gameId) {
  // 1. בדוק שהמשחק קיים
  const game = await prisma.game.findUnique({
    where: { id: gameId }
  });

  if (!game) {
    throw new Error('המשחק לא נמצא');
  }

  // 2. בדוק שהמשחק בסטטוס WAITING
  if (game.status === 'LIVE') {
    throw new Error('המשחק כבר התחיל');
  }

  if (game.status === 'FINISHED') {
    throw new Error('המשחק כבר הסתיים');
  }

  // 3. בדוק שהמשתמש לא רשום כבר
  const existing = await prisma.gameParticipant.findFirst({
    where: { userId, gameId }
  });

  if (existing) {
    throw new Error('המשתמש כבר רשום למשחק זה');
  }

  // 4. רשום את המשתמש למשחק
  const participant = await prisma.gameParticipant.create({
    data: {
      userId,
      gameId,
      role: 'PLAYER'
    }
  });

  return participant;
}

module.exports = { joinGame };