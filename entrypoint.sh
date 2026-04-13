#!/bin/sh

echo "מחכה למסד הנתונים..."

until npx prisma migrate deploy; do
  echo "מסד הנתונים לא מוכן עדיין – מנסה שוב בעוד 2 שניות..."
  sleep 2
done

echo "המיגרציות רצו בהצלחה!"

node src/main.js