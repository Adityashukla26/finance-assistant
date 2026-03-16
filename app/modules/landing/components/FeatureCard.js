export default function FeatureCard({ icon, bgColor, iconColor, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
      <div className={`${bgColor} ${iconColor} rounded-full h-12 w-12 flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mt-4 text-slate-800">
        {title}
      </h3>
      <p className="mt-2 text-slate-600">
        {description}
      </p>
    </div>
  )
}
