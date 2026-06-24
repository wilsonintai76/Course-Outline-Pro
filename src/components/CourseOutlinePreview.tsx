import { CourseOutlineData } from '../types';

export function CourseOutlinePreview({ data, globalLogo, institutionName }: { data: CourseOutlineData, globalLogo?: string, institutionName?: string }) {
  return (
    <div className="bg-white text-black p-4 md:p-8 shadow-xl max-w-4xl mx-auto font-sans text-sm border">
      <table className="w-full border-collapse border border-black mb-6 mt-4">
        <tbody>
          <tr>
            <td colSpan={3} className="border border-black p-4 text-center font-bold">
              <div className="flex flex-col items-center justify-center">
                 {globalLogo ? (
                  <img src={globalLogo} alt="Logo" className="h-16 mb-2 object-contain" />
                ) : data.logoUrl ? (
                  <img src={data.logoUrl} alt="Logo" className="h-16 mb-2 object-contain" />
                ) : (
                  <>
                    <h2 className="text-red-700 text-xl md:text-2xl tracking-widest uppercase">Politeknik</h2>
                    <h3 className="text-sm font-normal mb-2">MALAYSIA</h3>
                  </>
                )}
               <div className="flex-1">
              <h1 className="text-2xl font-bold uppercase mb-1">{institutionName || data.institutionName || 'UNIVERSITY OF TECHNOLOGY'}</h1>
              <h2 className="text-lg font-semibold uppercase text-zinc-600">{data.facultyName || 'Faculty / Department'}</h2>
            </div>
                <h4 className="mt-2 text-md font-bold uppercase">{data.departmentName}</h4>
                <h4 className="text-md font-bold uppercase italic">COURSE OUTLINE</h4>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold w-8 text-center">1.</td>
            <td className="border border-black p-2 font-bold w-48">NAME OF COURSE</td>
            <td className="border border-black p-2 text-red-600 uppercase">{data.courseName}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center"></td>
            <td className="border border-black p-2 font-bold">COURSE CODE</td>
            <td className="border border-black p-2 text-red-600">{data.courseCode}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center">2.</td>
            <td className="border border-black p-2 font-bold">SYNOPSIS</td>
            <td className="border border-black p-2 text-red-600 text-justify">{data.synopsis}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center">3.</td>
            <td className="border border-black p-2 font-bold">CREDIT VALUE</td>
            <td className="border border-black p-2 text-red-600">{data.creditValue}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center">4.</td>
            <td className="border border-black p-2 font-bold">PRE-REQUISITE / CO-REQUISITE</td>
            <td className="border border-black p-2 text-red-600">{data.prerequisite}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center align-top" rowSpan={(data?.clos?.length || 0) + 2}>5.</td>
            <td className="border border-black p-2 font-bold" colSpan={2}>
              COURSE LEARNING OUTCOMES(CLO):<br/>
              Upon completion of this course, students should be able to:
            </td>
          </tr>
          {data?.clos?.map((clo, i) => (
            <tr key={`clo-${i}`}>
              <td className="border border-black p-2 font-bold text-center">{clo.id}</td>
              <td className="border border-black p-2 text-red-600">
                {clo.description}
                <br />
                {clo.mapping}
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-black p-2 font-bold" colSpan={2}>
              PROGRAMME LEARNING OUTCOMES (PLO):<br/>
              <span className="font-bold">{data.plo || '*Refer to attachment'}</span>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center align-top">6.</td>
            <td className="border border-black p-2 font-bold" colSpan={2}>
              ASSESSMENT METHOD:<br/>
              The course assessment consists of:<br/>
              i) Continuous Assessment (CA) - 100%<br/>
              ii) Final Examination (FE) - None
              
              <div className="mt-4 flex justify-center pb-4">
                <table className="w-full md:w-3/4 border-collapse border border-black">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-black p-1">Assessment</th>
                      <th className="border border-black p-1">Quantity</th>
                      <th className="border border-black p-1">Percentage (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.assessments?.map((a, i) => (
                      <tr key={`asmt-${i}`}>
                        <td className="border border-black p-1 text-red-600 pl-2">{a.type}</td>
                        <td className="border border-black p-1 text-red-600 text-center">{a.quantity}</td>
                        <td className="border border-black p-1 text-red-600 text-center">{a.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center align-top">7.</td>
            <td className="border border-black p-0" colSpan={2}>
              <div className="font-bold text-sm uppercase p-2 border-b border-black w-full">DISTRIBUTION OF STUDENT LEARNING TIME</div>
              <div className="overflow-x-auto w-full max-w-full">
                <table className="w-full border-collapse text-[10px] md:text-xs">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border-r border-b border-black p-1 align-bottom text-center" rowSpan={2}><div className="-rotate-90 whitespace-nowrap h-20 w-8">TOPIC</div></th>
                      <th className="border-r border-b border-black p-1 text-center" colSpan={6}>GUIDED LEARNING (F2F) HOURS</th>
                      <th className="border-r border-b border-black p-1 text-center" colSpan={6}>INDEPENDENT LEARNING (NF2F)<br/>HOURS</th>
                      <th className="border-b border-black p-1 align-bottom text-center" rowSpan={2}><div className="-rotate-90 whitespace-nowrap h-20 w-8">TOTAL OF<br/>SLT<br/>HOURS</div></th>
                    </tr>
                    <tr className="bg-gray-200">
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">KULIAH</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">TUTORIAL</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">TUGASAN 1</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">TUGASAN 2</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">TUGASAN 3</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">PEMBENTANGAN</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">BERPANDU</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">KENDIRI</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">TUGASAN 1</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">TUGASAN 2</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">TUGASAN 3</div></th>
                      <th className="border-r border-b border-black px-1 py-4 text-center"><div className="-rotate-90 whitespace-nowrap">PEMBENTANGAN</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.learningTimes?.map((lt, i, arr) => (
                      <tr key={`lt-${i}`}>
                        <td className={`border-r border-black p-1 text-center text-red-600 whitespace-nowrap ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.topic}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.f2fKuliah}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.f2fTutorial}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.f2fTugasan1}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.f2fTugasan2}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.f2fTugasan3}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.f2fPembentangan}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.nf2fBerpandu}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.nf2fKendiri}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.nf2fTugasan1}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.nf2fTugasan2}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.nf2fTugasan3}</td>
                        <td className={`border-r border-black p-1 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.nf2fPembentangan}</td>
                        <td className={`border-black p-1 text-center text-red-600 font-bold ${i < arr.length - 1 ? 'border-b' : ''}`}>{lt.totalSLT}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold border-t border-black">
                      <td className="border-r border-black p-1 text-center">Total</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.f2fKuliah || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.f2fTutorial || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.f2fTugasan1 || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.f2fTugasan2 || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.f2fTugasan3 || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.f2fPembentangan || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.nf2fBerpandu || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.nf2fKendiri || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.nf2fTugasan1 || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.nf2fTugasan2 || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.nf2fTugasan3 || 0), 0) ?? 0}</td>
                      <td className="border-r border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.nf2fPembentangan || 0), 0) ?? 0}</td>
                      <td className="border-black p-1 text-center text-red-600">{data?.learningTimes?.reduce((a, b) => a + Number(b.totalSLT || 0), 0) ?? 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center align-top">8.</td>
            <td className="border border-black p-0" colSpan={2}>
              <div className="font-bold text-sm uppercase p-2 border-b border-black w-full">WEEKLY SCHEDULE</div>
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border-r border-b border-black p-2">TOPIC</th>
                    <th className="border-r border-b border-black p-2">TOPIC/CONTENT</th>
                    <th className="border-r border-b border-black p-2 w-24">RECOMMENDED CONTACT HOURS</th>
                    <th className="border-r border-b border-black p-2 w-24">ASSESSMENT METHOD</th>
                    <th className="border-b border-black p-2 w-20">WEEK</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.weeklySchedule?.map((wk, i, arr) => (
                    <tr key={`wk-${i}`}>
                      <td className={`border-r border-black p-2 text-center text-red-600 ${i < arr.length - 1 ? 'border-b' : ''}`}>{wk.topic}</td>
                      <td className={`border-r border-black p-2 text-red-600 whitespace-pre-line leading-snug ${i < arr.length - 1 ? 'border-b' : ''}`}>{wk.content}</td>
                      <td className={`border-r border-black p-2 text-red-600 text-center font-bold whitespace-pre-line ${i < arr.length - 1 ? 'border-b' : ''}`}>{wk.contactHours}</td>
                      <td className={`border-r border-black p-2 text-red-600 text-center font-bold whitespace-pre-line ${i < arr.length - 1 ? 'border-b' : ''}`}>{wk.assessment}</td>
                      <td className={`border-black p-2 text-red-600 text-center ${i < arr.length - 1 ? 'border-b' : ''}`}>{wk.week}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-bold text-center align-top">9.</td>
            <td className="border border-black p-2" colSpan={2}>
              <div className="font-bold text-sm uppercase mb-2">REFERENCES</div>
              <div className="p-2 text-red-600 whitespace-pre-line text-xs">
                {data.references}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between text-xs md:text-sm mt-12 mb-8 px-4">
        <div>
           Prepared by: <br/><br/><br/>
           .............................................................<br/>
           (Tandatangan dan Nama Penyelaras Kursus)<br/>
           <span className="text-red-600">{data.preparedByName}</span><br/>
           Date: <span className="text-red-600">{data.datePrepared}</span>
        </div>
        <div>
           Verified by: <br/><br/><br/>
           .............................................................<br/>
           (Tandatangan dan Nama KJ/KPro/KK)<br/>
           <span className="text-red-600">{data.verifiedByName}</span><br/>
           Date: <span className="text-red-600">{data.dateVerified}</span>
        </div>
      </div>

      <div className="hidden print:block fixed bottom-4 left-8 text-[11px] font-sans">
        PLSP-04 (4) (26-02-26)
      </div>
      <div className="block print:hidden text-[11px] font-sans mt-8 text-black">
        PLSP-04 (4) (26-02-26)
      </div>
    </div>
  );
}
