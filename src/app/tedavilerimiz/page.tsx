"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Footer from '../components/Footer';
import { sendGAEvent } from '@/lib/analytics';

interface Treatment {
  id: string;
  title: string;
  description: string;
  steps: {
    title: string;
    description: string;
    icon: string;
  }[];
  details: string[];
  image: string;
  icon: string;
}

interface Particle {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

export default function Treatments() {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState("implant-tedavisi");
  const [activeTreatment, setActiveTreatment] = useState<Treatment | null>(null);

  // treatments tanımını useEffect'ten önce taşıyalım
  const treatments = useMemo(() => [
    {
      id: "dis-beyazlatma",
      title: "Diş Beyazlatma",
      description: "Diş beyazlatma, dişlerin yüzeyinde zamanla oluşan lekelerin giderilmesi ve dişlerin doğal beyazlığının geri kazandırılması amacıyla uygulanan estetik bir tedavidir. Günümüzde estetik diş hekimliğinin en popüler uygulamalarından biri olan diş beyazlatma, diş renginden memnun olmayan bireyler için etkili ve hızlı bir çözüm sunar.",
      steps: [
        {
          title: "Diş Muayenesi",
          description: "Diş beyazlatma tedavisine başlamadan önce, diş hekiminiz dişlerinizin genel sağlığını değerlendirir. Eğer diş çürükleri veya diş eti hastalıkları gibi problemler varsa, önce bu sorunlar tedavi edilir.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Dişlerin Temizlenmesi",
          description: "Beyazlatma işlemi öncesinde, dişlerinizin üzerindeki plak ve tartar (diş taşı) temizlenir. Bu işlem, beyazlatma jelinin diş yüzeyine eşit olarak yayılmasını sağlar ve en iyi sonuçları elde etmek için gereklidir.",
          icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        },
        {
          title: "Diş Beyazlatma Jeli Uygulaması",
          description: "Diş beyazlatma jeli, genellikle hidrojen peroksit veya karbamid peroksit içerir. Bu jel, dişlerinize sürülerek belirli bir süre beklenir. Jelin içeriğindeki aktif maddeler, diş minesine nüfuz ederek, lekelerin giderilmesine ve dişlerin beyazlamasına yardımcı olur.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
          title: "Lazer veya Işık Uygulaması",
          description: "Beyazlatma jelinin etkisini artırmak için bazı durumlarda lazer veya özel bir ışık kaynağı kullanılır. Bu ışık, jelin daha hızlı ve etkili bir şekilde çalışmasını sağlar, tedavi süresini kısaltır.",
          icon: "M12 14l9-5-9-5-9 5 9 5z"
        },
        {
          title: "Sonuçların Değerlendirilmesi",
          description: "Beyazlatma işlemi tamamlandıktan sonra diş hekiminiz, elde edilen sonuçları değerlendirir. İstenilen beyazlık derecesine ulaşılmamışsa, ek bir beyazlatma seansı önerilebilir.",
          icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        },
        {
          title: "Diş Beyazlatma Sonrası Bakım",
          description: "Beyazlatma işlemi sonrasında, dişlerinizin yeni rengini korumak için dikkat etmeniz gereken bazı noktalar vardır. Örneğin, renklenmeye neden olabilecek yiyecek ve içeceklerden (kahve, çay, kırmızı şarap, vb.) bir süre uzak durmak faydalı olacaktır. Ayrıca, dişlerinizi düzenli olarak fırçalamak ve diş ipi kullanmak, beyazlatma işleminin etkisini uzun süre korumanıza yardımcı olur.",
          icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        },
        {
          title: "Düzenli Kontroller",
          description: "Diş beyazlatma işlemi sonrasında, düzenli diş kontrollerine devam etmek önemlidir. Diş hekiminiz, beyazlatma işleminin etkisini izler ve gerekirse ek tedavi önerilerinde bulunabilir.",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        }
      ],
      details: [
        "Ofis tipi beyazlatma",
        "Ev tipi beyazlatma",
        "Lazer beyazlatma",
        "Profesyonel diş temizliği",
        "Leke giderme",
        "Hassasiyet kontrolü",
        "Bakım önerileri",
        "Düzenli kontrol seansları",
        "Doğal görünüm",
        "Uzun süreli etki"
      ],
      image: "/images/treatments/beyazlatma.webp",
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    },
    {
      id: "temel-dis-bakimi",
      title: "Temel Diş Bakımı",
      description: "Temel Diş Bakımı diş sağlığınızı korumak ve ağız hijyeninizi en iyi şekilde sağlamak için gerçekleştirilen rutin bir tedavi sürecidir. Bu tedavi kapsamında, dişlerinizin profesyonel olarak temizlenmesi, diş taşı ve plak oluşumunun önlenmesi hedeflenir. Ayrıca, dişlerinizi düzenli olarak kontrol ederek, olası sorunları erken aşamada tespit edip daha ciddi problemlerin önüne geçmeyi amaçlıyoruz.",
      steps: [
        {
          title: "Diş Muayenesi",
          description: "İlk adım olarak, diş hekimimiz dişlerinizin genel sağlığını değerlendirmek amacıyla kapsamlı bir muayene gerçekleştirir. Bu muayene sırasında, diş çürükleri, diş eti hastalıkları ve diğer ağız sağlığı sorunlarını tespit etmek için son derece önemlidir.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Diş Temizliği",
          description: "Muayene sonrasında, dişlerinizde biriken plak ve tartar (diş taşı) özel aletler kullanılarak temizlenir. Bu işlem, dişlerinizin yüzeylerinin daha temiz ve sağlıklı olmasını sağlar. Ardından, dişlerinizin yüzeylerinin pürüzsüzleştirilmesi için polisaj işlemi yapılır, bu da yeni plak oluşumunu geciktirir.",
          icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        },
        {
          title: "Diş Eti Sağlığı Kontrolü",
          description: "Temizlik sırasında, diş etlerinizin durumu da gözden geçirilir ve erken dönem diş eti hastalıklarının belirtileri tespit edilir. Bu sayede, daha ciddi diş eti sorunlarının önüne geçilebilir.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
          title: "Flörür Tedavisi",
          description: "Dişlerinizin çürüğe karşı daha dirençli hale gelmesi için flörür tedavisi uygulanabilir. Flörür, diş minesini güçlendirir ve diş çürüklerinin oluşumunu önlemeye yardımcı olur.",
          icon: "M12 14l9-5-9-5-9 5 9 5z"
        },
        {
          title: "Ağız Hijyeni Eğitimi",
          description: "Tedavinin sonunda, diş hekimimiz size doğru diş fırçalama teknikleri, diş ipi kullanımı ve ağız gargaraları hakkında bilgi verir. Ayrıca, ağız hijyeninizi en iyi şekilde nasıl koruyacağınızı anlatır.",
          icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        },
        {
          title: "Düzenli Kontroller",
          description: "Temel diş bakımı, yalnızca bir seferlik bir işlem değil, düzenli olarak yapılması gereken bir uygulamadır. Bu kontroller, diş sağlığınızı sürekli olarak izlemek ve potansiyel sorunları erken tespit etmek için son derece önemlidir.",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        }
      ],
      details: [
        "Kapsamlı ağız muayenesi",
        "Diş taşı temizliği",
        "Diş eti sağlığı kontrolü",
        "Flörür uygulaması",
        "Plak kontrolü",
        "Diş fırçalama eğitimi",
        "Ağız bakımı danışmanlığı",
        "Düzenli kontrol seansları",
        "Erken teşhis hizmeti",
        "Koruyucu diş hekimliği uygulamaları"
      ],
      image: "/images/treatments/temel-bakim.webp",
      icon: "M12 14l9-5-9-5-9 5 9 5z"
    },
    {
      id: "ortodonti",
      title: "Ortodonti",
      description: "Ortodonti, dişlerin ve çene yapısının doğru hizalanmasını sağlamak amacıyla uygulanan bir diş hekimliği dalıdır. Ortodontik tedavi, çapraşık dişlerin düzeltilmesi, alt ve üst çeneler arasındaki uyumsuzlukların giderilmesi ve düzgün bir işlev pozisyonunun sağlanması için kullanılır. Bu tedavi süreci, dişlerin estetik ve fonksiyonel açıdan daha iyi bir duruma getirilmesini amaçlar.",
      steps: [
        {
          title: "Danışma ve Değerlendirme",
          description: "Ortodontik tedavi süreci, ilk olarak hastanın diş yapısı, çene pozisyonu ve yüz yapısının kapsamlı bir şekilde değerlendirilmesiyle başlar. Diş hekiminiz, röntgenler ve fotoğraflar aracılığıyla dişlerin ve çene kemiklerinin durumunu analiz eder ve tedavi planını oluşturur.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Tedavi Planının Oluşturulması",
          description: "Yapılan değerlendirmeler sonucunda, hastanın ihtiyaçlarına ve isteklerine uygun bir tedavi planı belirlenir. Bu plan, diş teli, plak ya da cerrahi müdahale gibi farklı ortodontik çözümleri içerebilir.",
          icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        },
        {
          title: "Diş Tellerinin Uygulanması",
          description: "Ortodontik tedavinin en yaygın yöntemi olan diş telleri, dişlerin üzerine yerleştirilir ve düzenli aralıklarla sıkıştırılır. Bu teller, dişlerin yavaş yavaş istenilen pozisyona gelmesini sağlar.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
          title: "Düzenli Kontroller",
          description: "Diş telleri uygulandıktan sonra, hasta belirli aralıklarla kontrole çağrılır. Bu kontrollerde, tellerin durumu gözden geçirilir ve gerekli ayarlamalar yapılır. Ayrıca, hastanın tedavi sürecine uygun olarak ağız hijyenini nasıl sağlayacağı konusunda bilgilendirilir.",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
          title: "Tedavi Sürecinin Tamamlanması",
          description: "Dişler istenilen pozisyona ulaştığında, diş telleri çıkarılır ve tedavi sonlandırılır. Ancak, tedavinin kalıcı olabilmesi için genellikle pekiştirme aşaması uygulanır. Bu aşamada, dişlerin yeni pozisyonlarını korumak için hastaya plak veya sabitleyici uygulanması gerekebilir.",
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
          title: "Pekiştirme Aşaması",
          description: "Tedavi sonrası dişlerin kalıcı olarak yerinde kalmasını sağlamak için pekiştirme aşaması son derece önemlidir. Bu süreç, genellikle şeffaf plaklar veya sabit retainer'lar kullanılarak gerçekleştirilir.",
          icon: "M5 13l4 4L19 7"
        }
      ],
      details: [
        "Metal tel tedavisi",
        "Şeffaf plak tedavisi",
        "Lingual ortodonti",
        "Çene problemleri tedavisi",
        "Gülüş tasarımı",
        "Düzenli kontrol ve takip",
        "Pekiştirme tedavisi",
        "Çapraşıklık düzeltme",
        "Diş boşluklarının kapatılması",
        "Çene uyumsuzluklarının tedavisi"
      ],
      image: "/images/treatments/ortodonti.webp",
      icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
    },
    {
      id: "protez-dis-hekimligi",
      title: "Protez",
      description: "Protez tedavisi, eksik dişlerin yerine yenilerinin konulmasıyla estetik ve fonksiyonel açıdan ağız sağlığını yeniden kazandırmayı amaçlayan bir diş hekimliği alanıdır. Diş kaybı, çiğneme ve konuşma yeteneğinizi etkileyebilir ve yüz yapısında değişikliklere neden olabilir. Protezler, bu eksiklikleri gidermek için uygulanır ve doğal dişlerinizin görünümünü ve fonksiyonunu geri kazandırmayı hedefler.",
      steps: [
        {
          title: "Danışma ve Değerlendirme",
          description: "Protez tedavisi öncesinde, diş hekiminiz eksik dişlerinizi ve ağız yapınızı değerlendirir. Bu aşamada, dişlerin yapısı, çene kemiğinin durumu ve ağız hijyeniniz göz önünde bulundurularak, sizin için en uygun protez türü belirlenir.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Ölçülerin Alınması",
          description: "Tedavi planı belirlendikten sonra, diş hekiminiz ağzınızdan detaylı ölçüler alır. Bu ölçüler, protezlerin ağzınıza tam uyum sağlaması için laboratuvarlarda özel olarak üretilir.",
          icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        },
        {
          title: "Prova Aşaması",
          description: "Hazırlanan protezler, geçici olarak ağız içine yerleştirilerek uyum ve konfor kontrol edilir. Gerekirse, protezlerin boyutları ve şekilleri üzerinde ayarlamalar yapılır.",
          icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        },
        {
          title: "Protezlerin Yerleştirilmesi",
          description: "Protezlerin son hali onaylandıktan sonra, kalıcı olarak ağız içine yerleştirilir. Diş hekiminiz, protezlerin doğru bir şekilde yerleştirildiğinden emin olduktan sonra, protezlerin nasıl kullanılacağı ve ağız hijyeninin nasıl korunacağı konusunda sizi bilgilendirir.",
          icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        },
        {
          title: "Düzenli Kontroller",
          description: "Protezlerin uyumunu ve ağız sağlığınızı izlemek için düzenli olarak diş hekiminizi ziyaret etmeniz önemlidir. Zamanla protezlerde uyumsuzluklar veya aşınmalar meydana gelebilir, bu nedenle düzenli kontrollerde gerekli ayarlamalar yapılır.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        }
      ],
      details: [
        "Sabit protezler",
        "Hareketli protezler",
        "Tam protezler",
        "Köprü uygulamaları",
        "İmplant üstü protezler",
        "Estetik protez uygulamaları",
        "Zirkonyum protezler",
        "Porselen protezler",
        "Geçici protezler",
        "Protez bakım hizmetleri"
      ],
      image: "/images/treatments/protez.webp",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    },
    {
      id: "pedodonti",
      title: "Pedodonti (Çocuk Diş Hekimliği)",
      description: "Pedodonti, çocukların ağız ve diş sağlığını korumak ve geliştirmek amacıyla uygulanan diş hekimliği dalıdır. Çocukların diş hekimi korkusu olmadan düzenli kontrollerini yapmaları, sağlıklı bir diş gelişimi ve ağız hijyeni alışkanlıkları kazanmaları için pedodonti büyük önem taşır. Bu alanda yapılan tedaviler, çocukların dişlerinin sağlıklı kalmasını ve gelecekte oluşabilecek daha büyük sorunların önlenmesini hedefler.",
      steps: [
        {
          title: "İlk Muayene",
          description: "Çocukların diş hekimiyle ilk tanışması genellikle süt dişlerinin çıkmaya başladığı dönemde gerçekleşir. Bu muayenede, çocuğun ağız ve diş sağlığı genel olarak değerlendirilir ve ebeveynlere gerekli bilgiler verilir. Ayrıca, çocukların diş hekimi korkusu yaşamamaları için güven verici bir ortam sağlanır.",
          icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        },
        {
          title: "Koruyucu Tedaviler",
          description: "Pedodonti kapsamında en sık uygulanan tedavilerden biri, çürüklerin önlenmesine yönelik koruyucu tedavilerdir. Flörür uygulamaları, fissür örtücülerin (diş yüzeyini kapatan ince tabaka) kullanılması, çocukların dişlerinin çürümesini engellemede önemli rol oynar. Bu tür tedaviler, dişlerin doğal yapısını korumaya yardımcı olur.",
          icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        },
        {
          title: "Süt Dişlerinin Bakımı",
          description: "Süt dişlerinin bakımı, çocuğun diş gelişimi ve genel sağlığı açısından son derece önemlidir. Çürük, enfeksiyon veya travma gibi durumlarda süt dişlerinin tedavisi yapılır. Çekilmesi gereken durumlar haricinde, süt dişlerinin yerinde kalması kalıcı dişlerin düzgün bir şekilde çıkması için gereklidir.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
          title: "Ortodontik Değerlendirme",
          description: "Çocukların dişlerinin doğru hizalanması ve çene gelişimi açısından ortodontik değerlendirmeler yapılır. Bu aşamada, çocuğun ileride ortodontik tedaviye ihtiyaç duyup duymayacağı belirlenir ve gerekli yönlendirmeler yapılır.",
          icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        },
        {
          title: "Alışkanlıkların Yönetimi",
          description: "Çocuklarda görülen parmak emme gibi kötü alışkanlıklar, diş ve çene gelişimini olumsuz etkileyebilir. Pedodonti, bu alışkanlıkların kontrol altına alınması ve çocuğun sağlıklı bir şekilde yaşına uygun davranışlar kazanması için gerekli eğitim ve tedavileri içerir.",
          icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        },
        {
          title: "Diş Çürüklerinin Tedavisi",
          description: "Çocuklarda diş çürükleri yaygın olarak görülür ve tedavi edilmezse ağrı, enfeksiyon ve diş kaybına yol açabilir. Çocuk diş hekimleri, çürükleri erken dönemde teşhis ederek doğru veya kanal tedavisi gibi gerekli müdahaleleri yapar.",
          icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        },
        {
          title: "Diş Travmaları",
          description: "Çocuklar oyun oynarken veya spor yaparken dişlerine zarar verebilirler. Diş travmaları durumunda, acil müdahaleler yapılır ve dişlerin kurtarılması için gerekli tedavi planı oluşturulur.",
          icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        },
        {
          title: "Ağız Hijyeni Eğitimi",
          description: "Çocuklara diş fırçalama, diş ipi kullanımı ve doğru beslenme alışkanlıkları kazandırılır. Bu eğitim, çocuğun ağız sağlığının uzun vadede korunması için temel bir adımdır.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Düzenli Kontroller",
          description: "Pedodonti kapsamında düzenli diş kontrolleri son derece önemlidir. Bu kontroller, dişlerin gelişimi, çürüklerin erken teşhisi ve genel ağız sağlığı durumunun izlenmesi için gereklidir.",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        }
      ],
      details: [
        "Çocuk diş muayenesi",
        "Koruyucu diş tedavileri",
        "Çürük tedavisi",
        "Diş travması tedavisi",
        "Ağız hijyeni eğitimi",
        "Ortodontik değerlendirme",
        "Diş gelişimi takibi",
        "Fissür örtücü uygulaması",
        "Flor uygulaması",
        "Çocuk diş protezleri",
        "Davranış yönetimi",
        "Düzenli kontrol seansları"
      ],
      image: "/images/treatments/pedodonti.webp",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    },
    {
      id: "endodonti",
      title: "Endodonti",
      description: "Endodonti, dişin iç kısmında yer alan yumuşak dokunun (pulpa) hastalıklarının tedavisiyle ilgilenen diş hekimliği dalıdır. Endodontik tedavisi, genellikle kanal tedavisi olarak bilinir ve dişin içindeki enfekte veya hasar görmüş dokunun çıkarılması, kök kanallarının temizlenmesi, şekillendirilmesi ve doldurulması işlemlerini içerir. Bu tedavi, dişin kurtarılmasına yardımcı olarak doğal dişlerin korunmasını sağlar.",
      steps: [
        {
          title: "Teşhis ve Değerlendirme",
          description: "Tedavi süreci, diş hekiminin detaylı bir muayene yapmasıyla başlar. Gerekli durumlarda röntgen veya diğer görüntüleme yöntemleri kullanılarak dişin durumu değerlendirilir. Bu aşamada, dişin pulpasının ne derece hasar gördüğü belirlenir ve endodontik tedaviye ihtiyaç olup olmadığına karar verilir.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Anestezi ve Hazırlık",
          description: "Tedavi sırasında hastanın rahatını sağlamak için lokal anestezi uygulanır. Anestezi sonrasında, işlem etrafındaki alan izole edilerek tedavi alanı sterilize edilir.",
          icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        },
        {
          title: "Pulpa Dokusunun Çıkarılması",
          description: "Dişin tepe kısmında küçük bir delik açılarak pulpa odasına erişim sağlanır. Hasar görmüş veya enfekte olmuş pulpa dokusu bu delikten çıkarılır. Kök kanallarına içeriden girilerek temizleme işlemi yapılır. Bu işlem, enfeksiyonun yayılmasını önlemek için son derece önemlidir.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
          title: "Kök Kanallarının Temizlenmesi ve Şekillendirilmesi",
          description: "Pulpa dokusunun çıkarılmasının ardından, kök kanalları özel aletler kullanılarak temizlenir ve şekillendirilir. Bu işlem, kanalların enfeksiyondan arındırılmasını ve doğru malzemesinin yerleştirilmesi için uygun bir hale getirilmesini sağlar.",
          icon: "M12 14l9-5-9-5-9 5 9 5z"
        },
        {
          title: "Kök Kanallarının Doldurulması",
          description: "Temizlik ve şekillendirme işlemi tamamlandıktan sonra, kök kanalları biyouyumlu bir malzemeyle (genellikle gutta-perka) doldurulur. Bu dolgu işlemi, dişin iç kısmının yeniden enfekte olmasını önlemek için hayati öneme sahiptir.",
          icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        },
        {
          title: "Kalıcı Dolgu ve Restorasyon",
          description: "Kök kanallarının doldurulmasının ardından, dişin üst kısmı kalıcı bir dolgu veya kuronla kapatılır. Bu, dişin işlevselliğini ve görünümünü geri kazandırmasını, tekrar kullanılabilir hale getirilmesini sağlar.",
          icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
        },
        {
          title: "Takip ve Kontrol",
          description: "Endodontik tedavi sonrasında, dişin iyileşme süreci izlenir ve gerekirse ek tedavi uygulanır. Düzenli kontroller ile tedavinin başarısı değerlendirilir ve uzun vadeli sağlıklı bir sonuç elde edilmesi sağlanır.",
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        }
      ],
      details: [
        "Kök kanal tedavisi",
        "Kanal revizyonu",
        "Ağrı tedavisi",
        "Travma tedavisi",
        "Mikroskopik tedaviler",
        "Enfeksiyon tedavisi",
        "Diş siniri tedavisi",
        "Kanal içi tedaviler",
        "Modern teknik uygulamalar",
        "Ağrısız tedavi imkanı"
      ],
      image: "/images/treatments/endodonti.webp",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      id: "estetik-dis-hekimligi",
      title: "Estetik Diş Bakımı",
      description: "Estetik diş bakımı, yalnızca diş sağlığını korumakla kalmayıp, aynı zamanda dişlerin ve gülüşün estetik görünümünü de iyileştiren bir tedavi sürecidir. Bu tedavi, hem sağlık hem de güzellik hedeflerini bir araya getirerek hastaların kendilerini daha güvenli hissetmelerini sağlar. Estetik diş bakımı, beyazlatma işlemleri, diş eti estetiği, porselen kaplamalar ve diğer kozmetik uygulamaları içerir.",
      steps: [
        {
          title: "Danışma ve Planlama",
          description: "İlk adım olarak, hastanın estetik beklentileri ve ağız sağlığı durumu değerlendirilir. Dişlerin rengi, formu ve konumu gibi faktörler göz önünde bulundurularak kişiye özel bir tedavi planı hazırlanır.",
          icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        },
        {
          title: "Diş Beyazlatma",
          description: "Dişlerin daha beyaz ve parlak görünmesi için diş beyazlatma tedavisi uygulanır. Bu işlem, dişlerin yüzeyinde biriken lekeleri gidermek ve doğal beyazlığını ortaya çıkarmak amacıyla yapılır.",
          icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        },
        {
          title: "Diş Eti Estetiği",
          description: "Diş etlerinin şekillendirilmesi veya fazla diş eti dokusunun alınmasıyla dişlerin daha estetik görünmesi sağlanır. Diş etlerinin dişlerle uyumlu bir şekilde şekillendirilmesi, gülüşün daha dengeli ve hoş olmasını sağlar.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
          title: "Porselen Kaplamalar",
          description: "Dişlerin görünümünü iyileştirmek için porselen kaplamalar uygulanabilir. Bu kaplamalar, dişlerin yüzeyine yerleştirilerek kırık, yamuk veya renk değiştirmiş dişlerin düzeltilmesine yardımcı olur.",
          icon: "M12 14l9-5-9-5-9 5 9 5z"
        },
        {
          title: "Diş Düzenlemeleri",
          description: "Dişlerin boyutu, şekli veya aralarındaki boşluklar gibi estetik sorunlar, diş düzenleme işlemleriyle giderilebilir. Bu işlemler, dişlerin daha düzgün ve simetrik görünmesini sağlar.",
          icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        },
        {
          title: "Kontrol ve Bakım",
          description: "Estetik diş bakımından sonra, düzenli olarak diş hekiminizi ziyaret etmek önemlidir. Dişlerinizin görünümünü korumak ve olası sorunları önlemek için düzenli kontroller yapılır.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        }
      ],
      details: [
        "Diş beyazlatma tedavileri",
        "Diş eti şekillendirme",
        "Porselen kaplama uygulamaları",
        "Estetik dolgu işlemleri",
        "Gülüş tasarımı",
        "Diş şekillendirme",
        "Diş aralığı kapatma",
        "Düzenli bakım ve kontrol"
      ],
      image: "/images/treatments/estetik.webp",
      icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    },
    {
      id: "implant-tedavisi",
      title: "Diş İmplant Tedavisi",
      description: "Diş implantları, kaybedilen dişlerin yerine kalıcı ve doğal görünümlü dişlerin yerleştirilmesini sağlayan modern bir tedavi yöntemidir. Bu tedavi, estetik bir gülüş elde etmenin yanı sıra çiğneme fonksiyonunu geri kazandırmak için de idealdir. Diş implantları, çene kemiğine yerleştirilen titanyum vidaları üzerine yapay dişlerin monte edilmesiyle gerçekleştirilir.",
      steps: [
        {
          title: "Danışma ve Planlama",
          description: "İlk aşamada, diş hekiminizle detaylı bir görüşme yapılır. Bu görüşmede, dişlerinizin ve çene kemiğinizin durumu değerlendirilir, röntgenler ve gerekli testler yapılır. Bu bilgiler ışığında, tedavi planı oluşturulur ve size implant süreci hakkında detaylı bilgi verilir.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "İmplant Yerleştirilmesi",
          description: "İmplantın yerleştirilmesi, cerrahi bir işlem gerektirir. Lokal anestezi altında gerçekleştirilen bu işlemde, çene kemiğinize titanyum vida yerleştirilir. Bu vida, kaybedilen diş kökünün yerine geçecek ve üzerine yapay dişin monte edileceği temel oluşturacaktır.",
          icon: "M19 14l-7 7m0 0l-7-7m7 7V3"
        },
        {
          title: "İyileşme Süreci",
          description: "İmplant yerleştirildikten sonra, implantın çene kemiğiyle kaynaşması (osseointegrasyon) için genellikle birkaç ay beklenir. Bu süre zarfında, implantın stabil hale gelmesi ve çiğneme kuvvetlerine dayanıklı hale gelmesi sağlanır.",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
          title: "Üst Yapı (Abutment) Takılması",
          description: "İyileşme süreci tamamlandığında, implantın üzerine bir abutment (bağlantı parçası) takılır. Bu parça, implant ile yapay diş arasında bir köprü görevi görür.",
          icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
        },
        {
          title: "Yapay Dişin Takılması",
          description: "Abutment üzerine, kişiye özel olarak hazırlanan yapay diş (krona) yerleştirilir. Bu yapay diş, doğal dişlerinizle uyumlu olacak şekilde tasarlanır ve ağzınıza uygun bir estetik sağlar.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        }
      ],
      details: [
        "Tek diş implantları",
        "Çoklu diş implantları",
        "All-on-4 implant tedavisi",
        "Dijital implant planlama",
        "İmmediat implant uygulaması",
        "Düzenli kontrol ve bakım hizmetleri",
        "Uzun ömürlü ve kalıcı çözüm",
        "Doğal görünüm ve fonksiyon"
      ],
      image: "/images/treatments/implant.webp",
      icon: "M19 14l-7 7m0 0l-7-7m7 7V3"
    },
    {
      id: "agiz-dis-ve-cene-cerrahisi",
      title: "Ağız, Diş ve Çene Cerrahisi",
      description: "Ağız, diş ve çene cerrahisi, ağız içinde, dişlerde ve çene yapısında meydana gelen çeşitli rahatsızlıkların cerrahi yöntemlerle tedavi edildiği bir diş hekimliği alanıdır. Bu tedavi, diş çekimi, çene kırıkları, kist ve tümörlerin çıkarılması gibi çeşitli cerrahi müdahaleleri içerir. Aynı zamanda, diş implantlarının yerleştirilmesi ve çene yapısının düzeltilmesi de bu cerrahinin kapsamına girer.",
      steps: [
        {
          title: "Muayene ve Tanı",
          description: "Tedavi süreci, cerrahın detaylı bir muayene yapması ve gerekli durumlarda röntgen ya da diğer görüntüleme yöntemleri kullanarak tanı koyması ile başlar. Bu aşamada, hastanın genel sağlık durumu, ağız içindeki problemler ve cerrahi müdahalenin gerekliliği değerlendirilir.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Tedavi Planının Belirlenmesi",
          description: "Muayene sonrası, hastaya uygulanacak cerrahi işlemler ve süreç hakkında detaylı bilgi verilir. Tedavi planı, hastanın ihtiyacına göre özel olarak hazırlanır ve hangi cerrahi yöntemlerin kullanılacağı belirlenir.",
          icon: "M12 14l9-5-9-5-9 5 9 5z"
        },
        {
          title: "Cerrahi Müdahale",
          description: "Cerrahi işlem, hastanın durumu ve planlanan tedaviye bağlı olarak lokal ya da genel anestezi altında gerçekleştirilir. Bu aşamada, diş çekimi, implant yerleştirilmesi, çene kemiği ameliyatı gibi işlemler uygulanabilir. Operasyon sonrası iyileşme süreci de tedavinin bir parçasıdır.",
          icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        },
        {
          title: "İyileşme Süreci",
          description: "Cerrahi müdahale sonrasında, hastanın iyileşme süreci yakından izlenir. Doktor, iyileşme süresince nelere dikkat edilmesi gerektiğini, beslenme alışkanlıklarının nasıl olması gerektiğini ve ağız yönetimi gibi konularda bilgilendirme yapar.",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
          title: "Düzenli Kontroller",
          description: "İyileşme sürecinin sorunsuz ilerleyip ilerlemediğinden emin olmak ve olası komplikasyonları önlemek amacıyla, cerrahi işlem sonrasında düzenli olarak doktor kontrolü yapılır. Bu kontrollerde, iyileşme süreci değerlendirilir ve gerekirse ek tedaviler uygulanır.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        }
      ],
      details: [
        "Diş çekimi operasyonları",
        "Gömülü diş ameliyatları",
        "Kist ve tümör operasyonları",
        "Çene kemiği cerrahisi",
        "İmplant uygulamaları",
        "Çene eklemi tedavileri",
        "Diş eti operasyonları",
        "Kemik ogmentasyonu",
        "Sinüs lifting",
        "Post-operatif bakım hizmetleri"
      ],
      image: "/images/treatments/cerrahi.webp",
      icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
    }
  ], []);

  useEffect(() => {
    setIsVisible(true);
    // Generate particle positions only on client side
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 10}s`
      }))
    );

    // Check for hash in URL and scroll to the corresponding treatment
    if (typeof window !== 'undefined') {
      // Get the hash without the # character
      const hash = window.location.hash.replace('#', '');
      
      // If hash exists and corresponds to a treatment ID
      if (hash && treatments.some(t => t.id === hash)) {
        // Set the selected treatment
        setSelectedTreatment(hash);
        
        // Add a small delay to ensure the DOM is fully rendered
        setTimeout(() => {
          const detailsSection = document.getElementById('treatment-details');
          if (detailsSection) {
            const yOffset = -100;
            const y = detailsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          }
        }, 500);
      }
    }
  }, []); // treatments'i dependency array'inden kaldırdık, zaten memoized değer

  useEffect(() => {
    setActiveTreatment(treatments.find(t => t.id === selectedTreatment) || null);
  }, [selectedTreatment, treatments]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] py-24 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white z-10"></div>
        
        {/* Image background with animation */}
        <div className="absolute inset-0 scale-110">
          <div className="absolute inset-0 bg-white opacity-20"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 bg-repeat"></div>
          <Image
            src="/klinik/3.webp"
            alt="Uzman Hekimlerimiz"
            fill
            priority
            className="object-cover opacity-75"
            style={{ objectPosition: 'center 70%' }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center mt-16">
          <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-4">
              <span className="py-1.5 px-4 text-xs font-semibold tracking-widest uppercase rounded-full inline-flex items-center gap-2 text-[#1a365d] bg-[#1a365d]/10 border border-[#1a365d]/20">
                <span className="w-1.5 h-1.5 bg-[#1a365d] rounded-full"></span>
                Modern Tedavi Yöntemleri
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-800 via-gray-800 to-[#1a365d] bg-clip-text text-transparent leading-tight">
              Tedavi Seçeneklerimiz
              <span className="block text-[#1a365d] mt-2">Uzman Kadro ve Modern Teknoloji</span>
            </h1>
            <p className="text-gray-800/70 text-base md:text-lg max-w-2xl mx-auto mb-10">
              DentTitanyum olarak, modern diş hekimliği teknolojileri ve uzman kadromuzla sizlere en kaliteli tedavi hizmetini sunuyoruz.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => {
                  const element = document.getElementById('treatments');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden px-8 py-3 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:shadow-glow-navy transform transition-all duration-300"
              >
                <span className="relative z-10">Tedavileri İncele</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#1a365d] to-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </button>
              <Link 
                href="/iletisim" 
                className="px-8 py-3 bg-transparent border border-gray-800/30 text-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-800/10 transition-all duration-300"
                onClick={() => {
                  sendGAEvent('contact_click', {
                    event_category: 'Contact',
                    event_label: 'Tedaviler Sayfası Randevu Butonu'
                  });
                }}
              >
                Randevu Al
              </Link>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div 
              key={i} 
              className="absolute h-1 w-1 bg-[#1a365d] rounded-full opacity-20 animate-float-random"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            >
              <div className="absolute h-full w-full bg-[#1a365d] rounded-full blur-sm animate-pulse"></div>
            </div>
          ))}
          
          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#1a365d]/5 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#2d4a77]/5 blur-3xl"></div>
          
          {/* Animated lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1a365d]/20 to-transparent animate-slide-right"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2d4a77]/20 to-transparent animate-slide-left"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Treatment Selector */}
          <div className="md:hidden mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-3 relative">
                <h2 className="text-xl font-bold text-gray-800">Tedavi Seçenekleri</h2>
                <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-[#1a365d] to-transparent animate-width-expand"></div>
              </div>
            </div>
            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#1a365d]/60 hover:[&::-webkit-scrollbar-thumb]:bg-[#1a365d]">
              <div className="flex gap-2">
                {treatments.map((treatment) => (
                  <button
                    key={treatment.id}
                    onClick={() => {
                      setSelectedTreatment(treatment.id);
                      const detailsSection = document.getElementById('treatment-details');
                      if (detailsSection) {
                        const yOffset = -100;
                        const y = detailsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({
                          top: y,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                      selectedTreatment === treatment.id
                        ? 'bg-[#1a365d] text-white'
                        : 'bg-white text-gray-700 hover:text-[#1a365d] border border-gray-200 hover:border-[#1a365d]/20'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      selectedTreatment === treatment.id
                        ? 'bg-white/20'
                        : 'bg-[#1a365d]/5'
                    }`}>
                      <svg className={`w-5 h-5 transition-all duration-300 ${
                        selectedTreatment === treatment.id
                          ? 'text-white'
                          : 'text-[#1a365d]'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={treatment.icon || "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"} />
                      </svg>
                    </div>
                    <span className="font-medium text-sm">{treatment.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Sidebar - Treatment List (Hidden on Mobile) */}
            <div className="hidden md:block md:w-1/4 bg-gray-50 md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Tedavilerimiz
                  <div className="h-1 w-20 bg-[#1a365d] mt-2 rounded-full"></div>
                </h2>
                <div className="space-y-2">
                  {treatments.map((treatment) => (
                    <button
                      key={treatment.id}
                      onClick={() => {
                        setSelectedTreatment(treatment.id);
                        const detailsSection = document.getElementById('treatment-details');
                        if (detailsSection) {
                          const yOffset = -100;
                          const y = detailsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({
                            top: y,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        selectedTreatment === treatment.id
                          ? 'bg-[#1a365d] text-white shadow-lg'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedTreatment === treatment.id
                            ? 'bg-white/20'
                            : 'bg-[#1a365d]/10'
                        }`}>
                          <svg className={`w-6 h-6 ${
                            selectedTreatment === treatment.id
                              ? 'text-white'
                              : 'text-[#1a365d]'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={treatment.icon || "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"} />
                          </svg>
                        </div>
                        <span className="font-medium">{treatment.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Treatment Details */}
            <div className="md:w-3/4 bg-white" id="treatment-details">
              <div className="p-4 md:p-6">
                <div className="max-w-4xl">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
                    {activeTreatment?.title}
                    <div className="h-1 w-20 bg-[#1a365d] mt-2 rounded-full"></div>
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-12">{activeTreatment?.description}</p>

                  {/* Treatment Steps */}
                  <div className="mb-8 md:mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8 relative inline-block">
                      Tedavi Aşamaları
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1a365d] to-transparent"></div>
                    </h2>
                    <div className="space-y-4 md:space-y-6">
                      {activeTreatment?.steps.map((step, index) => (
                        <div key={index} className="group flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl bg-white border border-gray-200 hover:border-[#1a365d]/20 hover:shadow-lg transition-all duration-300">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1a365d]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a365d] transition-colors duration-300">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#1a365d] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-sm md:text-base text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Treatment Details */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8 relative inline-block">
                      Tedavi Detayları
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1a365d] to-transparent"></div>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {activeTreatment?.details.map((detail, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-gray-50 hover:bg-[#1a365d]/5 transition-colors duration-300"
                        >
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1a365d]/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm md:text-base text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 