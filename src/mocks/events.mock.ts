import { Event } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Adobe Illustrator Zero',
    description: 'Kandungan kursus ini adalah rakaman sesi bengkel online (Live) — lengkap dengan slaid dan bahan rujukan. Peserta didedahkan kepada asas penggunaan Adobe Illustrator dari tahap Zero ke Hero!',
    imageUrl: 'https://lwfiles.mycourse.app/62f7d16041ca3b07512e1572-public/6b052bad1989224c9843e59bdc479139.png',
    location: 'SIFOODOTCOM HQ, Sungai Besi', 
    price: 50,
    capacity: 30,
    bookedSeats: 10,
    startTime: '2025-02-01T09:00:00Z',
    endTime: '2025-02-01T12:00:00Z',
    instructor: 'Encik Imran',
    category: 'Online-Live',
    requirements: [
      {
        id: 'req-1',
        description: 'Laptop yang dipasang Adobe Illustrator',
        type: 'required'
      },
      {
        id: 'req-2',
        description: 'Pastikan sambungan Internet stabil jika sertai secara online',
        type: 'recommended'
      }
    ],
    activities: [
      {
        id: 'act-1',
        title: 'Pengenalan Adobe Illustrator',
        description: 'Mengenali antaramuka, bar menu, dan panel asas dalam Illustrator',
        day: '2025-02-01',
        startTime: '09:00',
        endTime: '10:00'
      },
      {
        id: 'act-2',
        title: 'Eksplorasi Tools Penting',
        description: 'Belajar menggunakan Selection Tool, Pen Tool, Shape Tools, dan Layers',
        day: '2025-02-01',
        startTime: '10:00',
        endTime: '11:30'
      },
      {
        id: 'act-3',
        title: 'Projek Mini & Sesi Q&A',
        description: 'Membuat rekaan vektor ringkas dan ruang soal jawab dengan tenaga pengajar',
        day: '2025-02-01',
        startTime: '11:30',
        endTime: '12:00'
      }
    ]
  },
  {
    id: '2',
    title: 'Adobe InDesign Reka Penerbitan Buku Digital',
    description: 'Hasilkan rekaan layout buku dan majalah digital menggunakan Adobe InDesign. Peserta akan mempelajari asas penetapan dokumen, pengurusan teks dan imej, serta tips penerbitan digital yang berkesan.',
    imageUrl: 'https://lwfiles.mycourse.app/62f7d16041ca3b07512e1572-public/537dc064f1e283534c0a296ced520bae.png',
    location: 'SIFOODOTCOM HQ, Sungai Besi',
    price: 80,
    capacity: 25,
    bookedSeats: 15,
    startTime: '2025-02-05T09:00:00Z',
    endTime: '2025-02-07T13:00:00Z',
    instructor: 'Encik Imran',
    category: 'Face-2-Face',
    requirements: [
      {
        id: 'req-3',
        description: 'Laptop dengan Adobe InDesign terpasang',
        type: 'required'
      },
      {
        id: 'req-4',
        description: 'Mempunyai asas reka letak atau pengalaman dengan perisian reka bentuk (disyorkan)',
        type: 'recommended'
      }
    ],
    activities: [
      {
        id: 'act-4',
        title: 'Pengenalan Adobe InDesign',
        description: 'Mengenali paparan kerja, tools, serta tetapan dokumen',
        day: '2025-02-05',
        startTime: '09:00',
        endTime: '10:00'
      },
      {
        id: 'act-5',
        title: 'Mengurus Teks & Imej',
        description: 'Mempelajari cara mengimport teks dan imej serta menyusun layout',
        day: '2025-02-06',
        startTime: '09:00',
        endTime: '11:00'
      },
      {
        id: 'act-6',
        title: 'Penerbitan Digital',
        description: 'Menyimpan fail dalam format digital (PDF interaktif, ePUB) dan sesi soal jawab',
        day: '2025-02-07',
        startTime: '09:00',
        endTime: '13:00'
      }
    ]
  },
  {
    id: '3',
    title: 'Bengkel Online - Adobe Photoshop Zero',
    description: 'Pengajaran praktikal asas Adobe Photoshop untuk menghasilkan reka bentuk poster atau grafik mudah. Peserta didedahkan kepada tools asas, lapisan (layers), dan tips rekaan yang menarik.',
    imageUrl: 'https://lwfiles.mycourse.app/62f7d16041ca3b07512e1572-public/a76748d4c578f762956dd4457d7ad727.jpeg',
    location: 'SIFOODOTCOM HQ, Sungai Besi',
    price: 100,
    capacity: 20,
    bookedSeats: 8,
    startTime: '2025-02-10T08:00:00Z',
    endTime: '2025-02-12T11:00:00Z',
    instructor: 'Encik Imran',
    category: 'Online-Live',
    requirements: [
      {
        id: 'req-5',
        description: 'Laptop/komputer dengan Adobe Photoshop',
        type: 'required'
      },
      {
        id: 'req-6',
        description: 'Internet stabil, kamera dan mikrofon (untuk bengkel online)',
        type: 'recommended'
      }
    ],
    activities: [
      {
        id: 'act-7',
        title: 'Pengenalan Photoshop & Tools Asas',
        description: 'Mengenali antaramuka, move tool, marquee tool, brush tool, dan lain-lain',
        day: '2025-02-10',
        startTime: '08:00',
        endTime: '11:00'
      },
      {
        id: 'act-8',
        title: 'Pengurusan Layers & Masking',
        description: 'Penggunaan layers, layer mask, dan asas penyuntingan imej',
        day: '2025-02-11',
        startTime: '08:00',
        endTime: '11:00'
      },
      {
        id: 'act-9',
        title: 'Rekaan Poster Ringkas',
        description: 'Projek mini membina poster mudah diikuti sesi soal jawab',
        day: '2025-02-12',
        startTime: '08:00',
        endTime: '11:00'
      }
    ]
  },

  // New Mock Data Below
  {
    id: '4',
    title: 'Kelas Videografi Asas - Adobe Premiere Pro',
    description: 'Pelajari asas penyuntingan video menggunakan Adobe Premiere Pro. Sesuai untuk anda yang ingin memulakan langkah pertama dalam videografi, suntingan asas, serta pembikinan kandungan video pendek.',
    imageUrl: 'https://lwfiles.mycourse.app/62f7d16041ca3b07512e1572-public/1bb80e3bc45b4001a96946a560a8d3f0.png',
    location: 'SIFOODOTCOM HQ, Sungai Besi',
    price: 120,
    capacity: 20,
    bookedSeats: 5,
    startTime: '2025-03-01T09:00:00Z',
    endTime: '2025-03-01T17:00:00Z',
    instructor: 'Puan Nadia',
    category: 'Face-2-Face',
    requirements: [
      {
        id: 'req-7',
        description: 'Laptop dengan Adobe Premiere Pro',
        type: 'required'
      },
      {
        id: 'req-8',
        description: 'Fail video pendek (untuk latihan praktikal)',
        type: 'recommended'
      }
    ],
    activities: [
      {
        id: 'act-10',
        title: 'Kenali Antaramuka & Tools Premiere Pro',
        description: 'Pengenalan kepada paparan kerja, timeline, dan pengurusan fail media',
        day: '2025-03-01',
        startTime: '09:00',
        endTime: '10:30'
      },
      {
        id: 'act-11',
        title: 'Penyuntingan Asas',
        description: 'Belajar memotong (trim), susun klip, dan menambah teks ringkas',
        day: '2025-03-01',
        startTime: '10:30',
        endTime: '12:30'
      },
      {
        id: 'act-12',
        title: 'Mencantikkan Video',
        description: 'Menambah transisi, efek audio, dan color correction ringkas',
        day: '2025-03-01',
        startTime: '14:00',
        endTime: '15:30'
      },
      {
        id: 'act-13',
        title: 'Eksport & Pembentangan',
        description: 'Cara eksport fail dan perkongsian hasil akhir kepada peserta lain',
        day: '2025-03-01',
        startTime: '15:30',
        endTime: '17:00'
      }
    ]
  },
  {
    id: '5',
    title: 'Asas Animasi 2D dengan Adobe Animate',
    description: 'Kelas ini memfokuskan kepada asas pembikinan animasi 2D menggunakan Adobe Animate. Peserta akan mempelajari konsep keyframes, timeline, dan asas lukisan vektor untuk menghasilkan animasi ringkas.',
    imageUrl: 'https://lwfiles.mycourse.app/62f7d16041ca3b07512e1572-public/e764d3b4349ebf776f7075aa8563fe2b.jpeg',
    location: 'Online (Zoom Meeting)',
    price: 90,
    capacity: 25,
    bookedSeats: 12,
    startTime: '2025-03-10T08:00:00Z',
    endTime: '2025-03-10T11:00:00Z',
    instructor: 'Encik Ali',
    category: 'Online-Live',
    requirements: [
      {
        id: 'req-9',
        description: 'Komputer/laptop dengan Adobe Animate',
        type: 'required'
      },
      {
        id: 'req-10',
        description: 'Internet stabil, kamera & mikrofon untuk sesi interaktif',
        type: 'recommended'
      }
    ],
    activities: [
      {
        id: 'act-14',
        title: 'Pengenalan Adobe Animate & Lukisan Vektor',
        description: 'Memahami antaramuka dan asas penggunaan pen tool untuk lukisan 2D',
        day: '2025-03-10',
        startTime: '08:00',
        endTime: '09:00'
      },
      {
        id: 'act-15',
        title: 'Menghasilkan Animasi Pertama',
        description: 'Penggunaan timeline, keyframes, dan tween untuk animasi asas',
        day: '2025-03-10',
        startTime: '09:00',
        endTime: '10:30'
      },
      {
        id: 'act-16',
        title: 'Eksport & Kongsikan Animasi',
        description: 'Menyimpan fail animasi dalam format HTML5 dan sesi soal jawab',
        day: '2025-03-10',
        startTime: '10:30',
        endTime: '11:00'
      }
    ]
  },
  {
    id: '6',
    title: 'Kursus Penghasilan Infografik dengan Canva',
    description: 'Belajar menghasilkan infografik profesional dan menarik tanpa perlu kemahiran reka bentuk yang rumit. Peserta akan diajar cara memanfaatkan susun atur siap pakai, pemilihan warna, tipografi, dan elemen-elemen grafik dalam Canva.',
    imageUrl: 'https://lwfiles.mycourse.app/62f7d16041ca3b07512e1572-public/120bbf4ac9b9511b362681a87e696360.png',
    location: 'Online (Google Meet)',
    price: 45,
    capacity: 40,
    bookedSeats: 28,
    startTime: '2025-03-15T09:00:00Z',
    endTime: '2025-03-15T11:00:00Z',
    instructor: 'Puan Suraya',
    category: 'Online-Live',
    requirements: [
      {
        id: 'req-11',
        description: 'Mempunyai akaun Canva (percuma atau Pro)',
        type: 'required'
      },
      {
        id: 'req-12',
        description: 'Internet stabil dan kemahiran asas komputer',
        type: 'recommended'
      }
    ],
    activities: [
      {
        id: 'act-17',
        title: 'Pengenalan Canva & Susun Atur',
        description: 'Kenali paparan Canva, susun atur siap pakai, dan mengurus elemen grafik',
        day: '2025-03-15',
        startTime: '09:00',
        endTime: '09:30'
      },
      {
        id: 'act-18',
        title: 'Penghasilan Infografik',
        description: 'Menyusun maklumat dalam bentuk visual menarik menggunakan template',
        day: '2025-03-15',
        startTime: '09:30',
        endTime: '10:30'
      },
      {
        id: 'act-19',
        title: 'Perkongsian & Tips Lanjutan',
        description: 'Cara untuk memuat turun, kongsikan infografik, dan tips improvisasi rekaan',
        day: '2025-03-15',
        startTime: '10:30',
        endTime: '11:00'
      }
    ]
  }
];
