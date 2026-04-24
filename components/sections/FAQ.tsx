// Seção FAQ — accordion com 8 perguntas
// Server Component — usa shadcn Accordion
// Schema.org FAQPage integrado via JSON-LD

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/content/faq"
import { Button } from "@/components/ui/button"
import { getWhatsAppUrl } from "@/config/whatsapp"

export function FAQ() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Respostas às dúvidas mais comuns sobre nossos serviços
          </p>
        </div>

        {/* Accordion */}
        <div className="rounded-xl bg-white shadow-lg">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={`border-b border-gray-200 last:border-b-0 ${idx === 0 ? "border-t" : ""}`}
              >
                <AccordionTrigger className="group px-6 py-5 text-left hover:bg-sky-50 data-[state=open]:bg-sky-50">
                  <h3 className="font-semibold text-gray-900 group-hover:text-sky-700">
                    {item.pergunta}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-0 text-gray-700 leading-relaxed">
                  {item.resposta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Seção "Não encontrou?" */}
        <div className="mt-8 rounded-xl bg-sky-50 p-6 text-center">
          <h3 className="font-semibold text-gray-900">
            Não encontrou sua dúvida?
          </h3>
          <p className="mt-2 text-gray-700">
            Entre em contato conosco via WhatsApp. Responderemos em poucos minutos.
          </p>
          <a href={getWhatsAppUrl("Olá! Tenho uma dúvida que não está na FAQ. Pode me ajudar?")} className="mt-4 inline-block">
            <Button
              size="sm"
              className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              💬 Conversar no WhatsApp →
            </Button>
          </a>
        </div>
      </div>

      {/* JSON-LD Schema FAQPage (para SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.pergunta,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.resposta,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
