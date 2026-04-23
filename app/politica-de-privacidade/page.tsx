// Página /politica-de-privacidade — LGPD compliant
// Conteúdo: security-lgpd e content-seo preenchem o texto real

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Soluções 2M Climatização. Saiba como coletamos, " +
    "usamos e protegemos seus dados pessoais conforme a LGPD.",
  robots: { index: true, follow: false }, // Não precisa de SEO mas deve ser acessível
}

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">Política de Privacidade</h1>

      <div className="prose prose-gray max-w-none">
        <p className="mb-6 text-sm text-gray-600">
          <strong>Última atualização:</strong> 23 de abril de 2026
        </p>

        <h2>1. Identificação do Controlador de Dados</h2>
        <p>
          A <strong>Soluções 2M Climatização</strong>, pessoa jurídica inscrita no CNPJ sob o número
          <strong> 00.000.000/0001-00</strong> [PLACEHOLDER], com sede na cidade de Salvador,
          Estado da Bahia, Brasil, é a responsável pelo tratamento dos seus dados pessoais
          conforme a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong>.
        </p>
        <p>
          Para questões relacionadas à privacidade, você pode nos contatar através do email:
          <strong> privacidade@solucoes2m.com.br</strong> [PLACEHOLDER]
        </p>

        <h2>2. Dados Pessoais Coletados</h2>
        <p>Coletamos os seguintes dados pessoais durante o uso do nosso site:</p>
        <ul>
          <li>
            <strong>Dados do Quiz (obrigatórios):</strong> Nome completo, número de WhatsApp,
            bairro/região, respostas sobre o problema do ar-condicionado, tipo de equipamento
            e urgência de atendimento.
          </li>
          <li>
            <strong>Dados de Navegação (conforme consentimento):</strong> Endereço IP, tipo de
            navegador, páginas visitadas, tempo de permanência, dados de cliques e interações
            (rastreados via Vercel Analytics, Facebook Pixel e cookies).
          </li>
          <li>
            <strong>Dados de Comunicação:</strong> Histórico de conversas via WhatsApp após
            a conversão (armazenado apenas para seguimento do lead e prestação de serviço).
          </li>
        </ul>

        <h2>3. Finalidade do Tratamento dos Dados</h2>
        <p>Utilizamos seus dados para as seguintes finalidades:</p>
        <ul>
          <li>
            <strong>Prestação de Serviço:</strong> Processar seu pedido de orçamento e entrar
            em contato via WhatsApp com uma estimativa personalizada.
          </li>
          <li>
            <strong>Qualificação de Leads:</strong> Entender seu problema de ar-condicionado
            para encaminhar ao técnico correto.
          </li>
          <li>
            <strong>Análise de Negócio (Legítimo Interesse):</strong> Entender padrões de
            procura, melhorar o site e otimizar campanhas de marketing.
          </li>
          <li>
            <strong>Compliance Legal:</strong> Atender obrigações de conservação de registros
            conforme legislação fiscal e previdenciária.
          </li>
        </ul>

        <h2>4. Base Legal para o Tratamento</h2>
        <p>
          Conforme o <strong>Artigo 7 da LGPD</strong>, o tratamento de seus dados está
          fundamentado nas seguintes bases legais:
        </p>
        <ul>
          <li>
            <strong>Consentimento (Inciso I):</strong> Para cookies de análise (Vercel Analytics,
            Facebook Pixel) — você pode revogar este consentimento a qualquer momento via banner
            de cookies.
          </li>
          <li>
            <strong>Legítimo Interesse (Inciso IX):</strong> Para coleta de dados do quiz
            e comunicação via WhatsApp — essencial para prestar o serviço solicitado.
          </li>
          <li>
            <strong>Execução de Contrato (Inciso III):</strong> Quando você contrata efetivamente
            um serviço após conversão.
          </li>
        </ul>

        <h2>5. Destinatários dos Dados</h2>
        <p>Seus dados podem ser compartilhados com:</p>
        <ul>
          <li>
            <strong>Plataforma WhatsApp:</strong> Seu número de WhatsApp é enviado para abertura
            do link de conversa. Confira a política de privacidade do WhatsApp (Meta Platforms).
          </li>
          <li>
            <strong>Resend (Email):</strong> Para envio de confirmação de orçamento (se aplicável).
          </li>
          <li>
            <strong>Facebook (Pixel + Conversions API):</strong> Para rastreamento de conversão
            em campanhas de marketing (conforme consentimento).
          </li>
          <li>
            <strong>Vercel (Hosting):</strong> Dados armazenados em servidores Vercel em
            conformidade com LGPD.
          </li>
          <li>
            <strong>Técnico responsável:</strong> Suas informações de contato e problema são
            compartilhadas com o técnico para agendamento e atendimento.
          </li>
        </ul>
        <p>
          <strong>Não vendemos</strong> seus dados pessoais a terceiros. Compartilhamentos são
          restritos ao necessário para prestação de serviço.
        </p>

        <h2>6. Período de Retenção dos Dados</h2>
        <ul>
          <li>
            <strong>Leads não convertidos:</strong> Mantidos por até 24 meses para retargeting
            de campanhas. Você pode solicitar exclusão a qualquer momento.
          </li>
          <li>
            <strong>Clientes convertidos:</strong> Dados mantidos pelo período do contrato +
            5 anos para conformidade fiscal e tributária.
          </li>
          <li>
            <strong>Cookies:</strong> Conforme configuração (normalmente 1-2 anos para analytics).
          </li>
          <li>
            <strong>Logs de servidor:</strong> Mantidos por até 90 dias para segurança.
          </li>
        </ul>

        <h2>7. Direitos do Titular dos Dados</h2>
        <p>
          Conforme a <strong>LGPD (Artigo 18)</strong>, você tem direito a:
        </p>
        <ul>
          <li>
            <strong>Acesso:</strong> Solicitar cópia de todos os dados que temos sobre você.
          </li>
          <li>
            <strong>Retificação:</strong> Corrigir dados inexatos ou incompletos.
          </li>
          <li>
            <strong>Exclusão (Direito ao Esquecimento):</strong> Solicitar eliminação de seus dados,
            exceto onde retenção é obrigatória por lei.
          </li>
          <li>
            <strong>Limitação:</strong> Pedir que limitemos o uso dos seus dados.
          </li>
          <li>
            <strong>Portabilidade:</strong> Receber seus dados em formato estruturado para
            transferir a outro prestador.
          </li>
          <li>
            <strong>Oposição:</strong> Recusar processamento de dados para legítimo interesse
            (marketing, análise).
          </li>
        </ul>
        <p>
          <strong>Para exercer qualquer direito, envie email para:</strong> privacidade@solucoes2m.com.br
        </p>

        <h2>8. Segurança dos Dados</h2>
        <p>Implementamos medidas técnicas e administrativas para proteger seus dados:</p>
        <ul>
          <li><strong>HTTPS/SSL:</strong> Comunicação criptografada entre você e nossos servidores.</li>
          <li>
            <strong>Bcrypt:</strong> Senhas (se aplicável) hasheadas com rounds ≥ 10.
          </li>
          <li>
            <strong>Firewalls:</strong> Proteção de infraestrutura em nível de rede.
          </li>
          <li>
            <strong>Rate Limiting:</strong> Proteção contra ataques de força bruta no formulário.
          </li>
          <li>
            <strong>Acesso Restrito:</strong> Apenas equipe autorizada acessa dados pessoais.
          </li>
          <li>
            <strong>Monitoramento:</strong> Logs de acesso e alertas de anomalias.
          </li>
        </ul>
        <p>
          Apesar dos esforços, nenhum sistema é 100% seguro. Recomendamos que você mantenha
          confidencialidade de senhas e dados sensíveis.
        </p>

        <h2>9. Cookies e Rastreamento</h2>
        <p>
          Utilizamos cookies e tecnologias similares para melhorar sua experiência. Você pode
          gerenciar preferências via <strong>banner de consentimento</strong> na página inicial.
        </p>
        <ul>
          <li>
            <strong>Cookies Essenciais:</strong> Necessários para funcionamento do site
            (sessão, segurança). Não requerem consentimento.
          </li>
          <li>
            <strong>Cookies de Analytics:</strong> Vercel Analytics para entender uso do site
            (requer consentimento).
          </li>
          <li>
            <strong>Cookies de Marketing:</strong> Facebook Pixel para rastreamento de conversão
            (requer consentimento).
          </li>
        </ul>

        <h2>10. Reclamações e Denúncias</h2>
        <p>
          Se você acredita que seus direitos de privacidade foram violados, pode:
        </p>
        <ul>
          <li>
            <strong>1. Contatar nosso time:</strong> privacidade@solucoes2m.com.br
          </li>
          <li>
            <strong>2. Fazer reclamação à ANPD:</strong> Autoridade Nacional de Proteção de Dados
            <br />
            Website: <a href="https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd">
              https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd
            </a>
          </li>
        </ul>

        <h2>11. Processamento por Terceiros</h2>
        <p>
          Alguns dados são processados por prestadores de serviço (enumerados na seção 5).
          Todos os contratos de processamento incluem cláusulas de conformidade LGPD.
        </p>

        <h2>12. Alterações Nesta Política</h2>
        <p>
          Podemos atualizar esta política periodicamente. Qualquer alteração material será
          notificada via email ou banner no site. O uso continuado após notificação implica
          aceitar as mudanças.
        </p>

        <h2>13. Contato</h2>
        <p>
          <strong>Encarregado de Proteção de Dados (DPO):</strong>
          <br />
          Email: privacidade@solucoes2m.com.br [PLACEHOLDER]
          <br />
          WhatsApp: (71) 9999-9999 [PLACEHOLDER]
          <br />
          Endereço: Salvador, BA [PLACEHOLDER]
        </p>

        <hr className="my-8" />

        <p className="text-xs text-gray-500">
          Esta Política de Privacidade é conforme a Lei Geral de Proteção de Dados
          (Lei nº 13.709/2018). Documento revisado em 23 de abril de 2026.
        </p>
      </div>
    </main>
  )
}
