// ROTA DINÂMICA DA ATIVIDADE (cada item do catálogo recebe um id na URL)
import DetalheAtividade from "@/components/activities/[id]";

export default function AtividadeDetalheRoute() {
  return <DetalheAtividade />;
}
