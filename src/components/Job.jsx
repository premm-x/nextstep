import { useEffect, useState } from "react";
import { icons } from "./CodePreview";
import { RotateCcw, Trash2 } from "lucide-react";




export function JobCard({ job, index, onDelete }) {


  return (
    <div
      className="group relative bg-[#111] border border-[#1e1e1e] rounded-2xl p-2 hover:border-[#2e2e2e] hover:bg-[#141414] transition-all duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <a
            href={job.url} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[15px] font-bold shrink-0 border border-white/10"
          // style={{ backgroundColor: job.logoColor, color: job.logoColor === "#ffffff" ? "#000" : "#fff" }}
          >
            {/* {job.logo} */} logo
          </a>

          <div>
            <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold text-[#e8e8e8] leading-tight group-hover:text-white transition-colors">
              {job.title} <span className="text-[12px] text-[#444] font-medium ml-1">{job.created_at}</span>
            </a>
            <div className="text-[13px] text-[#666] mt-0.5 ">
              {job.company.name}
            </div>
          </div>

        </div>

        {/* Meta row */}
        <div className="gap-1 flex flex-col">
          <div className="flex items-center  gap-3 ">
            <span className="flex items-center gap-1 text-[11px] text-[#555]">
              {icons.MapPinIcon}  {job.location.display}
            </span>
            <span className="w-px h-3 bg-[#222]" />
            <span className="flex items-center gap-1 text-[11px] text-[#555]">
              {icons.BriefcaseIcon}  {job.employment?.contract_time}
            </span>
            <span className="w-px h-3 bg-[#222]" />
            <span className="flex items-center gap-1 text-[11px] font-medium" > {/* style={{ color: job.accentColor }} */}
              {icons.DollarIcon}  {job.salary?.max ?? "not disclose"}
            </span>
          </div>

          {/* <div className="flex items-center gap-1.5 flex-wrap">
            {job.tags.map(tag => (
              <span key={tag} className="px-1 bg-[#1a1a1a] border border-[#252525] rounded-md text-[11px] text-[#777] font-medium">
                {tag}
              </span>
            ))}
          </div> */}
        </div>

        {/* Right: posted + save */}
        <div className="flex items-center gap-2 shrink-0">

          <button
            onClick={() => onDelete(job.id)}
            className={` rounded-lg transition-all text-[#444] hover:text-[#888] hover:bg-[#1a1a1a]`}
          >
            <Trash2 className="w-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#777] leading-relaxed c ne-clamp-2">{job.description}</p>

      {/* Tags + Apply */}
      {/* <div className="flex items-center justify-between gap-2">

        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all flex-shrink-0 hover:gap-2"
          style={{ backgroundColor: job.logoColor, color: job.logoColor === "#ffffff" ? "#000" : "#fff" }}
        >
          Apply Now {icons.ArrowRightIcon}
        </a>
      </div> */}
    </div>
  );
}

// let confirmJob = JOBS_DATA;
let confirmJob = {};

export function JobsPanel({ sendMessage, JOBS_DATA }) {

  const [jobs, setJobs] = useState(JOBS_DATA);
  const [deletedJobs, setDeletedJobs] = useState([]);

  function deleteJob(id) {
    const jobToDelete = jobs.find(job => job.id === id);

    setDeletedJobs(prev => [...prev, jobToDelete]);
    setJobs(prev => prev.filter(job => job.id !== id));
  }

  function restoreAll() {
    setJobs(prev => [...prev, ...deletedJobs]);
    setDeletedJobs([]);
  }

  confirmJob = jobs

  if (!jobs || Object.keys(jobs).length === 0) {
    return;
  }

  return (
    <div className="mt-4 space-y-3 bg-black p-2 rounded-2xl">

      {jobs && jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} onDelete={deleteJob} />)}

      <div className="flex items-center justify-between pr-2 py-2">

        <button
          onClick={() => restoreAll()}
          className="flex items-center gap-2 px-5 py-2 bg-blue-500 border rounded-full text-[#000000] text-[13px] font-medium hover:bg-blue-700 transition-all duration-250">
          Restore <RotateCcw className="w-3.5" />
        </button>

        <button
          onClick={() => sendMessage("I confirmed this list of job's", false)}
          className="flex items-center gap-2 px-5 py-2 bg-green-500 border rounded-full text-[#000000] text-[13px] font-medium hover:bg-green-700 transition-all duration-250">
          Done {icons.ArrowRightIcon}
        </button>
      </div>
    </div>
  );
}


export function ConfirmJobs({ sheet }) {

  const [jobs, setJobs] = useState(confirmJob);

  function printToGoogleSheet() {

    if (!sheet || Object.keys(sheet).length === 0) {
      alert("Select sheet to update the data");
      return;
    }

    console.log(jobs)
    console.log(sheet)
    //https://script.google.com/macros/s/AKfycbwn6JFfa4gK3QdZpWkxYEwWlE30lyaJZt2SCvjcqCq6cXV16r8lHgtcpNcDAUrpkiYB/exec
    //https://script.google.com/macros/s/AKfycbxHhAHsq9o__a7uUCxeS2i1VXGouZoBNCkpvAn8_ohV4s9kb7aLtZV71nutQ8kPzrtY/exec
    fetch(sheet.link, {
      method: "POST",
      mode: "no-cors",   // 👈 important
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobs),
    })
      .then(() => console.log("Sent"))
      .catch(err => console.error(err));
  }

  return (
    <div className="bg-black px-4 py-3 w-1/2 rounded-2xl">

      {
        jobs.map((job, i) => (
          <div
            key={i}
            className=" bg-[#111] border border-[#1e1e1e] rounded-xl p-1 mb-2 hover:border-[#2e2e2e] hover:bg-[#141414] transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">

                ⬛

                <a
                  href={job.url} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-[15px] font-bold shrink-0 border border-white/10"
                // style={{ backgroundColor: job.logoColor, color: job.logoColor === "#ffffff" ? "#000" : "#fff" }}
                >
                  {/* {job.logo} */} logo
                </a>

                <div className="flex gap-3">
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold text-[#e8e8e8] leading-tight group-hover:text-white transition-colors">
                    {job.title}
                  </a>
                  <div className="text-[10px] text-[#666] mt-0.5 ">
                    {job.company.name}
                  </div>
                </div>

              </div>
            </div>

          </div>
        ))
      }

      <div className="w-full flex items-center justify-end ">
        <button
          onClick={() => printToGoogleSheet()}
          className="flex items-center mt-2 gap-2 px-5 py-2 bg-green-500 border rounded-full text-[#000000] text-[13px] font-medium hover:bg-green-700 transition-all duration-250">
          Confirm {icons.ArrowRightIcon}
        </button>
      </div>

    </div>
  )
}