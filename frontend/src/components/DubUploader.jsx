import React, { useState, useRef } from "react";
import axios from "axios";

const availableLocales = [
  { code: "fr_FR", label: "French" },
  { code: "de_DE", label: "German" },
  { code: "es_ES", label: "Spanish" },
  { code: "hi_IN", label: "Hindi" },
  // Add more as needed
];

export default function DubUploader() {
  const [file, setFile] = useState(null);
  const [locales, setLocales] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [polling, setPolling] = useState(false);
  const pollingRef = useRef();

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleLocaleChange = (e) => {
    const { value, checked } = e.target;
    setLocales((prev) =>
      checked ? [...prev, value] : prev.filter((l) => l !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJobStatus(null);
    setResult(null);
    if (!file || locales.length === 0) {
      setError({ error_message: "Please select a file and at least one language." });
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    locales.forEach((locale) => formData.append("target_locales", locale));

    try {
      const res = await axios.post("http://localhost:5000/api/dub", formData);
      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data ||
        { error_message: "Something went wrong. Please try again." }
      );
    } finally {
      setLoading(false);
    }
  };

  // Poll job status every 5 seconds until completed/failed
  const pollJobStatus = async (jobId) => {
    setPolling(true);
    setJobStatus({ status: "Polling..." });
    const poll = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/dub/status/${jobId}`);
        setJobStatus(res.data);
        if (
          res.data.status === "COMPLETED" ||
          res.data.status === "FAILED" ||
          res.data.status === "PARTIAL_SUCCESS"
        ) {
          setPolling(false);
          clearInterval(pollingRef.current);
        }
      } catch (err) {
        setJobStatus(
          err.response?.data ||
          { error_message: "Could not fetch job status." }
        );
        setPolling(false);
        clearInterval(pollingRef.current);
      }
    };
    poll();
    pollingRef.current = setInterval(poll, 5000);
  };

  // Stop polling on unmount
  React.useEffect(() => {
    return () => clearInterval(pollingRef.current);
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 rounded-3xl bg-gradient-to-br from-green-900 via-gray-900 to-green-700 shadow-2xl border-2 border-green-400/40 relative overflow-hidden">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-green-300 tracking-wider drop-shadow-[0_0_12px_#22d3ee] font-mono">
        <span className="animate-pulse">Murf Dub Uploader</span>
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="font-semibold text-green-200">
          <span className="mr-2">🎵</span> Select Audio/Video:
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileChange}
            className="block mt-2 w-full p-2 rounded-lg border border-green-400 bg-gray-900 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </label>
        <div>
          <label className="font-semibold text-green-200">🌐 Languages:</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {availableLocales.map((loc) => (
              <label
                key={loc.code}
                className="flex items-center px-3 py-2 rounded-lg border-2 border-green-500/30 bg-green-900/40 text-green-100 font-medium shadow-md hover:bg-green-700/60 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  value={loc.code}
                  checked={locales.includes(loc.code)}
                  onChange={handleLocaleChange}
                  className="accent-green-400 mr-2"
                />
                <span>{loc.label}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-lg shadow-lg transition
            bg-gradient-to-r from-green-400 to-teal-400 text-gray-900 hover:from-green-300 hover:to-teal-300
            ${loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}
          `}
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : (
            <>
              <span className="text-xl">🚀</span> Dub
            </>
          )}
        </button>
      </form>
      {error && (
        <div className="mt-6 p-3 rounded-lg bg-red-900/60 text-red-300 font-semibold text-center border border-red-500 shadow">
          {error.error_message} {error.error_code && `(Code: ${error.error_code})`}
        </div>
      )}
      {result && (
        <div className="mt-8 bg-green-900/30 border border-green-500/30 rounded-xl p-5 shadow-lg">
          <h4 className="text-green-300 font-bold mb-2 text-lg">Dub Job Created!</h4>
          <pre className="text-green-100 text-sm whitespace-pre-wrap break-all">
            Job ID: {result.job_id}
            {"\n"}Locales: {result.target_locales && result.target_locales.join(", ")}
            {"\n"}File Name: {result.file_name}
          </pre>
          {!polling && (
            <button
              onClick={() => pollJobStatus(result.job_id)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Check Job Status
            </button>
          )}
        </div>
      )}
      {jobStatus && (
        <div className="mt-6 p-3 rounded-lg bg-blue-900/60 text-blue-200 font-semibold text-center border border-blue-500 shadow">
          <div>
            <b>Status:</b> {jobStatus.status}
            {jobStatus.download_details && jobStatus.download_details.map((detail, i) => (
              <div key={i}>
                <div><b>Locale:</b> {detail.locale}</div>
                <div><b>Dub Status:</b> {detail.status}</div>
                {detail.download_url &&
                  <div>
                    <a
                      href={detail.download_url}
                      className="underline text-green-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Dubbed File
                    </a>
                  </div>
                }
                {detail.download_srt_url &&
                  <div>
                    <a
                      href={detail.download_srt_url}
                      className="underline text-green-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download SRT (Subtitles)
                    </a>
                  </div>
                }
              </div>
            ))}
            {jobStatus.error_message && (
              <div className="text-red-300">{jobStatus.error_message}</div>
            )}
          </div>
        </div>
      )}
      {/* Animated Techy Glow */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-teal-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
}
