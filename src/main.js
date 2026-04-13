const { PrismaClient } = require('@prisma/client');
const { joinGame } = require('./game.service');

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log('התחברנו למסד הנתונים');

  // מחיקת נתונים ישנים
  await prisma.gameParticipant.deleteMany();
  await prisma.game.deleteMany();
  await prisma.user.deleteMany();

  // צור משתמש
  const user = await prisma.user.create({
    data: {
      name: 'sari',
      email: 'sari@example.com'
    }
  });
  console.log('נוצר משתמש:', user.name);

  // צור משחק
  const game = await prisma.game.create({
    data: {
      name: 'משחק ראשון',
      status: 'WAITING'
    }
  });
  console.log('נוצר משחק:', game.name);

  // הצטרף למשחק
  try {
    await joinGame(user.id, game.id);
    console.log('Success: User joined game');
  } catch (error) {
    console.log('שגיאה:', error.message);
  }

  await prisma.$disconnect();
}

main();