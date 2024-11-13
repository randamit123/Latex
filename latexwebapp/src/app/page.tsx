import './globals.css';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center">
      {/* Header */}
      <header className="bg-[#ADC178] text-black w-full flex justify-between items-center p-4">
        <div className="font-inria">PaperLeaf</div>
        <nav className="flex space-x-4 font-inria">
          <a href="/" className="hover:underline">Home</a>
          <a href="/help" className="hover:underline">Help</a>
          <a href="/account" className="hover:underline">Account</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-start text-left px-8 mt-10 max-w-lg">
        <h1 className="font-bodoni mb-4">PaperLeaf</h1>
        <p className="font-montserrat mb-12 leading-relaxed">
          Converts handwritten mathematical proofs into editable
          <span className="font-code"> LaTeX code</span>. {/* Added space within span */}
          Upload your work and we’ll do the rest!
        </p>
      </main>

      {/* Centered Get Started Button */}
      <div className="flex justify-center w-full mt-6">
        <button className="btn-primary">Get Started</button>
      </div>
    </div>
  );
}
