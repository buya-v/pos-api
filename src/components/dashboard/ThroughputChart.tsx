export const ThroughputChart = () => {
  // Simulated data points for a simple SVG chart
  const points = [10, 25, 15, 30, 45, 40, 60, 55, 70, 65, 80, 75];
  const max = Math.max(...points);
  const height = 100;
  const width = 300;
  
  // Generate SVG path
  const pathData = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - (p / max) * height;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-md shadow-card border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Transaction Throughput (Last Hour)</h3>
      <div className="w-full h-[150px] flex items-end justify-center overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${pathData} L ${width} ${height} L 0 ${height} Z`} fill="url(#gradient)" />
          <path d={pathData} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400 font-mono">
        <span>60m ago</span>
        <span>Now</span>
      </div>
    </div>
  );
};