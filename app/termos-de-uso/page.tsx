// Página /termos-de-uso
// Conteúdo: security-lgpd e content-seo preenchem o texto real

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso do site da Soluções 2M Climatização.",
  robots: { index: true, follow: false },
}

export default function TermosDeUsoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">Termos de Uso</h1>

      <div className="prose prose-gray max-w-none">
        <p className="mb-6 text-sm text-gray-600">
          <strong>Última atualização:</strong> 23 de abril de 2026
        </p>

        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e utilizar este site (www.solucoes2m.com.br [PLACEHOLDER]),
          você automaticamente concorda com estes Termos de Uso. Se você não concorda
          em cumprir estes termos, favor não utilize os serviços. Reservamo-nos o direito
          de modificar estes termos a qualquer momento. A continuação do uso do site após
          as alterações constitui aceitação dos novos termos.
        </p>

        <h2>2. Descrição dos Serviços</h2>
        <p>
          O site <strong>Soluções 2M Climatização</strong> fornece:
        </p>
        <ul>
          <li>Um quiz interativo para diagnóstico de problemas com ar-condicionado.</li>
          <li>Estimativa gratuita de preços baseada nas respostas do quiz.</li>
          <li>Redirecionamento para contato via WhatsApp com o técnico.</li>
          <li>Informações gerais sobre serviços de climatização.</li>
        </ul>
        <p>
          O site é apenas uma ferramenta de captura de leads. O contrato de prestação
          de serviço ocorre separadamente, via comunicação direta entre cliente e técnico.
        </p>

        <h2>3. Estimativas de Preço</h2>
        <p>
          As estimativas exibidas no quiz são <strong>apenas aproximadas</strong> e
          baseadas nas informações fornecidas. O preço final:
        </p>
        <ul>
          <li>
            É confirmado <strong>apenas após avaliação técnica no local</strong> do equipamento.
          </li>
          <li>Pode variar conforme complexidade, marca do equipamento, acessibilidade, etc.</li>
          <li>
            É sempre apresentado <strong>antes de iniciar qualquer trabalho</strong>.
            Você tem o direito de aceitar ou recusar.
          </li>
          <li>Não constitui obrigação de contratação.</li>
        </ul>

        <h2>4. Responsabilidades do Usuário</h2>
        <p>Ao utilizar o site, você concorda em:</p>
        <ul>
          <li>
            <strong>Fornecer informações precisas</strong> no quiz (nome, WhatsApp, bairro).
          </li>
          <li>
            <strong>Não enviar dados de terceiros</strong> sem consentimento expresso.
          </li>
          <li>
            <strong>Respeitar as leis aplicáveis</strong> ao usar o site (não hacking,
            spam, etc).
          </li>
          <li>
            <strong>Aceitar todas as políticas</strong> listadas neste documento
            e na Política de Privacidade.
          </li>
          <li>
            <strong>Manter sigilo</strong> de qualquer credencial de acesso gerada
            (se aplicável em futuras versões).
          </li>
        </ul>

        <h2>5. Limitação de Responsabilidade</h2>
        <p>
          A Soluções 2M Climatização fornece o site "NO ESTADO EM QUE SE ENCONTRA",
          sem garantias expressas ou implícitas. Até o máximo permitido por lei:
        </p>
        <ul>
          <li>
            Não somos responsáveis por danos diretos, indiretos, incidentais, especiais,
            consequentes ou punitivos resultantes do uso ou incapacidade de usar o site.
          </li>
          <li>
            Não garantimos que o site operará sem interrupções ou erros.
          </li>
          <li>
            A responsabilidade total não excede o valor pago (se houver) pelos serviços.
          </li>
          <li>
            <strong>Estimativas de preço são apenas informativas</strong> — o técnico
            sempre fornece orçamento final no local.
          </li>
        </ul>

        <h2>6. Propriedade Intelectual</h2>
        <p>
          Todo conteúdo do site (textos, imagens, logos, design) é propriedade
          intelectual da Soluções 2M Climatização ou de seus licenciadores. Você
          não pode:
        </p>
        <ul>
          <li>Copiar, modificar ou distribuir conteúdo sem permissão.</li>
          <li>Usar logotipos ou marcas registradas sem autorização.</li>
          <li>Fazer scraping, crawling ou coleta automatizada de dados.</li>
        </ul>

        <h2>7. Links Externos e Conteúdo de Terceiros</h2>
        <p>
          O site pode conter links para sites de terceiros. Não somos responsáveis
          pelo conteúdo, políticas ou práticas desses sites. O acesso a eles é
          por sua conta e risco.
        </p>

        <h2>8. Proibições</h2>
        <p>Você não pode:</p>
        <ul>
          <li>Acessar o site de forma ilegal ou para fins ilegais.</li>
          <li>Enviar conteúdo ofensivo, difamatório, obsceno ou ilegal.</li>
          <li>Interferir com funcionamento do site (hacking, DDoS, etc).</li>
          <li>Espiar ou interceptar comunicações (phishing, man-in-the-middle).</li>
          <li>Criar múltiplas contas para contornar limitações.</li>
          <li>Compartilhar links falsos ou enganosos para o site.</li>
        </ul>
        <p>
          Violações resultarão em bloqueio imediato de acesso e possível ação
          legal conforme aplicável.
        </p>

        <h2>9. Comunicação via WhatsApp</h2>
        <p>
          Ao fornecer seu número de WhatsApp, você concorda em receber:
        </p>
        <ul>
          <li>
            Mensagens do técnico para seguimento de orçamento e agendamento.
          </li>
          <li>
            Atualizações sobre status do serviço (se contratado).
          </li>
        </ul>
        <p>
          Você pode solicitar remoção da lista a qualquer momento. O envio de
          mensagens obedece à Política de Privacidade e legislação LGPD.
        </p>

        <h2>10. Indenização</h2>
        <p>
          Você concorda em indenizar e isentar a Soluções 2M Climatização de qualquer
          reclamação, dano, perda, responsabilidade, custo ou despesa decorrentes:
        </p>
        <ul>
          <li>Do seu uso do site.</li>
          <li>De violação destes Termos de Uso.</li>
          <li>De violação de direitos de terceiros.</li>
        </ul>

        <h2>11. Rescisão e Suspensão</h2>
        <p>
          Podemos suspender ou encerrar seu acesso ao site a qualquer momento, sem
          aviso prévio, se você violar estes termos ou atividades suspeitas forem
          detectadas.
        </p>

        <h2>12. Lei Aplicável e Jurisdição</h2>
        <p>
          Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil,
          em especial as leis do Estado da Bahia. Qualquer disputa será resolvida nos
          juizados competentes de Salvador-BA.
        </p>

        <h2>13. Contato</h2>
        <p>
          Para questões sobre estes Termos de Uso, entre em contato:
          <br />
          <strong>Email:</strong> contato@solucoes2m.com.br [PLACEHOLDER]
          <br />
          <strong>WhatsApp:</strong> (71) 9999-9999 [PLACEHOLDER]
        </p>

        <hr className="my-8" />

        <p className="text-xs text-gray-500">
          Estes Termos de Uso são válidos a partir de 23 de abril de 2026.
        </p>
      </div>
    </main>
  )
}
