const lessonHours = [
  '1. Ders 09.10',
  '2. Ders 10.05',
  '3. Ders 10.55',
  '4. Ders 11.45',
  'Öğle Arası 12.25-13.35',
  '5. Ders 13.35',
  '6. Ders 14.25',
  '7. Ders 15.20',
  '8. Ders 16.10'
];

const scheduleData = [
  {
    day: 'Pazartesi',
    lessons: [
      { name: 'İngilizce', outcome: '' },
      { name: '', outcome: '' },
      { name: 'Hayat Bilgisi', outcome: '' },
      { name: '', outcome: '' },
      { break: true },
      { name: 'Kültür Sanat', outcome: '' },
      { name: '', outcome: '' },
      { name: 'Türkçe', outcome: '' },
      { name: 'İngilizce', outcome: '' }
    ]
  },
  {
    day: 'Salı',
    lessons: [
      { name: 'Kodlama', outcome: '' },
      { name: 'Görsel Sanatlar', outcome: '' },
      { name: 'İngilizce', outcome: '' },
      { name: '', outcome: '' },
      { break: true },
      { name: 'Spor', outcome: '' },
      { name: '', outcome: '' },
      { name: 'Matematik', outcome: '' },
      { name: 'CNNCT', outcome: '' }
    ]
  },
  {
    day: 'Çarşamba',
    lessons: [
      { name: 'Matematik', outcome: '' },
      { name: 'İngilizce', outcome: '' },
      { name: 'Hayat Bilgisi', outcome: '' },
      { name: '', outcome: '' },
      { break: true },
      { name: 'Matematik', outcome: '' },
      { name: 'Türkçe', outcome: '' },
      { name: 'İngilizce', outcome: '' },
      { name: '', outcome: '' }
    ]
  },
  {
    day: 'Perşembe',
    lessons: [
      { name: 'İngilizce', outcome: '' },
      { name: '', outcome: '' },
      { name: 'Beden Eğitimi', outcome: '' },
      { name: '', outcome: '' },
      { break: true },
      { name: 'Matematik', outcome: '' },
      { name: '', outcome: '' },
      { name: 'İngilizce', outcome: '' },
      { name: 'CNNCT', outcome: '' }
    ]
  },
  {
    day: 'Cuma',
    lessons: [
      { name: 'Türkçe', outcome: '' },
      { name: '', outcome: '' },
      { name: 'İngilizce', outcome: '' },
      { name: '', outcome: '' },
      { break: true },
      { name: 'İngilizce', outcome: '' },
      { name: 'Türkçe', outcome: '' },
      { name: 'Müzik', outcome: '' },
      { name: 'Türkçe', outcome: '' }
    ]
  }
];

const homeworkData = [
  ['Pazartesi', ''],
  ['Salı', ''],
  ['Çarşamba', ''],
  ['Perşembe', ''],
  ['Cuma', '']
];



const dateRanges = [
  '14-20 Eylül',
  '21-27 Eylül',
  '28 Eylül-4 Ekim',
  '5-11 Ekim',
  '12-18 Ekim',
  '19-25 Ekim',
  '26 Ekim-1 Kasım',
  '2-8 Kasım',
  '9-15 Kasım',
  '16-22 Kasım',
  '23-29 Kasım',
  '30 Kasım-6 Aralık',
  '7-13 Aralık',
  '14-20 Aralık',
  '21-27 Aralık',
  '28 Aralık-3 Ocak',
  '4-10 Ocak',
  '11-17 Ocak',
  '18-24 Ocak',
  '25-31 Ocak',
  '1-7 Şubat',
  '8-14 Şubat',
  '15-21 Şubat',
  '22-28 Şubat',
  '1-7 Mart',
  '8-14 Mart',
  '15-21 Mart',
  '22-28 Mart',
  '29 Mart-4 Nisan',
  '5-11 Nisan',
  '12-18 Nisan',
  '19-25 Nisan',
  '26 Nisan-2 Mayıs',
  '3-9 Mayıs',
  '10-16 Mayıs',
  '17-23 Mayıs',
  '24-30 Mayıs',
  '31 Mayıs-6 Haziran',
  '7-13 Haziran',
  '14-20 Haziran',
  '21-27 Haziran'
];

