import { CourseOutlineData } from '../types';

export const defaultOutline: CourseOutlineData = {
  departmentName: "DEPARTMENT OF GENERAL STUDIES DEPARTMENT",
  logoUrl: "",
  courseName: "BAHASA KEBANGSAAN A",
  courseCode: "MPU22212",
  synopsis: "BAHASA KEBANGSAAN A menawarkan kemahiran berbahasa dari aspek mendengar, bertutur, membaca dan menulis sesuai dengan tahap intelek pelajar, serta meningkatkan kecekapan berbahasa dalam konteks rasmi dan tidak rasmi. Kursus ini mensasarkan keberhasilan pencapaian pelajar dengan sekurang-kurangnya mencapai tahap B1 berdasarkan skala pencapaian pelajar di dalam Common European Framework of Reference (CEFR).",
  creditValue: "2",
  prerequisite: "None",
  clos: [
    { id: "CLO1", description: "Menggunakan pelbagai ayat yang gramatis mengikut konteks yang tepat", mapping: "(A2, CLS 3C)" },
    { id: "CLO2", description: "Menulis pelbagai jenis bentuk penulisan dengan jelas dan sistematik", mapping: "(A2, CLS 3C)" },
    { id: "CLO3", description: "Menunjukkan kaedah bertutur dalam komunikasi lisan dengan sebutan dan intonasi yang betul", mapping: "(A3, CLS 3B)" }
  ],
  plo: "*Refer to attachment",
  assessments: [
    { type: "Tugasan 1", quantity: "1", percentage: "20%" },
    { type: "Tugasan 2", quantity: "1", percentage: "30%" },
    { type: "Tugasan 3", quantity: "1", percentage: "30%" },
    { type: "Pembentangan", quantity: "1", percentage: "20%" }
  ],
  learningTimes: [
    { topic: "Topik 1", f2fKuliah: "4", f2fTutorial: "0", f2fTugasan1: "2", f2fTugasan2: "0", f2fTugasan3: "0", f2fPembentangan: "0", nf2fBerpandu: "0", nf2fKendiri: "6", nf2fTugasan1: "2", nf2fTugasan2: "0", nf2fTugasan3: "0", nf2fPembentangan: "0", totalSLT: "14" },
    { topic: "Topik 2", f2fKuliah: "8", f2fTutorial: "0", f2fTugasan1: "0", f2fTugasan2: "0", f2fTugasan3: "0", f2fPembentangan: "0", nf2fBerpandu: "0", nf2fKendiri: "16", nf2fTugasan1: "0", nf2fTugasan2: "2", nf2fTugasan3: "0", nf2fPembentangan: "0", totalSLT: "26" },
    { topic: "Topik 3", f2fKuliah: "8", f2fTutorial: "0", f2fTugasan1: "0", f2fTugasan2: "0", f2fTugasan3: "0", f2fPembentangan: "0", nf2fBerpandu: "0", nf2fKendiri: "12", nf2fTugasan1: "0", nf2fTugasan2: "0", nf2fTugasan3: "4", nf2fPembentangan: "0", totalSLT: "24" },
    { topic: "Topik 4", f2fKuliah: "4", f2fTutorial: "0", f2fTugasan1: "0", f2fTugasan2: "0", f2fTugasan3: "0", f2fPembentangan: "2", nf2fBerpandu: "0", nf2fKendiri: "8", nf2fTugasan1: "0", nf2fTugasan2: "0", nf2fTugasan3: "0", nf2fPembentangan: "2", totalSLT: "16" }
  ],
  weeklySchedule: [
    {
      topic: "1.0",
      content: "1.0 MORFOLOGI\nTopik Morfologi menerangkan bentuk, proses pembentukan, dan golongan kata dalam Bahasa Melayu",
      contactHours: "4 jam \nkuliah\n*tambah jam tutorial jika ada",
      assessment: "Tugasan 1\n(20%)\n(CLO1)",
      week: "M1-M3"
    },
    {
      topic: "2.0",
      content: "2.0 SINTAKSIS\nTopik Sintaksis membincangkan proses pembinaan ayat, jenis dan bentuk ayat, pola ayat, serta ragam ayat dalam Bahasa Melayu.",
      contactHours: "8 jam \nkuliah",
      assessment: "Tugasan 2\n(30%)\n(CLO1)",
      week: "M4-M7"
    },
    {
      topic: "3.0",
      content: "3.0 PENULISAN\nTopik Penulisan menghuraikan ciri-ciri penulisan dan membincangkan jenis-jenis teks penulisan dalam Bahasa Melayu.",
      contactHours: "8 jam \nkuliah",
      assessment: "Tugasan 3\n(30%)\n(CLO2)",
      week: "M8-M11"
    },
    {
      topic: "4.0",
      content: "4.0 KOMUNIKASI LISAN\nTopik Komunikasi Lisan memperkenalkan konsep dan bentuk pengucapan awam.",
      contactHours: "4 jam \nkuliah",
      assessment: "Pembentangan\n(20%)\n(CLO3)",
      week: "M12-M14"
    }
  ],
  references: "Main references supporting the course :\nKamarul Afendey, Hamimi. (2015). Bahasa Melayu Komunikasi. Oxford Fajar Sdn. Bhd\n\nNik Safiah Karim, Farid M. Onn, Hashim Hj Musa, & Abdul Hamid Mahmood. (2015). Tatabahasa Dewan Edisi Ketiga. Dewan Bahasa dan Pustaka. (ISBN 978-982-62-9484-5)\n\nAdditional references supporting the course:\nAsraf. (2012). Petunjuk Tatabahasa Bahasa Melayu. Sasbadi\n\nMohamed Nadzi Mohamed Sharif. (2016). Bahasa Kebangsaan A. Emeritus Publication",
  preparedByName: "",
  verifiedByName: "",
  datePrepared: "",
  dateVerified: ""
};
