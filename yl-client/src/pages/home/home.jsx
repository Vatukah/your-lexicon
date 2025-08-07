export default function Home() {
  return (
    <div className="home w-full h-screen bg-bg-muted text-text p-6">
        <img src="/yl.svg" alt="yourLexicon logo"  className="w-32 mx-auto"/>
      <h1 className="text-3xl font-bold underline text-center mt-10">
        Welcome to Your Lexicon
      </h1>
      <p className="text-center mt-4 text-text-muted">
        This is the home page of your lexicon application.
      </p>
    </div>
  );
}