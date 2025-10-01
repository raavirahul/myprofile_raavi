import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage(){
  return (
    <main className="container max-w-4xl py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="text-slate-600 mt-2">Messages land in my Discord. I usually respond quickly.</p>
      <div className="mt-8"><ContactForm/></div>
    </main>
  );
}