const outcomesDatabase = {
  'Türkçe': [
    { code: 'T.2.1.1', topic: 'Dinleme/İzleme', text: 'Dinlediklerinde/izlediklerinde geçen olayların gelişimi ve sonucu hakkında tahminde bulunur.' },
    { code: 'T.2.2.3', topic: 'Konuşma', text: 'Hazırlıksız konuşmalar yapar.' },
    { code: 'T.2.3.5', topic: 'Okuma', text: 'Okuduğu metnin konusunu belirler.' },
    { code: 'T.2.3.8', topic: 'Okuma', text: 'Okuduğu metinle ilgili soruları cevaplar.' },
    { code: 'T.2.4.4', topic: 'Yazma', text: 'Kısa metinler yazar.' },
    { code: 'T.2.4.7', topic: 'Yazma', text: 'Yazdıklarında noktalama işaretlerini uygun yerlerde kullanır.' }
  ],
  'Matematik': [
    { code: 'M.2.4.1.1', topic: 'Veri Toplama', text: 'Veri toplar, çetele ve sıklık tablosu oluşturur.' },
    { code: 'M.2.4.1.2', topic: 'Grafikler', text: 'Nesne ve şekil grafiği oluşturur.' },
    { code: 'M.2.4.1.3', topic: 'Veri Yorumlama', text: 'Grafik ve tablolardan elde ettiği bilgileri yorumlar.' },
    { code: 'M.2.4.1.4', topic: 'Karar Verme', text: 'Kategorik veriye dayalı en çok iki veri grubu ile çalışır ve veriye dayalı karar verir.' }
  ],
  'Hayat Bilgisi': [
    { code: 'HB.2.5.1', topic: 'Ülkemizde Hayat', text: 'Yakın çevresindeki kültürel miras ögelerini fark eder.' },
    { code: 'HB.2.5.2', topic: 'Sanat ve Kültür', text: 'Sanatın günlük yaşamdaki yerini belirler.' },
    { code: 'HB.2.5.3', topic: 'Değerler', text: 'Milli ve dini bayramların önemini açıklar.' },
    { code: 'HB.2.6.1', topic: 'Doğada Hayat', text: 'Doğal unsurların insan yaşamına etkisini açıklar.' }
  ],
  'İngilizce': [
    { code: 'E2.8.L1', topic: 'Listening', text: 'Short and simple classroom instructions are followed.' },
    { code: 'E2.8.S1', topic: 'Speaking', text: 'Simple phrases and sentences are used to talk about daily routines.' },
    { code: 'E2.9.R1', topic: 'Reading', text: 'Short and simple texts are recognized with visual support.' },
    { code: 'E2.10.W1', topic: 'Writing', text: 'Simple words and phrases are copied or completed.' }
  ],
  'Görsel Sanatlar': [
    { code: 'G.2.1.4', topic: 'Görsel İletişim', text: 'Kendisinin ve akranlarının çalışmalarındaki fikirleri ve duyguları yorumlar.' },
    { code: 'G.2.2.2', topic: 'Sanatsal Düzenleme', text: 'Çalışmalarında renk, çizgi ve biçimi kullanır.' }
  ],
  'Müzik': [
    { code: 'MÜ.2.A.1', topic: 'Dinleme', text: 'Müziği uygun hız ve gürlükte dinler.' },
    { code: 'MÜ.2.B.3', topic: 'Hareket', text: 'Müziğin dinamiğine ve gürlüklerine uygun drama ve hareket çalışmaları yapar.' }
  ],
  'Beden Eğitimi': [
    { code: 'BE.2.1.1', topic: 'Hareket Yetkinliği', text: 'Yer değiştirme hareketlerini artan bir doğrulukla yapar.' },
    { code: 'BE.2.1.2', topic: 'Dengeleme', text: 'Dengeleme hareketlerini vücut, alan farkındalığı ve hareket ilişkilerini kullanarak yapar.' }
  ],
  'Kodlama': [
    { code: 'KOD.2.1', topic: 'Algoritma', text: 'Basit bir problemi adım adım çözüm basamaklarına ayırır.' },
    { code: 'KOD.2.2', topic: 'Oyun Tasarımı', text: 'Oyun tasarım programlarında temel komutları kullanır.' }
  ],
  'Kültür Sanat': [
    { code: 'KS.2.1', topic: 'Etkinlik', text: 'Kültür sanat etkinliğine katılır ve izlenimlerini paylaşır.' }
  ],
  'Spor': [
    { code: 'SP.2.1', topic: 'Katılım', text: 'Spor etkinliklerine aktif olarak katılır.' }
  ],
  'CNNCT': [
    { code: 'CN.2.1', topic: 'Bağlantı', text: 'Haftanın kazanımlarıyla ilişkili pekiştirme çalışmaları yapar.' }
  ]
};
