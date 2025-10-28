import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');

  // Limpiar base de datos
  await prisma.interaction.deleteMany();
  await prisma.questionAudio.deleteMany();
  await prisma.questionOpen.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.extraMaterial.deleteMany();
  await prisma.playRelation.deleteMany();
  await prisma.cardsMemory.deleteMany();
  await prisma.flashcard.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();
  await prisma.course.deleteMany();
  await prisma.classroom.deleteMany();

  console.log('✅ Base de datos limpiada');

  // Hash de contraseñas
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Crear usuarios
  const teacherUser = await prisma.user.create({
    data: {
      full_name: 'María García',
      email: 'maria.garcia@eduplay.com',
      password: hashedPassword,
      role: 'TEACHER',
    },
  });

  const studentUser1 = await prisma.user.create({
    data: {
      full_name: 'José Rodríguez',
      email: 'jose.rodriguez@eduplay.com',
      password: hashedPassword,
      role: 'STUDENT',
    },
  });

  const studentUser2 = await prisma.user.create({
    data: {
      full_name: 'Ana Martínez',
      email: 'ana.martinez@eduplay.com',
      password: hashedPassword,
      role: 'STUDENT',
    },
  });

  console.log('✅ Usuarios creados');

  // Crear aula
  const classroom = await prisma.classroom.create({
    data: {
      name: '5to Grado A',
    },
  });

  console.log('✅ Aula creada');

  // Crear estudiantes
  const student1 = await prisma.student.create({
    data: {
      nickname: 'Pepe',
      age: 10,
      grade: 5,
      user_id: studentUser1.id,
      classroom_id: classroom.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      nickname: 'Anita',
      age: 11,
      grade: 5,
      user_id: studentUser2.id,
      classroom_id: classroom.id,
    },
  });

  console.log('✅ Estudiantes creados');

  // Crear docente
  const teacher = await prisma.teacher.create({
    data: {
      specialty: 'Historia y Ciencias Sociales',
      assignedGrade: 5,
      user_id: teacherUser.id,
    },
  });

  console.log('✅ Docente creado');

  // Crear cursos
  const courses = await Promise.all([
    prisma.course.create({
      data: { name: 'Historia del Perú' },
    }),
    prisma.course.create({
      data: { name: 'Matemáticas' },
    }),
    prisma.course.create({
      data: { name: 'Comunicación' },
    }),
    prisma.course.create({
      data: { name: 'Ciencias Naturales' },
    }),
  ]);

  console.log('✅ Cursos creados');

  // Crear enrollment
  const enrollment = await prisma.enrollment.create({
    data: {
      teacher_id: teacher.id,
      classroom_id: classroom.id,
      course_id: courses[0].id, // Historia del Perú
    },
  });

  console.log('✅ Enrollment creado');

  // Crear actividad de ejemplo
  const activity = await prisma.activity.create({
    data: {
      title: 'La Colonia en Perú (1532-1821)',
      description:
        'Sesión sobre el período colonial en Perú, desde la conquista hasta la independencia. Exploraremos el sistema de gobierno virreinal, las encomiendas, y la vida cotidiana durante la colonia.',
      hasIntroduction: true,
      enrollment_id: enrollment.id,
      start_time: new Date('2025-10-28T09:00:00'),
      end_time: new Date('2025-10-28T11:00:00'),
    },
  });

  console.log('✅ Actividad creada');

  // Crear flashcards de ejemplo
  await Promise.all([
    prisma.flashcard.create({
      data: {
        question: '¿En qué año llegó Francisco Pizarro al Perú?',
        answer: '1532',
        activity_id: activity.id,
      },
    }),
    prisma.flashcard.create({
      data: {
        question: '¿Cuál fue la capital del Virreinato del Perú?',
        answer: 'Lima',
        activity_id: activity.id,
      },
    }),
    prisma.flashcard.create({
      data: {
        question: '¿Qué era una encomienda?',
        answer:
          'Sistema colonial donde se otorgaba a los conquistadores el control sobre indígenas para que trabajaran a cambio de protección y evangelización',
        activity_id: activity.id,
      },
    }),
  ]);

  console.log('✅ Flashcards creadas');

  // Crear cartas de memoria
  await Promise.all([
    prisma.cardsMemory.create({
      data: {
        card1: 'Virreinato',
        card2: 'Gobierno colonial español',
        isMatched: true,
        activity_id: activity.id,
      },
    }),
    prisma.cardsMemory.create({
      data: {
        card1: 'Encomienda',
        card2: 'Sistema de trabajo forzado',
        isMatched: true,
        activity_id: activity.id,
      },
    }),
  ]);

  console.log('✅ Cartas de memoria creadas');

  // Crear relaciones para el juego
  await Promise.all([
    prisma.playRelation.create({
      data: {
        item1: '1532',
        item2: 'Conquista del Perú',
        isRelated: true,
        activity_id: activity.id,
      },
    }),
    prisma.playRelation.create({
      data: {
        item1: '1821',
        item2: 'Independencia del Perú',
        isRelated: true,
        activity_id: activity.id,
      },
    }),
    prisma.playRelation.create({
      data: {
        item1: '1532',
        item2: 'Independencia del Perú',
        isRelated: false,
        activity_id: activity.id,
      },
    }),
  ]);

  console.log('✅ Relaciones de juego creadas');

  // Crear interacciones de ejemplo
  await Promise.all([
    prisma.interaction.create({
      data: {
        emotion: 'POSITIVO',
        grade: 85,
        engagement: 0.9,
        student_id: student1.id,
        activity_id: activity.id,
      },
    }),
    prisma.interaction.create({
      data: {
        emotion: 'NEUTRAL',
        grade: 70,
        engagement: 0.6,
        student_id: student2.id,
        activity_id: activity.id,
      },
    }),
  ]);

  console.log('✅ Interacciones creadas');

  console.log('\n🎉 Seed completado exitosamente!');
  console.log('\n📋 Credenciales de prueba:');
  console.log('   Docente:');
  console.log('   - Email: maria.garcia@eduplay.com');
  console.log('   - Password: password123');
  console.log('\n   Estudiante 1:');
  console.log('   - Email: jose.rodriguez@eduplay.com');
  console.log('   - Password: password123');
  console.log('\n   Estudiante 2:');
  console.log('   - Email: ana.martinez@eduplay.com');
  console.log('   - Password: password123');
  console.log('\n🔗 Swagger UI: http://localhost:3000/api/docs');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
