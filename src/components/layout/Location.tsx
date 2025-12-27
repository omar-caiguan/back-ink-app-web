'use client';

export function Location() {
  return (
    <section className="h-[400px] w-full bg-zinc-900 border-t border-b border-zinc-800 relative grayscale hover:grayscale-0 transition-all duration-500">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.697529458983!2d-70.6482672!3d-33.4372562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a08332155f%3A0xe54d241c6d36e2f6!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1sen!2scl!4v1715000000000!5m2!1sen!2scl"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm p-6 text-center border border-white/10 pointer-events-none">
        <h4 className="text-xl font-heading font-bold text-white uppercase mb-2">Visit Our Studio</h4>
        <p className="text-zinc-400">Santiago, Chile</p>
      </div>
    </section>
  );
}
