import Link from 'next/link'

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="font-bold text-2xl tracking-tighter">SignDown.</div>
        <Link href="/login" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200">
          Get Started
        </Link>
      </nav>
      
      <main className="mt-20 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          Contracts in Markdown.<br/><span className="text-blue-500">Signed in seconds.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Stop wrestling with PDFs. Write agreements like you write code. 
          Simple, legal, and fast.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="bg-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition">
            Start for Free
          </Link>
          <a href="#pricing" className="border border-gray-700 px-8 py-4 rounded-lg text-lg hover:bg-gray-800">
            View Pricing
          </a>
        </div>
      </main>

      {/* Pricing Section */}
      <section id="pricing" className="mt-32 py-20 bg-neutral-800">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="p-8 border border-gray-700 rounded-xl">
            <h3 className="text-2xl font-bold">Starter</h3>
            <p className="text-4xl font-bold mt-4">$0</p>
            <ul className="mt-6 space-y-3 text-gray-400">
              <li>✓ 3 Documents / mo</li>
              <li>✓ Basic Markdown</li>
              <li>✓ Secure Storage</li>
            </ul>
          </div>
          <div className="p-8 border-2 border-blue-500 rounded-xl bg-neutral-900 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-xl">BEST VALUE</div>
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="text-4xl font-bold mt-4">$15<span className="text-sm text-gray-400">/mo</span></p>
            <ul className="mt-6 space-y-3 text-gray-300">
              <li>✓ <strong>Unlimited</strong> Documents</li>
              <li>✓ Audit Trails</li>
              <li>✓ Custom Branding</li>
            </ul>
            <form action="/api/stripe/checkout" method="POST">
               <button className="w-full mt-8 bg-blue-600 py-3 rounded-lg font-bold">Upgrade Now</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}