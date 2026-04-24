// Seção Antes/Depois — impacto visual forte para conversão
// Server Component com imagens comparativas

import Image from "next/image"

export function BeforeAfter() {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Veja a Transformação
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Limpeza profissional que muda o desempenho do seu ar-condicionado
          </p>
        </div>

        {/* Comparação Antes/Depois — Desktop */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
          {/* Antes */}
          <div className="overflow-hidden rounded-2xl">
            <div className="relative h-80 w-full overflow-hidden bg-gray-700">
              <Image
                src="/images/antes-depois/ar-sujo-antes.jpg"
                alt="Ar-condicionado sujo antes da limpeza profissional"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Label Antes */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="rounded-lg bg-red-500/90 px-8 py-3">
                  <p className="text-lg font-bold text-white">ANTES</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-6">
              <h3 className="mb-3 font-semibold text-gray-900">❌ Sem manutenção</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Ar sujo e acumulado</li>
                <li>• Desempenho reduzido</li>
                <li>• Ar quente ou fraco</li>
                <li>• Consumo alto de energia</li>
                <li>• Risco de bactérias</li>
              </ul>
            </div>
          </div>

          {/* Depois */}
          <div className="overflow-hidden rounded-2xl">
            <div className="relative h-80 w-full overflow-hidden bg-gray-700">
              <Image
                src="/images/antes-depois/ar-limpo-depois.jpg"
                alt="Ar-condicionado limpo após limpeza profissional"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Label Depois */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="rounded-lg bg-emerald-500/90 px-8 py-3">
                  <p className="text-lg font-bold text-white">DEPOIS</p>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 p-6">
              <h3 className="mb-3 font-semibold text-gray-900">✅ Com limpeza profissional</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Filtros limpos e higienizados</li>
                <li>• Máximo desempenho</li>
                <li>• Ar gelado e homogêneo</li>
                <li>• Economia de energia</li>
                <li>• Ar puro e saudável</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile — Stack vertical com divisão visual */}
        <div className="space-y-6 md:hidden">
          {/* Antes */}
          <div className="overflow-hidden rounded-2xl">
            <div className="relative h-60 w-full overflow-hidden bg-gray-700">
              <Image
                src="/images/antes-depois/ar-sujo-antes.jpg"
                alt="Ar-condicionado sujo antes da limpeza profissional"
                fill
                className="object-cover"
                loading="lazy"
                sizes="100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="rounded-lg bg-red-500/90 px-6 py-2">
                  <p className="font-bold text-white">ANTES</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-900">❌ Sem manutenção</h3>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• Ar sujo e acumulado</li>
                <li>• Desempenho reduzido</li>
                <li>• Ar quente ou fraco</li>
                <li>• Consumo alto</li>
              </ul>
            </div>
          </div>

          {/* Depois */}
          <div className="overflow-hidden rounded-2xl">
            <div className="relative h-60 w-full overflow-hidden bg-gray-700">
              <Image
                src="/images/antes-depois/ar-limpo-depois.jpg"
                alt="Ar-condicionado limpo após limpeza profissional"
                fill
                className="object-cover"
                loading="lazy"
                sizes="100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="rounded-lg bg-emerald-500/90 px-6 py-2">
                  <p className="font-bold text-white">DEPOIS</p>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-900">✅ Com limpeza profissional</h3>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• Filtros higienizados</li>
                <li>• Máximo desempenho</li>
                <li>• Ar gelado e puro</li>
                <li>• Economia de energia</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA destaque */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold text-white">
            Pronto para limpar seu ar-condicionado?
          </h3>
          <p className="mb-6 text-white/90">
            Agendamento rápido e sem complicações
          </p>
          <a href="#servicos">
            <button className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-sky-600 transition-transform hover:scale-105 active:scale-95">
              Ver serviço de limpeza →
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
