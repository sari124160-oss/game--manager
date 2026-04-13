const { PrismaClient } = require('../generated/prisma');
const { joinGame } = require('./game.service');

const prisma = new PrismaClient();

async function main() {
  // 1. התחבר למסד הנתונים
  await prisma.$connect();
  console.log('התחברנו למסד הנתונים');

  // 2. צור משתמש
  const user = await prisma.user.create({
    data: {
      name: 'סארי',
      email: 'sari@example.com'
    }
  });
  console.log('נוצר משתמש:', user.name);

  // 3. צור משחק בסטטוס WAITING
  const game = await prisma.game.create({
    data: {
      name: 'משחק ראשון',
      status: 'WAITING'
    }
  });
  console.log('נוצר משחק:', game.name);

  // 4. קרא לפונקציה joinGame
  try {
    await joinGame(user.id, game.id);
    console.log('Success: User joined game');
  } catch (error) {
    console.log('שגיאה:', error.message);
  }

  await prisma.$disconnect();
}

main();